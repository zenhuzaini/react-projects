"use client";

import { useState } from "react";
import { toast } from "@/components/ui/toast";
import { MAX_IMAGE_UPLOAD_SIZE, type ImageQuality } from "./cloudinaryUpload";

type PendingUpload = {
	file: File;
	imageQuality: ImageQuality;
	onUploaded: (url: string) => void;
};

type Options = {
	// The publisher key typed by the user; empty until they enter it.
	secret: string;
	// Called when a file was picked but no key is known yet, so the page can ask for it.
	onNeedKey: () => void;
	// Called after a successful upload, e.g. to close the key dialog.
	onFinished?: () => void;
};

// Uploads images to Cloudinary through /api/images/upload and reports the final URL.
export function useCloudinaryUpload({
	secret,
	onNeedKey,
	onFinished,
}: Options) {
	const [pending, setPending] = useState<PendingUpload | null>(null);
	const [isUploading, setIsUploading] = useState(false);

	const run = async (
		file: File,
		imageQuality: ImageQuality,
		onUploaded: (url: string) => void,
		publisherKey: string,
	) => {
		setIsUploading(true);
		const task = (async () => {
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

				onUploaded(result.url);
				setPending(null);
				onFinished?.();
				return file.name;
			} finally {
				setIsUploading(false);
			}
		})();

		return toast
			.promise(task, {
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

	const upload = (
		file: File | undefined,
		imageQuality: ImageQuality,
		onUploaded: (url: string) => void,
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
			void run(file, imageQuality, onUploaded, secret);
			return;
		}

		setPending({ file, imageQuality, onUploaded });
		onNeedKey();
	};

	const confirmPending = async () => {
		if (!pending) return;
		await run(pending.file, pending.imageQuality, pending.onUploaded, secret);
	};

	const cancelPending = () => setPending(null);

	return { pending, isUploading, upload, confirmPending, cancelPending };
}

export type CloudinaryUploader = ReturnType<typeof useCloudinaryUpload>;
