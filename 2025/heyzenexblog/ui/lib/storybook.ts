import { StoryBookMeta } from "@/types/data";
import fs from "fs";
import path from "path";
import { cache } from "react";

export function getAllSlugs() {
	const dirPath = path.join(process.cwd(), "contents", "mystorybook");
	const files = fs.readdirSync(dirPath);

	// Only grab .mdx files and remove extension for slug
	const slugs = files
		.filter((file) => file.endsWith(".mdx"))
		.map((file) => ({
			slug: file.replace(/\.mdx$/, ""),
		}));

	return slugs;
}

export const getStoryBySlug = cache(async (slug: string) => {
	try {
		const story = await import(`@/contents/mystorybook/${slug}.mdx`);
		return {
			Content: story.default,
			metadata: story.metadata as StoryBookMeta,
		};
	} catch (error) {
		console.error("MDX not found:", slug, error);
		return null;
	}
});

// Helper: Returns just metadata from one MDX file
export async function getStoryMetadataBySlug(
	slug: string
): Promise<StoryBookMeta | null> {
	try {
		const story = await import(`@/contents/mystorybook/${slug}.mdx`);
		return story.metadata as StoryBookMeta;
	} catch (error) {
		console.error("MDX not found:", slug, error);
		return null;
	}
}

// Main pagination function
export const getPaginatedStoryMetas = cache(
	async (
		page = 1,
		limit = 5
	): Promise<{
		stories: StoryBookMeta[];
		total: number;
		totalPages: number;
		currentPage: number;
	}> => {
		const dirPath = path.join(process.cwd(), "contents", "mystorybook");
		const files = fs
			.readdirSync(dirPath)
			.filter((file) => file.endsWith(".mdx"))
			.map((file) => file.replace(/\.mdx$/, ""));

		const total = files.length;
		const totalPages = Math.ceil(total / limit);
		const currentPage = page;

		// Calculate slice indices
		const start = (page - 1) * limit;
		const end = start + limit;

		const pageSlugs = files.slice(start, end);

		// Load metadata for each slug asynchronously
		const metas = await Promise.all(
			pageSlugs.map((slug) => getStoryMetadataBySlug(slug))
		);

		// Remove nulls if there was an error finding metadata
		return {
			stories: metas.filter(Boolean) as StoryBookMeta[],
			total,
			totalPages,
			currentPage,
		};
	}
);
