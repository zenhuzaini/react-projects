import { PhotoBookMeta, StoryBookMeta } from "@/types/data";
import fs from "fs";
import path from "path";
import { cache } from "react";

export function getAllPhotoBookSlugs() {
	const dirPath = path.join(process.cwd(), "contents", "myphotobook");
	const files = fs.readdirSync(dirPath);

	// Only grab .mdx files and remove extension for slug
	const slugs = files
		.filter((file) => file.endsWith(".mdx"))
		.map((file) => ({
			slug: file.replace(/\.mdx$/, ""),
		}));

	return slugs;
}

export const getPhotoBookBySlug = cache(async (slug: string) => {
	try {
		const photobook = await import(`@/contents/myphotobook/${slug}.mdx`);
		return {
			Content: photobook.default,
			metadata: photobook.metadata as PhotoBookMeta,
		};
	} catch (error) {
		console.error("MDX not found:", slug, error);
		return null;
	}
});

// Helper: Returns just metadata from one MDX file
export async function getPhotoBookMetadataBySlug(
	slug: string,
): Promise<PhotoBookMeta | null> {
	try {
		const photobook = await import(`@/contents/myphotobook/${slug}.mdx`);
		return photobook.metadata as PhotoBookMeta;
	} catch (error) {
		console.error("MDX not found:", slug, error);
		return null;
	}
}

// Main pagination function
export const getPaginatedPhotoBookMetas = cache(
	async (
		page = 1,
		limit = 5,
	): Promise<{
		stories: PhotoBookMeta[];
		total: number;
		totalPages: number;
		currentPage: number;
	}> => {
		const dirPath = path.join(process.cwd(), "contents", "myphotobook");
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
			pageSlugs.map((slug) => getPhotoBookMetadataBySlug(slug)),
		);

		// Remove nulls if there was an error finding metadata
		return {
			stories: metas.filter(Boolean) as PhotoBookMeta[],
			total,
			totalPages,
			currentPage,
		};
	},
);
