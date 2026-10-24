import { animationForArrow } from "@/animation/animation";
import { ImageWithSkeleton } from "@/components/molecule/ImageWithSkeleton";
import EyeSymbol from "@/icons/EyeSymbol";
import HeartOutlined from "@/icons/HeartOutlined";
import { getAllSlugs, getStoryBySlug } from "@/lib/storybook";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { NOT_FOUND_METADATA } from "@/const/metadata";
import {
	createBlogPostingJsonLd,
	createPostMetadata,
	postOgImagePath,
} from "@/lib/seo";
import { getAdjacentPosts, getPost, getSeriesPosts } from "@/lib/posts";
import {
	getReadingMinutes,
	getSectionHeadings,
	readMdxSource,
} from "@/lib/content";
import HeaderInfoSection from "@/components/layout/StoryBookBlockLayouts/HeaderInfoSection";
import ActivityAvatar from "@/components/molecule/User/Avatar/ActivityAvatar";
import DisqusComments from "@/components/molecule/DisqusComments";
import JsonLd from "@/components/molecule/JsonLd";
import PostPagination from "@/components/molecule/PostPagination";
import SeriesNav from "@/components/molecule/SeriesNav";
import TableOfContents from "@/components/molecule/TableOfContents";
import TagList from "@/components/molecule/TagList";
import { formatDate } from "@/lib/utils";

export async function generateMetadata(props: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await props.params;
	const post = await getPost("storybook", slug);

	return post ? createPostMetadata(post) : NOT_FOUND_METADATA;
}

const Story = async ({ params }: { params: Promise<{ slug: string }> }) => {
	const { slug } = await params;
	const story = await getStoryBySlug(slug);
	const post = await getPost("storybook", slug);

	if (!story || !post) return notFound();

	const { Content, metadata } = story;
	const [{ prev, next }, seriesPosts] = await Promise.all([
		getAdjacentPosts("storybook", slug),
		getSeriesPosts("storybook", post.series),
	]);
	const source = readMdxSource("mystorybook", slug) ?? "";
	const readingMinutes = getReadingMinutes(source);
	const headings = getSectionHeadings(source);

	const formattedPublishedDate = formatDate(metadata.datePublished);
	const formattedActivityDate = formatDate(metadata.eventDateTo);

	return (
		<article className="flex flex-col gap-2 ">
			<JsonLd data={createBlogPostingJsonLd(post, postOgImagePath(post))} />
			{/* info top */}
			<HeaderInfoSection
				date={formattedPublishedDate}
				id={metadata.id}></HeaderInfoSection>

			{/* hero title & sats */}

			<section className="flex flex-col gap-2 sm:gap-4">
				<div className="relative h-[40vh] min-h-80 w-full rounded-2xl sm:h-[50vh] sm:min-h-[380px] md:h-[60vh] md:min-h-[420px]">
					<ImageWithSkeleton
						alt={metadata.description}
						src={metadata.cover}
						loading="eager"
					/>
					<div className="absolute inset-0 bg-linear-to-t from-primarymidnight/50 to-transparent rounded-2xl z-0"></div>

					<div className="absolute bottom-0 left-0 m-4 w-3/4 max-w-2xl sm:m-5">
						<div
							className={` h-fit w-fit rounded-2xl p-1 ${animationForArrow}`}>
							<h1 className="wrap-break-words text-2xl font-extrabold leading-[0.8] text-accenttext sm:text-4xl md:text-5xl">
								{metadata.title}
								<span className="text-dot">.</span>
							</h1>
						</div>
					</div>
				</div>
				{/* Stats */}
				<div className="flex justify-between">
					<ActivityAvatar
						activityType={metadata.activityType}
						alt="User Avatar"
						avatarName="Zen"
						publishedDate={formattedActivityDate}></ActivityAvatar>
					<span className="text-sm text-primarytextInvert">
						{readingMinutes} min read
					</span>
					{/* love stats */}
					<div className="hidden gap-0 sm:gap-2">
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
					{/* Tags */}
				</div>
			</section>

			{/* content */}
			<section className="lg:ml-[20%] lg:mr-[20%] flex flex-col gap-2 sm:gap-5 mt-[3%] rounded-3xl dark:bg-transparent ">
				<SeriesNav
					series={post.series}
					posts={seriesPosts}
					currentSlug={slug}
				/>
				<TableOfContents headings={headings} />
				<Content></Content>

				<TagList tags={metadata.tags} />

				<DisqusComments
					identifier={`storybook/${metadata.slug}`}
					title={metadata.title}
				/>

				<PostPagination prev={prev} next={next} className="mt-[5%]" />
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
