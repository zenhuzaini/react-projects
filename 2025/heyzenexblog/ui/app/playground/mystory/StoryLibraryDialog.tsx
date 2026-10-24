"use client";

import {
	ChevronLeft,
	ChevronRight,
	LoaderCircle,
	Search,
	Upload,
} from "lucide-react";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { STORY_LIBRARY_PAGE_SIZE } from "./constants";
import type { StoryLibrary } from "./useStoryLibrary";

const StoryLibraryDialog = ({ library }: { library: StoryLibrary }) => {
	const {
		isOpen,
		setIsOpen,
		searchQuery,
		search,
		page,
		setPage,
		pageCount,
		stories,
		filteredStories,
		pageStories,
		isLoading,
		isImporting,
		loadingSlug,
		error,
		importFile,
		loadStory,
	} = library;
	const hasLoadedList = !isLoading && !error;

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Open existing story</DialogTitle>
					<DialogDescription>
						Choose an MDX story from the project library to edit its metadata
						and source.
					</DialogDescription>
				</DialogHeader>
				<div className="flex flex-col gap-2 sm:flex-row">
					<label className="relative flex min-w-0 flex-1 items-center">
						<Search
							size={16}
							className="pointer-events-none absolute left-3 text-primarygrey"
						/>
						<input
							type="search"
							value={searchQuery}
							onChange={(event) => search(event.target.value)}
							placeholder="Search stories"
							aria-label="Search stories by title or filename"
							className="h-10 w-full rounded-md border border-primarybrown/25 bg-primarywhite pl-9 pr-3 text-sm outline-none focus:border-secondaryforestgreen"
						/>
					</label>
					<label
						className={`inline-flex h-10 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-md border border-primarybrown/30 px-3 text-sm font-semibold hover:bg-primarywhite ${isImporting ? "cursor-wait opacity-60" : ""}`}>
						{isImporting ? (
							<LoaderCircle size={16} className="animate-spin" />
						) : (
							<Upload size={16} />
						)}
						Import MDX
						<input
							type="file"
							accept=".md,.mdx,text/markdown"
							disabled={isImporting}
							className="sr-only"
							onChange={(event) => {
								void importFile(event.currentTarget.files?.[0]);
								event.currentTarget.value = "";
							}}
						/>
					</label>
				</div>
				<div className="max-h-[min(60vh,28rem)] space-y-2 overflow-y-auto">
					{isLoading && (
						<p className="flex items-center gap-2 py-6 text-sm text-primarygrey">
							<LoaderCircle size={16} className="animate-spin" /> Loading
							stories...
						</p>
					)}
					{error && (
						<p role="alert" className="py-4 text-sm text-red-700">
							{error}
						</p>
					)}
					{hasLoadedList && stories.length === 0 && (
						<p className="py-6 text-sm text-primarygrey">
							No MDX stories were found in the library.
						</p>
					)}
					{hasLoadedList &&
						stories.length > 0 &&
						filteredStories.length === 0 && (
							<p className="py-6 text-sm text-primarygrey">
								No stories match “{searchQuery}”.
							</p>
						)}
					{!error &&
						pageStories.map((story) => (
							<button
								key={story.slug}
								type="button"
								disabled={loadingSlug !== null || isImporting}
								onClick={() => loadStory(story.slug)}
								className="flex w-full items-center justify-between gap-3 rounded-md border border-primarybrown/20 px-3 py-3 text-left hover:bg-primarywhite disabled:opacity-60">
								<span className="min-w-0">
									<span className="block truncate text-sm font-semibold text-primaryText">
										{story.title}
									</span>
									<span className="block truncate text-xs text-primarygrey">
										/{story.slug}.mdx
									</span>
								</span>
								{loadingSlug === story.slug && (
									<LoaderCircle
										size={16}
										className="shrink-0 animate-spin"
										aria-label="Loading story"
									/>
								)}
							</button>
						))}
				</div>
				{filteredStories.length > 0 && (
					<div className="flex items-center justify-between gap-3 text-xs text-primarygrey">
						<span>
							Showing {(page - 1) * STORY_LIBRARY_PAGE_SIZE + 1}–
							{Math.min(page * STORY_LIBRARY_PAGE_SIZE, filteredStories.length)}{" "}
							of {filteredStories.length}
						</span>
						<div className="flex items-center gap-2">
							<button
								type="button"
								aria-label="Previous page"
								disabled={page <= 1}
								onClick={() => setPage((current) => current - 1)}
								className="inline-flex size-8 items-center justify-center rounded border border-primarybrown/25 disabled:opacity-40">
								<ChevronLeft size={16} />
							</button>
							<span>
								Page {page} of {pageCount}
							</span>
							<button
								type="button"
								aria-label="Next page"
								disabled={page >= pageCount}
								onClick={() => setPage((current) => current + 1)}
								className="inline-flex size-8 items-center justify-center rounded border border-primarybrown/25 disabled:opacity-40">
								<ChevronRight size={16} />
							</button>
						</div>
					</div>
				)}
				<DialogFooter>
					<DialogClose asChild>
						<button
							type="button"
							className="inline-flex h-10 items-center justify-center rounded-md border border-primarybrown/30 px-4 text-sm font-semibold">
							Close
						</button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default StoryLibraryDialog;
