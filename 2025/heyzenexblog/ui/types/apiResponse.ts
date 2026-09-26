import type { PhotoCardDetailType } from "./components";

export type GetPhotoApiResponse = {
	isError: boolean;
	statusCode: number;
	data: PhotoCardDetailType[];
};

export interface GetStoryBookBasedOnID {
	id: string;
	name: string;
	story: string;
	photoUrls: PhotoCardDetailType[];
	headerPhoto: string;
	lat: string;
	long: string;
	location: string;
	totallike: number | null;
	totalview: number | null;
	youtube: string;
	instagram: string;
	strava: string;
	komoot: string;
	otherURL: string;
	url: string;
	createdAt: string;
	modifiedAt: string;
	shortDescription: string;
	eventDateFrom: string;
	eventDateTo: string;
}
