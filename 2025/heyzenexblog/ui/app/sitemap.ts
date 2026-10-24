import type { MetadataRoute } from "next";
import { getAllPosts, getAllTags } from "@/lib/posts";
import { SITE_URL } from "@/lib/site";

const validDate = (...dates: string[]) =>
	dates.map((date) => new Date(date)).find((date) => !Number.isNaN(date.getTime()));

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const [posts, tags] = await Promise.all([getAllPosts(), getAllTags()]);

	const staticPages = ["", "/storybook", "/photobook", "/me/about", "/tags"].map(
		(path) => ({ url: `${SITE_URL}${path}` }),
	);
	const postPages = posts.map((post) => ({
		url: `${SITE_URL}${post.href}`,
		lastModified: validDate(post.dateModified, post.datePublished),
	}));
	const tagPages = tags.map(({ slug }) => ({ url: `${SITE_URL}/tags/${slug}` }));

	return [...staticPages, ...postPages, ...tagPages];
}
