import type { Metadata } from "next";
import { getPaginatedStoryMetas } from "@/lib/storybook";
import { createBaseMetadata } from "@/lib/seo";
import StoryBookGallery from "./StoryBookGallery";

export const metadata: Metadata = createBaseMetadata({
	title: "Storybook",
	description:
		"Travel, hiking and bikepacking stories written by Zen Huzaini.",
	path: "/storybook",
});

const StoryBookIndexPage = async () => {
	const result = await getPaginatedStoryMetas(1, 1000);
	return <StoryBookGallery stories={result.stories} />;
};

export default StoryBookIndexPage;
