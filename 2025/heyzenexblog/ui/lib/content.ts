import fs from "fs";
import path from "path";

export type ContentDir = "mystorybook" | "myphotobook";

export function listSlugs(dir: ContentDir): string[] {
	const dirPath = path.join(process.cwd(), "contents", dir);
	return fs
		.readdirSync(dirPath)
		.filter((file) => file.endsWith(".mdx"))
		.map((file) => file.replace(/\.mdx$/, ""));
}

export async function paginateMetas<T>(
	dir: ContentDir,
	loadMeta: (slug: string) => Promise<T | null>,
	page: number,
	limit: number,
) {
	const slugs = listSlugs(dir);
	const total = slugs.length;
	const start = (page - 1) * limit;

	const metas: (T | null)[] = await Promise.all(
		slugs.slice(start, start + limit).map(loadMeta),
	);

	return {
		stories: metas.filter((meta): meta is T => meta !== null),
		total,
		totalPages: Math.ceil(total / limit),
		currentPage: page,
	};
}
