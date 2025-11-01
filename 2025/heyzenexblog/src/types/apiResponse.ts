import type { PhotoCardDetailType } from "./components";

export type GetPhotoApiResponse = {
	isError: boolean;
	statusCode: number;
	data: PhotoCardDetailType[];
};
