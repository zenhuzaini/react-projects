import { readFile } from "node:fs/promises";
import path from "node:path";
import { createProcessor } from "@mdx-js/mdx";
import { NextResponse } from "next/server";
import { getAllSlugs, getStoryMetadataBySlug } from "@/lib/storybook";
import {
	getAllPhotoBookSlugs,
	getPhotoBookMetadataBySlug,
} from "@/lib/photobook";
import {
	clientIp,
	errorResponse,
	rateLimit,
	rejectOversizedBody,
	tooManyRequests,
} from "@/lib/server/api";

const MAX_IMPORT_SIZE = 5 * 1024 * 1024;
const IMPORTS_PER_MINUTE = 10;

type MdxEsmNode = {
	type?: string;
	position?: {
		start?: { offset?: number };
		end?: { offset?: number };
	};
	data?: {
		estree?: {
			body?: {
				type?: string;
				start?: number;
				end?: number;
				declaration?: {
					declarations?: {
						id?: { name?: string };
						init?: EstreeExpression;
					}[];
				};
			}[];
		};
	};
};

type MdxNode = {
	type?: string;
	name?: string;
	value?: string;
	url?: string;
	alt?: string;
	depth?: number;
	ordered?: boolean;
	checked?: boolean | null;
	position?: {
		start?: { offset?: number };
		end?: { offset?: number };
	};
	children?: MdxNode[];
	attributes?: {
		name?: string;
		value?:
			| string
			| {
					type?: string;
					value?: string;
					data?: {
						estree?: {
							body?: { expression?: EstreeExpression }[];
						};
					};
			  };
	}[];
	data?: MdxEsmNode["data"];
};

type EstreeExpression = {
	type?: string;
	name?: string;
	value?: unknown;
	operator?: string;
	argument?: EstreeExpression;
	properties?: {
		key?: EstreeExpression;
		value?: EstreeExpression;
		computed?: boolean;
	}[];
	elements?: (EstreeExpression | null)[];
	expressions?: EstreeExpression[];
	quasis?: { value?: { cooked?: string | null; raw?: string } }[];
};

const readStaticValue = (expression: EstreeExpression): unknown => {
	switch (expression.type) {
		case "Literal":
			return expression.value;
		case "ObjectExpression":
			return Object.fromEntries(
				(expression.properties ?? [])
					.filter((property) => !property.computed)
					.flatMap((property) => {
						const key = property.key?.name ?? property.key?.value;
						const value = property.value
							? readStaticValue(property.value)
							: undefined;
						return typeof key === "string" && value !== undefined
							? [[key, value]]
							: [];
					}),
			);
		case "ArrayExpression":
			return (expression.elements ?? []).map((element) =>
				element ? readStaticValue(element) : null,
			);
		case "TemplateLiteral":
			return expression.expressions?.length
				? undefined
				: (expression.quasis ?? [])
						.map((quasi) => quasi.value?.cooked ?? quasi.value?.raw ?? "")
						.join("");
		case "UnaryExpression": {
			const value = expression.argument
				? readStaticValue(expression.argument)
				: undefined;
			return expression.operator === "-" && typeof value === "number"
				? -value
				: undefined;
		}
		default:
			return undefined;
	}
};

const parseMdxSource = (source: string) => {
	const tree = createProcessor().parse(source);
	const metadataNode = tree.children
		.map((node) => node as unknown as MdxEsmNode)
		.find(
			(node) =>
				node.type === "mdxjsEsm" &&
				node.data?.estree?.body?.some(
					(statement) =>
						statement.type === "ExportNamedDeclaration" &&
						statement.declaration?.declarations?.some(
							(declaration) => declaration.id?.name === "metadata",
						),
				),
		);
	const metadataStatement = metadataNode?.data?.estree?.body?.find(
		(statement) =>
			statement.type === "ExportNamedDeclaration" &&
			statement.declaration?.declarations?.some(
				(declaration) => declaration.id?.name === "metadata",
			),
	);
	const declaration = metadataStatement?.declaration?.declarations?.find(
		(item) => item.id?.name === "metadata",
	);
	const start =
		metadataStatement?.start ?? metadataNode?.position?.start?.offset;
	const end = metadataStatement?.end ?? metadataNode?.position?.end?.offset;
	const value = declaration?.init ? readStaticValue(declaration.init) : {};
	return {
		hasMetadata: start !== undefined && end !== undefined,
		metadata:
			value && typeof value === "object" && !Array.isArray(value)
				? (value as Record<string, unknown>)
				: ({} as Record<string, unknown>),
		body:
			start !== undefined && end !== undefined
				? `${source.slice(0, start)}${source.slice(end)}`.trim()
				: source.trim(),
	};
};

const parseMdxBlocks = (source: string) => {
	const tree = createProcessor().parse(source);
	const bindings = new Map<string, unknown>();
	const nodes = tree.children.map((node) => node as unknown as MdxNode);
	for (const node of nodes) {
		for (const statement of node.data?.estree?.body ?? []) {
			for (const declaration of statement.declaration?.declarations ?? []) {
				if (declaration.id?.name && declaration.init) {
					const value = readStaticValue(declaration.init);
					if (value !== undefined) bindings.set(declaration.id.name, value);
				}
			}
		}
	}

	const getSource = (node: MdxNode) => {
		const start = node.position?.start?.offset;
		const end = node.position?.end?.offset;
		return start === undefined || end === undefined
			? ""
			: source.slice(start, end);
	};
	const textOf = (node: MdxNode): string => {
		if (node.type === "text" || node.type === "inlineCode") {
			return node.value ?? "";
		}
		if (node.type === "break") return "\n";
		if (node.type === "image") return node.alt ?? "";
		return (node.children ?? []).map(textOf).join("");
	};
	const attribute = (node: MdxNode, name: string): unknown => {
		const value = node.attributes?.find((item) => item.name === name)?.value;
		if (typeof value === "string") return value;
		if (!value) return undefined;
		const expression = value.data?.estree?.body?.[0]?.expression;
		if (!expression) return true;
		const parsed = readStaticValue(expression);
		return parsed === undefined && expression.type === "Identifier"
			? bindings.get(expression.name ?? "")
			: parsed;
	};

	const blocks: Record<string, unknown>[] = [];
	const supportingMdx: string[] = [];
	const addRaw = (node: MdxNode, insideCenter: boolean) => {
		const rawMdx = getSource(node);
		if (rawMdx.trim()) {
			blocks.push({
				type: "raw",
				rawMdx,
				insideCenter,
				rawOutsideCenter: !insideCenter,
			});
		}
	};
	const addImage = (photo: unknown, insideCenter: boolean): boolean => {
		if (!photo || typeof photo !== "object" || Array.isArray(photo))
			return false;
		const value = photo as { photoUrl?: unknown; description?: unknown };
		if (typeof value.photoUrl !== "string") return false;
		blocks.push({
			type: "image",
			imageUrl: value.photoUrl,
			imageAlt: typeof value.description === "string" ? value.description : "",
			insideCenter,
		});
		return true;
	};
	const addJsxBlock = (node: MdxNode, insideCenter: boolean): boolean => {
		const name = node.name;
		const text = attribute(node, "text");
		if (name === "Quo" && typeof text === "string") {
			blocks.push({ type: "quote", text, insideCenter });
			return true;
		}
		if (name === "Section" && typeof text === "string") {
			blocks.push({ type: "section", text, insideCenter });
			return true;
		}
		if (name === "Highlight") {
			const highlightText = textOf(node);
			if (highlightText) {
				blocks.push({ type: "highlight", text: highlightText, insideCenter });
				return true;
			}
		}
		if (name === "Pho") return addImage(attribute(node, "photo"), insideCenter);
		if (name === "Phopha") {
			const photoAdded = addImage(attribute(node, "photo"), insideCenter);
			if (typeof text === "string" && text.trim()) {
				blocks.splice(blocks.length - Number(photoAdded), 0, {
					type: "paragraph",
					text,
					insideCenter,
				});
				return true;
			}
			return photoAdded;
		}
		if (name === "PhoCol") {
			const photos = attribute(node, "photo");
			if (Array.isArray(photos)) {
				const gallery = photos.flatMap((photo) => {
					if (!photo || typeof photo !== "object") return [];
					const item = photo as { photoUrl?: unknown; description?: unknown };
					return typeof item.photoUrl === "string"
						? [
								{
									url: item.photoUrl,
									alt:
										typeof item.description === "string"
											? item.description
											: "",
								},
							]
						: [];
				});
				if (gallery.length === photos.length && gallery.length) {
					blocks.push({ type: "gallery", gallery, insideCenter });
					return true;
				}
			}
		}
		if (name === "RelatedPosts") {
			const slugs = attribute(node, "slugs");
			const title = attribute(node, "title");
			if (
				Array.isArray(slugs) &&
				slugs.every((slug) => typeof slug === "string")
			) {
				blocks.push({
					type: "related",
					text: typeof title === "string" ? title : "Related posts",
					relatedStorySlugs: slugs,
					insideCenter,
				});
				return true;
			}
		}
		if (name === "Checklist" || name === "ItemList") {
			const values = attribute(node, "items");
			if (Array.isArray(values)) {
				const items = values.flatMap((item) => {
					if (!item || typeof item !== "object") return [];
					const value = item as { label?: unknown; done?: unknown };
					return typeof value.label === "string"
						? [
								{
									label: value.label,
									done: name === "Checklist" && value.done === true,
								},
							]
						: [];
				});
				if (items.length === values.length) {
					blocks.push({
						type: name === "Checklist" ? "checklist" : "itemlist",
						items,
						insideCenter,
					});
					return true;
				}
			}
		}
		if (name === "IframeWithLoader") {
			const url = attribute(node, "url");
			if (typeof url === "string") {
				blocks.push({ type: "iframe", url, insideCenter });
				return true;
			}
		}
		if (name === "MapWithDescription") {
			const center = attribute(node, "center");
			const route = attribute(node, "route");
			const coordinates = Array.isArray(center) ? center : [];
			const points = Array.isArray(route) ? route : [];
			blocks.push({
				type: "map",
				text:
					typeof attribute(node, "description") === "string"
						? attribute(node, "description")
						: "",
				centerLatitude:
					typeof coordinates[0] === "number" ? String(coordinates[0]) : "",
				centerLongitude:
					typeof coordinates[1] === "number" ? String(coordinates[1]) : "",
				route: points
					.filter(
						(point): point is [number, number] =>
							Array.isArray(point) &&
							typeof point[0] === "number" &&
							typeof point[1] === "number",
					)
					.map((point) => point.join(","))
					.join("\n"),
				shouldShowDownloadGPX:
					attribute(node, "shouldShowDownloadGPX") === true,
				mapTitle:
					typeof attribute(node, "title") === "string"
						? attribute(node, "title")
						: "",
				insideCenter,
			});
			return true;
		}
		return false;
	};

	const visit = (node: MdxNode, insideCenter = false) => {
		if (node.type === "mdxJsxFlowElement" && node.name === "Center") {
			for (const child of node.children ?? []) visit(child, true);
			return;
		}
		if (node.type === "mdxjsEsm") {
			if (insideCenter) {
				addRaw(node, true);
			} else {
				const rawMdx = getSource(node);
				if (rawMdx.trim()) supportingMdx.push(rawMdx);
			}
			return;
		}
		if (node.type === "paragraph") {
			const text = textOf(node);
			if (text.trim()) {
				blocks.push({
					type: "paragraph",
					text,
					rawMdx: getSource(node),
					insideCenter,
				});
			}
			return;
		}
		if (node.type === "heading") {
			blocks.push({
				type: "section",
				text: textOf(node),
				insideCenter,
			});
			return;
		}
		if (node.type === "thematicBreak") {
			blocks.push({ type: "divider", insideCenter });
			return;
		}
		if (node.type === "blockquote") {
			blocks.push({ type: "quote", text: textOf(node), insideCenter });
			return;
		}
		if (node.type === "image") {
			blocks.push({
				type: "image",
				imageUrl: node.url ?? "",
				imageAlt: node.alt ?? "",
				insideCenter,
			});
			return;
		}
		if (node.type === "list") {
			const items = (node.children ?? []).map((item) => ({
				label: textOf(item),
				done: item.checked === true,
			}));
			const isTaskList = (node.children ?? []).some(
				(item) => typeof item.checked === "boolean",
			);
			blocks.push({
				type: isTaskList ? "checklist" : "itemlist",
				items,
				insideCenter,
			});
			return;
		}
		if (node.type === "mdxJsxFlowElement" && addJsxBlock(node, insideCenter)) {
			return;
		}
		addRaw(node, insideCenter);
	};

	for (const node of nodes) visit(node);
	return { blocks, supportingMdx: supportingMdx.join("\n\n") };
};

const COLLECTIONS = {
	story: {
		directory: "mystorybook",
		label: "Story",
		getSlugs: getAllSlugs,
		getMetadata: getStoryMetadataBySlug,
	},
	photobook: {
		directory: "myphotobook",
		label: "PhotoBook",
		getSlugs: getAllPhotoBookSlugs,
		getMetadata: getPhotoBookMetadataBySlug,
	},
} as const;

export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url);
		const collectionName = searchParams.get("collection") ?? "story";
		if (!(collectionName in COLLECTIONS)) {
			return errorResponse("Collection is invalid.", 400);
		}
		const collection = COLLECTIONS[collectionName as keyof typeof COLLECTIONS];
		const getMetadata: (
			slug: string,
		) => Promise<Awaited<ReturnType<typeof getStoryMetadataBySlug>>> =
			collection.getMetadata as never;
		const slugs = collection.getSlugs().map(({ slug }) => slug);
		const requestedSlug = searchParams.get("slug");

		if (!requestedSlug) {
			const stories = await Promise.all(
				slugs.map(async (slug) => {
					const metadata = await getMetadata(slug);
					return metadata ? { slug, title: metadata.title } : null;
				}),
			);
			return NextResponse.json({ stories: stories.filter(Boolean) });
		}

		if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(requestedSlug)) {
			return errorResponse(`${collection.label} slug is invalid.`, 400);
		}
		if (!slugs.includes(requestedSlug)) {
			return errorResponse(`${collection.label} was not found.`, 404);
		}

		const metadata = await getMetadata(requestedSlug);
		if (!metadata) {
			return errorResponse(`${collection.label} metadata was not found.`, 404);
		}

		const storyPath = path.join(
			process.cwd(),
			"contents",
			collection.directory,
			`${requestedSlug}.mdx`,
		);
		const source = await readFile(storyPath, "utf8");
		const parsed = parseMdxSource(source);
		if (!parsed.hasMetadata) {
			return errorResponse("Could not isolate the story metadata export.", 422);
		}

		const content = parseMdxBlocks(parsed.body);
		return NextResponse.json({
			slug: requestedSlug,
			metadata,
			body: parsed.body,
			blocks: content.blocks,
			supportingMdx: content.supportingMdx,
		});
	} catch {
		return errorResponse("Could not read the story library.", 500);
	}
}

// This endpoint is unauthenticated and parsing MDX is CPU-heavy, so it is throttled and size-capped.
export async function POST(request: Request) {
	const limit = rateLimit(
		`library-import:${clientIp(request)}`,
		IMPORTS_PER_MINUTE,
		60_000,
	);
	if (!limit.ok) return tooManyRequests(limit.retryAfterSeconds);

	const oversized = rejectOversizedBody(request, MAX_IMPORT_SIZE + 64 * 1024);
	if (oversized) return oversized;

	try {
		const formData = await request.formData();
		const file = formData.get("file");
		if (
			!(file instanceof File) ||
			file.size === 0 ||
			file.size > MAX_IMPORT_SIZE
		) {
			return errorResponse("Choose an MDX file smaller than 5 MB.", 400);
		}

		const source = await file.text();
		const parsed = parseMdxSource(source);
		const content = parseMdxBlocks(parsed.body);
		return NextResponse.json({
			slug:
				typeof parsed.metadata.slug === "string" ? parsed.metadata.slug : "",
			metadata: parsed.metadata,
			body: parsed.body,
			blocks: content.blocks,
			supportingMdx: content.supportingMdx,
		});
	} catch {
		return errorResponse("Could not parse this MDX file.", 422);
	}
}
