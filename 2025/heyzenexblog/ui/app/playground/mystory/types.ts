export type BlockType =
	| "paragraph"
	| "quote"
	| "image"
	| "gallery"
	| "section"
	| "checklist"
	| "itemlist"
	| "iframe"
	| "map"
	| "divider"
	| "highlight"
	| "related"
	| "raw";

export type StoryListItem = { label: string; done: boolean };
export type ImageQuality = "auto:eco" | "auto:good" | "auto:best";
export type ImageUploadTarget =
	| { kind: "cover" }
	| { kind: "block"; blockId: string; galleryIndex?: number };
export type PendingImageUpload = ImageUploadTarget & {
	file: File;
	imageQuality: ImageQuality;
};

export type StoryBlock = {
	id: string;
	type: BlockType;
	text: string;
	imageUrl: string;
	imageAlt: string;
	gallery: { url: string; alt: string }[];
	items: StoryListItem[];
	url: string;
	centerLatitude: string;
	centerLongitude: string;
	route: string;
	shouldShowDownloadGPX: boolean;
	mapTitle: string;
	relatedStorySlugs: string[];
	rawMdx: string;
	insideCenter?: boolean;
	rawOutsideCenter?: boolean;
};

export type ImportedStoryBlock = Partial<Omit<StoryBlock, "id" | "type">> & {
	type: BlockType;
	insideCenter?: boolean;
	rawOutsideCenter?: boolean;
};

export type ExistingStorySummary = { slug: string; title: string };
export type ExistingStoryResponse = {
	slug: string;
	body: string;
	blocks?: ImportedStoryBlock[];
	supportingMdx?: string;
	metadata: {
		slug?: string;
		id?: number;
		title?: string;
		description?: string;
		cover?: string;
		city?: string;
		country?: string;
		activityType?: string;
		tags?: string[];
		views?: number;
		likes?: number;
		datePublished?: string;
		dateModified?: string;
		eventDateFrom?: string;
		eventDateTo?: string;
		nextPostSlug?: string;
		prevPostSlug?: string;
	};
};

export type StoryDraft = {
	id: string;
	storyId: number;
	title: string;
	slug: string;
	description: string;
	cover: string;
	imageQuality: ImageQuality;
	city: string;
	country: string;
	activityType: string;
	tags: string;
	views: number;
	likes: number;
	datePublished: string;
	eventDateFrom: string;
	eventDateTo: string;
	nextPostSlug: string;
	prevPostSlug: string;
	supportingMdx?: string;
	blocks: StoryBlock[];
	createdAt: string;
	updatedAt: string;
};
