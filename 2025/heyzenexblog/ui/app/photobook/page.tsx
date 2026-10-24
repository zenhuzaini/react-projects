import type { Metadata } from "next";
import { getPaginatedPhotoBookMetas } from "@/lib/photobook";
import { createBaseMetadata } from "@/lib/seo";
import PhotoBookGallery from "./PhotoBookGallery";

export const metadata: Metadata = createBaseMetadata({
	title: "Photobook",
	description:
		"Photo stories from hikes, bikepacking trips and travels by Zen Huzaini.",
	path: "/photobook",
});

const PhotoBookPage = async () => {
	const result = await getPaginatedPhotoBookMetas(1, 1000);
	return <PhotoBookGallery books={result.stories} />;
};

export default PhotoBookPage;
