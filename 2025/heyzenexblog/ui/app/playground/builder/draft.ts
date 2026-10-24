import { TEXT } from "@/const/text";
import { PLACEHOLDER_COVER_URL } from "@/const/vars";
import type { BlockType, StoryBlock, StoryDraft } from "./types";

export const toSlug = (value: string) =>
	value
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-|-$/g, "");

export const toLocalDateTimeInput = (date: Date) => {
	const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
	return localDate.toISOString().slice(0, 16);
};

export const toLocalDateInput = (value: string | undefined) => {
	if (!value) return "";
	if (/^\d{4}-\d{2}-\d{2}/.test(value)) return value.slice(0, 10);
	const date = new Date(value);
	if (Number.isNaN(date.getTime())) return "";
	const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
	return localDate.toISOString().slice(0, 10);
};

export const toDatePublished = (value: string) =>
	value ? new Date(value).toString() : "";

export const parseTags = (value: string) =>
	value
		.split(",")
		.map((tag) => tag.trim())
		.filter(Boolean);

export const createBlock = (
	type: BlockType,
	id = crypto.randomUUID(),
): StoryBlock => ({
	id,
	type,
	text:
		type === "paragraph"
			? "Write your story here..."
			: type === "related"
				? TEXT.common.relatedPosts
				: "",
	imageUrl: "",
	imageAlt: "",
	gallery: [
		{ url: "", alt: "" },
		{ url: "", alt: "" },
	],
	items: [],
	url: "",
	centerLatitude: "",
	centerLongitude: "",
	route: "",
	shouldShowDownloadGPX: false,
	mapTitle: "",
	relatedStorySlugs: [],
	rawMdx: "",
});

export const createDraft = (
	id = crypto.randomUUID(),
	blockId = crypto.randomUUID(),
	defaults: Partial<StoryDraft> = {},
): StoryDraft => ({
	id,
	storyId: 1,
	title: "A Weekend Along the Velo Dunajec",
	slug: "a-weekend-along-the-velo-dunajec",
	description:
		"A sample ride through the mountains, lakes, and forest roads of southern Poland.",
	cover: PLACEHOLDER_COVER_URL,
	imageQuality: "auto:good",
	city: "Zakopane",
	country: "Poland",
	activityType: "bikepacking",
	series: "",
	tags: "bikepacking, adventure, Poland",
	views: 100,
	likes: 10,
	datePublished: "",
	eventDateFrom: "",
	eventDateTo: "",
	nextPostSlug: "",
	prevPostSlug: "",
	blocks: [
		{
			...createBlock("paragraph", blockId),
			text: "A long weekend on the bike, following quiet paths through the mountains and finding a new reason to keep riding each day.",
		},
	],
	createdAt: "",
	updatedAt: "",
	...defaults,
});

// Drafts saved by the old photobook builder used a "photo" block and a `photos` list.
const upgradeLegacyBlock = (raw: StoryBlock): StoryBlock => {
	const legacy = raw as unknown as {
		type: string;
		url?: string;
		alt?: string;
		photos?: { url?: string; alt?: string }[];
	};
	if (legacy.type === "photo") {
		return {
			...raw,
			type: "image",
			imageUrl: legacy.url ?? "",
			imageAlt: legacy.alt ?? "",
			url: "",
		};
	}
	if (
		legacy.type === "gallery" &&
		Array.isArray(legacy.photos) &&
		!Array.isArray(raw.gallery)
	) {
		return {
			...raw,
			gallery: legacy.photos.map((photo) => ({
				url: photo.url ?? "",
				alt: photo.alt ?? "",
			})),
			url: "",
		};
	}
	return raw;
};

export const normalizeSavedDraft = (
	saved: StoryDraft,
	defaults: Partial<StoryDraft> = {},
): StoryDraft => {
	const fallbackDraft = createDraft(saved.id, undefined, defaults);
	const fallbackDate = new Date(saved.createdAt || saved.updatedAt || "");
	return {
		...fallbackDraft,
		...saved,
		storyId: saved.storyId ?? 1,
		series: saved.series ?? "",
		nextPostSlug: saved.nextPostSlug ?? "",
		prevPostSlug: saved.prevPostSlug ?? "",
		imageQuality: saved.imageQuality ?? "auto:good",
		views: saved.views ?? fallbackDraft.views,
		likes: saved.likes ?? fallbackDraft.likes,
		supportingMdx: saved.supportingMdx ?? "",
		datePublished:
			saved.datePublished ||
			(Number.isNaN(fallbackDate.getTime())
				? toLocalDateTimeInput(new Date())
				: toLocalDateTimeInput(fallbackDate)),
		blocks: Array.isArray(saved.blocks)
			? saved.blocks.map(upgradeLegacyBlock).map((block) => {
					const defaults = createBlock(block.type, block.id);
					return {
						...defaults,
						...block,
						text:
							block.type === "related"
								? typeof block.text === "string" && block.text.trim()
									? block.text
									: defaults.text
								: typeof block.text === "string"
									? block.text
									: defaults.text,
						rawMdx: typeof block.rawMdx === "string" ? block.rawMdx : "",
						gallery: Array.isArray(block.gallery)
							? block.gallery.map((photo) => ({
									url: typeof photo.url === "string" ? photo.url : "",
									alt: typeof photo.alt === "string" ? photo.alt : "",
								}))
							: defaults.gallery,
						items: Array.isArray(block.items)
							? block.items.map((item) => ({
									label: typeof item.label === "string" ? item.label : "",
									done: item.done === true,
								}))
							: defaults.items,
						relatedStorySlugs: Array.isArray(block.relatedStorySlugs)
							? block.relatedStorySlugs.filter(
									(slug): slug is string => typeof slug === "string",
								)
							: defaults.relatedStorySlugs,
					};
				})
			: fallbackDraft.blocks,
	};
};

export const stampDraft = (
	draft: StoryDraft,
	timestamp: string,
): StoryDraft => ({
	...draft,
	slug: draft.slug || toSlug(draft.title),
	createdAt: draft.createdAt || timestamp,
	updatedAt: timestamp,
});

export const upsertSavedDraft = (drafts: StoryDraft[], draft: StoryDraft) =>
	drafts.some((saved) => saved.id === draft.id)
		? drafts.map((saved) => (saved.id === draft.id ? draft : saved))
		: [draft, ...drafts];
