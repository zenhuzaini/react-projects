"use client";

import { useEffect, useState } from "react";
import { PLACEHOLDER_COVER_URL } from "@/const/vars";
import type { BuilderConfig } from "./config";
import {
	createBlock,
	createDraft as createBaseDraft,
	normalizeSavedDraft as normalizeBaseDraft,
	stampDraft,
	toLocalDateInput,
	toLocalDateTimeInput,
	upsertSavedDraft,
} from "./draft";
import type {
	BlockType,
	ExistingStoryResponse,
	StoryBlock,
	StoryDraft,
	StoryListItem,
} from "./types";

// Owns the draft being edited, the drafts saved in this browser, and their persistence.
export function useDraftManager(config: BuilderConfig) {
	const { storageKey, draftDefaults } = config;
	const STORAGE_KEY = storageKey;
	const createDraft = (id?: string, blockId?: string) =>
		createBaseDraft(id, blockId, draftDefaults);
	const normalizeSavedDraft = (saved: StoryDraft) =>
		normalizeBaseDraft(saved, draftDefaults);
	const [draft, setDraft] = useState<StoryDraft>(() =>
		createDraft("initial-draft", "initial-paragraph"),
	);
	const [savedDrafts, setSavedDrafts] = useState<StoryDraft[]>([]);
	const [isHydrated, setIsHydrated] = useState(false);
	const [activeDraftId, setActiveDraftId] = useState<string | null>(null);
	const [notice, setNotice] = useState("");

	useEffect(() => {
		try {
			const storedDrafts = localStorage.getItem(storageKey);
			if (storedDrafts) {
				const drafts = JSON.parse(storedDrafts) as StoryDraft[];
				setSavedDrafts(
					drafts.map((saved) => normalizeBaseDraft(saved, draftDefaults)),
				);
			}
		} catch {
			setNotice("Saved drafts could not be read from this browser.");
		}
		setDraft((current) => ({
			...current,
			datePublished: current.datePublished || toLocalDateTimeInput(new Date()),
		}));
		setIsHydrated(true);
	}, [storageKey, draftDefaults]);

	// Autosave the active draft shortly after the last change.
	useEffect(() => {
		if (!isHydrated || !activeDraftId) return;
		const saved = savedDrafts.find((item) => item.id === activeDraftId);
		if (saved && JSON.stringify(saved) === JSON.stringify(draft)) return;

		const timeout = window.setTimeout(() => {
			const timestamp = new Date().toISOString();
			const updatedDraft = stampDraft(
				{ ...draft, id: activeDraftId },
				timestamp,
			);
			const nextDrafts = upsertSavedDraft(savedDrafts, updatedDraft);
			setDraft(updatedDraft);
			setSavedDrafts(nextDrafts);
			try {
				localStorage.setItem(STORAGE_KEY, JSON.stringify(nextDrafts));
			} catch {
				setNotice("Draft could not be saved in this browser.");
			}
		}, 500);

		return () => window.clearTimeout(timeout);
	}, [activeDraftId, draft, isHydrated, savedDrafts, STORAGE_KEY]);

	const updateDraft = (updates: Partial<StoryDraft>) =>
		setDraft((current) => ({ ...current, ...updates }));

	const updateBlock = (id: string, updates: Partial<StoryBlock>) =>
		setDraft((current) => ({
			...current,
			blocks: current.blocks.map((block) =>
				block.id === id
					? {
							...block,
							...updates,
							...(block.type === "paragraph" && updates.text !== undefined
								? { rawMdx: "" }
								: {}),
						}
					: block,
			),
		}));

	const updateListItem = (
		block: StoryBlock,
		index: number,
		updates: Partial<StoryListItem>,
	) => {
		const items = [...block.items];
		items[index] = { ...items[index], ...updates };
		updateBlock(block.id, { items });
	};

	const addBlock = (type: BlockType, index = draft.blocks.length) => {
		const nextBlocks = [...draft.blocks];
		nextBlocks.splice(index, 0, {
			...createBlock(type),
			...(config.showCenterToggle && { insideCenter: true }),
		});
		updateDraft({ blocks: nextBlocks });
	};

	const moveBlock = (from: number, to: number) => {
		if (from === to || to < 0 || to >= draft.blocks.length) return;
		const nextBlocks = [...draft.blocks];
		const [movedBlock] = nextBlocks.splice(from, 1);
		nextBlocks.splice(to, 0, movedBlock);
		updateDraft({ blocks: nextBlocks });
	};

	const removeBlock = (id: string) =>
		updateDraft({ blocks: draft.blocks.filter((block) => block.id !== id) });

	const persist = (nextDrafts: StoryDraft[]) => {
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(nextDrafts));
		} catch {
			setNotice("Draft could not be saved in this browser.");
		}
	};

	const startNewDraft = () => {
		const timestamp = new Date().toISOString();
		const currentSaved = activeDraftId
			? savedDrafts.find((item) => item.id === activeDraftId)
			: undefined;
		const draftsToKeep =
			currentSaved && JSON.stringify(currentSaved) !== JSON.stringify(draft)
				? upsertSavedDraft(
						savedDrafts,
						stampDraft({ ...draft, id: activeDraftId as string }, timestamp),
					)
				: savedDrafts;
		const newDraft = stampDraft(
			{
				...createDraft(),
				datePublished: toLocalDateTimeInput(new Date()),
			},
			timestamp,
		);
		const nextDrafts = upsertSavedDraft(draftsToKeep, newDraft);
		setDraft(newDraft);
		setSavedDrafts(nextDrafts);
		setActiveDraftId(newDraft.id);
		setNotice("New draft created and saved automatically.");
		persist(nextDrafts);
	};

	const loadDraft = (saved: StoryDraft) => {
		setDraft(normalizeSavedDraft(saved));
		setActiveDraftId(saved.id);
		setNotice("");
	};

	const deleteDraft = (id: string) => {
		const nextDrafts = savedDrafts.filter((item) => item.id !== id);
		setSavedDrafts(nextDrafts);
		localStorage.setItem(STORAGE_KEY, JSON.stringify(nextDrafts));
		if (activeDraftId === id) {
			const nextDraft = nextDrafts[0];
			if (nextDraft) {
				setDraft(normalizeSavedDraft(nextDraft));
				setActiveDraftId(nextDraft.id);
			} else {
				setDraft({
					...createDraft(),
					datePublished: toLocalDateTimeInput(new Date()),
				});
				setActiveDraftId(null);
			}
		}
		setNotice("Draft deleted");
	};

	// Replaces the editor content with a story loaded from the library or an imported file.
	const applyImportedStory = (
		result: ExistingStoryResponse,
		fallbackSlug: string,
		fallbackTitle: string,
	) => {
		const metadata = result.metadata;
		const now = new Date().toISOString();
		const publishedDate = metadata.datePublished
			? new Date(metadata.datePublished)
			: new Date();
		const modifiedDate = metadata.dateModified
			? new Date(metadata.dateModified)
			: publishedDate;
		const createdAt = Number.isNaN(publishedDate.getTime())
			? new Date(now)
			: publishedDate;
		const updatedAt = Number.isNaN(modifiedDate.getTime())
			? createdAt
			: modifiedDate;
		const slug = metadata.slug || result.slug || fallbackSlug;
		const importedBlocks = result.blocks?.length
			? result.blocks.map((block) => ({
					...createBlock(block.type),
					...block,
					id: crypto.randomUUID(),
				}))
			: result.body.trim() && !result.supportingMdx
				? [{ ...createBlock("raw"), rawMdx: result.body }]
				: [];

		const importedDraft = {
			...createDraft(),
			id: crypto.randomUUID(),
			storyId: metadata.id ?? 1,
			title: metadata.title || fallbackTitle,
			slug,
			description: metadata.description || "",
			cover: metadata.cover || PLACEHOLDER_COVER_URL,
			imageQuality: draft.imageQuality,
			city: metadata.city || "",
			country: metadata.country || "",
			activityType: metadata.activityType || "bikepacking",
			series: metadata.series || "",
			tags: metadata.tags?.join(", ") || "",
			views: metadata.views ?? 0,
			likes: metadata.likes ?? 0,
			datePublished: toLocalDateTimeInput(
				Number.isNaN(publishedDate.getTime()) ? new Date() : publishedDate,
			),
			eventDateFrom: toLocalDateInput(metadata.eventDateFrom),
			eventDateTo: toLocalDateInput(metadata.eventDateTo),
			nextPostSlug: metadata.nextPostSlug || "",
			prevPostSlug: metadata.prevPostSlug || "",
			supportingMdx: result.supportingMdx || "",
			createdAt: createdAt.toISOString(),
			updatedAt: updatedAt.toISOString(),
			blocks: importedBlocks,
		};
		setDraft(importedDraft);
		setActiveDraftId(importedDraft.id);
		setNotice(`Loaded ${metadata.title || fallbackTitle}.`);
	};

	const isDraftSaved =
		activeDraftId !== null &&
		savedDrafts.some(
			(saved) =>
				saved.id === activeDraftId &&
				JSON.stringify(saved) === JSON.stringify(draft),
		);

	return {
		draft,
		setDraft,
		savedDrafts,
		setSavedDrafts,
		isHydrated,
		activeDraftId,
		setActiveDraftId,
		notice,
		setNotice,
		isDraftSaved,
		updateDraft,
		updateBlock,
		updateListItem,
		addBlock,
		moveBlock,
		removeBlock,
		startNewDraft,
		loadDraft,
		deleteDraft,
		applyImportedStory,
		persist,
	};
}

export type DraftManager = ReturnType<typeof useDraftManager>;
