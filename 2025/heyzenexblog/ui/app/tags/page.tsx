import type { Metadata } from "next";
import Link from "next/link";
import { getAllTags } from "@/lib/posts";
import { createBaseMetadata } from "@/lib/seo";

export const metadata: Metadata = createBaseMetadata({
	title: "Tags",
	description: "Browse every story and photo book by topic.",
	path: "/tags",
});

const TagsPage = async () => {
	const tags = await getAllTags();

	return (
		<div className="mx-auto flex w-full max-w-3xl flex-col gap-6 py-6 sm:py-10">
			<h1 className="text-3xl font-extrabold text-primaryaccent sm:text-4xl">
				Tags
			</h1>
			<ul className="flex flex-wrap gap-3">
				{tags.map(({ slug, label, count }) => (
					<li key={slug}>
						<Link
							href={`/tags/${slug}`}
							className="inline-block rounded-2xl border border-primaryaccent px-4 py-2 text-primaryText transition-transform duration-300 hover:-translate-y-0.5">
							<span className="text-dot">#</span>
							{label}{" "}
							<span className="text-sm text-primaryText/70">({count})</span>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default TagsPage;
