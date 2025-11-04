import Header from "@/components/layout/Header";
import Hero from "@/components/layout/Hero";
import PhotoCardsSection from "@/components/layout/PhotoCards";
import StoryPost from "@/components/layout/StoryPost";

import Footer from "@/components/layout/Footer";

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
