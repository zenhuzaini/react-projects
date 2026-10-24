const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, "");

if (!siteUrl) {
	throw new Error("NEXT_PUBLIC_SITE_URL is not set");
}

export const SITE_URL = siteUrl;
