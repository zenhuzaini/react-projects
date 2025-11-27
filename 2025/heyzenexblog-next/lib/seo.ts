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
const DEFAULT_OG = "/zen.jpg"; // put this in /app or /public
const DEFAULT_LOCALE = "en_US";
const SITE_NAME = "heyzenex";

export function createBaseMetadata(options: BaseMetaOptions = {}): Metadata {
	const {
		title = SITE_NAME,
		description = "Heyzenex is a captivating blog dedicated to photography and travel stories. Explore breathtaking adventures, vibrant cultures, and inspiring journeys through the lens of a passionate explorer.",
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
	const imageUrl = ogImage?.url ?? new URL(DEFAULT_OG, SITE_URL).toString();

	return {
		metadataBase: new URL(SITE_URL),
		title,
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
			siteName: "heyzenex",
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
		],
	};
}
