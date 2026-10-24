import Link from "next/link";
import type { Post } from "@/lib/posts";

const SeriesNav = ({
	series,
	posts,
	currentSlug,
}: {
	series?: string;
	posts: Post[];
	currentSlug: string;
}) => {
	if (!series || posts.length < 2) return null;

	const position = posts.findIndex((post) => post.slug === currentSlug) + 1;

	// Sits after the story so it works as a "keep reading" list rather than an interruption.
	return (
		<nav
			aria-label={`${series} series`}
			className="border-t border-primaryaccent/30 pt-4 text-sm text-primaryText/80">
			<p className="mb-2">
				<span className="font-semibold text-primaryaccent">{series}</span>
				{position > 0 && ` · Part ${position} of ${posts.length}`}
			</p>
			<ol className="flex list-decimal flex-col gap-1 pl-5">
				{posts.map((post) => (
					<li key={post.slug}>
						{post.slug === currentSlug ? (
							<span aria-current="page" className="font-semibold">
								{post.title}
							</span>
						) : (
							<Link href={post.href} className="hover:underline">
								{post.title}
							</Link>
						)}
					</li>
				))}
			</ol>
		</nav>
	);
};

export default SeriesNav;
