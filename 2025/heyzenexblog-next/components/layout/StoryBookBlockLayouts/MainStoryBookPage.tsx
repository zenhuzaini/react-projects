import { animationForArrow } from "@/animation/animation";
import { ImageWithSkeleton } from "@/components/molecule/ImageWithSkeleton";
import ChevronLeft from "@/icons/ChevronLeft";
import ChevronRight from "@/icons/ChevronRight";
import { faker } from "@faker-js/faker";
import { Separator } from "@radix-ui/react-separator";
import ShortDescription from "./1_ShortDescription/ShortDescription";
import Paragraph from "./2_BasicPharagraph/Paragraph";
import PhotoPharagraph from "./3_PhotoParagraph/PhotoPharagraph";
import PharagraphPhoto from "./4_PharagraphPhoto/PharagraphPhoto";
import FullPhoto from "./5_FullPhoto/FullPhoto";
import PhotoCollectionGrid from "./6_PhotoCollectionGrid/PhotoCollectionGrid";
import SectioonTitle from "./9_SectionTitle/SectioonTitle";
import Link from "next/link";
import { MainStoryBookPageProps } from "@/types/components";

const MainStoryBookPage = ({
	createdAt,
	storyCover,
	storyId,
	storyTitle,
	storyDescription,
	storyPhotoUrls,
	storyContent,
}: MainStoryBookPageProps) => {
	return (
		<div className="flex flex-col gap-2">
			{/* info top */}
			<div className="flex flex-col gap-2">
				<div className="flex justify-between items-center">
					<div className="flex flex-col text-xs md:text-lg">
						<p className="text-primarytextInvert font-extralight">StoryBook</p>
						<p className="text-[8px] text-primarytextInvert md:text-sm tracking-tight">
							<span className="font-extralight">Written on</span> {createdAt}
						</p>
					</div>
					<div className="bg-primaryaccent w-fit sm:text-base text-[10px] p-2 flex justify-center items-center rounded">
						<h3 className="text-primarycream font-extrabold">
							<span className="text-dot">#</span>
							{storyId}
						</h3>
					</div>
				</div>
				<div className="hidden md:flex">
					<Separator className="bg-primaryaccent"></Separator>
				</div>
			</div>

			{/* hero title */}
			<div className="relative rounded-2xl w-full h-[40vh] sm:h-[50vh] md:h-[60vh]">
				<ImageWithSkeleton src={storyCover} />
				<div className="absolute inset-0 bg-linear-to-t from-primarymidnight/50 to-transparent rounded-2xl z-0"></div>

				<div className="absolute bottom-0 m-5 w-[20%]">
					<div className={` h-fit w-fit rounded-2xl p-1 ${animationForArrow}`}>
						<h1 className="text-accenttext text-2xl sm:text-3xl md:text-6xl font-extrabold tracking-tighter leading-[0.8]">
							{storyTitle}
							<span className="text-dot">.</span>
						</h1>
					</div>
				</div>
			</div>

			{/* content */}
			<div className="md:ml-[22%] md:mr-[22%] flex flex-col gap-5 sm:gap-10 mt-[3%] ">
				<ShortDescription text={storyDescription}></ShortDescription>
				<PhotoPharagraph></PhotoPharagraph>
				<SectioonTitle></SectioonTitle>
				<PhotoCollectionGrid photoUrls={storyPhotoUrls}></PhotoCollectionGrid>

				<PharagraphPhoto></PharagraphPhoto>
				<FullPhoto></FullPhoto>
				<Paragraph></Paragraph>

				<div className="flex justify-between">
					<Link href={`/`}>
						<div className="text-primaryText flex gap-1">
							<ChevronLeft />
							Home
						</div>
					</Link>

					<Link href={`/storybook/${faker.string.uuid()}`}>
						<div className="text-primaryText flex gap-1">
							Next Story<ChevronRight></ChevronRight>
						</div>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default MainStoryBookPage;
