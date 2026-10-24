"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useCloudinaryUpload } from "../shared/useCloudinaryUpload";
import type { BuilderConfig } from "./config";
import { toSlug } from "./draft";
import { toMdx } from "./serialize";
import type { DraftManager } from "./useDraftManager";
import type { ImageUploadTarget } from "./types";

// Handles Cloudinary uploads and GitHub publishing, both of which need the publisher key.
export function usePublisher(manager: DraftManager, config: BuilderConfig) {
	const {
		draft,
		setDraft,
		savedDrafts,
		setSavedDrafts,
		activeDraftId,
		setActiveDraftId,
		setNotice,
		persist,
	} = manager;
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [secret, setSecret] = useState("");
	const [isPublishing, setIsPublishing] = useState(false);
	const uploader = useCloudinaryUpload({
		secret,
		onNeedKey: () => setIsDialogOpen(true),
		onFinished: () => setIsDialogOpen(false),
	});

	// Writes an uploaded image URL into the cover or the targeted block.
	const applyUploadedUrl = (target: ImageUploadTarget, url: string) =>
		setDraft((current) => {
			if (target.kind === "cover") return { ...current, cover: url };

			return {
				...current,
				blocks: current.blocks.map((block) => {
					if (block.id !== target.blockId) return block;
					if (target.galleryIndex === undefined) {
						return { ...block, imageUrl: url };
					}
					return {
						...block,
						gallery: block.gallery.map((photo, index) =>
							index === target.galleryIndex ? { ...photo, url } : photo,
						),
					};
				}),
			};
		});

	const handleImageUpload = (
		file: File | undefined,
		target: ImageUploadTarget,
	) =>
		uploader.upload(file, draft.imageQuality, (url) =>
			applyUploadedUrl(target, url),
		);

	const openPublishDialog = () => {
		uploader.cancelPending();
		setIsDialogOpen(true);
	};

	const cancel = () => {
		setSecret("");
		uploader.cancelPending();
	};

	const publishDraft = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (isPublishing || uploader.isUploading) return;
		if (uploader.pending) {
			await uploader.confirmPending();
			return;
		}

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
					"x-publish-secret": secret,
				},
				body: JSON.stringify({
					collection: config.collection,
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
				throw new Error(
					result.error || `Could not publish this ${config.noun}.`,
				);
			}

			const nextDrafts = activeDraftId
				? savedDrafts.map((saved) =>
						saved.id === activeDraftId ? publishedDraft : saved,
					)
				: [publishedDraft, ...savedDrafts];
			setDraft(publishedDraft);
			setSavedDrafts(nextDrafts);
			setActiveDraftId(publishedDraft.id);
			persist(nextDrafts);
			setNotice(
				`Published ${result.path || `${slug}.mdx`} to ${result.branch || "GitHub"}.`,
			);
			setIsDialogOpen(false);
		} catch (error) {
			setNotice(
				error instanceof Error
					? error.message
					: `Could not publish this ${config.noun}.`,
			);
		} finally {
			setIsPublishing(false);
		}
	};

	return {
		isDialogOpen,
		setIsDialogOpen,
		secret,
		setSecret,
		pendingImageUpload: uploader.pending,
		isPublishing: isPublishing || uploader.isUploading,
		handleImageUpload,
		openPublishDialog,
		cancel,
		publishDraft,
	};
}

export type Publisher = ReturnType<typeof usePublisher>;
