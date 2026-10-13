import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const DEFAULT_REPOSITORY = "zenhuzaini/react-projects";
const DEFAULT_BRANCH = "main";
const STORY_DIRECTORY = "2025/heyzenexblog/ui/contents/mystorybook";
const PHOTOBOOK_DIRECTORY = "2025/heyzenexblog/ui/contents/myphotobook";
const MAX_CONTENT_LENGTH = 1_000_000;

const errorResponse = (error: string, status: number) =>
	NextResponse.json({ error }, { status });

const secretMatches = (provided: string, expected: string) => {
	const providedBuffer = Buffer.from(provided);
	const expectedBuffer = Buffer.from(expected);
	return (
		providedBuffer.length === expectedBuffer.length &&
		timingSafeEqual(providedBuffer, expectedBuffer)
	);
};

export async function POST(request: Request) {
	const token = process.env.GITHUB_TOKEN;
	const publishSecret = process.env.PUBLISH_SECRET;
	if (!token || !publishSecret) {
		return errorResponse(
			"Publishing is not configured. Set GITHUB_TOKEN and PUBLISH_SECRET on the server.",
			503,
		);
	}
	if (publishSecret.length < 32) {
		return errorResponse("PUBLISH_SECRET must be at least 32 characters.", 503);
	}

	const suppliedSecret = request.headers.get("x-publish-secret") ?? "";
	if (!secretMatches(suppliedSecret, publishSecret)) {
		return errorResponse("Invalid publisher key.", 401);
	}

	let payload: unknown;
	try {
		payload = await request.json();
	} catch {
		return errorResponse("Request body must be valid JSON.", 400);
	}

	if (!payload || typeof payload !== "object") {
		return errorResponse("Request body is invalid.", 400);
	}

	const body = payload as Record<string, unknown>;
	const collection = body.collection ?? "story";
	const slug = typeof body.slug === "string" ? body.slug : "";
	const title = typeof body.title === "string" ? body.title : slug;
	const content = typeof body.content === "string" ? body.content : "";
	if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
		return errorResponse("Story slug is invalid.", 400);
	}
	if (!content.trim()) {
		return errorResponse("MDX content is empty.", 400);
	}
	if (collection !== "story" && collection !== "photobook") {
		return errorResponse("Content collection is invalid.", 400);
	}
	if (content.length > MAX_CONTENT_LENGTH) {
		return errorResponse("MDX content is too large.", 413);
	}

	const repository = process.env.GITHUB_REPOSITORY || DEFAULT_REPOSITORY;
	if (!/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(repository)) {
		return errorResponse(
			"GITHUB_REPOSITORY must use owner/repository format.",
			500,
		);
	}
	const branch = process.env.GITHUB_BRANCH || DEFAULT_BRANCH;
	const directory =
		collection === "photobook" ? PHOTOBOOK_DIRECTORY : STORY_DIRECTORY;
	const encodedPath = `${directory}/${slug}.mdx`
		.split("/")
		.map(encodeURIComponent)
		.join("/");
	const contentsUrl = `https://api.github.com/repos/${repository}/contents/${encodedPath}`;
	const headers = {
		Accept: "application/vnd.github+json",
		Authorization: `Bearer ${token}`,
		"X-GitHub-Api-Version": "2022-11-28",
	};

	try {
		const existingFile = await fetch(
			`${contentsUrl}?ref=${encodeURIComponent(branch)}`,
			{ headers, cache: "no-store" },
		);
		let sha: string | undefined;
		if (existingFile.ok) {
			const existingData = (await existingFile.json()) as { sha?: unknown };
			if (typeof existingData.sha !== "string") {
				return errorResponse("GitHub returned an invalid file response.", 502);
			}
			sha = existingData.sha;
		} else if (existingFile.status !== 404) {
			return errorResponse(
				"Could not check the existing story file on GitHub.",
				502,
			);
		}

		const commitResponse = await fetch(contentsUrl, {
			method: "PUT",
			headers: { ...headers, "Content-Type": "application/json" },
			body: JSON.stringify({
				message: `Publish story: ${title.replace(/[\r\n]+/g, " ").slice(0, 120)}`,
				content: Buffer.from(content, "utf8").toString("base64"),
				branch,
				...(sha ? { sha } : {}),
			}),
		});
		if (!commitResponse.ok) {
			return errorResponse(
				commitResponse.status === 409
					? "The GitHub file changed during publishing. Try again."
					: "GitHub could not commit this story. Check the token permissions and branch protection.",
				commitResponse.status === 409 ? 409 : 502,
			);
		}

		const result = (await commitResponse.json()) as {
			commit?: { html_url?: string };
		};
		return NextResponse.json({
			path: `${directory}/${slug}.mdx`,
			branch,
			commitUrl: result.commit?.html_url ?? null,
		});
	} catch {
		return errorResponse("Could not connect to GitHub.", 502);
	}
}
