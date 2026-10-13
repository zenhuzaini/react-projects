import { readFile } from "node:fs/promises";
import path from "node:path";
import { createProcessor } from "@mdx-js/mdx";
import { NextResponse } from "next/server";
import { getAllSlugs, getStoryMetadataBySlug } from "@/lib/storybook";

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

const errorResponse = (error: string, status: number) =>
	NextResponse.json({ error }, { status });

export async function GET(request: Request) {
	try {
		const slugs = getAllSlugs().map(({ slug }) => slug);
		const requestedSlug = new URL(request.url).searchParams.get("slug");

		if (!requestedSlug) {
			const stories = await Promise.all(
				slugs.map(async (slug) => {
					const metadata = await getStoryMetadataBySlug(slug);
					return metadata ? { slug, title: metadata.title } : null;
				}),
			);
			return NextResponse.json({ stories: stories.filter(Boolean) });
		}

		if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(requestedSlug)) {
			return errorResponse("Story slug is invalid.", 400);
		}
		if (!slugs.includes(requestedSlug)) {
			return errorResponse("Story was not found.", 404);
		}

		const metadata = await getStoryMetadataBySlug(requestedSlug);
		if (!metadata) return errorResponse("Story metadata was not found.", 404);

		const storyPath = path.join(
			process.cwd(),
			"contents",
			"mystorybook",
			`${requestedSlug}.mdx`,
		);
		const source = await readFile(storyPath, "utf8");
		const parsed = parseMdxSource(source);
		if (!parsed.hasMetadata) {
			return errorResponse("Could not isolate the story metadata export.", 422);
		}

		return NextResponse.json({
			slug: requestedSlug,
			metadata,
			body: parsed.body,
		});
	} catch {
		return errorResponse("Could not read the story library.", 500);
	}
}

export async function POST(request: Request) {
	try {
		const formData = await request.formData();
		const file = formData.get("file");
		if (
			!(file instanceof File) ||
			file.size === 0 ||
			file.size > 5 * 1024 * 1024
		) {
			return errorResponse("Choose an MDX file smaller than 5 MB.", 400);
		}

		const source = await file.text();
		const parsed = parseMdxSource(source);
		return NextResponse.json({
			slug:
				typeof parsed.metadata.slug === "string" ? parsed.metadata.slug : "",
			metadata: parsed.metadata,
			body: parsed.body,
		});
	} catch {
		return errorResponse("Could not parse this MDX file.", 422);
	}
}
