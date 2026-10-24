import { TEXT } from "@/const/text";
import type { PhotoCardDetailType, StoryContentType } from "@/types/components";
import { toDatePublished, parseTags, toSlug } from "./draft";
import { parseCoordinatePair, parseRoute } from "./geo";
import type { StoryBlock, StoryDraft } from "./types";

// Maps editor blocks to the section layouts the live preview understands.
export const toStoryContent = (
	blocks: StoryBlock[],
	metadata: Pick<
		StoryDraft,
		"city" | "country" | "activityType" | "eventDateFrom"
	>,
): StoryContentType[] =>
	blocks.flatMap<StoryContentType>((block): StoryContentType[] => {
		if (block.type === "raw" && block.rawOutsideCenter) return [];
		let sectionID: string;
		let photoUrls: PhotoCardDetailType[] = [];

		switch (block.type) {
			case "paragraph":
				sectionID = "layout2";
				break;
			case "quote":
				sectionID = "layout1";
				break;
			case "image":
				sectionID = "layout5";
				if (block.imageUrl.trim()) {
					photoUrls = [
						{
							id: block.id,
							photoUrl: block.imageUrl,
							description: block.imageAlt || "Story photo",
							city: metadata.city,
							country: metadata.country,
							activityType: metadata.activityType,
							activityDate: metadata.eventDateFrom,
						},
					];
				}
				break;
			case "gallery":
				sectionID = "layout6";
				photoUrls = block.gallery
					.filter((photo) => photo.url.trim())
					.map((photo, index) => ({
						id: `${block.id}-${index}`,
						photoUrl: photo.url,
						description: photo.alt || "Gallery photo",
						city: metadata.city,
						country: metadata.country,
						activityType: metadata.activityType,
						activityDate: metadata.eventDateFrom,
					}));
				break;
			case "section":
				sectionID = "layout9";
				break;
			case "checklist":
				sectionID = "layout11";
				break;
			case "itemlist":
				sectionID = "layout12";
				break;
			case "iframe":
				sectionID = "layout13";
				break;
			case "divider":
				sectionID = "layout14";
				break;
			case "highlight":
				sectionID = "layout15";
				break;
			case "related":
				sectionID = "layout17";
				break;
			case "map":
				sectionID = "layout10";
				break;
			case "raw":
				sectionID = "layout16";
				break;
		}

		if (sectionID === "layout5" || sectionID === "layout6") {
			return photoUrls.length
				? [{ sectionID, textContent: block.text, photoUrls }]
				: [];
		}
		if (sectionID === "layout14") {
			return [{ sectionID, textContent: "", photoUrls }];
		}
		if (sectionID === "layout11" || sectionID === "layout12") {
			const items = block.items.filter((item) => item.label.trim());
			return items.length
				? [{ sectionID, textContent: "", photoUrls, items }]
				: [];
		}
		if (sectionID === "layout13") {
			return block.url.trim()
				? [{ sectionID, textContent: "", photoUrls, url: block.url }]
				: [];
		}
		if (sectionID === "layout10") {
			const center = parseCoordinatePair(
				`${block.centerLatitude},${block.centerLongitude}`,
			);
			return [
				{
					sectionID,
					textContent: block.text,
					photoUrls,
					...(center ? { center } : {}),
					...(parseRoute(block.route).length
						? { route: parseRoute(block.route) }
						: {}),
					shouldShowDownloadGPX: block.shouldShowDownloadGPX,
					title: block.mapTitle,
				},
			];
		}
		if (sectionID === "layout16") {
			return [{ sectionID, textContent: "", photoUrls, rawMdx: block.rawMdx }];
		}
		if (sectionID === "layout17") {
			const relatedStorySlugs = Array.from(
				new Set(block.relatedStorySlugs.filter((slug) => slug.trim())),
			);
			return relatedStorySlugs.length
				? [
						{
							sectionID,
							textContent: block.text.trim() || TEXT.common.relatedPosts,
							photoUrls,
							relatedStorySlugs,
						},
					]
				: [];
		}

		return block.text.trim()
			? [{ sectionID, textContent: block.text, photoUrls }]
			: [];
	});

// Turns a draft into the MDX file that gets downloaded or published.
export const toMdx = (draft: StoryDraft) => {
	const metadata = {
		slug: draft.slug || toSlug(draft.title),
		title: draft.title,
		id: draft.storyId,
		views: draft.views,
		likes: draft.likes,
		cover: draft.cover,
		description: draft.description,
		datePublished: toDatePublished(draft.datePublished),
		dateModified: draft.updatedAt,
		eventDateTo: draft.eventDateTo,
		eventDateFrom: draft.eventDateFrom,
		tags: parseTags(draft.tags),
		city: draft.city,
		country: draft.country,
		activityType: draft.activityType,
		...(draft.series.trim() ? { series: draft.series.trim() } : {}),
		nextPostSlug: draft.nextPostSlug,
		prevPostSlug: draft.prevPostSlug,
	};

	const serializedBlocks = draft.blocks
		.map((block) => ({
			block,
			source: (() => {
				switch (block.type) {
					case "paragraph":
						return block.rawMdx?.trim() || block.text.trim();
					case "quote":
						return `<Quo\n\ttext={${JSON.stringify(block.text)}}\n\tshouldCenter={true}\n/>`;
					case "image":
						return `<Pho photo={{ photoUrl: ${JSON.stringify(block.imageUrl)}, description: ${JSON.stringify(block.imageAlt)} }} />`;
					case "gallery": {
						const photos = block.gallery
							.filter((photo) => photo.url.trim())
							.map(
								(photo) =>
									`\t{ photoUrl: ${JSON.stringify(photo.url)}, description: ${JSON.stringify(photo.alt)} },`,
							)
							.join("\n");
						return `<PhoCol photo={[\n${photos}\n]} />`;
					}
					case "section":
						return `<Section text=${JSON.stringify(block.text)} />`;
					case "checklist": {
						const items = block.items
							.filter((item) => item.label.trim())
							.map(
								(item) =>
									`\t{ label: ${JSON.stringify(item.label)}, done: ${item.done} },`,
							)
							.join("\n");
						return `<Checklist items={[\n${items}\n]} />`;
					}
					case "itemlist": {
						const items = block.items
							.filter((item) => item.label.trim())
							.map((item) => `\t{ label: ${JSON.stringify(item.label)} },`)
							.join("\n");
						return `<ItemList items={[\n${items}\n]} />`;
					}
					case "iframe":
						return block.url.trim()
							? `<IframeWithLoader url={${JSON.stringify(block.url)}} />`
							: "";
					case "map": {
						const center = parseCoordinatePair(
							`${block.centerLatitude},${block.centerLongitude}`,
						);
						const route = parseRoute(block.route);
						const props = [
							...(center ? [`center={${JSON.stringify(center)}}`] : []),
							...(route.length ? [`route={${JSON.stringify(route)}}`] : []),
							...(block.shouldShowDownloadGPX
								? ["shouldShowDownloadGPX={true}"]
								: []),
							...(block.mapTitle.trim()
								? [`title={${JSON.stringify(block.mapTitle)}}`]
								: []),
							...(block.text.trim()
								? [`description={${JSON.stringify(block.text)}}`]
								: []),
						].join(" ");
						return `<MapWithDescription${props ? ` ${props}` : ""} />`;
					}
					case "divider":
						return "<hr />";
					case "highlight":
						return block.text.trim()
							? `<Highlight>{${JSON.stringify(block.text)}}</Highlight>`
							: "";
					case "related": {
						const slugs = Array.from(
							new Set(block.relatedStorySlugs.filter((slug) => slug.trim())),
						);
						return slugs.length
							? `<RelatedPosts title={${JSON.stringify(block.text.trim() || TEXT.common.relatedPosts)}} slugs={${JSON.stringify(slugs)}} currentSlug={${JSON.stringify(draft.slug || toSlug(draft.title))}} />`
							: "";
					}
					case "raw":
						return block.rawMdx;
				}
			})(),
		}))
		.filter((item) => Boolean(item.source));
	const isImportedLayout = draft.blocks.some(
		(block) => block.insideCenter !== undefined || block.rawOutsideCenter,
	);
	const hasRawSourceBlock = draft.blocks.some((block) => block.type === "raw");
	const groups: { insideCenter: boolean; source: string }[] = [];
	for (const item of serializedBlocks) {
		const insideCenter = isImportedLayout
			? item.block.insideCenter === true && !item.block.rawOutsideCenter
			: !hasRawSourceBlock;
		const previous = groups[groups.length - 1];
		if (previous?.insideCenter === insideCenter) {
			previous.source += `\n\n${item.source}`;
		} else {
			groups.push({ insideCenter, source: item.source as string });
		}
	}
	const contentBody = groups
		.map((group) =>
			group.insideCenter
				? `<Center>\n${group.source}\n</Center>`
				: group.source,
		)
		.join("\n\n");
	const body = [draft.supportingMdx?.trim(), contentBody]
		.filter(Boolean)
		.join("\n\n");
	return `export const metadata = ${JSON.stringify(metadata, null, 2)};\n\n${body}\n`;
};
