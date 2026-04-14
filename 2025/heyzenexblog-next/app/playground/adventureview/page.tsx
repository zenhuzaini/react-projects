import { animationForArrow } from "@/animation/animation";
import { PhotoHeaderSection } from "@/components/layout/StoryBookBlockLayouts/PhotoHeader";
import { ImageWithSkeleton } from "@/components/molecule/ImageWithSkeleton";

import ActivityAvatar from "@/components/molecule/User/Avatar/ActivityAvatar";

import ChevronLeft from "@/icons/ChevronLeft";
import ChevronRight from "@/icons/ChevronRight";
import dynamic from "next/dynamic";

import Link from "next/link";

const BasicMap = dynamic(() => import("@/components/molecule/Map/BasicMap"), {
	loading: () => (
		<div className="h-[70vh] bg-gray-200 animate-pulse rounded-2xl" />
	),
});

const page = () => {
	return (
		<div>
			<article className="flex flex-col gap-2 ">
				{/* info top */}
				<section>
					<div className="flex justify-between items-center">
						<div className="flex flex-col text-xs md:text-lg">
							<p className="text-primarytextInvert font-extralight">
								StoryBook
							</p>
							<p className="text-[10px] text-primarytextInvert md:text-sm tracking-tight">
								<span className="font-extralight">Published on</span> 2023-10-15
							</p>
						</div>
						<div className="bg-primaryaccent w-fit sm:text-base text-[10px] p-2 flex justify-center items-center rounded">
							<h3 className="text-primarycream font-extrabold">
								<span className="text-dot">#</span>
								{24}
							</h3>
						</div>
					</div>
				</section>

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

					<div className="grid md:grid-cols-2">
						{/* LEFT CONTENT */}
						<div className="flex flex-col gap-5">
							<h2 className="text-xl font-semibold">
								Day 1 - the adventure begins
							</h2>

							<p>
								Today was the day. After preparing for almost half year, I can’t
								believe it was really happening...
							</p>

							<p>
								The feeling of being far away from home and exploring new
								places...
							</p>

							<p>I had a train to Zakopane from Wroclaw at 8:47...</p>

							<p>After that I rode through the velo dunajec...</p>

							<p>
								After riding around 50km I arrived in the Frydman campsite...
							</p>

							<p>I started pitching my tent and then took a shower...</p>

							{/* simulate long content */}
							<div className="h-[120vh]" />
						</div>

						{/* RIGHT MAP (STICKY) */}
						<div className="hidden lg:block">
							<div className="sticky top-24">
								<div className="w-full h-[70vh] rounded-2xl overflow-hidden">
									<BasicMap></BasicMap>
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

export default page;
