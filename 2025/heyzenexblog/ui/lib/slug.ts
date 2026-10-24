// Lowercase, accent-free, hyphenated; used for heading anchors and tag URLs.
export const slugify = (text: string) =>
	text
		.toLowerCase()
		.normalize("NFKD")
		.replace(/[\u0300-\u036f]/g, "")
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");

// Tags without any latin characters would slugify to "", so fall back to encoding.
export const tagSlug = (tag: string) =>
	slugify(tag) || encodeURIComponent(tag.trim().toLowerCase());
