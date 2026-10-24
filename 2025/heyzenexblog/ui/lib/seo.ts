// app/seo.ts
import type { Metadata } from "next";
import type { Post } from "./posts";
import { SITE_URL } from "./site";

type BaseMetaOptions = {
	title?: string;
	description?: string;
	keywords?: string[];
	path?: string; // e.g. "/me", "/posts/slug"
	ogImage?: {
		url: string;
		alt: string;
		width?: number;
		height?: number;
	}; // override default OG/Twitter image
	robotsIndex?: boolean;
	// Marks the page as an article for Open Graph.
	article?: {
		publishedTime?: string;
		modifiedTime?: string;
		tags?: string[];
	};
};

const DEFAULT_OG = "/zenog.png"; // put this in /app or /public
const DEFAULT_LOCALE = "en_US";
const SITE_NAME = "Heyzenex";

// Invalid dates would throw in toISOString, so they are dropped instead.
const toIsoDate = (date: string) => {
	const value = new Date(date);
	return Number.isNaN(value.getTime()) ? undefined : value.toISOString();
};

export function createBlogPostingJsonLd(post: Post, imagePath: string) {
	const url = new URL(post.href, SITE_URL).toString();
	return {
		"@context": "https://schema.org",
		"@type": "BlogPosting",
		headline: post.title,
		description: post.description,
		image: new URL(imagePath, SITE_URL).toString(),
		datePublished: toIsoDate(post.datePublished),
		dateModified: toIsoDate(post.dateModified) ?? toIsoDate(post.datePublished),
		keywords: post.tags.join(", "),
		mainEntityOfPage: url,
		url,
		author: { "@type": "Person", name: "Zen Huzaini", url: SITE_URL },
		publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
	};
}

export function createBaseMetadata(options: BaseMetaOptions = {}): Metadata {
	const {
		title,
		description,
		keywords = [
			"heyzenex",
			"Zen Huzaini",
			"zenhuzaini",
			"adventure",
			"photography",
			"bikepacking",
			"hiking",
		],
		path = "/",
		ogImage,
		robotsIndex = true,
		article,
	} = options;

	const absoluteUrl = new URL(path, SITE_URL).toString();
	const imageUrl = ogImage?.url
		? new URL(ogImage.url, SITE_URL).toString()
		: new URL(DEFAULT_OG, SITE_URL).toString();

	return {
		metadataBase: new URL(SITE_URL),
		title: {
			default: title ? `${title} | ${SITE_NAME}` : SITE_NAME,
			template: title ? `%s` : SITE_NAME,
		},
		description,
		keywords,
		icons: [
			{ url: "/zenexlogo.png", type: "image/png" },
			{ url: "/favicon.ico" },
		],
		openGraph: {
			title,
			description,
			url: absoluteUrl,
			type: article ? "article" : "website",
			...(article && {
				publishedTime: article.publishedTime,
				modifiedTime: article.modifiedTime,
				tags: article.tags,
				authors: ["Zen Huzaini"],
			}),
			siteName: SITE_NAME,
			locale: DEFAULT_LOCALE,
			images: [
				{
					url: imageUrl,
					alt: ogImage?.alt,
					width: ogImage?.width,
					height: ogImage?.height,
				},
			],
		},
		// canonical + robots + RSS discovery
		alternates: {
			canonical: absoluteUrl,
			types: { "application/rss+xml": `${SITE_URL}/feed.xml` },
		},
		robots: {
			index: robotsIndex,
			follow: robotsIndex,
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
			images: [imageUrl],
		},
		applicationName: SITE_NAME,
		category: "blog",
		authors: [
			{
				name: "Zen Huzaini",
			},
			{
				name: "heyzenex",
			},
			{
				name: "Heyzenex",
			},
		],
	};
}

export const postOgImagePath = (post: Post) => `/og/${post.kind}/${post.slug}`;

export function createPostMetadata(post: Post): Metadata {
	return createBaseMetadata({
		title: post.title,
		description: post.description || `${post.title} – a story by Zen Huzaini.`,
		path: post.href,
		keywords: post.tags,
		ogImage: {
			url: postOgImagePath(post),
			alt: post.title,
			width: 1200,
			height: 630,
		},
		article: {
			publishedTime: toIsoDate(post.datePublished),
			modifiedTime: toIsoDate(post.dateModified),
			tags: post.tags,
		},
	});
}
