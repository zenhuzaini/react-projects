import Hero from "@/components/layout/HomepageBlockLayouts/Hero";
import PhotoCardsSection from "@/components/layout/HomepageBlockLayouts/PhotoCards";
import SeeMore from "@/components/layout/HomepageBlockLayouts/SeeMore";
import StoryPost from "@/components/layout/HomepageBlockLayouts/StoryPost";
import { getPaginatedPhotoBookMetas } from "@/lib/photobook";
import { getPaginatedStoryMetas } from "@/lib/storybook";

export default async function Home() {
	const story = await getPaginatedStoryMetas(1, 7);
	const photoStory = await getPaginatedPhotoBookMetas(1, 7);
	return (
		<>
			<Hero></Hero>
			{/* section container */}
			<div className="mt-8 sm:mt-5 flex flex-col gap-10 sm:gap-15">
				<div className="flex flex-col gap-5 sm:gap-10">
					<StoryPost stories={story.stories}></StoryPost>
					<div className="flex justify-end">
						<SeeMore url={"/storybook"}></SeeMore>
					</div>
				</div>
				<PhotoCardsSection photoStory={photoStory.stories}></PhotoCardsSection>
			</div>
		</>
	);
}
