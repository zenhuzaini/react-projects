import Header from "@/components/layout/Header";
import Hero from "@/components/layout/Hero";
import PhotoCardsSection from "@/components/layout/PhotoCards";
import SectionTitle from "@/components/layout/SectionTitle";

import ArrowRight from "../icons/ArrowRight";
import { ImageWithSkeleton } from "@/components/molecule/ImageWithSkeleton";
import { faker } from "@faker-js/faker";
import StoryPost from "@/components/layout/StoryPost";

export default function Home() {
	return (
		<div className="ml-4 mr-4 flex flex-col gap-2 sm:ml-20 sm:mr-20 sm:gap-10">
			<Header></Header>
			<Hero></Hero>
			{/* section container */}
			<div className="mt-8 sm:mt-5 flex flex-col gap-10 sm:gap-15">
				<PhotoCardsSection></PhotoCardsSection>
				<StoryPost></StoryPost>
			</div>
		</div>
	);
}
