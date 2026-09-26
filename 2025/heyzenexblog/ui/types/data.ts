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
	nextPostSlug: string;
	prevPostSlug: string;
	activityType: string;
};

export type PhotoBookMeta = {
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
	nextPostSlug: string;
	prevPostSlug: string;
	activityType: string;
	photoCollection: PhotoCardDetailType[];
};
