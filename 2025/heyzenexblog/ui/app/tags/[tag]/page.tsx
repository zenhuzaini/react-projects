import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PostRow from "@/components/molecule/Cards/PostRow";
import { NOT_FOUND_METADATA } from "@/const/metadata";
import { getAllTags, getPostsByTag } from "@/lib/posts";
import { createBaseMetadata } from "@/lib/seo";

type Props = { params: Promise<{ tag: string }> };

const decodeTag = (tag: string) => {
	try {
		return decodeURIComponent(tag);
	} catch {
		return tag;
	}
};

export async function generateStaticParams() {
	const tags = await getAllTags();
	return tags.map(({ slug }) => ({ tag: slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const slug = decodeTag((await params).tag);
	const { label, posts } = await getPostsByTag(slug);
	if (!posts.length) return NOT_FOUND_METADATA;

	return createBaseMetadata({
		title: `#${label}`,
		description: `${posts.length} ${posts.length === 1 ? "post" : "posts"} tagged ${label} by Zen Huzaini.`,
		path: `/tags/${slug}`,
	});
}

const TagPage = async ({ params }: Props) => {
	const slug = decodeTag((await params).tag);
	const { label, posts } = await getPostsByTag(slug);
	if (!posts.length) return notFound();

	return (
		<div className="mx-auto flex w-full max-w-3xl flex-col gap-6 py-6 sm:py-10">
			<header className="flex flex-col gap-2">
				<h1 className="text-3xl font-extrabold text-primaryaccent sm:text-4xl">
					<span className="text-dot">#</span>
					{label}
				</h1>
				<p className="text-primaryText/80">
					{posts.length} {posts.length === 1 ? "post" : "posts"} ·{" "}
					<Link href="/tags" className="underline">
						all tags
					</Link>
				</p>
			</header>
			<div className="flex flex-col gap-4">
				{posts.map((post) => (
					<PostRow key={post.href} post={post} />
				))}
			</div>
		</div>
	);
};

export default TagPage;
