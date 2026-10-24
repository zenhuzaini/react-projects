import type { BlockType, StoryDraft } from "./types";

// Everything that differs between the story builder and the photobook builder.
export type BuilderConfig = {
	collection: "story" | "photobook";
	heading: string;
	description: string;
	storageKey: string;
	noun: string;
	nounPlural: string;
	// Shown in the preview header, e.g. "StoryBook".
	previewLabel: string;
	showReadingMeta: boolean;
	// Blocks the renderer for this collection can't display.
	disabledBlocks: BlockType[];
	showCenterToggle: boolean;
	draftDefaults: Partial<StoryDraft>;
};

export const STORY_BUILDER: BuilderConfig = {
	collection: "story",
	heading: "Story builder",
	description:
		"Arrange story blocks, save drafts in this browser, and export a ready-to-edit MDX file.",
	storageKey: "heyzenex-mystory-drafts",
	noun: "story",
	nounPlural: "stories",
	previewLabel: "StoryBook",
	showReadingMeta: true,
	disabledBlocks: [],
	showCenterToggle: false,
	draftDefaults: {},
};

export const PHOTOBOOK_BUILDER: BuilderConfig = {
	collection: "photobook",
	heading: "PhotoBook builder",
	description:
		"Compose a visual story from photographs and short notes, save drafts in this browser, and export a ready-to-edit MDX file.",
	storageKey: "heyzenex-myphotobook-drafts",
	noun: "photobook",
	nounPlural: "photobooks",
	previewLabel: "PhotoBook",
	showReadingMeta: false,
	// Photobooks keep their original text, quote, photo and gallery blocks.
	disabledBlocks: [
		"section",
		"checklist",
		"itemlist",
		"iframe",
		"map",
		"divider",
		"highlight",
		"related",
		"raw",
	],
	showCenterToggle: true,
	draftDefaults: {
		title: "Untitled PhotoBook",
		slug: "",
		description: "",
		cover: "",
		city: "",
		country: "",
		activityType: "photography",
		tags: "",
		views: 0,
		likes: 0,
		blocks: [],
	},
};
