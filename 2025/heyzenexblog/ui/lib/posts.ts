import { cache } from "react";
import { getPaginatedPhotoBookMetas } from "./photobook";
import { getPaginatedStoryMetas } from "./storybook";
import { tagSlug } from "./slug";

export type PostKind = "storybook" | "photobook";

export type Post = {
	kind: PostKind;
	slug: string;
	href: string;
	id: number;
	title: string;
	description: string;
	cover: string;
	datePublished: string;
	dateModified: string;
	tags: string[];
	city: string;
	country: string;
	series?: string;
};

const ALL = 10_000;

const time = (date: string) => {
	const value = new Date(date).getTime();
	return Number.isNaN(value) ? 0 : value;
};

// Oldest first; equal dates fall back to the numeric slug prefix (e.g. "4-..." before "10-...").
const byDateAsc = (a: Post, b: Post) =>
	time(a.datePublished) - time(b.datePublished) ||
	a.slug.localeCompare(b.slug, undefined, { numeric: true });

const toPost = (
	kind: PostKind,
	meta: Awaited<ReturnType<typeof getPaginatedStoryMetas>>["stories"][number],
): Post => ({
	kind,
	slug: meta.slug,
	href: `/${kind}/${meta.slug}`,
	id: meta.id,
	title: meta.title,
	description: meta.description,
	cover: meta.cover,
	datePublished: meta.datePublished,
	dateModified: meta.dateModified,
	tags: meta.tags ?? [],
	city: meta.city,
	country: meta.country,
	series: meta.series,
});

// Every post of one kind, oldest first.
export const getPostsByKind = cache(async (kind: PostKind) => {
	const result =
		kind === "storybook"
			? await getPaginatedStoryMetas(1, ALL)
			: await getPaginatedPhotoBookMetas(1, ALL);
	return result.stories.map((meta) => toPost(kind, meta)).sort(byDateAsc);
});

// Every post of every kind, newest first.
export const getAllPosts = cache(async () => {
	const [stories, photobooks] = await Promise.all([
		getPostsByKind("storybook"),
		getPostsByKind("photobook"),
	]);
	return [...stories, ...photobooks].sort((a, b) => byDateAsc(b, a));
});

export async function getPost(kind: PostKind, slug: string) {
	const posts = await getPostsByKind(kind);
	return posts.find((post) => post.slug === slug) ?? null;
}

export async function getAdjacentPosts(kind: PostKind, slug: string) {
	const posts = await getPostsByKind(kind);
	const index = posts.findIndex((post) => post.slug === slug);
	return {
		prev: index > 0 ? posts[index - 1] : null,
		next: index >= 0 && index < posts.length - 1 ? posts[index + 1] : null,
	};
}

export async function getSeriesPosts(kind: PostKind, series?: string) {
	if (!series) return [];
	const posts = await getPostsByKind(kind);
	return posts.filter((post) => post.series === series);
}

export async function getAllTags() {
	const counts = new Map<string, { label: string; count: number }>();
	for (const post of await getAllPosts()) {
		for (const tag of post.tags) {
			const key = tagSlug(tag);
			const entry = counts.get(key);
			if (entry) entry.count += 1;
			else counts.set(key, { label: tag, count: 1 });
		}
	}
	return [...counts.entries()]
		.map(([slug, { label, count }]) => ({ slug, label, count }))
		.sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
}

export async function getPostsByTag(slug: string) {
	const posts = (await getAllPosts()).filter((post) =>
		post.tags.some((tag) => tagSlug(tag) === slug),
	);
	const label = posts[0]?.tags.find((tag) => tagSlug(tag) === slug) ?? slug;
	return { label, posts };
}
