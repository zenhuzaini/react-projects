// app/seo.ts
import type { Metadata } from "next";

type BaseMetaOptions = {
	title?: string;
	description?: string;
	keywords?: string[];
	path?: string; // e.g. "/me", "/posts/slug"
	ogImage?: {
		url: string;
		alt: string;
	}; // override default OG/Twitter image
	robotsIndex?: boolean;
};

const SITE_URL = "https://heyzenex.pl"; // change to your real domain
const DEFAULT_OG = "/zenog.png"; // put this in /app or /public
const DEFAULT_LOCALE = "en_US";
const SITE_NAME = "Heyzenex";

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
			type: "website",
			siteName: SITE_NAME,
			locale: DEFAULT_LOCALE,
			images: [
				{
					url: imageUrl,
					alt: ogImage?.alt,
				},
			],
		},
		// canonical + robots
		alternates: {
			canonical: absoluteUrl,
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
