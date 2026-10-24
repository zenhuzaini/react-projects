"use client";

import { Plus, X } from "lucide-react";
import { TEXT } from "@/const/text";
import { cn } from "@/lib/utils";
import ImageUploadButton from "../shared/ImageUploadButton";
import { blockInputClass } from "./styles";
import type {
	ExistingStorySummary,
	ImageUploadTarget,
	StoryBlock,
	StoryListItem,
} from "./types";

type Props = {
	block: StoryBlock;
	updateBlock: (id: string, updates: Partial<StoryBlock>) => void;
	updateListItem: (
		block: StoryBlock,
		index: number,
		updates: Partial<StoryListItem>,
	) => void;
	importGpxRoute: (blockId: string, file: File) => void;
	onUploadImage: (file: File | undefined, target: ImageUploadTarget) => void;
	relatedStoryOptions: ExistingStorySummary[];
	isLoadingRelatedStories: boolean;
};

const field = (...classes: string[]) => cn(blockInputClass, ...classes);

const addButtonClass =
	"inline-flex items-center gap-1 text-xs font-semibold text-secondaryforestgreen";

// The editing controls for one block, chosen by the block's type.
const BlockFields = ({
	block,
	updateBlock,
	updateListItem,
	importGpxRoute,
	onUploadImage,
	relatedStoryOptions,
	isLoadingRelatedStories,
}: Props) => {
	const setText = (text: string) => updateBlock(block.id, { text });

	switch (block.type) {
		case "paragraph":
			return (
				<textarea
					value={block.text}
					onChange={(event) => setText(event.target.value)}
					rows={5}
					className={field("w-full resize-y leading-6")}
					placeholder="Write in Markdown. Use a blank line to start a new paragraph."
				/>
			);

		case "quote":
			return (
				<textarea
					value={block.text}
					onChange={(event) => setText(event.target.value)}
					rows={3}
					className={field("w-full resize-y leading-6")}
					placeholder="A memorable line from the story"
				/>
			);

		case "section":
			return (
				<input
					value={block.text}
					onChange={(event) => setText(event.target.value)}
					className={field("w-full")}
					placeholder="Section title"
				/>
			);

		case "highlight":
			return (
				<input
					value={block.text}
					onChange={(event) => setText(event.target.value)}
					className={field("w-full")}
					placeholder="Highlighted text"
				/>
			);

		case "raw":
			return (
				<div className="space-y-2">
					<p className="text-xs text-primarygrey">
						Imported MDX is preserved here. Edit the source directly; metadata
						remains editable in Story details.
					</p>
					<textarea
						value={block.rawMdx}
						onChange={(event) =>
							updateBlock(block.id, { rawMdx: event.target.value })
						}
						rows={18}
						spellCheck={false}
						className={field("w-full resize-y font-mono text-xs leading-5")}
						placeholder="Existing MDX source"
					/>
				</div>
			);

		case "checklist":
		case "itemlist":
			return (
				<div className="space-y-2">
					{block.items.map((item, itemIndex) => (
						<div
							key={`${block.id}-item-${itemIndex}`}
							className="flex items-center gap-2">
							{block.type === "checklist" && (
								<input
									type="checkbox"
									checked={item.done}
									onChange={(event) =>
										updateListItem(block, itemIndex, {
											done: event.target.checked,
										})
									}
									className="size-4 accent-primaryaccent"
								/>
							)}
							<input
								value={item.label}
								onChange={(event) =>
									updateListItem(block, itemIndex, {
										label: event.target.value,
									})
								}
								className={field("min-w-0 flex-1")}
								placeholder={`Item ${itemIndex + 1}`}
							/>
							<button
								type="button"
								onClick={() =>
									updateBlock(block.id, {
										items: block.items.filter(
											(_, index) => index !== itemIndex,
										),
									})
								}
								aria-label={`Remove item ${itemIndex + 1}`}
								className="rounded p-2 text-primaryred hover:bg-primaryred/10">
								<X size={15} />
							</button>
						</div>
					))}
					<button
						type="button"
						onClick={() =>
							updateBlock(block.id, {
								items: [...block.items, { label: "", done: false }],
							})
						}
						className={addButtonClass}>
						<Plus size={14} /> Add item
					</button>
				</div>
			);

		case "iframe":
			return (
				<input
					value={block.url}
					onChange={(event) =>
						updateBlock(block.id, { url: event.target.value })
					}
					className={field("w-full")}
					placeholder="Embed URL"
				/>
			);

		case "map":
			return (
				<div className="grid gap-2 sm:grid-cols-2">
					<label className="flex items-center gap-2 text-sm font-medium text-primaryText sm:col-span-2">
						<input
							type="checkbox"
							checked={block.shouldShowDownloadGPX}
							onChange={(event) =>
								updateBlock(block.id, {
									shouldShowDownloadGPX: event.target.checked,
								})
							}
							className="size-4 accent-primaryaccent"
						/>
						Show GPX download on map
					</label>
					<input
						value={block.mapTitle}
						onChange={(event) =>
							updateBlock(block.id, { mapTitle: event.target.value })
						}
						className={field("sm:col-span-2")}
						placeholder="Map title"
					/>
					<label className="flex flex-col gap-1 text-xs font-semibold text-primarygrey sm:col-span-2">
						Import GPX route
						<input
							type="file"
							accept=".gpx,application/gpx+xml,application/xml,text/xml"
							onChange={(event) => {
								const file = event.currentTarget.files?.[0];
								event.currentTarget.value = "";
								if (file) void importGpxRoute(block.id, file);
							}}
							className={field(
								"w-full font-normal file:mr-3 file:rounded file:border-0 file:bg-secondaryforestgreen/10 file:px-3 file:py-1 file:font-semibold file:text-secondaryforestgreen",
							)}
						/>
					</label>
					<textarea
						value={block.text}
						onChange={(event) => setText(event.target.value)}
						rows={2}
						className={field("resize-y sm:col-span-2")}
						placeholder="Map description"
					/>
					<input
						inputMode="decimal"
						value={block.centerLatitude}
						onChange={(event) =>
							updateBlock(block.id, { centerLatitude: event.target.value })
						}
						className={field("min-w-0")}
						placeholder="Center latitude"
					/>
					<input
						inputMode="decimal"
						value={block.centerLongitude}
						onChange={(event) =>
							updateBlock(block.id, { centerLongitude: event.target.value })
						}
						className={field("min-w-0")}
						placeholder="Center longitude"
					/>
					<textarea
						value={block.route}
						onChange={(event) =>
							updateBlock(block.id, { route: event.target.value })
						}
						rows={3}
						className={field("resize-y sm:col-span-2")}
						placeholder="Route coordinates, one latitude, longitude pair per line"
					/>
				</div>
			);

		case "divider":
			return (
				<div className="py-2">
					<div className="h-1 w-full rounded-full bg-primaryaccent" />
				</div>
			);

		case "image":
			return (
				<div className="grid gap-2">
					<input
						value={block.imageUrl}
						onChange={(event) =>
							updateBlock(block.id, { imageUrl: event.target.value })
						}
						className={field("w-full")}
						placeholder="Photo URL"
					/>
					<input
						value={block.imageAlt}
						onChange={(event) =>
							updateBlock(block.id, { imageAlt: event.target.value })
						}
						className={field("w-full")}
						placeholder="Photo description"
					/>
					<ImageUploadButton
						label="Upload to Cloudinary"
						className="w-fit"
						onSelect={(file) =>
							onUploadImage(file, { kind: "block", blockId: block.id })
						}
					/>
				</div>
			);

		case "gallery":
			return (
				<div className="space-y-2">
					{block.gallery.map((photo, photoIndex) => (
						<div
							key={`${block.id}-${photoIndex}`}
							className="grid gap-x-2 gap-y-2 sm:grid-cols-[minmax(0,1fr)_auto]">
							<input
								value={photo.url}
								onChange={(event) => {
									const gallery = [...block.gallery];
									gallery[photoIndex] = { ...photo, url: event.target.value };
									updateBlock(block.id, { gallery });
								}}
								className={field("min-w-0 sm:col-start-1 sm:row-start-1")}
								placeholder={`Photo ${photoIndex + 1} URL`}
							/>
							<ImageUploadButton
								label="Upload"
								className="min-h-10 justify-center sm:col-start-2 sm:row-start-1"
								onSelect={(file) =>
									onUploadImage(file, {
										kind: "block",
										blockId: block.id,
										galleryIndex: photoIndex,
									})
								}
							/>
							<input
								value={photo.alt}
								onChange={(event) => {
									const gallery = [...block.gallery];
									gallery[photoIndex] = { ...photo, alt: event.target.value };
									updateBlock(block.id, { gallery });
								}}
								className={field("min-w-0 sm:col-start-1 sm:row-start-2")}
								placeholder="Description"
							/>
							<button
								type="button"
								onClick={() =>
									updateBlock(block.id, {
										gallery: block.gallery.filter(
											(_, itemIndex) => itemIndex !== photoIndex,
										),
									})
								}
								aria-label="Remove gallery photo"
								className="rounded p-2 text-primaryred hover:bg-primaryred/10 sm:col-start-2 sm:row-start-2">
								<X size={15} />
							</button>
						</div>
					))}
					<button
						type="button"
						onClick={() =>
							updateBlock(block.id, {
								gallery: [...block.gallery, { url: "", alt: "" }],
							})
						}
						className={addButtonClass}>
						<Plus size={14} /> Add photo
					</button>
				</div>
			);

		case "related":
			return (
				<div className="space-y-2">
					<label className="grid gap-1 text-xs font-semibold text-primaryText">
						Section title
						<input
							value={block.text}
							onChange={(event) => setText(event.target.value)}
							className={field("w-full font-normal")}
							placeholder={TEXT.common.relatedPosts}
						/>
					</label>
					<p className="text-xs text-primarygrey">
						Choose stories to show in a scrollable related-post row.
					</p>
					<div className="max-h-48 space-y-1 overflow-y-auto rounded border border-primarybrown/20 bg-primarywhite p-2">
						{isLoadingRelatedStories && (
							<p className="p-2 text-sm text-primarygrey">Loading stories...</p>
						)}
						{!isLoadingRelatedStories && relatedStoryOptions.length === 0 && (
							<p className="p-2 text-sm text-primarygrey">
								No other stories are available.
							</p>
						)}
						{relatedStoryOptions.map((story) => (
							<label
								key={story.slug}
								className="flex cursor-pointer items-start gap-2 rounded px-2 py-2 text-sm hover:bg-secondarywhite">
								<input
									type="checkbox"
									checked={block.relatedStorySlugs.includes(story.slug)}
									onChange={(event) => {
										const relatedStorySlugs = event.target.checked
											? [...block.relatedStorySlugs, story.slug]
											: block.relatedStorySlugs.filter(
													(slug) => slug !== story.slug,
												);
										updateBlock(block.id, { relatedStorySlugs });
									}}
									className="mt-0.5 size-4 shrink-0 accent-primaryaccent"
								/>
								<span>{story.title}</span>
							</label>
						))}
					</div>
				</div>
			);
	}
};

export default BlockFields;
