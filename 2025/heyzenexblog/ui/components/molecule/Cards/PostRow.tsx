import Link from "next/link";
import { ImageWithSkeleton } from "@/components/molecule/ImageWithSkeleton";
import type { Post } from "@/lib/posts";
import { formatDate } from "@/lib/utils";

const PostRow = ({ post }: { post: Post }) => (
	<Link
		href={post.href}
		className="group flex gap-4 rounded-2xl p-2 transition-colors hover:bg-primaryaccent/10 sm:gap-6">
		<div className="relative h-24 w-32 shrink-0 sm:h-32 sm:w-52">
			<ImageWithSkeleton
				src={post.cover}
				alt={post.title}
				rounded="rounded-2xl"
				customClassName="object-cover"
			/>
		</div>
		<div className="flex min-w-0 flex-col justify-center gap-1">
			<p className="text-xs font-semibold uppercase tracking-widest text-primaryaccent">
				{post.kind === "storybook" ? "StoryBook" : "PhotoBook"}
			</p>
			<h2 className="text-lg font-bold leading-tight text-primaryText sm:text-2xl">
				{post.title}
			</h2>
			<p className="text-xs text-primaryText/70 sm:text-sm">
				{formatDate(post.datePublished)}
			</p>
			<p className="line-clamp-2 hidden text-sm font-light text-primaryText sm:block">
				{post.description}
			</p>
		</div>
	</Link>
);

export default PostRow;
