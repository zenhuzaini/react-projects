"use client";
import HeaderInfoSection from "@/components/layout/StoryBookBlockLayouts/HeaderInfoSection";
import { PhotoHeaderSection } from "@/components/layout/StoryBookBlockLayouts/PhotoHeader";

import ActivityAvatar from "@/components/molecule/User/Avatar/ActivityAvatar";

import ChevronLeft from "@/icons/ChevronLeft";
import ChevronRight from "@/icons/ChevronRight";
import dynamic from "next/dynamic";

import Link from "next/link";

const BasicMap = dynamic(() => import("@/components/molecule/Map/BasicMap"), {
	ssr: false,
	loading: () => (
		<div className="h-[70vh] bg-gray-200 animate-pulse rounded-2xl" />
	),
});

const AdventureView = () => {
	return (
		<div>
			<article className="flex flex-col gap-2 ">
				{/* info top */}
				<HeaderInfoSection date={"2023-10-15"} id={24}></HeaderInfoSection>

				{/* hero title */}
				<section className="flex flex-col gap-2 sm:gap-4">
					<PhotoHeaderSection photoLength={5}></PhotoHeaderSection>
				</section>

				{/* avatar section */}
				<section className="mt-1 sm:mt-5 flex flex-col gap-2">
					<ActivityAvatar
						activityType="bikepacking"
						alt="User Avatar"
						avatarName="Zen Huzaini"
						publishedDate="2023-10-15"></ActivityAvatar>

					<div className="sm:w-[60%] ">
						<h1 className="text-2xl sm:text-3xl md:text-6xl font-extrabold tracking-tighter ">
							sgdesrg ahgjvfajeh jaesj The Journey Begins
							<span className="text-dot">.</span>
						</h1>
					</div>
				</section>

				{/* content */}
				<section className="flex flex-col gap-2 sm:gap-5 mt-[3%] rounded-3xl dark:bg-transparent ">
					{/* <Content></Content> */}
					{/* thi is supposed to be the contetn eith two columns. content in the left and map in the right */}

					<div className="grid md:grid-cols-2 gap-6">
						{/* LEFT CONTENT */}
						<div className="flex flex-col gap-5">
							<h2 className="text-xl font-semibold">
								Day 1 - the adventure begins
							</h2>

							<p>Today was the day...</p>
							<p>The feeling of being far away...</p>
							<p>I had a train to Zakopane...</p>
							<p>After that I rode...</p>
							<p>After riding around 50km...</p>
							<p>I started pitching my tent...</p>

							{/* simulate long content */}
							<div className="h-[120vh]" />

							{/* 📱 MOBILE MAP (BOTTOM) */}
							<div className="block md:hidden mt-6">
								<div className="w-full h-[40vh] rounded-2xl overflow-hidden">
									<BasicMap />
								</div>
							</div>
						</div>

						{/* 💻 DESKTOP MAP (STICKY RIGHT) */}
						<div className="hidden md:block">
							<div className="sticky top-24">
								<div className="w-full h-[70vh] rounded-2xl overflow-hidden">
									<BasicMap />
								</div>
							</div>
						</div>
					</div>

					<div className="flex justify-between mt-[5%]">
						<Link href={`/`}>
							<div className="text-primaryText flex gap-1">
								<ChevronLeft />
								Home
							</div>
						</Link>

						<Link href={`/storybook/${"test-story"}`}>
							<div className="text-primaryText flex gap-1">
								<span>Next StoryBook</span>
								<ChevronRight></ChevronRight>
							</div>
						</Link>
					</div>
				</section>
			</article>
		</div>
	);
};

export default AdventureView;
