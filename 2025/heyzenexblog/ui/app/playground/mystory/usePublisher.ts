"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { toast } from "@/components/ui/toast";
import { MAX_IMAGE_UPLOAD_SIZE } from "./constants";
import { toSlug } from "./draft";
import { toMdx } from "./serialize";
import type { DraftManager } from "./useDraftManager";
import type {
	ImageQuality,
	ImageUploadTarget,
	PendingImageUpload,
} from "./types";

// Handles Cloudinary uploads and GitHub publishing, both of which need the publisher key.
export function usePublisher(manager: DraftManager) {
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
	const [pendingImageUpload, setPendingImageUpload] =
		useState<PendingImageUpload | null>(null);
	const [isPublishing, setIsPublishing] = useState(false);

	const uploadImage = async (
		file: File,
		target: ImageUploadTarget,
		publisherKey: string,
		imageQuality: ImageQuality,
	) => {
		setIsPublishing(true);
		const uploadTask = (async () => {
			try {
				const formData = new FormData();
				formData.set("file", file);
				formData.set("quality", imageQuality);
				const response = await fetch("/api/images/upload", {
					method: "POST",
					headers: { "x-publish-secret": publisherKey },
					body: formData,
				});
				const result = (await response.json().catch(() => ({}))) as {
					error?: string;
					url?: string;
				};
				if (!response.ok || !result.url) {
					throw new Error(result.error || "Could not upload this image.");
				}

				setDraft((current) => {
					if (target.kind === "cover") {
						return { ...current, cover: result.url! };
					}

					return {
						...current,
						blocks: current.blocks.map((block) => {
							if (block.id !== target.blockId) return block;
							if (target.galleryIndex === undefined) {
								return { ...block, imageUrl: result.url! };
							}
							return {
								...block,
								gallery: block.gallery.map((photo, index) =>
									index === target.galleryIndex
										? { ...photo, url: result.url! }
										: photo,
								),
							};
						}),
					};
				});
				setPendingImageUpload(null);
				setIsDialogOpen(false);
				return file.name;
			} finally {
				setIsPublishing(false);
			}
		})();

		return toast
			.promise(uploadTask, {
				loading: {
					title: "Uploading image",
					description: `Uploading ${file.name} to Cloudinary…`,
					type: "loading",
					timeout: 0,
				},
				success: (fileName) => ({
					title: "Upload complete",
					description: `${fileName} uploaded. Its URL was added to the draft.`,
					type: "success",
				}),
				error: (error) => ({
					title: "Upload failed",
					description:
						error instanceof Error
							? error.message
							: "Could not upload this image.",
					type: "error",
					priority: "high",
				}),
			})
			.catch(() => undefined);
	};

	const handleImageUpload = (
		file: File | undefined,
		target: ImageUploadTarget,
	) => {
		if (!file) return;
		if (!file.type.startsWith("image/")) {
			toast.add({
				title: "Unsupported file",
				description: "Choose an image file to upload.",
				type: "error",
				priority: "high",
			});
			return;
		}
		if (file.size > MAX_IMAGE_UPLOAD_SIZE) {
			toast.add({
				title: "Image too large",
				description: "Images must be 10 MB or smaller.",
				type: "error",
				priority: "high",
			});
			return;
		}

		if (secret) {
			void uploadImage(file, target, secret, draft.imageQuality);
			return;
		}

		setPendingImageUpload({
			...target,
			file,
			imageQuality: draft.imageQuality,
		});
		setIsDialogOpen(true);
	};

	const openPublishDialog = () => {
		setPendingImageUpload(null);
		setIsDialogOpen(true);
	};

	const cancel = () => {
		setSecret("");
		setPendingImageUpload(null);
	};

	const publishDraft = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (isPublishing) return;
		if (pendingImageUpload) {
			await uploadImage(
				pendingImageUpload.file,
				pendingImageUpload,
				secret,
				pendingImageUpload.imageQuality,
			);
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
			persist(nextDrafts);
			setNotice(
				`Published ${result.path || `${slug}.mdx`} to ${result.branch || "GitHub"}.`,
			);
			setIsDialogOpen(false);
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

	return {
		isDialogOpen,
		setIsDialogOpen,
		secret,
		setSecret,
		pendingImageUpload,
		isPublishing,
		handleImageUpload,
		openPublishDialog,
		cancel,
		publishDraft,
	};
}

export type Publisher = ReturnType<typeof usePublisher>;
