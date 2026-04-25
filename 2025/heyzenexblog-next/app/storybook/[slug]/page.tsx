import { animationForArrow } from "@/animation/animation";
import { ImageWithSkeleton } from "@/components/molecule/ImageWithSkeleton";
import ChevronLeft from "@/icons/ChevronLeft";
import ChevronRight from "@/icons/ChevronRight";
import { faker } from "@faker-js/faker";
import { Separator } from "@radix-ui/react-separator";
import Link from "next/link";
import EyeSymbol from "@/icons/EyeSymbol";
import HeartOutlined from "@/icons/HeartOutlined";
import { getAllSlugs, getStoryBySlug } from "@/lib/storybook";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { NOT_FOUND_METADATA } from "@/const/metadata";
import Chip from "@/components/ui/chip";
import { createBaseMetadata } from "@/lib/seo";
import HeaderInfoSection from "@/components/layout/StoryBookBlockLayouts/HeaderInfoSection";

export async function generateMetadata(props: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	// Unwrap the promise
	const { slug } = await props.params;

	// Fetch the story by slug
	const story = await getStoryBySlug(slug);

	if (!story?.metadata) {
		return NOT_FOUND_METADATA;
	}

	const { metadata } = story;

	const fullMetadata: Metadata = createBaseMetadata({
		title: metadata.title,
		description:
			metadata.description ?? `${metadata.title} – a story by Zen Huzaini.`,
		path: `/storybook/${metadata.slug}`,
		keywords: metadata.tags,
		ogImage: {
			url: metadata.cover,
			alt: metadata.title,
		},
		robotsIndex: true,
	});

	return fullMetadata;
}

const Story = async ({ params }: { params: Promise<{ slug: string }> }) => {
	const { slug } = await params;
	const story = await getStoryBySlug(slug);

	if (!story) return notFound();

	const { Content, metadata } = story;

	const date = new Date(metadata.datePublished);
	const parts = {
		weekday: date.toLocaleDateString("en-US", { weekday: "short" }),
		month: date.toLocaleDateString("en-US", { month: "short" }),
		day: date.toLocaleDateString("en-US", { day: "2-digit" }),
		year: date.getFullYear(),
	};

	const formattedDate = `${parts.weekday}, ${parts.month} ${parts.day} ${parts.year}`;

	return (
		<article className="flex flex-col gap-2 ">
			{/* info top */}
			<HeaderInfoSection
				date={metadata.datePublished}
				id={metadata.id}></HeaderInfoSection>

			{/* hero title & sats */}
			<section className="flex flex-col gap-2 sm:gap-4">
				<div className="relative rounded-2xl w-full h-[40vh] sm:h-[50vh] md:h-[60vh]">
					<ImageWithSkeleton alt={metadata.description} src={metadata.cover} />
					<div className="absolute inset-0 bg-linear-to-t from-primarymidnight/50 to-transparent rounded-2xl z-0"></div>

					<div className="absolute bottom-0 m-5 w-[40%]">
						<div
							className={` h-fit w-fit rounded-2xl p-1 ${animationForArrow}`}>
							<h1 className="text-accenttext text-2xl sm:text-3xl md:text-6xl font-extrabold tracking-tighter leading-[0.8]">
								{metadata.title}
								<span className="text-dot">.</span>
							</h1>
						</div>
					</div>
				</div>
				{/* Stats */}
				<div className="flex justify-between">
					<div className="flex gap-0 sm:gap-2">
						<div className="flex text-sm md:text-lg gap-1 sm:gap-2  pl-2 pr-2 rounded-lg items-center">
							<EyeSymbol className="stroke-primaryaccent" size={4}></EyeSymbol>{" "}
							<span className="text-primarytextInvert">{metadata.views}</span>
						</div>
						<div className="flex text-sm md:text-lg gap-1 sm:gap-2 pl-2 pr-2 rounded-lg items-center ">
							<HeartOutlined
								className="stroke-primaryaccent"
								size={4}></HeartOutlined>
							<span className="text-primarytextInvert">{metadata.likes}</span>
						</div>
					</div>
					<div className="hidden md:flex gap-2">
						{metadata.tags.map((tag, _) => {
							return <Chip key={_} text={tag}></Chip>;
						})}
					</div>
				</div>
			</section>

			{/* content */}
			<section className="lg:ml-[20%] lg:mr-[20%] flex flex-col gap-2 sm:gap-5 mt-[3%] rounded-3xl dark:bg-transparent ">
				<Content></Content>

				<div className="flex justify-between mt-[5%]">
					<Link href={`/`}>
						<div className="text-primaryText flex gap-1">
							<ChevronLeft />
							Home
						</div>
					</Link>

					<Link href={`/storybook/${metadata.nextPostSlug}`}>
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

export default Story;

// used for mdx
export function generateStaticParams() {
	const slug = getAllSlugs();
	return slug;
}
