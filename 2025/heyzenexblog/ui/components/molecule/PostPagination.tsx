import Link from "next/link";
import ChevronLeft from "@/icons/ChevronLeft";
import ChevronRight from "@/icons/ChevronRight";
import type { Post } from "@/lib/posts";

const label = (kind: Post["kind"]) =>
	kind === "storybook" ? "StoryBook" : "PhotoBook";

const PostPagination = ({
	prev,
	next,
	className = "",
}: {
	prev: Post | null;
	next: Post | null;
	className?: string;
}) => (
	<nav
		aria-label="More posts"
		className={`flex items-start justify-between gap-4 ${className}`}>
		{prev ? (
			<Link href={prev.href} className="text-primaryText">
				<span className="flex gap-1">
					<ChevronLeft />
					Previous {label(prev.kind)}
				</span>
			</Link>
		) : (
			<Link href="/" className="text-primaryText">
				<span className="flex gap-1">
					<ChevronLeft />
					Home
				</span>
			</Link>
		)}
		{next && (
			<Link href={next.href} className="text-primaryText">
				<span className="flex gap-1">
					Next {label(next.kind)}
					<ChevronRight />
				</span>
			</Link>
		)}
	</nav>
);

export default PostPagination;
