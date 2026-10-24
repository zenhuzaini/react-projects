import { ImageResponse } from "next/og";
import { getAllPosts, getPostsByKind, type PostKind } from "@/lib/posts";

const SIZE = { width: 1200, height: 630 };
const MAX_COVER_BYTES = 6 * 1024 * 1024;
// The image renderer cannot decode webp/avif, so only these covers are embedded.
const SUPPORTED_TYPES = new Set(["image/jpeg", "image/png"]);

export async function generateStaticParams() {
	const posts = await getAllPosts();
	return posts.map(({ kind, slug }) => ({ kind, slug }));
}

// Cover URLs come from our own content files; a failed fetch just means a plain background.
async function loadCover(url: string) {
	if (!url.startsWith("https://")) return null;
	try {
		const response = await fetch(url, { signal: AbortSignal.timeout(8000) });
		const type = response.headers.get("content-type")?.split(";")[0] ?? "";
		if (!response.ok || !SUPPORTED_TYPES.has(type)) return null;
		const bytes = await response.arrayBuffer();
		if (bytes.byteLength > MAX_COVER_BYTES) return null;
		return `data:${type};base64,${Buffer.from(bytes).toString("base64")}`;
	} catch {
		return null;
	}
}

export async function GET(
	_request: Request,
	{ params }: { params: Promise<{ kind: string; slug: string }> },
) {
	const { kind, slug } = await params;
	if (kind !== "storybook" && kind !== "photobook") {
		return new Response("Not found", { status: 404 });
	}

	const posts = await getPostsByKind(kind as PostKind);
	const post = posts.find((item) => item.slug === slug);
	if (!post) return new Response("Not found", { status: 404 });

	const cover = await loadCover(post.cover);
	const place = [post.city, post.country].filter(Boolean).join(", ");

	return new ImageResponse(
		<div
			style={{
				...SIZE,
				display: "flex",
				position: "relative",
				background: "#282120",
				color: "#f9f0e4",
			}}>
			{cover && (
				// eslint-disable-next-line @next/next/no-img-element
				<img
					src={cover}
					alt=""
					width={SIZE.width}
					height={SIZE.height}
					style={{ position: "absolute", inset: 0, objectFit: "cover" }}
				/>
			)}
			<div
				style={{
					position: "absolute",
					inset: 0,
					display: "flex",
					background:
						"linear-gradient(to top, rgba(40,33,32,0.95), rgba(40,33,32,0.25))",
				}}
			/>
			<div
				style={{
					position: "relative",
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
					width: "100%",
					height: "100%",
					padding: 64,
				}}>
				<div style={{ display: "flex", fontSize: 30, letterSpacing: 4 }}>
					{kind === "storybook" ? "STORYBOOK" : "PHOTOBOOK"}
				</div>
				<div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
					<div
						style={{
							display: "flex",
							fontSize: post.title.length > 60 ? 56 : 72,
							fontWeight: 800,
							lineHeight: 1.05,
						}}>
						{post.title}
					</div>
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							fontSize: 30,
							color: "#fad02c",
						}}>
						<span>heyzenex.</span>
						<span>{place}</span>
					</div>
				</div>
			</div>
		</div>,
		SIZE,
	);
}
