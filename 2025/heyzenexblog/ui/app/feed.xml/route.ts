import { getAllPosts } from "@/lib/posts";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

const FEED_TITLE = "Heyzenex";
const FEED_DESCRIPTION =
	"Photography, bikepacking and travel stories by Zen Huzaini.";

const escapeXml = (value: string) =>
	value
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&apos;");

const toRssDate = (date: string) => {
	const value = new Date(date);
	return Number.isNaN(value.getTime()) ? null : value.toUTCString();
};

export async function GET() {
	const posts = await getAllPosts();
	const lastBuildDate = posts.length
		? toRssDate(posts[0].datePublished)
		: null;

	const items = posts
		.map((post) => {
			const link = `${SITE_URL}${post.href}`;
			const pubDate = toRssDate(post.datePublished);
			return [
				"<item>",
				`<title>${escapeXml(post.title)}</title>`,
				`<link>${escapeXml(link)}</link>`,
				`<guid isPermaLink="true">${escapeXml(link)}</guid>`,
				pubDate ? `<pubDate>${pubDate}</pubDate>` : "",
				`<description>${escapeXml(post.description)}</description>`,
				...post.tags.map((tag) => `<category>${escapeXml(tag)}</category>`),
				"</item>",
			].join("");
		})
		.join("");

	const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>${FEED_TITLE}</title><link>${SITE_URL}</link><description>${escapeXml(FEED_DESCRIPTION)}</description><language>en</language><atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>${lastBuildDate ? `<lastBuildDate>${lastBuildDate}</lastBuildDate>` : ""}${items}</channel></rss>`;

	return new Response(xml, {
		headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
	});
}
