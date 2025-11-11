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
