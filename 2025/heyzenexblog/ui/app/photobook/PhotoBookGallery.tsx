"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDownUp, ChevronLeft, ChevronRight, Tag } from "lucide-react";
import Link from "next/link";
import { animationForLift } from "@/animation/animation";
import PhotoCards from "@/components/molecule/Cards/PhotoCards";
import Search from "@/components/molecule/inputs/Search";
import Select from "@/components/molecule/inputs/Select";
import SectionTitle from "@/components/layout/HomepageBlockLayouts/SectionTitle";
import { TEXT } from "@/const/text";
import type { PhotoBookMeta } from "@/types/data";

const PAGE_SIZE = 8;
type SortOrder = "latest" | "oldest";

const getPhotoDetail = (book: PhotoBookMeta) => {
	const date = new Date(book.datePublished);
	const dateParts = Number.isNaN(date.getTime())
		? {}
		: {
				month: date.toLocaleDateString("en-GB", { month: "short" }),
				year: date.getFullYear(),
			};

	return {
		title: book.title,
		photoUrl: book.cover,
		description: book.description,
		city: book.city,
		country: book.country,
		activityType: book.activityType,
		activityDate: book.eventDateFrom,
		...dateParts,
	};
};

const PhotoBookGallery = ({ books }: { books: PhotoBookMeta[] }) => {
	const prefersReducedMotion = useReducedMotion();
	const [query, setQuery] = useState("");
	const [page, setPage] = useState(1);
	const [sortOrder, setSortOrder] = useState<SortOrder>("latest");
	const [selectedTag, setSelectedTag] = useState("all");
	const normalizedQuery = query.trim().toLowerCase();
	const tags = Array.from(
		new Set(books.flatMap((book) => book.tags ?? [])),
	).sort((first, second) => first.localeCompare(second));
	const filteredBooks = books
		.filter((book) => {
			const matchesQuery = [
				book.title,
				book.slug,
				book.description,
				book.city,
				book.country,
				...book.tags,
			]
				.join(" ")
				.toLowerCase()
				.includes(normalizedQuery);
			const matchesTag =
				selectedTag === "all" ||
				book.tags.some((tag) => tag.toLowerCase() === selectedTag);
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
	const pageCount = Math.max(1, Math.ceil(filteredBooks.length / PAGE_SIZE));
	const currentPage = Math.min(page, pageCount);
	const visibleBooks = filteredBooks.slice(
		(currentPage - 1) * PAGE_SIZE,
		currentPage * PAGE_SIZE,
	);

	return (
		<section className="flex flex-col gap-4 sm:gap-5">
			<div className="flex flex-col md:flex-row md:justify-between gap-4 sm:gap-5">
				<SectionTitle left="My" right="PHOTOBOOK" />

				<div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
					<Search
						value={query}
						onValueChange={(value) => {
							setQuery(value);
							setPage(1);
						}}
						placeholder={TEXT.photobook.searchPlaceholder}
						ariaLabel={TEXT.photobook.searchAriaLabel}
						inputClassName="border-primarybrown/25 text-primaryText placeholder:text-primarygrey/80 focus:border-secondaryforestgreen"
						clearButtonClassName="text-primarygrey hover:bg-secondarywhite hover:text-primaryText"
					/>
					<div className="grid grid-cols-2 gap-2 sm:flex sm:items-center">
						<div className="min-w-0">
							<Select
								ariaLabel={TEXT.photobook.sortAriaLabel}
								items={[
									{ label: TEXT.common.latestFirst, value: "latest" },
									{ label: TEXT.common.oldestFirst, value: "oldest" },
								]}
								value={sortOrder}
								onValueChange={(value) => {
									if (value !== null) setSortOrder(value as SortOrder);
									setPage(1);
								}}
								formatValue={(value) =>
									value === "oldest"
										? TEXT.photobook.sortOldestValue
										: TEXT.photobook.sortLatestValue
								}
								leadingIcon={<ArrowDownUp size={15} aria-hidden="true" />}
								triggerClassName="h-11 min-w-0 gap-1.5 px-2.5 text-xs text-primaryebony sm:min-w-36 sm:gap-2 sm:px-3 sm:text-sm"
								valueClassName="min-w-0 flex-1 truncate whitespace-nowrap text-primaryebony"
								contentClassName="text-primaryebony"
							/>
						</div>
						<div className="min-w-0">
							<Select
								ariaLabel={TEXT.photobook.tagAriaLabel}
								items={[
									{ label: TEXT.common.allTags, value: "all" },
									...tags.map((tag) => ({
										label: `#${tag}`,
										value: tag.toLowerCase(),
									})),
								]}
								value={selectedTag}
								onValueChange={(value) => {
									if (value !== null) setSelectedTag(value);
									setPage(1);
								}}
								formatValue={(value) =>
									value === "all" || value === null
										? TEXT.photobook.tagAllValue
										: `${TEXT.photobook.tagValuePrefix}${value}`
								}
								leadingIcon={<Tag size={15} aria-hidden="true" />}
								triggerClassName="h-11 min-w-0 gap-1.5 px-2.5 text-xs text-primaryebony sm:min-w-36 sm:gap-2 sm:px-3 sm:text-sm"
								valueClassName="min-w-0 flex-1 truncate whitespace-nowrap text-primaryebony"
								contentClassName="text-primaryebony"
							/>
						</div>
					</div>
				</div>
			</div>

			{visibleBooks.length ? (
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
						<div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 xl:grid-cols-4">
							{visibleBooks.map((book) => {
								return (
									<Link
										className="group relative block aspect-4/5 w-full min-w-0 overflow-hidden rounded-2xl shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondaryforestgreen"
										key={book.slug}
										href={`/photobook/${book.slug}`}>
										<PhotoCards
											key={book.slug}
											photoDetail={getPhotoDetail(book)}
										/>
									</Link>
								);
							})}
						</div>
					</motion.div>
				</AnimatePresence>
			) : (
				<div className="border-y border-primarybrown/20 py-16 text-center">
					<h2 className="text-lg font-semibold text-primaryText">
						No photobooks found
					</h2>
					<p className="mt-2 text-sm text-primarygrey">
						Try another title, place, or tag.
					</p>
				</div>
			)}

			{filteredBooks.length > 0 && (
				<nav
					aria-label="PhotoBook pages"
					className="flex items-center justify-between border-t border-primarybrown/20 pt-4">
					<p className="text-sm text-primarygrey">
						Showing {(currentPage - 1) * PAGE_SIZE + 1}–
						{Math.min(currentPage * PAGE_SIZE, filteredBooks.length)}
					</p>
					<div className="flex items-center gap-3">
						<button
							type="button"
							aria-label="Previous page"
							disabled={currentPage === 1}
							onClick={() => setPage((value) => Math.max(1, value - 1))}
							className={`inline-flex size-10 items-center justify-center rounded-md border border-primarybrown/25 text-primaryText hover:bg-primarywhite disabled:cursor-not-allowed disabled:opacity-40 ${animationForLift}`}>
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
							className={`inline-flex size-10 items-center justify-center rounded-md border border-primarybrown/25 text-primaryText hover:bg-primarywhite disabled:cursor-not-allowed disabled:opacity-40 ${animationForLift}`}>
							<ChevronRight size={18} />
						</button>
					</div>
				</nav>
			)}
		</section>
	);
};

export default PhotoBookGallery;
