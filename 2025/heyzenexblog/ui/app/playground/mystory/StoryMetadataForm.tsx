"use client";

import { ChevronDown } from "lucide-react";
import type { InputHTMLAttributes } from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import ImageUploadButton from "./ImageUploadButton";
import { captionClass, detailInputClass } from "./styles";
import { toSlug } from "./draft";
import type { ImageQuality, ImageUploadTarget, StoryDraft } from "./types";

const ACTIVITIES = [
	"bikepacking",
	"cycling",
	"hiking",
	"travel",
	"photography",
	"other",
];

const IMAGE_QUALITY_OPTIONS: { label: string; value: ImageQuality }[] = [
	{ label: "Smaller files", value: "auto:eco" },
	{ label: "Balanced", value: "auto:good" },
	{ label: "Highest quality", value: "auto:best" },
];

const TextField = ({
	label,
	className,
	...inputProps
}: { label: string; className?: string } & Omit<
	InputHTMLAttributes<HTMLInputElement>,
	"className"
>) => (
	<label className={className}>
		<span className={captionClass}>{label}</span>
		<input className={detailInputClass} {...inputProps} />
	</label>
);

type Props = {
	draft: StoryDraft;
	updateDraft: (updates: Partial<StoryDraft>) => void;
	isOpen: boolean;
	onToggle: () => void;
	onUploadImage: (file: File | undefined, target: ImageUploadTarget) => void;
};

const StoryMetadataForm = ({
	draft,
	updateDraft,
	isOpen,
	onToggle,
	onUploadImage,
}: Props) => (
	<>
		<div className="rounded-lg border border-primarybrown/20 bg-primarywhite p-4 sm:p-5">
			<div className="mb-4 flex items-center justify-between border-b border-primarybrown/15 pb-3">
				<h2 className="font-bold">
					<button
						type="button"
						aria-expanded={isOpen}
						aria-controls="story-details-fields"
						aria-label={`${isOpen ? "Collapse" : "Expand"} story details`}
						onClick={onToggle}
						className="flex min-h-8 items-center gap-2 text-left">
						<span>Story details</span>
						<ChevronDown
							size={16}
							className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
						/>
					</button>
				</h2>
				<span className="text-xs text-primarygrey">METADATA</span>
			</div>
			<div
				id="story-details-fields"
				className={`${isOpen ? "grid" : "hidden"} gap-3 sm:grid-cols-2`}>
				<TextField
					label="Title"
					className="sm:col-span-2"
					value={draft.title}
					onChange={(event) =>
						updateDraft({
							title: event.target.value,
							slug: toSlug(event.target.value),
						})
					}
					placeholder="A story title"
				/>
				<TextField
					label="Slug"
					className="sm:col-span-2"
					value={draft.slug}
					onChange={(event) =>
						updateDraft({ slug: toSlug(event.target.value) })
					}
					placeholder="story-slug"
				/>
				<label className="sm:col-span-2">
					<span className={captionClass}>Description</span>
					<textarea
						value={draft.description}
						onChange={(event) =>
							updateDraft({ description: event.target.value })
						}
						rows={2}
						maxLength={160}
						className={`${detailInputClass} resize-y`}
						placeholder="A short story summary"
					/>
					<span className="mt-1 block text-right text-xs text-primarygrey">
						{draft.description.length}/160
					</span>
				</label>
				<div className="sm:col-span-2">
					<label htmlFor="story-cover-url" className={captionClass}>
						Cover image URL
					</label>
					<div className="flex gap-2">
						<input
							id="story-cover-url"
							value={draft.cover}
							onChange={(event) => updateDraft({ cover: event.target.value })}
							className={`${detailInputClass} min-w-0 flex-1`}
							placeholder="https://..."
						/>
						<ImageUploadButton
							label="Upload"
							className="shrink-0"
							onSelect={(file) => onUploadImage(file, { kind: "cover" })}
						/>
					</div>
				</div>
				<TextField
					label="City"
					value={draft.city}
					onChange={(event) => updateDraft({ city: event.target.value })}
					placeholder="Wroclaw"
				/>
				<TextField
					label="Country"
					value={draft.country}
					onChange={(event) => updateDraft({ country: event.target.value })}
					placeholder="Poland"
				/>
				<TextField
					label="Date published"
					type="datetime-local"
					value={draft.datePublished}
					onChange={(event) =>
						updateDraft({ datePublished: event.target.value })
					}
				/>
				<TextField
					label="Event start"
					type="date"
					value={draft.eventDateFrom}
					onChange={(event) =>
						updateDraft({ eventDateFrom: event.target.value })
					}
				/>
				<TextField
					label="Event end"
					type="date"
					value={draft.eventDateTo}
					onChange={(event) => updateDraft({ eventDateTo: event.target.value })}
				/>
				<label>
					<span className={captionClass}>Activity</span>
					<Select
						items={ACTIVITIES.map((activity) => ({
							label: activity,
							value: activity,
						}))}
						value={draft.activityType}
						onValueChange={(value) => {
							if (typeof value === "string") {
								updateDraft({ activityType: value });
							}
						}}>
						<SelectTrigger
							aria-label="Activity"
							className="w-full bg-mybackground">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							{ACTIVITIES.map((activity) => (
								<SelectItem key={activity} value={activity}>
									{activity}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</label>
				<TextField
					label="Tags"
					value={draft.tags}
					onChange={(event) => updateDraft({ tags: event.target.value })}
					placeholder="solo, nature"
				/>
				<TextField
					label="Views"
					type="number"
					min={0}
					value={draft.views}
					onChange={(event) =>
						updateDraft({ views: Number(event.target.value) })
					}
				/>
				<TextField
					label="Likes"
					type="number"
					min={0}
					value={draft.likes}
					onChange={(event) =>
						updateDraft({ likes: Number(event.target.value) })
					}
				/>
			</div>
		</div>

		<div className="rounded-lg border border-primarybrown/20 bg-primarywhite p-4 sm:p-5">
			<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
				<div>
					<h2 className="font-bold">Upload settings</h2>
					<p className="mt-1 text-xs text-primarygrey">
						Quality applies to new cover, photo, and gallery uploads.
					</p>
				</div>
				<label className="flex flex-col gap-1 text-xs font-semibold text-primarygrey sm:w-64">
					<span>Cloudinary image quality</span>
					<Select
						items={IMAGE_QUALITY_OPTIONS}
						value={draft.imageQuality}
						onValueChange={(value) => {
							if (typeof value === "string") {
								updateDraft({ imageQuality: value as ImageQuality });
							}
						}}>
						<SelectTrigger
							aria-label="Cloudinary image quality"
							className="w-full bg-mybackground">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							{IMAGE_QUALITY_OPTIONS.map(({ label, value }) => (
								<SelectItem key={value} value={value}>
									{label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</label>
			</div>
		</div>
	</>
);

export default StoryMetadataForm;
