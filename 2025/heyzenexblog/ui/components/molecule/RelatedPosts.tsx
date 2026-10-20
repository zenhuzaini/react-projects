"use client";

import { useEffect, useState } from "react";
import StoryBookCard from "@/components/molecule/Cards/StoryBookCard";
import { TEXT } from "@/const/text";
import type { StoryBookMeta } from "@/types/data";

type StoryResponse = {
	metadata?: StoryBookMeta;
};

const RelatedPosts = ({
	slugs,
	title,
	currentSlug,
}: {
	slugs: string[];
	title?: string;
	currentSlug?: string;
}) => {
	const [loadedStories, setLoadedStories] = useState<{
		key: string;
		stories: StoryBookMeta[];
	} | null>(null);
	const slugsKey = Array.from(new Set(slugs))
		.filter((slug) => slug && slug !== currentSlug)
		.join("|");
	const stories = loadedStories?.key === slugsKey ? loadedStories.stories : [];

	useEffect(() => {
		let isActive = true;
		const selectedSlugs = slugsKey.split("|").filter(Boolean);

		if (selectedSlugs.length === 0) return;

		const loadStories = async () => {
			const results = await Promise.all(
				selectedSlugs.map(async (slug) => {
					try {
						const response = await fetch(
							`/api/stories/library?slug=${encodeURIComponent(slug)}`,
						);
						if (!response.ok) return null;
						const result = (await response.json()) as StoryResponse;
						return result.metadata ?? null;
					} catch {
						return null;
					}
				}),
			);

			if (isActive) {
				setLoadedStories({
					key: slugsKey,
					stories: results.filter(Boolean) as StoryBookMeta[],
				});
			}
		};

		void loadStories();
		return () => {
			isActive = false;
		};
	}, [currentSlug, slugsKey]);

	if (stories.length === 0) return null;

	return (
		<section className="my-8 space-y-4" aria-labelledby="related-posts-heading">
			<h2
				id="related-posts-heading"
				className="text-xl font-semibold text-primaryText">
				{title?.trim() || TEXT.common.relatedPosts}
			</h2>
			<div className="related-posts-scroller -mx-1 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-1 pb-4">
				{stories.map((story) => (
					<div
						key={story.slug}
						className="w-[min(78vw,18rem)] shrink-0 snap-start sm:w-60">
						<StoryBookCard story={story} />
					</div>
				))}
			</div>
		</section>
	);
};

export default RelatedPosts;
