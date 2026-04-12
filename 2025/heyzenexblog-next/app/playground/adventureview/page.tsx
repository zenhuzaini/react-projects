import { animationForArrow } from "@/animation/animation";
import { PhotoHeaderSection } from "@/components/layout/StoryBookBlockLayouts/PhotoHeader";
import { ImageWithSkeleton } from "@/components/molecule/ImageWithSkeleton";
import ActivityAvatar from "@/components/molecule/User/Avatar/ActivityAvatar";
import Chip from "@/components/ui/chip";
import { Separator } from "@/components/ui/separator";
import ChevronLeft from "@/icons/ChevronLeft";
import ChevronRight from "@/icons/ChevronRight";
import EyeSymbol from "@/icons/EyeSymbol";
import HeartOutlined from "@/icons/HeartOutlined";
import { faker } from "@faker-js/faker";
import Link from "next/link";

import React from "react";

const page = () => {
	return (
		<div>
			<article className="flex flex-col gap-2 ">
				{/* info top */}
				<section className="flex flex-col gap-2">
					<ActivityAvatar
						activityType="bikepacking"
						alt="User Avatar"
						avatarName="Zen Huzaini"
						publishedDate="2023-10-15"></ActivityAvatar>
					<div className="hidden md:flex">
						<Separator className="bg-primaryaccent"></Separator>
					</div>
				</section>

				{/* hero title & sats */}
				<section className="flex flex-col gap-2 sm:gap-4">
					{/* <div className="relative rounded-2xl w-full h-[40vh] sm:h-[50vh] md:h-[60vh]">
						<ImageWithSkeleton
							alt={faker.lorem.sentence(3)}
							src={faker.image.urlPicsumPhotos({ width: 800, height: 600 })}
						/>
						<div className="absolute inset-0 bg-linear-to-t from-primarymidnight/50 to-transparent rounded-2xl z-0"></div>

						<div className="absolute bottom-0 m-5 w-[40%]">
							<div
								className={` h-fit w-fit rounded-2xl p-1 ${animationForArrow}`}>
								<h1 className="text-accenttext text-2xl sm:text-3xl md:text-6xl font-extrabold tracking-tighter leading-[0.8]">
									{faker.lorem.sentence(1)}
									<span className="text-dot">.</span>
								</h1>
							</div>
						</div>
					</div> */}

					<PhotoHeaderSection photoLength={5}></PhotoHeaderSection>

					{/* Stats */}
					<div className="flex justify-between">
						<div className="flex gap-0 sm:gap-2">
							<div className="flex text-sm md:text-lg gap-1 sm:gap-2  pl-2 pr-2 rounded-lg items-center">
								<EyeSymbol
									className="stroke-primaryaccent"
									size={4}></EyeSymbol>{" "}
								<span className="text-primarytextInvert">{11}</span>
							</div>
							<div className="flex text-sm md:text-lg gap-1 sm:gap-2 pl-2 pr-2 rounded-lg items-center ">
								<HeartOutlined
									className="stroke-primaryaccent"
									size={4}></HeartOutlined>
								<span className="text-primarytextInvert">{5}</span>
							</div>
						</div>
						<div className="hidden md:flex gap-2">
							{["test", "a", "b"].map((tag, _) => {
								return <Chip key={_} text={tag}></Chip>;
							})}
						</div>
					</div>
				</section>

				{/* content */}
				<section className="lg:ml-[20%] lg:mr-[20%] flex flex-col gap-2 sm:gap-5 mt-[3%] rounded-3xl dark:bg-transparent ">
					{/* <Content></Content> */}

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
