import { getPaginatedPhotoBookMetas } from "@/lib/photobook";
import PhotoBookGallery from "./PhotoBookGallery";

const PhotoBookPage = async () => {
	const result = await getPaginatedPhotoBookMetas(1, 1000);
	return <PhotoBookGallery books={result.stories} />;
};

export default PhotoBookPage;
