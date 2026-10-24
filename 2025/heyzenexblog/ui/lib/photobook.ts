import { PhotoBookMeta } from "@/types/data";
import { cache } from "react";
import { listSlugs, loadMdx, paginateMetas } from "./content";

export function getAllPhotoBookSlugs() {
	return listSlugs("myphotobook").map((slug) => ({ slug }));
}

export const getPhotoBookBySlug = cache(async (slug: string) =>
	loadMdx<PhotoBookMeta>(
		slug,
		() => import(`@/contents/myphotobook/${slug}.mdx`),
	),
);

// Helper: Returns just metadata from one MDX file
export async function getPhotoBookMetadataBySlug(
	slug: string,
): Promise<PhotoBookMeta | null> {
	return (await getPhotoBookBySlug(slug))?.metadata ?? null;
}

export const getPaginatedPhotoBookMetas = cache(async (page = 1, limit = 5) =>
	paginateMetas("myphotobook", getPhotoBookMetadataBySlug, page, limit),
);
