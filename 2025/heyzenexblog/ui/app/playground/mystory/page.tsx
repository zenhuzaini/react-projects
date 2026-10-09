"use client";

import { useEffect, useState } from "react";
import type { DragEvent, FormEvent } from "react";
import {
	ArrowDown,
	ArrowDownToLine,
	ArrowUp,
	Check,
	ChevronDown,
	Code2,
	CloudUpload,
	Eye,
	GripVertical,
	ImagePlus,
	Layers3,
	PanelLeftClose,
	PanelLeftOpen,
	Plus,
	Quote,
	Text,
	Trash2,
	Type,
	X,
} from "lucide-react";
import MainStoryBookPage from "@/components/layout/StoryBookBlockLayouts/MainStoryBookPage";

import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { photoMockStatic } from "@/mock/photo";
import type { PhotoCardDetailType, StoryContentType } from "@/types/components";
import Heading from "@/components/molecule/Headings/Heading";

type BlockType = "paragraph" | "quote" | "image" | "gallery" | "section";

type StoryBlock = {
	id: string;
	type: BlockType;
	text: string;
	imageUrl: string;
	imageAlt: string;
	gallery: { url: string; alt: string }[];
};

type StoryDraft = {
	id: string;
	title: string;
	slug: string;
	description: string;
	cover: string;
	city: string;
	country: string;
	activityType: string;
	tags: string;
	views: number;
	likes: number;
	datePublished: string;
	eventDateFrom: string;
	eventDateTo: string;
	blocks: StoryBlock[];
	createdAt: string;
	updatedAt: string;
};

const STORAGE_KEY = "heyzenex-mystory-drafts";

const blockOptions: { type: BlockType; label: string; icon: typeof Text }[] = [
	{ type: "paragraph", label: "Paragraph", icon: Text },
	{ type: "quote", label: "Quote", icon: Quote },
	{ type: "image", label: "Photo", icon: ImagePlus },
	{ type: "gallery", label: "Gallery", icon: Layers3 },
	{ type: "section", label: "Section title", icon: Type },
];

const createBlock = (
	type: BlockType,
	id = crypto.randomUUID(),
): StoryBlock => ({
	id,
	type,
	text: type === "paragraph" ? "Write your story here..." : "",
	imageUrl: "",
	imageAlt: "",
	gallery: [
		{ url: "", alt: "" },
		{ url: "", alt: "" },
	],
});

const createDraft = (
	id = crypto.randomUUID(),
	blockId = crypto.randomUUID(),
): StoryDraft => ({
	id,
	title: "A Weekend Along the Velo Dunajec",
	slug: "a-weekend-along-the-velo-dunajec",
	description:
		"A sample ride through the mountains, lakes, and forest roads of southern Poland.",
	cover: photoMockStatic[0].photoUrl,
	city: "Zakopane",
	country: "Poland",
	activityType: "bikepacking",
	tags: "bikepacking, adventure, Poland",
	views: 100,
	likes: 10,
	datePublished: "",
	eventDateFrom: "",
	eventDateTo: "",
	blocks: [
		{
			...createBlock("paragraph", blockId),
			text: "A long weekend on the bike, following quiet paths through the mountains and finding a new reason to keep riding each day.",
		},
	],
	createdAt: "",
	updatedAt: "",
});

const toSlug = (value: string) =>
	value
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-|-$/g, "");

const toLocalDateTimeInput = (date: Date) => {
	const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
	return localDate.toISOString().slice(0, 16);
};

const toDatePublished = (value: string) =>
	value ? new Date(value).toString() : "";

const parseTags = (value: string) =>
	value
		.split(",")
		.map((tag) => tag.trim())
		.filter(Boolean);

const toStoryContent = (
	blocks: StoryBlock[],
	metadata: Pick<
		StoryDraft,
		"city" | "country" | "activityType" | "eventDateFrom"
	>,
): StoryContentType[] =>
	blocks.flatMap((block) => {
		let sectionID: string;
		let photoUrls: PhotoCardDetailType[] = [];

		switch (block.type) {
			case "paragraph":
				sectionID = "layout2";
				break;
			case "quote":
				sectionID = "layout1";
				break;
			case "image":
				sectionID = "layout5";
				if (block.imageUrl.trim()) {
					photoUrls = [
						{
							id: block.id,
							photoUrl: block.imageUrl,
							description: block.imageAlt || "Story photo",
							city: metadata.city,
							country: metadata.country,
							activityType: metadata.activityType,
							activityDate: metadata.eventDateFrom,
						},
					];
				}
				break;
			case "gallery":
				sectionID = "layout6";
				photoUrls = block.gallery
					.filter((photo) => photo.url.trim())
					.map((photo, index) => ({
						id: `${block.id}-${index}`,
						photoUrl: photo.url,
						description: photo.alt || "Gallery photo",
						city: metadata.city,
						country: metadata.country,
						activityType: metadata.activityType,
						activityDate: metadata.eventDateFrom,
					}));
				break;
			case "section":
				sectionID = "layout9";
				break;
		}

		if (sectionID === "layout5" || sectionID === "layout6") {
			return photoUrls.length
				? [{ sectionID, textContent: block.text, photoUrls }]
				: [];
		}

		return block.text.trim()
			? [{ sectionID, textContent: block.text, photoUrls }]
			: [];
	});

const toMdx = (draft: StoryDraft) => {
	const metadata = {
		slug: draft.slug || toSlug(draft.title),
		title: draft.title,
		id: 1,
		views: draft.views,
		likes: draft.likes,
		cover: draft.cover,
		description: draft.description,
		datePublished: toDatePublished(draft.datePublished),
		dateModified: draft.updatedAt,
		eventDateTo: draft.eventDateTo,
		eventDateFrom: draft.eventDateFrom,
		tags: parseTags(draft.tags),
		city: draft.city,
		country: draft.country,
		activityType: draft.activityType,
		nextPostSlug: "",
		prevPostSlug: "",
	};

	const blocks = draft.blocks
		.map((block) => {
			switch (block.type) {
				case "paragraph":
					return block.text.trim();
				case "quote":
					return `<Quo\n\ttext={${JSON.stringify(block.text)}}\n\tshouldCenter={true}\n/>`;
				case "image":
					return `<Pho photo={{ photoUrl: ${JSON.stringify(block.imageUrl)}, description: ${JSON.stringify(block.imageAlt)} }} />`;
				case "gallery": {
					const photos = block.gallery
						.filter((photo) => photo.url.trim())
						.map(
							(photo) =>
								`\t{ photoUrl: ${JSON.stringify(photo.url)}, description: ${JSON.stringify(photo.alt)} },`,
						)
						.join("\n");
					return `<PhoCol photo={[\n${photos}\n]} />`;
				}
				case "section":
					return `<Section text=${JSON.stringify(block.text)} />`;
			}
		})
		.filter(Boolean)
		.join("\n\n");

	return `export const metadata = ${JSON.stringify(metadata, null, 2)};\n\n<Center>\n${blocks}\n</Center>\n`;
};

const MystoryPlayground = () => {
	const [draft, setDraft] = useState<StoryDraft>(() =>
		createDraft("initial-draft", "initial-paragraph"),
	);
	const [savedDrafts, setSavedDrafts] = useState<StoryDraft[]>([]);
	const [isHydrated, setIsHydrated] = useState(false);
	const [activeDraftId, setActiveDraftId] = useState<string | null>(null);
	const [draggedBlockId, setDraggedBlockId] = useState<string | null>(null);
	const [dropIndex, setDropIndex] = useState<number | null>(null);
	const [notice, setNotice] = useState("");
	const [outputTab, setOutputTab] = useState<"mdx" | "preview">("mdx");
	const [isSavedStoriesExpanded, setIsSavedStoriesExpanded] = useState(true);
	const [isStoryDetailsOpen, setIsStoryDetailsOpen] = useState(true);
	const [isPublishDialogOpen, setIsPublishDialogOpen] = useState(false);
	const [publishSecret, setPublishSecret] = useState("");
	const [isPublishing, setIsPublishing] = useState(false);

	useEffect(() => {
		try {
			const storedDrafts = localStorage.getItem(STORAGE_KEY);
			if (storedDrafts) {
				const drafts = JSON.parse(storedDrafts) as StoryDraft[];
				setSavedDrafts(
					drafts.map((saved) => ({
						...saved,
						views: saved.views ?? 100,
						likes: saved.likes ?? 10,
						datePublished:
							saved.datePublished ||
							(saved.createdAt
								? toLocalDateTimeInput(new Date(saved.createdAt))
								: toLocalDateTimeInput(new Date(saved.updatedAt))),
					})),
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
	}, []);

	const updateDraft = (updates: Partial<StoryDraft>) =>
		setDraft((current) => ({ ...current, ...updates }));

	const updateBlock = (id: string, updates: Partial<StoryBlock>) =>
		setDraft((current) => ({
			...current,
			blocks: current.blocks.map((block) =>
				block.id === id ? { ...block, ...updates } : block,
			),
		}));

	const addBlock = (type: BlockType, index = draft.blocks.length) => {
		const nextBlocks = [...draft.blocks];
		nextBlocks.splice(index, 0, createBlock(type));
		updateDraft({ blocks: nextBlocks });
		setDropIndex(null);
	};

	const moveBlock = (from: number, to: number) => {
		if (from === to || to < 0 || to >= draft.blocks.length) return;
		const nextBlocks = [...draft.blocks];
		const [movedBlock] = nextBlocks.splice(from, 1);
		nextBlocks.splice(to, 0, movedBlock);
		updateDraft({ blocks: nextBlocks });
	};

	const saveDraft = () => {
		const now = new Date().toISOString();
		const updatedDraft = {
			...draft,
			slug: draft.slug || toSlug(draft.title),
			createdAt: draft.createdAt || now,
			updatedAt: now,
		};
		const nextDrafts = activeDraftId
			? savedDrafts.map((item) =>
					item.id === activeDraftId ? updatedDraft : item,
				)
			: [updatedDraft, ...savedDrafts];
		setDraft(updatedDraft);
		setSavedDrafts(nextDrafts);
		setActiveDraftId(updatedDraft.id);
		localStorage.setItem(STORAGE_KEY, JSON.stringify(nextDrafts));
		setNotice(activeDraftId ? "Draft updated" : "Draft saved");
	};

	const startNewDraft = () => {
		setDraft({
			...createDraft(),
			datePublished: toLocalDateTimeInput(new Date()),
		});
		setActiveDraftId(null);
		setNotice("");
	};

	const loadDraft = (saved: StoryDraft) => {
		setDraft({
			...saved,
			views: saved.views ?? 100,
			likes: saved.likes ?? 10,
			datePublished:
				saved.datePublished ||
				(saved.createdAt
					? toLocalDateTimeInput(new Date(saved.createdAt))
					: toLocalDateTimeInput(new Date(saved.updatedAt))),
		});
		setActiveDraftId(saved.id);
		setNotice("");
	};

	const deleteDraft = (id: string) => {
		const nextDrafts = savedDrafts.filter((item) => item.id !== id);
		setSavedDrafts(nextDrafts);
		localStorage.setItem(STORAGE_KEY, JSON.stringify(nextDrafts));
		if (activeDraftId === id) startNewDraft();
		setNotice("Draft deleted");
	};

	const publishDraft = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (isPublishing) return;

		const slug = draft.slug || toSlug(draft.title);
		if (!slug) {
			setNotice("Add a title before publishing.");
			return;
		}

		setIsPublishing(true);
		setNotice("");
		const now = new Date().toISOString();
		const publishedDraft = {
			...draft,
			slug,
			createdAt: draft.createdAt || now,
			updatedAt: now,
		};

		try {
			const response = await fetch("/api/stories/publish", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"x-publish-secret": publishSecret,
				},
				body: JSON.stringify({
					slug,
					title: publishedDraft.title,
					content: toMdx(publishedDraft),
				}),
			});
			const result = (await response.json().catch(() => ({}))) as {
				error?: string;
				path?: string;
				branch?: string;
			};

			if (!response.ok) {
				throw new Error(result.error || "Could not publish this story.");
			}

			const nextDrafts = activeDraftId
				? savedDrafts.map((saved) =>
						saved.id === activeDraftId ? publishedDraft : saved,
					)
				: [publishedDraft, ...savedDrafts];
			setDraft(publishedDraft);
			setSavedDrafts(nextDrafts);
			setActiveDraftId(publishedDraft.id);
			localStorage.setItem(STORAGE_KEY, JSON.stringify(nextDrafts));
			setNotice(
				`Published ${result.path || `${slug}.mdx`} to ${result.branch || "GitHub"}.`,
			);
			setIsPublishDialogOpen(false);
			setPublishSecret("");
		} catch (error) {
			setNotice(
				error instanceof Error
					? error.message
					: "Could not publish this story.",
			);
		} finally {
			setIsPublishing(false);
		}
	};

	const downloadMdx = () => {
		const file = new Blob([toMdx(draft)], {
			type: "text/markdown;charset=utf-8",
		});
		const url = URL.createObjectURL(file);
		const link = document.createElement("a");
		link.href = url;
		link.download = `${draft.slug || toSlug(draft.title) || "story"}.mdx`;
		link.click();
		URL.revokeObjectURL(url);
		setNotice("MDX file downloaded");
	};

	const handleDrop = (event: DragEvent<HTMLElement>, index: number) => {
		event.preventDefault();
		const paletteType = event.dataTransfer.getData("application/story-block");
		if (paletteType) {
			addBlock(paletteType as BlockType, index);
		} else if (draggedBlockId) {
			const sourceIndex = draft.blocks.findIndex(
				(block) => block.id === draggedBlockId,
			);
			moveBlock(sourceIndex, index);
		}
		setDraggedBlockId(null);
		setDropIndex(null);
	};

	const mdx = toMdx(draft);
	const storyContent = toStoryContent(draft.blocks, draft);
	const storyPhotoUrls = storyContent.flatMap((content) => content.photoUrls);
	const storyCover =
		draft.cover || storyPhotoUrls[0]?.photoUrl || photoMockStatic[0].photoUrl;

	return (
		<main className="mx-auto w-full max-w-[1600px] pb-12 text-primaryText">
			<header className="mb-7 flex flex-col gap-4 border-b border-primarybrown/20 pb-6 md:flex-row md:items-stretch">
				<Heading
					title="Story builder"
					description="Arrange story blocks, save drafts in this browser, and export a ready-to-edit MDX file."
				/>
				<div className="flex flex-wrap items-center gap-2 md:justify-end">
					{notice && (
						<span
							aria-live="polite"
							className="mr-2 text-sm text-primaryfreshgreen">
							{notice}
						</span>
					)}
					<button
						type="button"
						onClick={startNewDraft}
						className="inline-flex h-10 items-center gap-2 rounded-md border border-primarybrown/30 px-3 text-sm font-semibold hover:bg-primarywhite">
						<Plus size={16} /> New
					</button>
					<button
						type="button"
						onClick={saveDraft}
						className="inline-flex h-10 items-center gap-2 rounded-md bg-secondaryforestgreen px-4 text-sm font-semibold text-white hover:bg-navbar">
						<Check size={16} /> Save draft
					</button>
					<button
						type="button"
						onClick={downloadMdx}
						className="inline-flex h-10 items-center gap-2 rounded-md bg-fierceorange px-4 text-sm font-semibold text-white hover:brightness-95">
						<ArrowDownToLine size={16} /> Export MDX
					</button>
					<button
						type="button"
						onClick={() => setIsPublishDialogOpen(true)}
						className="inline-flex h-10 items-center gap-2 rounded-md bg-primaryaccent px-4 text-sm font-semibold text-white hover:brightness-95">
						<CloudUpload size={16} /> Publish
					</button>
				</div>
			</header>

			<div
				className={`grid items-start gap-5 ${isSavedStoriesExpanded ? "xl:grid-cols-[230px_minmax(400px,1fr)_minmax(360px,0.9fr)]" : "xl:grid-cols-[56px_minmax(400px,1fr)_minmax(360px,0.9fr)]"}`}>
				<aside
					id="saved-stories-panel"
					className={`rounded-lg border border-primarybrown/20 bg-primarywhite ${isSavedStoriesExpanded ? "p-4" : "flex flex-row items-center gap-3 p-2 xl:flex-col"}`}>
					<div
						className={`flex items-center ${isSavedStoriesExpanded ? "mb-4 justify-between" : "flex-col gap-3"}`}>
						<h2 className="w-full text-sm font-bold">
							<button
								type="button"
								aria-expanded={isSavedStoriesExpanded}
								aria-controls="saved-stories-content"
								aria-label={`${isSavedStoriesExpanded ? "Collapse" : "Expand"} saved stories panel`}
								title={`${isSavedStoriesExpanded ? "Collapse" : "Expand"} saved stories`}
								onClick={() =>
									setIsSavedStoriesExpanded((expanded) => !expanded)
								}
								className="flex min-h-7 w-full items-center gap-2 text-left">
								<span className={isSavedStoriesExpanded ? "" : "sr-only"}>
									Saved stories
								</span>
								<span className="rounded bg-secondarywhite px-2 py-1 text-xs font-normal text-primarygrey">
									{savedDrafts.length}
								</span>
								{isSavedStoriesExpanded ? (
									<PanelLeftClose size={16} className="ml-auto shrink-0" />
								) : (
									<PanelLeftOpen size={16} className="ml-auto shrink-0" />
								)}
							</button>
						</h2>
					</div>
					<div
						id="saved-stories-content"
						className={isSavedStoriesExpanded ? "mt-4" : "hidden"}>
						{!isHydrated ? (
							<p className="text-sm text-primarygrey">Loading drafts...</p>
						) : savedDrafts.length === 0 ? (
							<p className="border-t border-primarybrown/15 py-4 text-sm leading-5 text-primarygrey">
								Your saved drafts will appear here.
							</p>
						) : (
							<ul className="flex flex-col gap-1">
								{savedDrafts.map((saved) => (
									<li
										key={saved.id}
										className={`group flex items-start gap-1 rounded-md border p-2 ${activeDraftId === saved.id ? "border-secondaryforestgreen/50 bg-secondaryforestgreen/5" : "border-transparent hover:bg-secondarywhite"}`}>
										<button
											type="button"
											onClick={() => loadDraft(saved)}
											className="min-w-0 flex-1 text-left">
											<span className="block truncate text-sm font-semibold">
												{saved.title || "Untitled story"}
											</span>
											<span className="mt-1 block text-xs text-primarygrey">
												{new Date(saved.updatedAt).toLocaleDateString()}
											</span>
										</button>
										<button
											type="button"
											onClick={() => deleteDraft(saved.id)}
											aria-label={`Delete ${saved.title}`}
											title="Delete draft"
											className="rounded p-1 text-primarygrey opacity-100 hover:bg-primaryred/10 hover:text-primaryred sm:opacity-0 sm:group-hover:opacity-100">
											<Trash2 size={15} />
										</button>
									</li>
								))}
							</ul>
						)}
					</div>
				</aside>

				<section className="min-w-0 space-y-5">
					<div className="rounded-lg border border-primarybrown/20 bg-primarywhite p-4 sm:p-5">
						<div className="mb-4 flex items-center justify-between border-b border-primarybrown/15 pb-3">
							<h2 className="font-bold">
								<button
									type="button"
									aria-expanded={isStoryDetailsOpen}
									aria-controls="story-details-fields"
									aria-label={`${isStoryDetailsOpen ? "Collapse" : "Expand"} story details`}
									onClick={() => setIsStoryDetailsOpen((open) => !open)}
									className="flex min-h-8 items-center gap-2 text-left">
									<span>Story details</span>
									<ChevronDown
										size={16}
										className={`transition-transform ${isStoryDetailsOpen ? "rotate-180" : ""}`}
									/>
								</button>
							</h2>
							<span className="text-xs text-primarygrey">METADATA</span>
						</div>
						<div
							id="story-details-fields"
							className={`${isStoryDetailsOpen ? "grid" : "hidden"} gap-3 sm:grid-cols-2`}>
							<label className="sm:col-span-2">
								<span className="mb-1 block text-xs font-semibold text-primarygrey">
									Title
								</span>
								<input
									value={draft.title}
									onChange={(event) =>
										updateDraft({
											title: event.target.value,
											slug: toSlug(event.target.value),
										})
									}
									className="w-full rounded-md border border-primarybrown/25 bg-transparent px-3 py-2 text-sm outline-none focus:border-secondaryforestgreen"
									placeholder="A story title"
								/>
							</label>
							<label className="sm:col-span-2">
								<span className="mb-1 block text-xs font-semibold text-primarygrey">
									Slug
								</span>
								<input
									value={draft.slug}
									onChange={(event) =>
										updateDraft({ slug: toSlug(event.target.value) })
									}
									className="w-full rounded-md border border-primarybrown/25 bg-transparent px-3 py-2 text-sm outline-none focus:border-secondaryforestgreen"
									placeholder="story-slug"
								/>
							</label>
							<label className="sm:col-span-2">
								<span className="mb-1 block text-xs font-semibold text-primarygrey">
									Description
								</span>
								<textarea
									value={draft.description}
									onChange={(event) =>
										updateDraft({ description: event.target.value })
									}
									rows={2}
									maxLength={160}
									className="w-full resize-y rounded-md border border-primarybrown/25 bg-transparent px-3 py-2 text-sm outline-none focus:border-secondaryforestgreen"
									placeholder="A short story summary"
								/>
								<span className="mt-1 block text-right text-xs text-primarygrey">
									{draft.description.length}/160
								</span>
							</label>
							<label className="sm:col-span-2">
								<span className="mb-1 block text-xs font-semibold text-primarygrey">
									Cover image URL
								</span>
								<input
									value={draft.cover}
									onChange={(event) =>
										updateDraft({ cover: event.target.value })
									}
									className="w-full rounded-md border border-primarybrown/25 bg-transparent px-3 py-2 text-sm outline-none focus:border-secondaryforestgreen"
									placeholder="https://..."
								/>
							</label>
							<label>
								<span className="mb-1 block text-xs font-semibold text-primarygrey">
									City
								</span>
								<input
									value={draft.city}
									onChange={(event) =>
										updateDraft({ city: event.target.value })
									}
									className="w-full rounded-md border border-primarybrown/25 bg-transparent px-3 py-2 text-sm outline-none focus:border-secondaryforestgreen"
									placeholder="Wroclaw"
								/>
							</label>
							<label>
								<span className="mb-1 block text-xs font-semibold text-primarygrey">
									Country
								</span>
								<input
									value={draft.country}
									onChange={(event) =>
										updateDraft({ country: event.target.value })
									}
									className="w-full rounded-md border border-primarybrown/25 bg-transparent px-3 py-2 text-sm outline-none focus:border-secondaryforestgreen"
									placeholder="Poland"
								/>
							</label>
							<label>
								<span className="mb-1 block text-xs font-semibold text-primarygrey">
									Date published
								</span>
								<input
									type="datetime-local"
									value={draft.datePublished}
									onChange={(event) =>
										updateDraft({ datePublished: event.target.value })
									}
									className="w-full rounded-md border border-primarybrown/25 bg-transparent px-3 py-2 text-sm outline-none focus:border-secondaryforestgreen"
								/>
							</label>
							<label>
								<span className="mb-1 block text-xs font-semibold text-primarygrey">
									Event start
								</span>
								<input
									type="date"
									value={draft.eventDateFrom}
									onChange={(event) =>
										updateDraft({ eventDateFrom: event.target.value })
									}
									className="w-full rounded-md border border-primarybrown/25 bg-transparent px-3 py-2 text-sm outline-none focus:border-secondaryforestgreen"
								/>
							</label>
							<label>
								<span className="mb-1 block text-xs font-semibold text-primarygrey">
									Event end
								</span>
								<input
									type="date"
									value={draft.eventDateTo}
									onChange={(event) =>
										updateDraft({ eventDateTo: event.target.value })
									}
									className="w-full rounded-md border border-primarybrown/25 bg-transparent px-3 py-2 text-sm outline-none focus:border-secondaryforestgreen"
								/>
							</label>
							<label>
								<span className="mb-1 block text-xs font-semibold text-primarygrey">
									Activity
								</span>
								<select
									value={draft.activityType}
									onChange={(event) =>
										updateDraft({ activityType: event.target.value })
									}
									className="w-full rounded-md border border-primarybrown/25 bg-mybackground px-3 py-2 text-sm outline-none focus:border-secondaryforestgreen">
									{[
										"bikepacking",
										"cycling",
										"hiking",
										"travel",
										"photography",
										"other",
									].map((activity) => (
										<option key={activity} value={activity}>
											{activity}
										</option>
									))}
								</select>
							</label>
							<label>
								<span className="mb-1 block text-xs font-semibold text-primarygrey">
									Tags
								</span>
								<input
									value={draft.tags}
									onChange={(event) =>
										updateDraft({ tags: event.target.value })
									}
									className="w-full rounded-md border border-primarybrown/25 bg-transparent px-3 py-2 text-sm outline-none focus:border-secondaryforestgreen"
									placeholder="solo, nature"
								/>
							</label>
							<label>
								<span className="mb-1 block text-xs font-semibold text-primarygrey">
									Views
								</span>
								<input
									type="number"
									min={0}
									value={draft.views}
									onChange={(event) =>
										updateDraft({ views: Number(event.target.value) })
									}
									className="w-full rounded-md border border-primarybrown/25 bg-transparent px-3 py-2 text-sm outline-none focus:border-secondaryforestgreen"
								/>
							</label>
							<label>
								<span className="mb-1 block text-xs font-semibold text-primarygrey">
									Likes
								</span>
								<input
									type="number"
									min={0}
									value={draft.likes}
									onChange={(event) =>
										updateDraft({ likes: Number(event.target.value) })
									}
									className="w-full rounded-md border border-primarybrown/25 bg-transparent px-3 py-2 text-sm outline-none focus:border-secondaryforestgreen"
								/>
							</label>
						</div>
					</div>

					<div className="rounded-lg border border-primarybrown/20 bg-primarywhite p-4 sm:p-5">
						<div className="mb-4 flex items-center justify-between">
							<div>
								<h2 className="font-bold">Story content</h2>
								<p className="mt-1 text-xs text-primarygrey">
									Drag a block into the canvas, or drag blocks to reorder.
								</p>
							</div>
							<span className="text-xs text-primarygrey">
								{draft.blocks.length} BLOCKS
							</span>
						</div>
						<div className="mb-4 flex flex-wrap gap-2">
							{blockOptions.map(({ type, label, icon: Icon }) => (
								<button
									key={type}
									type="button"
									draggable
									onDragStart={(event) =>
										event.dataTransfer.setData("application/story-block", type)
									}
									onClick={() => addBlock(type)}
									className="inline-flex h-9 items-center gap-2 rounded-md border border-primarybrown/25 px-2.5 text-xs font-semibold hover:border-secondaryforestgreen hover:bg-secondaryforestgreen/5"
									title={`Drag or click to add ${label}`}>
									<Icon size={15} /> {label}
								</button>
							))}
						</div>
						<div
							onDragOver={(event) => {
								event.preventDefault();
								setDropIndex(draft.blocks.length);
							}}
							onDrop={(event) => handleDrop(event, draft.blocks.length)}
							className={`space-y-3 rounded-md border border-dashed p-3 transition-colors ${dropIndex === draft.blocks.length ? "border-secondaryforestgreen bg-secondaryforestgreen/5" : "border-primarybrown/25"}`}>
							{draft.blocks.length === 0 && (
								<p className="py-8 text-center text-sm text-primarygrey">
									Drop a block here to start writing.
								</p>
							)}
							{draft.blocks.map((block, index) => {
								const blockOption = blockOptions.find(
									(option) => option.type === block.type,
								)!;
								const BlockIcon = blockOption.icon;
								return (
									<div
										key={block.id}
										draggable
										onDragStart={(event) => {
											setDraggedBlockId(block.id);
											event.dataTransfer.setData(
												"application/story-block-id",
												block.id,
											);
											event.dataTransfer.effectAllowed = "move";
										}}
										onDragEnd={() => {
											setDraggedBlockId(null);
											setDropIndex(null);
										}}
										onDragOver={(event) => {
											event.preventDefault();
											setDropIndex(index);
										}}
										onDrop={(event) => handleDrop(event, index)}
										className={`rounded-md border bg-mybackground p-3 ${dropIndex === index ? "border-secondaryforestgreen" : "border-primarybrown/15"}`}>
										<div className="mb-3 flex items-center justify-between">
											<div className="flex items-center gap-2 text-sm font-bold">
												<GripVertical
													size={16}
													className="cursor-grab text-primarygrey"
												/>
												<BlockIcon size={15} />
												{blockOption.label}
											</div>
											<div className="flex items-center gap-1">
												<button
													type="button"
													onClick={() => moveBlock(index, index - 1)}
													disabled={index === 0}
													aria-label="Move block up"
													className="rounded p-1.5 hover:bg-primarybrown/10 disabled:opacity-30">
													<ArrowUp size={15} />
												</button>
												<button
													type="button"
													onClick={() => moveBlock(index, index + 1)}
													disabled={index === draft.blocks.length - 1}
													aria-label="Move block down"
													className="rounded p-1.5 hover:bg-primarybrown/10 disabled:opacity-30">
													<ArrowDown size={15} />
												</button>
												<button
													type="button"
													onClick={() =>
														updateDraft({
															blocks: draft.blocks.filter(
																(item) => item.id !== block.id,
															),
														})
													}
													aria-label={`Remove ${blockOption.label}`}
													className="rounded p-1.5 text-primaryred hover:bg-primaryred/10">
													<X size={15} />
												</button>
											</div>
										</div>
										{block.type === "paragraph" && (
											<textarea
												value={block.text}
												onChange={(event) =>
													updateBlock(block.id, { text: event.target.value })
												}
												rows={5}
												className="w-full resize-y rounded border border-primarybrown/20 bg-primarywhite px-3 py-2 text-sm leading-6 outline-none focus:border-secondaryforestgreen"
												placeholder="Write in Markdown. Use a blank line to start a new paragraph."
											/>
										)}
										{block.type === "quote" && (
											<textarea
												value={block.text}
												onChange={(event) =>
													updateBlock(block.id, { text: event.target.value })
												}
												rows={3}
												className="w-full resize-y rounded border border-primarybrown/20 bg-primarywhite px-3 py-2 text-sm leading-6 outline-none focus:border-secondaryforestgreen"
												placeholder="A memorable line from the story"
											/>
										)}
										{block.type === "section" && (
											<input
												value={block.text}
												onChange={(event) =>
													updateBlock(block.id, { text: event.target.value })
												}
												className="w-full rounded border border-primarybrown/20 bg-primarywhite px-3 py-2 text-sm outline-none focus:border-secondaryforestgreen"
												placeholder="Section title"
											/>
										)}
										{block.type === "image" && (
											<div className="grid gap-2">
												<input
													value={block.imageUrl}
													onChange={(event) =>
														updateBlock(block.id, {
															imageUrl: event.target.value,
														})
													}
													className="w-full rounded border border-primarybrown/20 bg-primarywhite px-3 py-2 text-sm outline-none focus:border-secondaryforestgreen"
													placeholder="Photo URL"
												/>
												<input
													value={block.imageAlt}
													onChange={(event) =>
														updateBlock(block.id, {
															imageAlt: event.target.value,
														})
													}
													className="w-full rounded border border-primarybrown/20 bg-primarywhite px-3 py-2 text-sm outline-none focus:border-secondaryforestgreen"
													placeholder="Photo description"
												/>
											</div>
										)}
										{block.type === "gallery" && (
											<div className="space-y-2">
												{block.gallery.map((photo, photoIndex) => (
													<div
														key={`${block.id}-${photoIndex}`}
														className="grid gap-2 sm:grid-cols-2">
														<input
															value={photo.url}
															onChange={(event) => {
																const gallery = [...block.gallery];
																gallery[photoIndex] = {
																	...photo,
																	url: event.target.value,
																};
																updateBlock(block.id, { gallery });
															}}
															className="min-w-0 rounded border border-primarybrown/20 bg-primarywhite px-3 py-2 text-sm outline-none focus:border-secondaryforestgreen"
															placeholder={`Photo ${photoIndex + 1} URL`}
														/>
														<div className="flex gap-2">
															<input
																value={photo.alt}
																onChange={(event) => {
																	const gallery = [...block.gallery];
																	gallery[photoIndex] = {
																		...photo,
																		alt: event.target.value,
																	};
																	updateBlock(block.id, { gallery });
																}}
																className="min-w-0 flex-1 rounded border border-primarybrown/20 bg-primarywhite px-3 py-2 text-sm outline-none focus:border-secondaryforestgreen"
																placeholder="Description"
															/>
															<button
																type="button"
																onClick={() =>
																	updateBlock(block.id, {
																		gallery: block.gallery.filter(
																			(_, itemIndex) =>
																				itemIndex !== photoIndex,
																		),
																	})
																}
																aria-label="Remove gallery photo"
																className="rounded p-2 text-primaryred hover:bg-primaryred/10">
																<X size={15} />
															</button>
														</div>
													</div>
												))}
												<button
													type="button"
													onClick={() =>
														updateBlock(block.id, {
															gallery: [...block.gallery, { url: "", alt: "" }],
														})
													}
													className="inline-flex items-center gap-1 text-xs font-semibold text-secondaryforestgreen">
													<Plus size={14} /> Add photo
												</button>
											</div>
										)}
									</div>
								);
							})}
							<div
								onDragOver={(event) => {
									event.preventDefault();
									setDropIndex(draft.blocks.length);
								}}
								onDrop={(event) => handleDrop(event, draft.blocks.length)}
								className={`flex min-h-12 items-center justify-center gap-2 rounded border border-dashed text-xs text-primarygrey ${dropIndex === draft.blocks.length ? "border-secondaryforestgreen bg-secondaryforestgreen/5" : "border-transparent"}`}>
								<Plus size={14} /> Drop next block here
							</div>
						</div>
					</div>
				</section>

				<section className="min-w-0 xl:sticky xl:top-5">
					<div
						className={`overflow-hidden rounded-lg border border-primarybrown/25 ${outputTab === "mdx" ? "bg-[#202522] text-[#e8eee8]" : "bg-primarywhite text-primaryText"}`}>
						<div className="flex items-center justify-between gap-3 border-b border-primarybrown/15 px-3 py-2">
							<div
								role="tablist"
								aria-label="Output view"
								className="flex items-center gap-1">
								<button
									type="button"
									role="tab"
									aria-selected={outputTab === "mdx"}
									onClick={() => setOutputTab("mdx")}
									className={`inline-flex h-9 items-center gap-2 rounded-md px-3 text-sm font-semibold ${outputTab === "mdx" ? "bg-primarywhite/10 text-inherit" : "text-primarygrey hover:bg-primarybrown/10"}`}>
									<Code2 size={15} /> MDX
								</button>
								<button
									type="button"
									role="tab"
									aria-selected={outputTab === "preview"}
									onClick={() => setOutputTab("preview")}
									className={`inline-flex h-9 items-center gap-2 rounded-md px-3 text-sm font-semibold ${outputTab === "preview" ? "bg-secondaryforestgreen text-white" : "text-primarygrey hover:bg-primarybrown/10"}`}>
									<Eye size={15} /> Preview
								</button>
							</div>
							<span className="text-xs text-white/50">
								{draft.slug || "story"}.mdx
							</span>
						</div>
						{outputTab === "mdx" ? (
							<pre
								role="tabpanel"
								className="max-h-[70vh] min-h-[340px] overflow-auto p-4 text-xs leading-5 sm:text-[13px]">
								<code>{mdx}</code>
							</pre>
						) : (
							<div
								role="tabpanel"
								className="max-h-[70vh] min-h-[340px] overflow-auto bg-mybackground p-4 text-primaryText">
								<MainStoryBookPage
									createdAt={
										draft.datePublished
											? new Date(draft.datePublished).toLocaleDateString(
													"en-GB",
												)
											: ""
									}
									storyCover={storyCover}
									storyId="2"
									storyTitle={draft.title}
									storyDescription={draft.description}
									storyTags={parseTags(draft.tags)}
									storyPhotoUrls={storyPhotoUrls}
									storyContent={storyContent}
									totalView={draft.views}
									totalLike={draft.likes}
								/>
							</div>
						)}
						<div className="flex items-center justify-between border-t border-primarybrown/15 px-4 py-3 text-xs text-primarygrey">
							<span>
								{outputTab === "mdx"
									? "Generated MDX source"
									: "Live story preview"}
							</span>
							<button
								type="button"
								onClick={downloadMdx}
								className={`inline-flex items-center gap-1.5 ${outputTab === "mdx" ? "text-white hover:text-primaryyellow" : "text-primaryText hover:text-secondaryforestgreen"}`}>
								<ArrowDownToLine size={14} /> Download
							</button>
						</div>
					</div>
				</section>
			</div>
			<Dialog
				open={isPublishDialogOpen}
				onOpenChange={(open) => {
					setIsPublishDialogOpen(open);
					if (!open) setPublishSecret("");
				}}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Publish story to GitHub</DialogTitle>
						<DialogDescription>
							This creates or updates{" "}
							<span className="font-medium text-primaryText">
								{draft.slug || toSlug(draft.title) || "story"}.mdx
							</span>{" "}
							on the configured branch. Enter the publisher key to authorize
							this commit.
						</DialogDescription>
					</DialogHeader>
					<form onSubmit={publishDraft} className="space-y-4">
						<label className="block">
							<span className="mb-1 block text-sm font-medium">
								Publisher key
							</span>
							<input
								type="password"
								value={publishSecret}
								autoComplete="off"
								required
								onChange={(event) => setPublishSecret(event.target.value)}
								className="w-full rounded-md border border-primarybrown/25 bg-transparent px-3 py-2 text-sm outline-none focus:border-secondaryforestgreen"
								placeholder="Enter publisher key"
							/>
						</label>
						<DialogFooter>
							<DialogClose asChild>
								<button
									type="button"
									disabled={isPublishing}
									className="inline-flex h-10 items-center justify-center rounded-md border border-primarybrown/30 px-4 text-sm font-semibold">
									Cancel
								</button>
							</DialogClose>
							<button
								type="submit"
								disabled={isPublishing || !publishSecret.trim()}
								className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primaryaccent px-4 text-sm font-semibold text-white disabled:opacity-60">
								{isPublishing ? "Publishing..." : "Publish commit"}
							</button>
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>
		</main>
	);
};

export default MystoryPlayground;
