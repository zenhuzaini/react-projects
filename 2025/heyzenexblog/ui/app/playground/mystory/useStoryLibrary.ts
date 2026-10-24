"use client";

import { useEffect, useState } from "react";
import { STORY_LIBRARY_PAGE_SIZE } from "./constants";
import { toSlug } from "./draft";
import type { ExistingStoryResponse, ExistingStorySummary } from "./types";

type ImportedStoryHandler = (
	result: ExistingStoryResponse,
	fallbackSlug: string,
	fallbackTitle: string,
) => void;

type ApiResult<T> = T | { error?: string };

const failureMessage = (error: unknown, fallback: string) =>
	error instanceof Error ? error.message : fallback;

// Talks to /api/stories/library: lists stories, loads one, or imports an uploaded MDX file.
export function useStoryLibrary(onStoryLoaded: ImportedStoryHandler) {
	const [isOpen, setIsOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [page, setPage] = useState(1);
	const [stories, setStories] = useState<ExistingStorySummary[]>([]);
	const [isLoadingStoriesList, setIsLoadingStoriesList] = useState(true);
	const [isLoading, setIsLoading] = useState(false);
	const [isImporting, setIsImporting] = useState(false);
	const [loadingSlug, setLoadingSlug] = useState<string | null>(null);
	const [error, setError] = useState("");

	// Preloads the list so the "related posts" block can offer story choices immediately.
	useEffect(() => {
		let isActive = true;
		const loadStories = async () => {
			try {
				const response = await fetch("/api/stories/library");
				const result = (await response.json().catch(() => ({}))) as {
					stories?: ExistingStorySummary[];
				};
				if (isActive && response.ok) setStories(result.stories ?? []);
			} catch {
				if (isActive) setStories([]);
			} finally {
				if (isActive) setIsLoadingStoriesList(false);
			}
		};

		void loadStories();
		return () => {
			isActive = false;
		};
	}, []);

	const query = searchQuery.trim().toLowerCase();
	const filteredStories = stories.filter(
		(story) =>
			!query ||
			story.title.toLowerCase().includes(query) ||
			story.slug.toLowerCase().includes(query),
	);
	const pageCount = Math.max(
		1,
		Math.ceil(filteredStories.length / STORY_LIBRARY_PAGE_SIZE),
	);
	const pageStories = filteredStories.slice(
		(page - 1) * STORY_LIBRARY_PAGE_SIZE,
		page * STORY_LIBRARY_PAGE_SIZE,
	);

	const search = (value: string) => {
		setSearchQuery(value);
		setPage(1);
	};

	const open = async () => {
		setIsOpen(true);
		setSearchQuery("");
		setPage(1);
		setIsLoading(true);
		setError("");
		try {
			const response = await fetch("/api/stories/library");
			const result = (await response.json().catch(() => ({}))) as {
				error?: string;
				stories?: ExistingStorySummary[];
			};
			if (!response.ok) {
				throw new Error(result.error || "Could not load the story library.");
			}
			setStories(result.stories ?? []);
		} catch (caught) {
			setError(failureMessage(caught, "Could not load the story library."));
		} finally {
			setIsLoading(false);
		}
	};

	const importFile = async (file: File | undefined) => {
		if (!file) return;
		if (!/\.(md|mdx)$/i.test(file.name)) {
			setError("Choose a .md or .mdx file.");
			return;
		}

		setIsImporting(true);
		setError("");
		try {
			const formData = new FormData();
			formData.set("file", file);
			const response = await fetch("/api/stories/library", {
				method: "POST",
				body: formData,
			});
			const result = (await response
				.json()
				.catch(() => ({}))) as ApiResult<ExistingStoryResponse>;
			if (!response.ok || !("metadata" in result) || !result.body) {
				throw new Error(
					"error" in result
						? result.error || "Could not import this MDX file."
						: "Could not import this MDX file.",
				);
			}

			const fallbackTitle = file.name.replace(/\.(md|mdx)$/i, "");
			const fallbackSlug = toSlug(fallbackTitle) || "imported-story";
			onStoryLoaded(result, fallbackSlug, fallbackTitle);
			setIsOpen(false);
		} catch (caught) {
			setError(failureMessage(caught, "Could not import this MDX file."));
		} finally {
			setIsImporting(false);
		}
	};

	const loadStory = async (slug: string) => {
		setLoadingSlug(slug);
		setError("");
		try {
			const response = await fetch(
				`/api/stories/library?slug=${encodeURIComponent(slug)}`,
			);
			const result = (await response
				.json()
				.catch(() => ({}))) as ApiResult<ExistingStoryResponse>;
			if (!response.ok || !("metadata" in result)) {
				throw new Error(
					"error" in result
						? result.error || "Could not load this story."
						: "Could not load this story.",
				);
			}

			onStoryLoaded(result, result.slug, result.metadata.title || result.slug);
			setIsOpen(false);
		} catch (caught) {
			setError(failureMessage(caught, "Could not load this story."));
		} finally {
			setLoadingSlug(null);
		}
	};

	return {
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
		isLoadingStoriesList,
		isLoading,
		isImporting,
		loadingSlug,
		error,
		open,
		importFile,
		loadStory,
	};
}

export type StoryLibrary = ReturnType<typeof useStoryLibrary>;
