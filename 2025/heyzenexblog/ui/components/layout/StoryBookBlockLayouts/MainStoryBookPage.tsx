import { animationForArrow } from "@/animation/animation";
import { ImageWithSkeleton } from "@/components/molecule/ImageWithSkeleton";
import ChevronLeft from "@/icons/ChevronLeft";
import ChevronRight from "@/icons/ChevronRight";
import { Separator } from "@radix-ui/react-separator";
import ShortDescription from "./1_ShortDescription/ShortDescription";
import Paragraph from "./2_BasicPharagraph/Paragraph";
import PhotoPharagraph from "./3_PhotoParagraph/PhotoPharagraph";
import PharagraphPhoto from "./4_PharagraphPhoto/PharagraphPhoto";
import FullPhoto from "./5_FullPhoto/FullPhoto";
import PhotoCollectionGrid from "./6_PhotoCollectionGrid/PhotoCollectionGrid";
import Link from "next/link";
import { MainStoryBookPageProps, StoryContentType } from "@/types/components";
import SectionTitle from "./9_SectionTitle/SectionTitle";
import EyeSymbol from "@/icons/EyeSymbol";
import HeartOutlined from "@/icons/HeartOutlined";
import MapWithDescription from "./10_MapDescription/MapWithDescription";
import Checklist from "./Lists/Lists";
import ItemList from "./Lists/ItemLists";
import { IframeWithLoader } from "@/components/molecule/Iframe/IframeWithLoader";
import RelatedPosts from "@/components/molecule/RelatedPosts";

const MainStoryBookPage = ({
	storySlug,
	createdAt,
	storyCover,
	storyId,
	storyTitle,
	storyDescription,
	storyTags = [],
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

			case "layout10":
				return (
					<MapWithDescription
						key={idx}
						center={storyContent?.center}
						route={storyContent?.route}
						description={storyContent?.textContent}
						shouldShowDownloadGPX={storyContent?.shouldShowDownloadGPX}
						title={storyContent?.title}
					/>
				);

			case "layout11":
				return <Checklist key={idx} items={storyContent.items ?? []} />;

			case "layout12":
				return <ItemList key={idx} items={storyContent.items ?? []} />;

			case "layout13":
				return storyContent.url ? (
					<IframeWithLoader key={idx} src={storyContent.url} />
				) : null;

			case "layout14":
				return (
					<div key={idx} className="sm:flex w-full items-center justify-end">
						<div className="h-1 w-full rounded-3xl bg-primaryaccent" />
					</div>
				);

			case "layout15":
				return (
					<strong key={idx} className="font-bold text-primaryaccent">
						{storyContent.textContent}
					</strong>
				);

			case "layout16":
				return (
					<div
						key={idx}
						className="rounded-md border border-dashed border-primarybrown/30 p-4 text-sm text-primarygrey">
						Imported MDX source is preserved and editable in the Story content
						block.
					</div>
				);

			case "layout17":
				return (
					<RelatedPosts
						key={idx}
						slugs={storyContent.relatedStorySlugs ?? []}
						title={storyContent.textContent}
						currentSlug={storySlug}
					/>
				);

			default:
				return null;
		}
	};

	const constructContent = storyContent.map((content, idx) => {
		return sectionMapping(content, idx);
	});

	return (
		<article className="flex flex-col gap-2 ">
			{/* info top */}
			<section className="flex flex-col gap-2">
				<div className="flex justify-between items-center">
					<div className="flex flex-col text-xs md:text-lg">
						<p className="text-primarytextInvert font-extralight">StoryBook</p>
						<p className="text-xs text-primarytextInvert md:text-sm tracking-tight">
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
			</section>

			{/* hero title & sats */}
			<section className="flex flex-col gap-2 sm:gap-4">
				<div className="relative h-[40vh] min-h-80 w-full rounded-2xl sm:h-[50vh] sm:min-h-[380px] md:h-[60vh] md:min-h-[420px]">
					<ImageWithSkeleton alt={storyDescription} src={storyCover} />
					<div className="absolute inset-0 bg-linear-to-t from-primarymidnight/50 to-transparent rounded-2xl z-0"></div>

					<div className="absolute bottom-0 left-0 m-4 w-3/4 max-w-2xl sm:m-5">
						<div
							className={` h-fit w-fit rounded-2xl p-1 ${animationForArrow}`}>
							<h1 className="warap-break-words text-2xl font-extrabold leading-[0.95] text-accenttext sm:text-4xl md:text-5xl">
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
							<span className="text-primarytextInvert">
								{totalView.toLocaleString()}
							</span>
						</div>
						<div className="flex text-sm md:text-lg gap-1 sm:gap-2 pl-2 pr-2 rounded-lg items-center ">
							<HeartOutlined
								className="stroke-primaryaccent"
								size={4}></HeartOutlined>
							<span className="text-primarytextInvert">
								{totalLike.toLocaleString()}
							</span>
						</div>
					</div>
					<div className="hidden md:flex flex-wrap justify-end gap-2">
						{storyTags.map((tag) => (
							<div key={tag} className="flex items-center justify-center">
								<h6 className="text-primarycream p-2 rounded-sm bg-primaryaccent text-sm">
									<span className="text-dot">#</span>
									{tag}
								</h6>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* content */}
			<section className="lg:ml-[20%] lg:mr-[20%] flex flex-col gap-2 sm:gap-5 mt-[3%] rounded-3xl dark:bg-transparent ">
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
			</section>
		</article>
	);
};

export default MainStoryBookPage;
