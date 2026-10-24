import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/storybook";
import { getAllPhotoBookSlugs } from "@/lib/photobook";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
	const staticPages = ["", "/storybook", "/photobook", "/me/about"].map(
		(path) => ({ url: `${SITE_URL}${path}` }),
	);
	const stories = getAllSlugs().map(({ slug }) => ({
		url: `${SITE_URL}/storybook/${slug}`,
	}));
	const photos = getAllPhotoBookSlugs().map(({ slug }) => ({
		url: `${SITE_URL}/photobook/${slug}`,
	}));

	return [...staticPages, ...stories, ...photos];
}
