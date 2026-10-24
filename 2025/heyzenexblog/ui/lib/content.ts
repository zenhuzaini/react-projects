import fs from "fs";
import path from "path";
import { slugify } from "./slug";

export type ContentDir = "mystorybook" | "myphotobook";

const SAFE_SLUG = /^[\w-]+$/;

type MdxModule<M> = { default: React.ComponentType; metadata: M };

// A missing file is an expected 404; any other failure (e.g. a broken MDX file) must surface.
export async function loadMdx<M>(
	slug: string,
	importMdx: () => Promise<MdxModule<M>>,
) {
	if (!SAFE_SLUG.test(slug)) return null;

	try {
		const mdx = await importMdx();
		return { Content: mdx.default, metadata: mdx.metadata };
	} catch (error) {
		if ((error as NodeJS.ErrnoException)?.code === "MODULE_NOT_FOUND") {
			return null;
		}
		throw error;
	}
}

export function listSlugs(dir: ContentDir): string[] {
	const dirPath = path.join(process.cwd(), "contents", dir);
	return fs
		.readdirSync(dirPath)
		.filter((file) => file.endsWith(".mdx"))
		.map((file) => file.replace(/\.mdx$/, ""));
}

export function readMdxSource(dir: ContentDir, slug: string): string | null {
	if (!SAFE_SLUG.test(slug)) return null;
	try {
		return fs.readFileSync(
			path.join(process.cwd(), "contents", dir, `${slug}.mdx`),
			"utf8",
		);
	} catch {
		return null;
	}
}

const WORDS_PER_MINUTE = 220;

export function getReadingMinutes(source: string): number {
	const text = source
		// Drops the leading `export const metadata = {...};` style blocks.
		.replace(/^export const [\s\S]*?^[\]}];?\s*$/gm, "")
		.replace(/https?:\/\/\S+/g, "")
		.replace(/<[^>]*>/g, " ");
	const words = text.match(/[\p{L}\p{N}]+/gu)?.length ?? 0;
	return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

export type SectionHeading = { text: string; id: string };

export function getSectionHeadings(source: string): SectionHeading[] {
	const headings: SectionHeading[] = [];
	for (const match of source.matchAll(
		/<Section\s+text=(?:"([^"]+)"|\{`([^`]+)`\})\s*\/>/g,
	)) {
		const text = match[1] ?? match[2];
		headings.push({ text, id: slugify(text) });
	}
	return headings;
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
