import { animationForArrow } from "@/animation/animation";
import PhotoCollectionGrid from "@/components/layout/StoryBookBlockLayouts/6_PhotoCollectionGrid/PhotoCollectionGrid";
import { ImageWithSkeleton } from "@/components/molecule/ImageWithSkeleton";
import ChevronLeft from "@/icons/ChevronLeft";
import ChevronRight from "@/icons/ChevronRight";
import { faker } from "@faker-js/faker";
import { Separator } from "@radix-ui/react-separator";
import Link from "next/link";

const PhotoBook = () => {
	return (
		<div>
			<div>
				<div className="flex flex-col gap-2">
					{/* info top */}
					<div className="flex flex-col gap-2">
						<div className="flex justify-between items-center">
							<div className="flex flex-col text-xs md:text-lg">
								<p className="text-primarytextInvert font-extralight">
									PhotoBook
								</p>
								<p className="text-[8px] text-primarytextInvert md:text-sm tracking-tight">
									<span className="font-extralight">Written on</span> 22 Jan
									2025
								</p>
							</div>
							<div className="bg-primaryaccent w-fit sm:text-base text-[10px] p-2 flex justify-center items-center rounded">
								<h3 className="text-primarycream font-extrabold">
									<span className="text-dot">#</span>1
								</h3>
							</div>
						</div>
						<Separator className="bg-primaryaccent"></Separator>
					</div>

					{/* hero title */}
					<div className="relative rounded-2xl w-full h-[40vh] sm:h-[50vh] md:h-[60vh]">
						<ImageWithSkeleton src={faker.image.url()} />
						<div className="absolute inset-0 bg-linear-to-t from-primarymidnight/50 to-transparent rounded-2xl z-0"></div>

						<div className="absolute bottom-0 m-5 w-[20%]">
							<div
								className={` h-fit w-fit rounded-2xl p-1 ${animationForArrow}`}>
								<h1 className="text-accenttext text-2xl sm:text-3xl md:text-6xl font-extrabold tracking-tighter leading-[0.8]">
									{faker.book.series()}
									<span className="text-dot">.</span>
								</h1>
							</div>
						</div>
					</div>

					{/* content */}
					<div className="md:ml-[22%] md:mr-[22%] flex flex-col gap-4 mt-[3%] ">
						<PhotoCollectionGrid photoUrls={5}></PhotoCollectionGrid>
						<PhotoCollectionGrid photoUrls={8}></PhotoCollectionGrid>

						<div className="flex justify-between mt-10">
							<Link href={`/`}>
								<div className="text-primaryText flex gap-1">
									<ChevronLeft />
									Home
								</div>
							</Link>

							<Link href={`/photobook/${faker.string.uuid()}`}>
								<div className="text-primaryText flex gap-1">
									Next PhotoBook<ChevronRight></ChevronRight>
								</div>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PhotoBook;
