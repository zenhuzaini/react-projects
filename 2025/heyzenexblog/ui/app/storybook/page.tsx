import { getPaginatedStoryMetas } from "@/lib/storybook";
import StoryBookGallery from "./StoryBookGallery";

const StoryBookIndexPage = async () => {
	const result = await getPaginatedStoryMetas(1, 1000);
	return <StoryBookGallery stories={result.stories} />;
};

export default StoryBookIndexPage;
