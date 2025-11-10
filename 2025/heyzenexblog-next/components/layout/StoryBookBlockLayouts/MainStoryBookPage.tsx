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
import Link from "next/link";
import { MainStoryBookPageProps, StoryContentType } from "@/types/components";
import { EMPTY_STRING } from "@/const/vars";
import { photoMockStatic } from "@/mock/photo";
import SectionTitle from "./9_SectionTitle/SectionTitle";
import EyeSymbol from "@/icons/EyeSymbol";
import HeartOutlined from "@/icons/HeartOutlined";

const MainStoryBookPage = ({
	createdAt,
	storyCover,
	storyId,
	storyTitle,
	storyDescription,
	storyPhotoUrls,
	storyContent,
	totalView,
	totalLike,
}: MainStoryBookPageProps) => {
	const sectionMapping = (storyContent: StoryContentType, idx: number) => {
		switch (storyContent?.sectionID) {
			case "layout1":
				return (
					<ShortDescription
						key={idx}
						text={storyContent?.textContent}></ShortDescription>
				);

			case "layout2":
				return (
					<Paragraph key={idx} text={storyContent?.textContent}></Paragraph>
				);
				break;

			case "layout3":
				return (
					<PhotoPharagraph
						key={idx}
						photo={storyContent?.photoUrls[0]}
						text={storyContent?.textContent}></PhotoPharagraph>
				);
				break;

			case "layout4":
				return (
					<PharagraphPhoto
						key={idx}
						photo={storyContent?.photoUrls[0]}
						text={storyContent?.textContent}></PharagraphPhoto>
				);
				break;

			case "layout5":
				return (
					<FullPhoto key={idx} photo={storyContent?.photoUrls[0]}></FullPhoto>
				);
				break;

			case "layout6":
				return (
					<PhotoCollectionGrid
						key={idx}
						photo={storyContent?.photoUrls}></PhotoCollectionGrid>
				);
				break;

			case "layout7":
				break;

			case "layout8":
				break;

			case "layout9":
				return (
					<div className="mt-[5%] sm:mt-[3%]" key={idx}>
						<SectionTitle
							key={idx}
							text={storyContent.textContent}></SectionTitle>
					</div>
				);
				break;

			default:
				return (
					<PhotoCollectionGrid
						key={idx}
						photo={photoMockStatic}></PhotoCollectionGrid>
				);
				break;
		}
	};

	const constructContent = storyContent.map((content, idx) => {
		return sectionMapping(content, idx);
	});

	return (
		<main className="flex flex-col gap-2 ">
			{/* info top */}
			<div className="flex flex-col gap-2">
				<div className="flex justify-between items-center">
					<div className="flex flex-col text-xs md:text-lg">
						<p className="text-primarytextInvert font-extralight">StoryBook</p>
						<p className="text-[10px] text-primarytextInvert md:text-sm tracking-tight">
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

			{/* hero title & sats */}
			<div className="flex flex-col gap-2 sm:gap-4">
				<div className="relative rounded-2xl w-full h-[40vh] sm:h-[50vh] md:h-[60vh]">
					<ImageWithSkeleton alt={storyDescription} src={storyCover} />
					<div className="absolute inset-0 bg-linear-to-t from-primarymidnight/50 to-transparent rounded-2xl z-0"></div>

					<div className="absolute bottom-0 m-5 w-[20%]">
						<div
							className={` h-fit w-fit rounded-2xl p-1 ${animationForArrow}`}>
							<h1 className="text-accenttext text-2xl sm:text-3xl md:text-6xl font-extrabold tracking-tighter leading-[0.8]">
								{storyTitle}
								<span className="text-dot">.</span>
							</h1>
						</div>
					</div>
				</div>
				{/* Stats */}
				<div className="flex justify-between">
					<div className="flex gap-0 sm:gap-2">
						<div className="flex text-sm md:text-lg sm:gap-2  pl-2 pr-2 rounded-lg items-center">
							<EyeSymbol className="stroke-primaryaccent" size={4}></EyeSymbol>{" "}
							<span className="text-primarytextInvert">12.k</span>
						</div>
						<div className="flex text-sm md:text-lg gap-1 sm:gap-2 pl-2 pr-2 rounded-lg items-center ">
							<HeartOutlined
								className="stroke-primaryaccent"
								size={4}></HeartOutlined>
							<span className="text-primarytextInvert">100</span>
						</div>
					</div>
					<div className="hidden md:flex gap-2">
						<div className="flex items-center justify-center">
							<h6 className="text-primarycream p-2 rounded-sm bg-primaryaccent text-sm">
								<span className="text-dot">#</span>adventure
							</h6>
						</div>
						<div className="flex items-center justify-center">
							<h6 className="text-primarycream p-2 rounded-sm bg-primaryaccent text-sm">
								<span className="text-dot">#</span>travel
							</h6>
						</div>
						<div className="flex items-center justify-center">
							<h6 className="text-primarycream p-2 rounded-sm bg-primaryaccent text-sm">
								<span className="text-dot">#</span>brazil
							</h6>
						</div>
					</div>
				</div>
			</div>

			{/* content */}
			<div className="lg:ml-[20%] lg:mr-[20%] flex flex-col gap-2 sm:gap-5 mt-[3%] rounded-3xl dark:bg-transparent ">
				<div className="text-center">
					<ShortDescription text={storyDescription}></ShortDescription>
				</div>

				{constructContent}

				<div className="flex justify-between mt-[5%]">
					<Link href={`/`}>
						<div className="text-primaryText flex gap-1">
							<ChevronLeft />
							Home
						</div>
					</Link>

					<Link href={`/storybook/1`}>
						<div className="text-primaryText flex gap-1">
							<span>Next StoryBook</span>
							<ChevronRight></ChevronRight>
						</div>
					</Link>
				</div>
			</div>
		</main>
	);
};

export default MainStoryBookPage;
