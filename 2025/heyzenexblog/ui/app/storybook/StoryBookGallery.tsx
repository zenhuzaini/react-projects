"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ImageWithSkeleton } from "@/components/molecule/ImageWithSkeleton";
import SectionTitle from "@/components/layout/HomepageBlockLayouts/SectionTitle";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import type { StoryBookMeta } from "@/types/data";
import { EMPTY_STRING } from "@/const/vars";

const PAGE_SIZE = 3;
type SortOrder = "latest" | "oldest";

const formatDate = (value: string) => {
	const date = new Date(value);
	return Number.isNaN(date.getTime())
		? "StoryBook"
		: date.toLocaleDateString("en-GB", { month: "short", year: "numeric" });
};

const StoryBookGallery = ({ stories }: { stories: StoryBookMeta[] }) => {
	const prefersReducedMotion = useReducedMotion();
	const [query, setQuery] = useState("");
	const [page, setPage] = useState(1);
	const [sortOrder, setSortOrder] = useState<SortOrder>("latest");
	const [selectedTag, setSelectedTag] = useState("all");
	const normalizedQuery = query.trim().toLowerCase();
	const tags = Array.from(
		new Set(stories.flatMap((story) => story.tags ?? [])),
	).sort((first, second) => first.localeCompare(second));
	const filteredStories = stories
		.filter((story) => {
			const matchesQuery = [
				story.title,
				story.slug,
				story.description,
				story.city,
				story.country,
				...story.tags,
			]
				.join(" ")
				.toLowerCase()
				.includes(normalizedQuery);
			const matchesTag =
				selectedTag === "all" ||
				story.tags.some((tag) => tag.toLowerCase() === selectedTag);
			return matchesQuery && matchesTag;
		})
		.sort((first, second) => {
			const firstTime = new Date(first.datePublished).getTime();
			const secondTime = new Date(second.datePublished).getTime();
			const firstTimestamp = Number.isNaN(firstTime) ? 0 : firstTime;
			const secondTimestamp = Number.isNaN(secondTime) ? 0 : secondTime;
			return sortOrder === "latest"
				? secondTimestamp - firstTimestamp
				: firstTimestamp - secondTimestamp;
		});
	const pageCount = Math.max(1, Math.ceil(filteredStories.length / PAGE_SIZE));
	const currentPage = Math.min(page, pageCount);
	const visibleStories = filteredStories.slice(
		(currentPage - 1) * PAGE_SIZE,
		currentPage * PAGE_SIZE,
	);

	return (
		<section className="flex flex-col gap-5 sm:gap-8">
			<SectionTitle left="My" right="STORIES" />

			<div className="flex flex-col gap-3 border-y border-primarybrown/20 py-4 lg:flex-row lg:items-center lg:justify-between">
				<label className="relative flex w-full min-w-0 flex-1 items-center">
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
						className="h-11 w-full rounded-md border  bg-primarywhite pl-10 pr-10 text-sm text-primaryebony outline-none transition-colors placeholder:text-primaryaccent/50 focus:border-primaryaccent"
					/>
					{query && (
						<button
							type="button"
							aria-label="Clear search"
							onClick={() => {
								setQuery(EMPTY_STRING);
								setPage(1);
							}}
							className="absolute right-2 inline-flex size-8 items-center justify-center rounded text-primaryebony hover:bg-primaryaccent hover:text-primarycream">
							<X size={16} />
						</button>
					)}
				</label>
				<div className="grid grid-cols-2 gap-2 sm:flex sm:items-center">
					<div className="min-w-0">
						<Select
							items={[
								{ label: "Latest first", value: "latest" },
								{ label: "Oldest first", value: "oldest" },
							]}
							value={sortOrder}
							onValueChange={(value) => {
								if (value !== null) setSortOrder(value as SortOrder);
								setPage(1);
							}}>
							<SelectTrigger aria-label="Sort stories" className="sm:min-w-36">
								<SelectValue>
									{(value: string | null) =>
										`Sort by · ${value === "oldest" ? "Oldest first" : "Latest first"}`
									}
								</SelectValue>
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="latest">Latest first</SelectItem>
								<SelectItem value="oldest">Oldest first</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<div className="min-w-0">
						<Select
							items={[
								{ label: "All tags", value: "all" },
								...tags.map((tag) => ({
									label: `#${tag}`,
									value: tag.toLowerCase(),
								})),
							]}
							value={selectedTag}
							onValueChange={(value) => {
								if (value !== null) setSelectedTag(value);
								setPage(1);
							}}>
							<SelectTrigger
								aria-label="Filter stories by tag"
								className="sm:min-w-36">
								<SelectValue>
									{(value: string | null) =>
										value === "all" || value === null
											? "Filter by tag · All tags"
											: `Filter by tag · #${value}`
									}
								</SelectValue>
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">All tags</SelectItem>
								{tags.map((tag) => (
									<SelectItem key={tag} value={tag.toLowerCase()}>
										#{tag}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				</div>
			</div>

			{visibleStories.length ? (
				<AnimatePresence mode="wait" initial={false}>
					<motion.div
						key={currentPage}
						initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 8 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -4 }}
						transition={{
							opacity: {
								duration: prefersReducedMotion ? 0.01 : 0.38,
								ease: "easeInOut",
							},
							y: {
								duration: prefersReducedMotion ? 0.01 : 0.42,
								ease: [0.22, 1, 0.36, 1],
							},
						}}>
						<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
							{visibleStories.map((story) => (
								<Link
									key={story.slug}
									href={`/storybook/${story.slug}`}
									aria-label={`${story.title}, ${story.city}, ${story.country}`}
									className="group relative block aspect-9/16 w-full min-w-0 overflow-hidden rounded-2xl border border-primarybrown/20 bg-primarymidnight shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondaryforestgreen text-primarycream">
									<ImageWithSkeleton
										src={story.cover}
										alt={story.title}
										rounded="rounded-2xl"
										customClassName="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
									/>
									<div className="absolute inset-0 bg-linear-to-b from-primarymidnight/35 via-transparent to-primarymidnight/90" />
									<div className="absolute inset-x-0 top-0 space-y-5 p-5 sm:space-y-7 sm:p-6">
										<p className="text-xs font-semibold uppercase tracking-[0.14em] text-primarycream">
											StoryBook{" "}
											<span className="bg-primaryaccent p-2  items-center rounded">
												<span className="text-primarycream">
													<span className="text-dot">#</span>
													{story.id}
												</span>
											</span>
										</p>
										<h2 className="line-clamp-4 text-3xl font-extrabold leading-[1.08] text-primarycream sm:text-4xl">
											{story.title}
										</h2>
									</div>
									<div className="absolute inset-x-0 bottom-0 space-y-3 p-5 sm:p-6">
										<p className="line-clamp-4 text-sm leading-5 text-primarycream">
											{story.description}
										</p>
										<div className="flex items-center justify-between gap-3 border-t border-white/40 pt-3 text-xs text-white/80">
											<span className="text-primarycream">
												{formatDate(story.datePublished)}
											</span>
											<span className="text-primarycream text-right">
												{story.city}
												{story.city && story.country ? ", " : ""}
												{story.country}
											</span>
										</div>
									</div>
								</Link>
							))}
						</div>
					</motion.div>
				</AnimatePresence>
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
						{Math.min(currentPage * PAGE_SIZE, filteredStories.length)}
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
