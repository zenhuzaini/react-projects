import { StoryBookMeta } from "@/types/data";
import { cache } from "react";
import { listSlugs, loadMdx, paginateMetas } from "./content";

export function getAllSlugs() {
	return listSlugs("mystorybook").map((slug) => ({ slug }));
}

export const getStoryBySlug = cache(async (slug: string) =>
	loadMdx<StoryBookMeta>(
		slug,
		() => import(`@/contents/mystorybook/${slug}.mdx`),
	),
);

// Helper: Returns just metadata from one MDX file
export async function getStoryMetadataBySlug(
	slug: string,
): Promise<StoryBookMeta | null> {
	return (await getStoryBySlug(slug))?.metadata ?? null;
}

export const getPaginatedStoryMetas = cache(async (page = 1, limit = 5) =>
	paginateMetas("mystorybook", getStoryMetadataBySlug, page, limit),
);
