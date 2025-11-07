import Hero from "@/components/layout/HomepageBlockLayouts/Hero";
import PhotoCardsSection from "@/components/layout/HomepageBlockLayouts/PhotoCards";
import StoryPost from "@/components/layout/HomepageBlockLayouts/StoryPost";

export default function Home() {
	return (
		<>
			<Hero></Hero>
			{/* section container */}
			<div className="mt-8 sm:mt-5 flex flex-col gap-10 sm:gap-15">
				<PhotoCardsSection></PhotoCardsSection>
				<StoryPost></StoryPost>
			</div>
		</>
	);
}
