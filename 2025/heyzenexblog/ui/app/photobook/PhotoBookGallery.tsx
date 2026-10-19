"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import Link from "next/link";
import PhotoCards from "@/components/molecule/Cards/PhotoCards";
import SectionTitle from "@/components/layout/HomepageBlockLayouts/SectionTitle";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { EMPTY_STRING } from "@/const/vars";
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
		<section className="flex flex-col gap-5 sm:gap-8">
			<SectionTitle left="My" right="PHOTOBOOK" />

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
						placeholder="Search photobooks, places, or tags"
						aria-label="Search photobooks, places, or tags"
						className="h-11 w-full rounded-md border border-primarybrown/25 bg-primarywhite pl-10 pr-10 text-sm text-primaryText outline-none transition-colors placeholder:text-primarygrey/80 focus:border-secondaryforestgreen"
					/>
					{query && (
						<button
							type="button"
							aria-label="Clear search"
							onClick={() => {
								setQuery(EMPTY_STRING);
								setPage(1);
							}}
							className="absolute right-2 inline-flex size-8 items-center justify-center rounded text-primarygrey hover:bg-secondarywhite hover:text-primaryText">
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
							<SelectTrigger
								aria-label="Sort photobooks"
								className="sm:min-w-36">
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
								aria-label="Filter photobooks by tag"
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
							{visibleBooks.map((book) => (
								<Link
									key={book.slug}
									href={`/photobook/${book.slug}`}
									aria-label={`${book.title}, ${book.city}, ${book.country}`}
									className="relative block aspect-4/5 w-full min-w-0 overflow-hidden rounded-xl border border-primarybrown/20 bg-primarymidnight shadow-md transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondaryforestgreen">
									<PhotoCards photoDetail={getPhotoDetail(book)} />
								</Link>
							))}
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

export default PhotoBookGallery;
