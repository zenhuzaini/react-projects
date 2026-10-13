"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import Link from "next/link";
import { ImageWithSkeleton } from "@/components/molecule/ImageWithSkeleton";
import SectionTitle from "@/components/layout/HomepageBlockLayouts/SectionTitle";
import type { StoryBookMeta } from "@/types/data";

const PAGE_SIZE = 3;

const formatDate = (value: string) => {
	const date = new Date(value);
	return Number.isNaN(date.getTime())
		? "StoryBook"
		: date.toLocaleDateString("en-GB", { month: "short", year: "numeric" });
};

const StoryBookGallery = ({ stories }: { stories: StoryBookMeta[] }) => {
	const [query, setQuery] = useState("");
	const [page, setPage] = useState(1);
	const normalizedQuery = query.trim().toLowerCase();
	const filteredStories = stories.filter((story) =>
		[
			story.title,
			story.slug,
			story.description,
			story.city,
			story.country,
			...story.tags,
		]
			.join(" ")
			.toLowerCase()
			.includes(normalizedQuery),
	);
	const pageCount = Math.max(1, Math.ceil(filteredStories.length / PAGE_SIZE));
	const currentPage = Math.min(page, pageCount);
	const visibleStories = filteredStories.slice(
		(currentPage - 1) * PAGE_SIZE,
		currentPage * PAGE_SIZE,
	);

	return (
		<section className="flex flex-col gap-5 sm:gap-8">
			<SectionTitle left="My" right="STORIES" />

			<div className="flex flex-col gap-3 border-y border-primarybrown/20 py-4 sm:flex-row sm:items-center sm:justify-between">
				<label className="relative flex w-full max-w-xl items-center">
					<Search
						size={18}
						aria-hidden="true"
						className="pointer-events-none absolute left-3 text-primarygrey"
					/>
					<input
						type="search"
						value={query}
						onChange={(event) => {
							setQuery(event.target.value);
							setPage(1);
						}}
						placeholder="Search stories, places, or tags"
						aria-label="Search stories, places, or tags"
						className="h-11 w-full rounded-md border border-primarybrown/25 bg-primarywhite pl-10 pr-10 text-sm text-primaryText outline-none transition-colors placeholder:text-primarygrey/80 focus:border-secondaryforestgreen"
					/>
					{query && (
						<button
							type="button"
							aria-label="Clear search"
							onClick={() => {
								setQuery("");
								setPage(1);
							}}
							className="absolute right-2 inline-flex size-8 items-center justify-center rounded text-primarygrey hover:bg-secondarywhite hover:text-primaryText">
							<X size={16} />
						</button>
					)}
				</label>
				<p aria-live="polite" className="shrink-0 text-sm text-primarygrey">
					{filteredStories.length}{" "}
					{filteredStories.length === 1 ? "story" : "stories"}
				</p>
			</div>

			{visibleStories.length ? (
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{visibleStories.map((story) => (
						<Link
							key={story.slug}
							href={`/storybook/${story.slug}`}
							aria-label={`${story.title}, ${story.city}, ${story.country}`}
							className="group relative mx-auto block aspect-9/16 w-full max-w-[360px] overflow-hidden rounded-2xl border border-primarybrown/20 bg-primarymidnight shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondaryforestgreen">
							<ImageWithSkeleton
								src={story.cover}
								alt={story.title}
								rounded="rounded-2xl"
								customClassName="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
							/>
							<div className="absolute inset-0 bg-linear-to-b from-primarymidnight/35 via-transparent to-primarymidnight/90" />
							<div className="absolute inset-x-0 top-0 space-y-5 p-5 sm:space-y-7 sm:p-6">
								<p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/75">
									StoryBook{" "}
									<span className="text-primaryaccent">#{story.id}</span>
								</p>
								<h2 className="line-clamp-4 text-3xl font-light leading-[1.08] text-white sm:text-4xl">
									{story.title}
								</h2>
								<div className="h-px w-full bg-white/60" />
								<p className="text-sm font-medium text-white/85">
									{story.city}
									{story.city && story.country ? ", " : ""}
									{story.country}
								</p>
							</div>
							<div className="absolute inset-x-0 bottom-0 space-y-3 p-5 sm:p-6">
								<p className="line-clamp-4 text-sm leading-5 text-white/85">
									{story.description}
								</p>
								<div className="flex items-center justify-between gap-3 border-t border-white/40 pt-3 text-xs text-white/80">
									<span>{formatDate(story.datePublished)}</span>
									<span className="truncate text-right">
										{story.tags
											.slice(0, 2)
											.map((tag) => `#${tag}`)
											.join("  ")}
									</span>
								</div>
							</div>
						</Link>
					))}
				</div>
			) : (
				<div className="border-y border-primarybrown/20 py-16 text-center">
					<h2 className="text-lg font-semibold text-primaryText">
						No stories found
					</h2>
					<p className="mt-2 text-sm text-primarygrey">
						Try another title, place, or tag.
					</p>
				</div>
			)}

			{filteredStories.length > 0 && (
				<nav
					aria-label="Story pages"
					className="flex items-center justify-between border-t border-primarybrown/20 pt-4">
					<p className="text-sm text-primarygrey">
						Showing {(currentPage - 1) * PAGE_SIZE + 1}–
						{Math.min(currentPage * PAGE_SIZE, filteredStories.length)} of{" "}
						{filteredStories.length}
					</p>
					<div className="flex items-center gap-3">
						<button
							type="button"
							aria-label="Previous page"
							disabled={currentPage === 1}
							onClick={() => setPage((value) => Math.max(1, value - 1))}
							className="inline-flex size-10 items-center justify-center rounded-md border border-primarybrown/25 text-primaryText transition-colors hover:bg-primarywhite disabled:cursor-not-allowed disabled:opacity-40">
							<ChevronLeft size={18} />
						</button>
						<span
							aria-live="polite"
							className="min-w-20 text-center text-sm font-medium text-primaryText">
							Page {currentPage} of {pageCount}
						</span>
						<button
							type="button"
							aria-label="Next page"
							disabled={currentPage === pageCount}
							onClick={() => setPage((value) => Math.min(pageCount, value + 1))}
							className="inline-flex size-10 items-center justify-center rounded-md border border-primarybrown/25 text-primaryText transition-colors hover:bg-primarywhite disabled:cursor-not-allowed disabled:opacity-40">
							<ChevronRight size={18} />
						</button>
					</div>
				</nav>
			)}
		</section>
	);
};

export default StoryBookGallery;
