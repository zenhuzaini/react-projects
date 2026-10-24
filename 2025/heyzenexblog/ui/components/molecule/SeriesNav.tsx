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

	return (
		<nav
			aria-label={`${series} series`}
			className="rounded-2xl border border-primaryaccent p-4">
			<p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primaryaccent">
				Part of the series: {series}
			</p>
			<ol className="flex list-decimal flex-col gap-1 pl-5 text-primaryText">
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
