import { animationForArrow } from "@/animation/animation";
import HeaderInfoSection from "@/components/layout/StoryBookBlockLayouts/HeaderInfoSection";
import { ImageWithSkeleton } from "@/components/molecule/ImageWithSkeleton";
import DisqusComments from "@/components/molecule/DisqusComments";
import JsonLd from "@/components/molecule/JsonLd";
import PostPagination from "@/components/molecule/PostPagination";
import TagList from "@/components/molecule/TagList";
import { NOT_FOUND_METADATA } from "@/const/metadata";
import { getAllPhotoBookSlugs, getPhotoBookBySlug } from "@/lib/photobook";
import { getAdjacentPosts, getPost } from "@/lib/posts";
import {
	createBlogPostingJsonLd,
	createPostMetadata,
	postOgImagePath,
} from "@/lib/seo";
import { formatDate } from "@/lib/utils";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata(props: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await props.params;
	const post = await getPost("photobook", slug);

	return post ? createPostMetadata(post) : NOT_FOUND_METADATA;
}

const PhotoBook = async ({ params }: { params: Promise<{ slug: string }> }) => {
	const { slug } = await params;
	const story = await getPhotoBookBySlug(slug);
	const post = await getPost("photobook", slug);

	if (!story || !post) return notFound();

	const { Content, metadata } = story;
	const { prev, next } = await getAdjacentPosts("photobook", slug);

	const formattedPublishedDate = formatDate(metadata.datePublished);

	return (
		<div className="flex flex-col gap-2">
			<JsonLd data={createBlogPostingJsonLd(post, postOgImagePath(post))} />
			{/* info top */}
			<HeaderInfoSection
				text="PhotoBook"
				date={formattedPublishedDate}
				id={metadata.id}></HeaderInfoSection>

			{/* hero title */}
			<div className="relative rounded-2xl w-full h-[40vh] sm:h-[50vh] md:h-[60vh]">
				<ImageWithSkeleton
					alt={metadata.description}
					src={metadata.cover}
					loading="eager"
				/>
				<div className="absolute inset-0 bg-linear-to-t from-primarymidnight/50 to-transparent rounded-2xl z-0"></div>

				<div className="absolute bottom-0 m-5 w-[20%]">
					<div className={` h-fit w-fit rounded-2xl p-1 ${animationForArrow}`}>
						<h1 className="text-accenttext text-2xl sm:text-3xl md:text-6xl font-extrabold tracking-tighter leading-[0.8]">
							{metadata.title}
							<span className="text-dot">.</span>
						</h1>
					</div>
				</div>
			</div>

			{/* content */}
			<div className="md:ml-[22%] md:mr-[22%] flex flex-col gap-4 mt-[3%] ">
				{/* <PhotoCollectionGrid photoUrls={5}></PhotoCollectionGrid> */}
				<Content></Content>
				<TagList tags={metadata.tags} />
				<DisqusComments
					identifier={`photobook/${metadata.slug}`}
					title={metadata.title}
				/>

				<PostPagination prev={prev} next={next} className="mt-10" />
			</div>
		</div>
	);
};

export default PhotoBook;

export function generateStaticParams() {
	return getAllPhotoBookSlugs();
}
