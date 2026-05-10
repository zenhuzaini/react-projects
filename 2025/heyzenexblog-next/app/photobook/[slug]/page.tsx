import { animationForArrow } from "@/animation/animation";
import PhotoCollectionGrid from "@/components/layout/StoryBookBlockLayouts/6_PhotoCollectionGrid/PhotoCollectionGrid";
import { ImageWithSkeleton } from "@/components/molecule/ImageWithSkeleton";
import { NOT_FOUND_METADATA } from "@/const/metadata";
import ChevronLeft from "@/icons/ChevronLeft";
import ChevronRight from "@/icons/ChevronRight";
import { getPhotoBookBySlug } from "@/lib/photobook";
import { createBaseMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";
import { photoMock } from "@/mock/photo";
import { faker } from "@faker-js/faker";
import { Separator } from "@radix-ui/react-separator";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateMetadata(props: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	// Unwrap the promise
	const { slug } = await props.params;

	// Fetch the story by slug
	const story = await getPhotoBookBySlug(slug);

	if (!story?.metadata) {
		return NOT_FOUND_METADATA;
	}

	const { metadata } = story;

	const fullMetadata: Metadata = createBaseMetadata({
		title: metadata.title,
		description:
			metadata.description ?? `${metadata.title} – a story by Zen Huzaini.`,
		path: `/photobook/${metadata.slug}`,
		keywords: metadata.tags,
		ogImage: {
			url: metadata.cover,
			alt: metadata.title,
		},
		robotsIndex: true,
	});

	return fullMetadata;
}

const PhotoBook = async ({ params }: { params: Promise<{ slug: string }> }) => {
	const { slug } = await params;
	const story = await getPhotoBookBySlug(slug);

	if (!story) return notFound();

	const { Content, metadata } = story;

	const publishedDate = new Date(metadata.datePublished);
	const isValidPublishedDate = !isNaN(publishedDate.getTime());
	const formattedPublishedDate = formatDate(
		metadata.datePublished,
		isValidPublishedDate,
	);

	const activityDate = new Date(metadata.eventDateTo);
	const isValidActivityDate = !isNaN(activityDate.getTime());
	const formattedActivityDate = formatDate(
		metadata.eventDateTo,
		isValidActivityDate,
	);
	return (
		<div className="flex flex-col gap-2">
			{/* info top */}
			<div className="flex flex-col gap-2">
				<div className="flex justify-between items-center">
					<div className="flex flex-col text-xs md:text-lg">
						<p className="text-primarytextInvert font-extralight">PhotoBook</p>
						<p className="text-[10px] text-primarytextInvert md:text-sm tracking-tight">
							<span className="font-extralight">Written on</span> 22 Jan 2025
						</p>
					</div>
					<div className="bg-primaryaccent w-fit sm:text-base text-[10px] p-2 flex justify-center items-center rounded">
						<h3 className="text-primarycream font-extrabold">
							<span className="text-dot">#</span>1
						</h3>
					</div>
				</div>
				<div className="hidden md:flex">
					<Separator className="bg-primaryaccent"></Separator>
				</div>
			</div>

			{/* hero title */}
			<div className="relative rounded-2xl w-full h-[40vh] sm:h-[50vh] md:h-[60vh]">
				<ImageWithSkeleton src={faker.image.url()} />
				<div className="absolute inset-0 bg-linear-to-t from-primarymidnight/50 to-transparent rounded-2xl z-0"></div>

				<div className="absolute bottom-0 m-5 w-[20%]">
					<div className={` h-fit w-fit rounded-2xl p-1 ${animationForArrow}`}>
						<h1 className="text-accenttext text-2xl sm:text-3xl md:text-6xl font-extrabold tracking-tighter leading-[0.8]">
							{faker.book.series()}
							<span className="text-dot">.</span>
						</h1>
					</div>
				</div>
			</div>

			{/* content */}
			<div className="md:ml-[22%] md:mr-[22%] flex flex-col gap-4 mt-[3%] ">
				{/* <PhotoCollectionGrid photoUrls={5}></PhotoCollectionGrid> */}
				<PhotoCollectionGrid
					photo={photoMock({ length: 8 })}></PhotoCollectionGrid>

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
	);
};

export default PhotoBook;
