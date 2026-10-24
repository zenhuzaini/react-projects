"use client";

import { LoaderCircle } from "lucide-react";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { toSlug } from "./draft";
import type { StoryDraft } from "./types";
import type { Publisher } from "./usePublisher";

const SubmitLabel = ({
	isPublishing,
	isUpload,
}: {
	isPublishing: boolean;
	isUpload: boolean;
}) => {
	if (!isPublishing) return <>{isUpload ? "Upload image" : "Publish commit"}</>;
	if (!isUpload) return <>Publishing...</>;
	return (
		<>
			<LoaderCircle size={16} className="animate-spin" /> Uploading...
		</>
	);
};

const PublishDialog = ({
	publisher,
	draft,
}: {
	publisher: Publisher;
	draft: StoryDraft;
}) => {
	const {
		isDialogOpen,
		setIsDialogOpen,
		secret,
		setSecret,
		pendingImageUpload,
		isPublishing,
		cancel,
		publishDraft,
	} = publisher;
	const isUpload = pendingImageUpload !== null;

	return (
		<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						{isUpload
							? "Authorize Cloudinary upload"
							: "Publish story to GitHub"}
					</DialogTitle>
					<DialogDescription>
						{pendingImageUpload ? (
							<>
								Upload{" "}
								<span className="font-medium text-primaryText">
									{pendingImageUpload.file.name}
								</span>{" "}
								securely to Cloudinary. The returned image URL will be added to
								the story draft.
							</>
						) : (
							<>
								This creates or updates{" "}
								<span className="font-medium text-primaryText">
									{draft.slug || toSlug(draft.title) || "story"}.mdx
								</span>{" "}
								on the configured branch. Enter the publisher key to authorize
								this commit.
							</>
						)}
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={publishDraft} className="space-y-4">
					<label className="block">
						<span className="mb-1 block text-sm font-medium">
							Publisher key
						</span>
						<input
							type="password"
							value={secret}
							autoComplete="off"
							required
							onChange={(event) => setSecret(event.target.value)}
							className="w-full rounded-md border border-primarybrown/25 bg-transparent px-3 py-2 text-sm outline-none focus:border-secondaryforestgreen"
							placeholder="Enter publisher key"
						/>
					</label>
					<DialogFooter>
						<DialogClose asChild>
							<button
								type="button"
								disabled={isPublishing}
								onClick={cancel}
								className="inline-flex h-10 items-center justify-center rounded-md border border-primarybrown/30 px-4 text-sm font-semibold">
								Cancel
							</button>
						</DialogClose>
						<button
							type="submit"
							disabled={isPublishing || !secret.trim()}
							className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primaryaccent px-4 text-sm font-semibold text-white disabled:opacity-60">
							<SubmitLabel isPublishing={isPublishing} isUpload={isUpload} />
						</button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default PublishDialog;
