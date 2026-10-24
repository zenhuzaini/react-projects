import { PhotoCardDetailType } from "./components";

export type DataContentType = {
	sectionID: number;
	textContent: string;
	photoUrls: {
		url: string;
		description: string;
	}[];
};

export type StoryBookMeta = {
	slug: string;
	title: string;
	id: number;
	views: number;
	likes: number;
	cover: string;
	description: string;
	datePublished: string;
	dateModified: string;
	eventDateTo: string;
	eventDateFrom: string;
	tags: string[];
	city: string;
	country: string;
	/** @deprecated Derived from datePublished by lib/posts.ts; kept so old files still type-check. */
	nextPostSlug?: string;
	/** @deprecated Derived from datePublished by lib/posts.ts; kept so old files still type-check. */
	prevPostSlug?: string;
	/** Posts sharing the same series name are linked together on the post page. */
	series?: string;
	activityType: string;
};

export type PhotoBookMeta = StoryBookMeta & {
	photoCollection: PhotoCardDetailType[];
};
