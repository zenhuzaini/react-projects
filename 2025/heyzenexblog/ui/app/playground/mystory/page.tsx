"use client";

import { useEffect, useState } from "react";
import type { DragEvent, FormEvent } from "react";
import {
	ArrowDown,
	ArrowDownToLine,
	ArrowUp,
	Check,
	ChevronDown,
	ChevronLeft,
	ChevronRight,
	Code2,
	CloudUpload,
	Eye,
	FolderOpen,
	GripVertical,
	Highlighter,
	ImagePlus,
	Link2,
	Layers3,
	LoaderCircle,
	List,
	ListChecks,
	MapPin,
	Minus,
	PanelLeftClose,
	PanelLeftOpen,
	Plus,
	Quote,
	Search,
	Text,
	Trash2,
	Type,
	Upload,
	X,
} from "lucide-react";
import MainStoryBookPage from "@/components/layout/StoryBookBlockLayouts/MainStoryBookPage";

import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { photoMockStatic } from "@/mock/photo";
import type { PhotoCardDetailType, StoryContentType } from "@/types/components";
import Heading from "@/components/molecule/Headings/Heading";
import { toast } from "@/components/ui/toast";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

type BlockType =
	| "paragraph"
	| "quote"
	| "image"
	| "gallery"
	| "section"
	| "checklist"
	| "itemlist"
	| "iframe"
	| "map"
	| "divider"
	| "highlight"
	| "raw";

type StoryListItem = { label: string; done: boolean };
type ImageQuality = "auto:eco" | "auto:good" | "auto:best";
type ImageUploadTarget =
	| { kind: "cover" }
	| { kind: "block"; blockId: string; galleryIndex?: number };
type PendingImageUpload = ImageUploadTarget & {
	file: File;
	imageQuality: ImageQuality;
};

type StoryBlock = {
	id: string;
	type: BlockType;
	text: string;
	imageUrl: string;
	imageAlt: string;
	gallery: { url: string; alt: string }[];
	items: StoryListItem[];
	url: string;
	centerLatitude: string;
	centerLongitude: string;
	route: string;
	shouldShowDownloadGPX: boolean;
	mapTitle: string;
	rawMdx: string;
	insideCenter?: boolean;
	rawOutsideCenter?: boolean;
};

type ImportedStoryBlock = Partial<Omit<StoryBlock, "id" | "type">> & {
	type: BlockType;
	insideCenter?: boolean;
	rawOutsideCenter?: boolean;
};

type ExistingStorySummary = { slug: string; title: string };
type ExistingStoryResponse = {
	slug: string;
	body: string;
	blocks?: ImportedStoryBlock[];
	supportingMdx?: string;
	metadata: {
		slug?: string;
		id?: number;
		title?: string;
		description?: string;
		cover?: string;
		city?: string;
		country?: string;
		activityType?: string;
		tags?: string[];
		views?: number;
		likes?: number;
		datePublished?: string;
		dateModified?: string;
		eventDateFrom?: string;
		eventDateTo?: string;
		nextPostSlug?: string;
		prevPostSlug?: string;
	};
};

type StoryDraft = {
	id: string;
	storyId: number;
	title: string;
	slug: string;
	description: string;
	cover: string;
	imageQuality: ImageQuality;
	city: string;
	country: string;
	activityType: string;
	tags: string;
	views: number;
	likes: number;
	datePublished: string;
	eventDateFrom: string;
	eventDateTo: string;
	nextPostSlug: string;
	prevPostSlug: string;
	supportingMdx?: string;
	blocks: StoryBlock[];
	createdAt: string;
	updatedAt: string;
};

const STORAGE_KEY = "heyzenex-mystory-drafts";
const MAX_GPX_FILE_SIZE = 20 * 1024 * 1024;
const MAX_GPX_ROUTE_POINTS = 2000;
const STORY_LIBRARY_PAGE_SIZE = 5;

const blockOptions: { type: BlockType; label: string; icon: typeof Text }[] = [
	{ type: "paragraph", label: "Paragraph", icon: Text },
	{ type: "quote", label: "Quote", icon: Quote },
	{ type: "image", label: "Photo", icon: ImagePlus },
	{ type: "gallery", label: "Gallery", icon: Layers3 },
	{ type: "section", label: "Section title", icon: Type },
	{ type: "checklist", label: "Checklist", icon: ListChecks },
	{ type: "itemlist", label: "Item list", icon: List },
	{ type: "iframe", label: "Map embed", icon: Link2 },
	{ type: "map", label: "Map with description", icon: MapPin },
	{ type: "divider", label: "Divider", icon: Minus },
	{ type: "highlight", label: "Highlight", icon: Highlighter },
	{ type: "raw", label: "MDX source", icon: Code2 },
];

const createBlock = (
	type: BlockType,
	id = crypto.randomUUID(),
): StoryBlock => ({
	id,
	type,
	text: type === "paragraph" ? "Write your story here..." : "",
	imageUrl: "",
	imageAlt: "",
	gallery: [
		{ url: "", alt: "" },
		{ url: "", alt: "" },
	],
	items: [],
	url: "",
	centerLatitude: "",
	centerLongitude: "",
	route: "",
	shouldShowDownloadGPX: false,
	mapTitle: "",
	rawMdx: "",
});

const createDraft = (
	id = crypto.randomUUID(),
	blockId = crypto.randomUUID(),
): StoryDraft => ({
	id,
	storyId: 1,
	title: "A Weekend Along the Velo Dunajec",
	slug: "a-weekend-along-the-velo-dunajec",
	description:
		"A sample ride through the mountains, lakes, and forest roads of southern Poland.",
	cover: photoMockStatic[0].photoUrl,
	imageQuality: "auto:good",
	city: "Zakopane",
	country: "Poland",
	activityType: "bikepacking",
	tags: "bikepacking, adventure, Poland",
	views: 100,
	likes: 10,
	datePublished: "",
	eventDateFrom: "",
	eventDateTo: "",
	nextPostSlug: "",
	prevPostSlug: "",
	blocks: [
		{
			...createBlock("paragraph", blockId),
			text: "A long weekend on the bike, following quiet paths through the mountains and finding a new reason to keep riding each day.",
		},
	],
	createdAt: "",
	updatedAt: "",
});

const normalizeSavedDraft = (saved: StoryDraft): StoryDraft => {
	const fallbackDraft = createDraft(saved.id);
	const fallbackDate = new Date(saved.createdAt || saved.updatedAt || "");
	return {
		...fallbackDraft,
		...saved,
		storyId: saved.storyId ?? 1,
		nextPostSlug: saved.nextPostSlug ?? "",
		prevPostSlug: saved.prevPostSlug ?? "",
		imageQuality: saved.imageQuality ?? "auto:good",
		views: saved.views ?? 100,
		likes: saved.likes ?? 10,
		supportingMdx: saved.supportingMdx ?? "",
		datePublished:
			saved.datePublished ||
			(Number.isNaN(fallbackDate.getTime())
				? toLocalDateTimeInput(new Date())
				: toLocalDateTimeInput(fallbackDate)),
		blocks: Array.isArray(saved.blocks)
			? saved.blocks.map((block) => {
					const defaults = createBlock(block.type, block.id);
					return {
						...defaults,
						...block,
						text: typeof block.text === "string" ? block.text : defaults.text,
						rawMdx: typeof block.rawMdx === "string" ? block.rawMdx : "",
						gallery: Array.isArray(block.gallery)
							? block.gallery.map((photo) => ({
									url: typeof photo.url === "string" ? photo.url : "",
									alt: typeof photo.alt === "string" ? photo.alt : "",
								}))
							: defaults.gallery,
						items: Array.isArray(block.items)
							? block.items.map((item) => ({
									label: typeof item.label === "string" ? item.label : "",
									done: item.done === true,
								}))
							: defaults.items,
					};
				})
			: fallbackDraft.blocks,
	};
};

const stampDraft = (draft: StoryDraft, timestamp: string): StoryDraft => ({
	...draft,
	slug: draft.slug || toSlug(draft.title),
	createdAt: draft.createdAt || timestamp,
	updatedAt: timestamp,
});

const upsertSavedDraft = (drafts: StoryDraft[], draft: StoryDraft) =>
	drafts.some((saved) => saved.id === draft.id)
		? drafts.map((saved) => (saved.id === draft.id ? draft : saved))
		: [draft, ...drafts];

const toSlug = (value: string) =>
	value
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-|-$/g, "");

const toLocalDateTimeInput = (date: Date) => {
	const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
	return localDate.toISOString().slice(0, 16);
};

const toLocalDateInput = (value: string | undefined) => {
	if (!value) return "";
	if (/^\d{4}-\d{2}-\d{2}/.test(value)) return value.slice(0, 10);
	const date = new Date(value);
	if (Number.isNaN(date.getTime())) return "";
	const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
	return localDate.toISOString().slice(0, 10);
};

const toDatePublished = (value: string) =>
	value ? new Date(value).toString() : "";

const parseTags = (value: string) =>
	value
		.split(",")
		.map((tag) => tag.trim())
		.filter(Boolean);

const parseCoordinatePair = (value: string): [number, number] | undefined => {
	const parts = value.split(",").map((coordinate) => coordinate.trim());
	if (parts.length !== 2 || parts.some((coordinate) => !coordinate)) {
		return undefined;
	}
	const coordinates = parts.map(Number);
	if (
		coordinates.length !== 2 ||
		coordinates.some((coordinate) => !Number.isFinite(coordinate))
	) {
		return undefined;
	}
	return [coordinates[0], coordinates[1]];
};

const parseRoute = (value: string): [number, number][] =>
	value
		.split("\n")
		.map((line) => parseCoordinatePair(line))
		.filter((coordinates): coordinates is [number, number] =>
			Boolean(coordinates),
		);

const parseGpxRoute = (source: string): [number, number][] => {
	if (/<!DOCTYPE|<!ENTITY/i.test(source)) {
		throw new Error(
			"GPX files with document types or entities are not supported.",
		);
	}

	const document = new DOMParser().parseFromString(source, "application/xml");
	if (document.getElementsByTagName("parsererror").length) {
		throw new Error("The selected file is not valid GPX/XML.");
	}

	const elements = Array.from(document.getElementsByTagName("*"));
	const trackNodes = elements.filter(
		(element) => element.localName === "trkpt",
	);
	const routeNodes = elements.filter(
		(element) => element.localName === "rtept",
	);
	const pointNodes = trackNodes.length ? trackNodes : routeNodes;
	const points = pointNodes.flatMap((element) => {
		const latitudeValue = element.getAttribute("lat");
		const longitudeValue = element.getAttribute("lon");
		if (latitudeValue === null || longitudeValue === null) return [];
		const latitude = Number(latitudeValue);
		const longitude = Number(longitudeValue);
		if (
			!Number.isFinite(latitude) ||
			!Number.isFinite(longitude) ||
			latitude < -90 ||
			latitude > 90 ||
			longitude < -180 ||
			longitude > 180
		) {
			return [];
		}
		return [[latitude, longitude] as [number, number]];
	});

	if (points.length < 2) {
		throw new Error(
			"The GPX file must contain at least two track or route points.",
		);
	}
	if (points.length <= MAX_GPX_ROUTE_POINTS) return points;

	return Array.from({ length: MAX_GPX_ROUTE_POINTS }, (_, index) => {
		const pointIndex = Math.round(
			(index * (points.length - 1)) / (MAX_GPX_ROUTE_POINTS - 1),
		);
		return points[pointIndex];
	});
};

const toStoryContent = (
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

		return block.text.trim()
			? [{ sectionID, textContent: block.text, photoUrls }]
			: [];
	});

const toMdx = (draft: StoryDraft) => {
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

const MystoryPlayground = () => {
	const [draft, setDraft] = useState<StoryDraft>(() =>
		createDraft("initial-draft", "initial-paragraph"),
	);
	const [savedDrafts, setSavedDrafts] = useState<StoryDraft[]>([]);
	const [isHydrated, setIsHydrated] = useState(false);
	const [activeDraftId, setActiveDraftId] = useState<string | null>(null);
	const [draggedBlockId, setDraggedBlockId] = useState<string | null>(null);
	const [dropIndex, setDropIndex] = useState<number | null>(null);
	const [notice, setNotice] = useState("");
	const [outputTab, setOutputTab] = useState<"mdx" | "preview">("mdx");
	const [isSavedStoriesExpanded, setIsSavedStoriesExpanded] = useState(true);
	const [isStoryDetailsOpen, setIsStoryDetailsOpen] = useState(true);
	const [isStoryLibraryOpen, setIsStoryLibraryOpen] = useState(false);
	const [storySearchQuery, setStorySearchQuery] = useState("");
	const [storyLibraryPage, setStoryLibraryPage] = useState(1);
	const [existingStories, setExistingStories] = useState<
		ExistingStorySummary[]
	>([]);
	const [isLoadingStoryLibrary, setIsLoadingStoryLibrary] = useState(false);
	const [isImportingExternalStory, setIsImportingExternalStory] =
		useState(false);
	const [loadingStorySlug, setLoadingStorySlug] = useState<string | null>(null);
	const [storyLibraryError, setStoryLibraryError] = useState("");
	const [isPublishDialogOpen, setIsPublishDialogOpen] = useState(false);
	const [publishSecret, setPublishSecret] = useState("");
	const [pendingImageUpload, setPendingImageUpload] =
		useState<PendingImageUpload | null>(null);
	const [isPublishing, setIsPublishing] = useState(false);
	const filteredExistingStories = existingStories.filter((story) => {
		const query = storySearchQuery.trim().toLowerCase();
		return (
			!query ||
			story.title.toLowerCase().includes(query) ||
			story.slug.toLowerCase().includes(query)
		);
	});
	const storyLibraryPageCount = Math.max(
		1,
		Math.ceil(filteredExistingStories.length / STORY_LIBRARY_PAGE_SIZE),
	);
	const paginatedExistingStories = filteredExistingStories.slice(
		(storyLibraryPage - 1) * STORY_LIBRARY_PAGE_SIZE,
		storyLibraryPage * STORY_LIBRARY_PAGE_SIZE,
	);

	useEffect(() => {
		try {
			const storedDrafts = localStorage.getItem(STORAGE_KEY);
			if (storedDrafts) {
				const drafts = JSON.parse(storedDrafts) as StoryDraft[];
				setSavedDrafts(drafts.map(normalizeSavedDraft));
			}
		} catch {
			setNotice("Saved drafts could not be read from this browser.");
		}
		setDraft((current) => ({
			...current,
			datePublished: current.datePublished || toLocalDateTimeInput(new Date()),
		}));
		setIsHydrated(true);
	}, []);

	useEffect(() => {
		if (!isHydrated || !activeDraftId) return;
		const saved = savedDrafts.find((item) => item.id === activeDraftId);
		if (saved && JSON.stringify(saved) === JSON.stringify(draft)) return;

		const timeout = window.setTimeout(() => {
			const timestamp = new Date().toISOString();
			const updatedDraft = stampDraft(
				{ ...draft, id: activeDraftId },
				timestamp,
			);
			const nextDrafts = upsertSavedDraft(savedDrafts, updatedDraft);
			setDraft(updatedDraft);
			setSavedDrafts(nextDrafts);
			try {
				localStorage.setItem(STORAGE_KEY, JSON.stringify(nextDrafts));
			} catch {
				setNotice("Draft could not be saved in this browser.");
			}
		}, 500);

		return () => window.clearTimeout(timeout);
	}, [activeDraftId, draft, isHydrated, savedDrafts]);

	const updateDraft = (updates: Partial<StoryDraft>) =>
		setDraft((current) => ({ ...current, ...updates }));

	const updateBlock = (id: string, updates: Partial<StoryBlock>) =>
		setDraft((current) => ({
			...current,
			blocks: current.blocks.map((block) =>
				block.id === id
					? {
							...block,
							...updates,
							...(block.type === "paragraph" && updates.text !== undefined
								? { rawMdx: "" }
								: {}),
						}
					: block,
			),
		}));

	const updateListItem = (
		block: StoryBlock,
		index: number,
		updates: Partial<StoryListItem>,
	) => {
		const items = [...block.items];
		items[index] = { ...items[index], ...updates };
		updateBlock(block.id, { items });
	};

	const applyImportedStory = (
		result: ExistingStoryResponse,
		fallbackSlug: string,
		fallbackTitle: string,
	) => {
		const metadata = result.metadata;
		const now = new Date().toISOString();
		const publishedDate = metadata.datePublished
			? new Date(metadata.datePublished)
			: new Date();
		const modifiedDate = metadata.dateModified
			? new Date(metadata.dateModified)
			: publishedDate;
		const createdAt = Number.isNaN(publishedDate.getTime())
			? new Date(now)
			: publishedDate;
		const updatedAt = Number.isNaN(modifiedDate.getTime())
			? createdAt
			: modifiedDate;
		const slug = metadata.slug || result.slug || fallbackSlug;
		const importedBlocks = result.blocks?.length
			? result.blocks.map((block) => ({
					...createBlock(block.type),
					...block,
					id: crypto.randomUUID(),
				}))
			: result.body.trim() && !result.supportingMdx
				? [{ ...createBlock("raw"), rawMdx: result.body }]
				: [];

		const importedDraft = {
			...createDraft(),
			id: crypto.randomUUID(),
			storyId: metadata.id ?? 1,
			title: metadata.title || fallbackTitle,
			slug,
			description: metadata.description || "",
			cover: metadata.cover || photoMockStatic[0].photoUrl,
			imageQuality: draft.imageQuality,
			city: metadata.city || "",
			country: metadata.country || "",
			activityType: metadata.activityType || "bikepacking",
			tags: metadata.tags?.join(", ") || "",
			views: metadata.views ?? 0,
			likes: metadata.likes ?? 0,
			datePublished: toLocalDateTimeInput(
				Number.isNaN(publishedDate.getTime()) ? new Date() : publishedDate,
			),
			eventDateFrom: toLocalDateInput(metadata.eventDateFrom),
			eventDateTo: toLocalDateInput(metadata.eventDateTo),
			nextPostSlug: metadata.nextPostSlug || "",
			prevPostSlug: metadata.prevPostSlug || "",
			supportingMdx: result.supportingMdx || "",
			createdAt: createdAt.toISOString(),
			updatedAt: updatedAt.toISOString(),
			blocks: importedBlocks,
		};
		setDraft(importedDraft);
		setActiveDraftId(importedDraft.id);
		setIsStoryDetailsOpen(true);
		setOutputTab("mdx");
		setIsStoryLibraryOpen(false);
		setNotice(`Loaded ${metadata.title || fallbackTitle}.`);
	};

	const openStoryLibrary = async () => {
		setIsStoryLibraryOpen(true);
		setStorySearchQuery("");
		setStoryLibraryPage(1);
		setIsLoadingStoryLibrary(true);
		setStoryLibraryError("");
		try {
			const response = await fetch("/api/stories/library");
			const result = (await response.json().catch(() => ({}))) as {
				error?: string;
				stories?: ExistingStorySummary[];
			};
			if (!response.ok) {
				throw new Error(result.error || "Could not load the story library.");
			}
			setExistingStories(result.stories ?? []);
		} catch (error) {
			setStoryLibraryError(
				error instanceof Error
					? error.message
					: "Could not load the story library.",
			);
		} finally {
			setIsLoadingStoryLibrary(false);
		}
	};

	const importExternalStory = async (file: File | undefined) => {
		if (!file) return;
		if (!/\.(md|mdx)$/i.test(file.name)) {
			setStoryLibraryError("Choose a .md or .mdx file.");
			return;
		}

		setIsImportingExternalStory(true);
		setStoryLibraryError("");
		try {
			const formData = new FormData();
			formData.set("file", file);
			const response = await fetch("/api/stories/library", {
				method: "POST",
				body: formData,
			});
			const result = (await response.json().catch(() => ({}))) as
				| ExistingStoryResponse
				| { error?: string };
			if (!response.ok || !("metadata" in result) || !result.body) {
				throw new Error(
					"error" in result
						? result.error || "Could not import this MDX file."
						: "Could not import this MDX file.",
				);
			}

			const fallbackTitle = file.name.replace(/\.(md|mdx)$/i, "");
			const fallbackSlug = toSlug(fallbackTitle) || "imported-story";
			applyImportedStory(result, fallbackSlug, fallbackTitle);
		} catch (error) {
			setStoryLibraryError(
				error instanceof Error
					? error.message
					: "Could not import this MDX file.",
			);
		} finally {
			setIsImportingExternalStory(false);
		}
	};

	const loadExistingStory = async (slug: string) => {
		setLoadingStorySlug(slug);
		setStoryLibraryError("");
		try {
			const response = await fetch(
				`/api/stories/library?slug=${encodeURIComponent(slug)}`,
			);
			const result = (await response.json().catch(() => ({}))) as
				| ExistingStoryResponse
				| { error?: string };
			if (!response.ok || !("metadata" in result)) {
				throw new Error(
					"error" in result
						? result.error || "Could not load this story."
						: "Could not load this story.",
				);
			}

			applyImportedStory(
				result,
				result.slug,
				result.metadata.title || result.slug,
			);
		} catch (error) {
			setStoryLibraryError(
				error instanceof Error ? error.message : "Could not load this story.",
			);
		} finally {
			setLoadingStorySlug(null);
		}
	};

	const uploadImage = async (
		file: File,
		target: ImageUploadTarget,
		secret: string,
		imageQuality: ImageQuality,
	) => {
		setIsPublishing(true);
		const uploadTask = (async () => {
			try {
				const formData = new FormData();
				formData.set("file", file);
				formData.set("quality", imageQuality);
				const response = await fetch("/api/images/upload", {
					method: "POST",
					headers: { "x-publish-secret": secret },
					body: formData,
				});
				const result = (await response.json().catch(() => ({}))) as {
					error?: string;
					url?: string;
				};
				if (!response.ok || !result.url) {
					throw new Error(result.error || "Could not upload this image.");
				}

				setDraft((current) => {
					if (target.kind === "cover") {
						return { ...current, cover: result.url! };
					}

					return {
						...current,
						blocks: current.blocks.map((block) => {
							if (block.id !== target.blockId) return block;
							if (target.galleryIndex === undefined) {
								return { ...block, imageUrl: result.url! };
							}
							return {
								...block,
								gallery: block.gallery.map((photo, index) =>
									index === target.galleryIndex
										? { ...photo, url: result.url! }
										: photo,
								),
							};
						}),
					};
				});
				setPendingImageUpload(null);
				setIsPublishDialogOpen(false);
				return file.name;
			} finally {
				setIsPublishing(false);
			}
		})();

		return toast
			.promise(uploadTask, {
				loading: {
					title: "Uploading image",
					description: `Uploading ${file.name} to Cloudinary…`,
					type: "loading",
					timeout: 0,
				},
				success: (fileName) => ({
					title: "Upload complete",
					description: `${fileName} uploaded. Its URL was added to the draft.`,
					type: "success",
				}),
				error: (error) => ({
					title: "Upload failed",
					description:
						error instanceof Error
							? error.message
							: "Could not upload this image.",
					type: "error",
					priority: "high",
				}),
			})
			.catch(() => undefined);
	};

	const handleImageUpload = (
		file: File | undefined,
		target: ImageUploadTarget,
	) => {
		if (!file) return;
		if (!file.type.startsWith("image/")) {
			toast.add({
				title: "Unsupported file",
				description: "Choose an image file to upload.",
				type: "error",
				priority: "high",
			});
			return;
		}
		if (file.size > 10 * 1024 * 1024) {
			toast.add({
				title: "Image too large",
				description: "Images must be 10 MB or smaller.",
				type: "error",
				priority: "high",
			});
			return;
		}

		if (publishSecret) {
			void uploadImage(file, target, publishSecret, draft.imageQuality);
			return;
		}

		setPendingImageUpload({
			...target,
			file,
			imageQuality: draft.imageQuality,
		});
		setIsPublishDialogOpen(true);
	};

	const importGpxRoute = async (blockId: string, file: File) => {
		if (file.size > MAX_GPX_FILE_SIZE) {
			setNotice("GPX files must be smaller than 20 MB.");
			return;
		}

		try {
			const route = parseGpxRoute(await file.text());
			const centerLatitude =
				route.reduce((sum, point) => sum + point[0], 0) / route.length;
			const centerLongitude =
				route.reduce((sum, point) => sum + point[1], 0) / route.length;
			updateBlock(blockId, {
				centerLatitude: centerLatitude.toFixed(6),
				centerLongitude: centerLongitude.toFixed(6),
				route: route
					.map(([latitude, longitude]) => `${latitude}, ${longitude}`)
					.join("\n"),
			});
			setNotice(`Imported ${route.length} route points from ${file.name}.`);
		} catch (error) {
			setNotice(
				error instanceof Error
					? error.message
					: "Could not read this GPX file.",
			);
		}
	};

	const addBlock = (type: BlockType, index = draft.blocks.length) => {
		const nextBlocks = [...draft.blocks];
		nextBlocks.splice(index, 0, createBlock(type));
		updateDraft({ blocks: nextBlocks });
		setDropIndex(null);
	};

	const moveBlock = (from: number, to: number) => {
		if (from === to || to < 0 || to >= draft.blocks.length) return;
		const nextBlocks = [...draft.blocks];
		const [movedBlock] = nextBlocks.splice(from, 1);
		nextBlocks.splice(to, 0, movedBlock);
		updateDraft({ blocks: nextBlocks });
	};

	const startNewDraft = () => {
		const timestamp = new Date().toISOString();
		const currentSaved = activeDraftId
			? savedDrafts.find((item) => item.id === activeDraftId)
			: undefined;
		const draftsToKeep =
			currentSaved && JSON.stringify(currentSaved) !== JSON.stringify(draft)
				? upsertSavedDraft(
						savedDrafts,
						stampDraft({ ...draft, id: activeDraftId as string }, timestamp),
					)
				: savedDrafts;
		const newDraft = stampDraft(
			{
				...createDraft(),
				datePublished: toLocalDateTimeInput(new Date()),
			},
			timestamp,
		);
		const nextDrafts = upsertSavedDraft(draftsToKeep, newDraft);
		setDraft(newDraft);
		setSavedDrafts(nextDrafts);
		setActiveDraftId(newDraft.id);
		setNotice("New draft created and saved automatically.");
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(nextDrafts));
		} catch {
			setNotice("Draft could not be saved in this browser.");
		}
	};

	const loadDraft = (saved: StoryDraft) => {
		setDraft(normalizeSavedDraft(saved));
		setActiveDraftId(saved.id);
		setNotice("");
	};

	const deleteDraft = (id: string) => {
		const nextDrafts = savedDrafts.filter((item) => item.id !== id);
		setSavedDrafts(nextDrafts);
		localStorage.setItem(STORAGE_KEY, JSON.stringify(nextDrafts));
		if (activeDraftId === id) {
			const nextDraft = nextDrafts[0];
			if (nextDraft) {
				setDraft(normalizeSavedDraft(nextDraft));
				setActiveDraftId(nextDraft.id);
			} else {
				setDraft({
					...createDraft(),
					datePublished: toLocalDateTimeInput(new Date()),
				});
				setActiveDraftId(null);
			}
		}
		setNotice("Draft deleted");
	};

	const publishDraft = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (isPublishing) return;
		if (pendingImageUpload) {
			await uploadImage(
				pendingImageUpload.file,
				pendingImageUpload,
				publishSecret,
				pendingImageUpload.imageQuality,
			);
			return;
		}

		const slug = draft.slug || toSlug(draft.title);
		if (!slug) {
			setNotice("Add a title before publishing.");
			return;
		}

		setIsPublishing(true);
		setNotice("");
		const now = new Date().toISOString();
		const publishedDraft = {
			...draft,
			slug,
			createdAt: draft.createdAt || now,
			updatedAt: now,
		};

		try {
			const response = await fetch("/api/stories/publish", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"x-publish-secret": publishSecret,
				},
				body: JSON.stringify({
					slug,
					title: publishedDraft.title,
					content: toMdx(publishedDraft),
				}),
			});
			const result = (await response.json().catch(() => ({}))) as {
				error?: string;
				path?: string;
				branch?: string;
			};

			if (!response.ok) {
				throw new Error(result.error || "Could not publish this story.");
			}

			const nextDrafts = activeDraftId
				? savedDrafts.map((saved) =>
						saved.id === activeDraftId ? publishedDraft : saved,
					)
				: [publishedDraft, ...savedDrafts];
			setDraft(publishedDraft);
			setSavedDrafts(nextDrafts);
			setActiveDraftId(publishedDraft.id);
			localStorage.setItem(STORAGE_KEY, JSON.stringify(nextDrafts));
			setNotice(
				`Published ${result.path || `${slug}.mdx`} to ${result.branch || "GitHub"}.`,
			);
			setIsPublishDialogOpen(false);
		} catch (error) {
			setNotice(
				error instanceof Error
					? error.message
					: "Could not publish this story.",
			);
		} finally {
			setIsPublishing(false);
		}
	};

	const downloadMdx = () => {
		const file = new Blob([toMdx(draft)], {
			type: "text/markdown;charset=utf-8",
		});
		const url = URL.createObjectURL(file);
		const link = document.createElement("a");
		link.href = url;
		link.download = `${draft.slug || toSlug(draft.title) || "story"}.mdx`;
		link.click();
		URL.revokeObjectURL(url);
		setNotice("MDX file downloaded");
	};

	const handleDrop = (event: DragEvent<HTMLElement>, index: number) => {
		event.preventDefault();
		const paletteType = event.dataTransfer.getData("application/story-block");
		if (paletteType) {
			addBlock(paletteType as BlockType, index);
		} else if (draggedBlockId) {
			const sourceIndex = draft.blocks.findIndex(
				(block) => block.id === draggedBlockId,
			);
			moveBlock(sourceIndex, index);
		}
		setDraggedBlockId(null);
		setDropIndex(null);
	};

	const mdx = toMdx(draft);
	const storyContent = toStoryContent(draft.blocks, draft);
	const storyPhotoUrls = storyContent.flatMap((content) => content.photoUrls);
	const storyCover =
		draft.cover || storyPhotoUrls[0]?.photoUrl || photoMockStatic[0].photoUrl;
	const isDraftSaved =
		activeDraftId !== null &&
		savedDrafts.some(
			(saved) =>
				saved.id === activeDraftId &&
				JSON.stringify(saved) === JSON.stringify(draft),
		);

	return (
		<main className="mx-auto w-full max-w-[1600px] pb-12 text-primaryText">
			<header className="mb-7 flex flex-col gap-4 border-b border-primarybrown/20 pb-6 md:flex-row md:items-stretch">
				<Heading
					title="Story builder"
					description="Arrange story blocks, save drafts in this browser, and export a ready-to-edit MDX file."
				/>
				<div className="flex flex-wrap items-center gap-2 md:justify-end">
					{notice && (
						<span
							aria-live="polite"
							className="mr-2 text-sm text-primaryfreshgreen">
							{notice}
						</span>
					)}
					<button
						type="button"
						onClick={openStoryLibrary}
						className="inline-flex h-10 items-center gap-2 rounded-md border border-primarybrown/30 px-3 text-sm font-semibold hover:bg-primarywhite">
						<FolderOpen size={16} /> Open MDX
					</button>
					<button
						type="button"
						onClick={startNewDraft}
						className="inline-flex h-10 items-center gap-2 rounded-md border border-primarybrown/30 px-3 text-sm font-semibold hover:bg-primarywhite">
						<Plus size={16} /> New
					</button>
					{activeDraftId && (
						<span
							aria-live="polite"
							title={isDraftSaved ? "All changes saved" : "Saving changes"}
							className={`inline-flex h-10 items-center gap-2 rounded-md px-3 text-sm font-semibold ${isDraftSaved ? "bg-secondaryforestgreen/10 text-secondaryforestgreen" : "bg-primaryaccent/10 text-primaryaccent"}`}>
							{isDraftSaved ? (
								<>
									<Check size={16} /> Saved
								</>
							) : (
								<>
									<LoaderCircle size={16} className="animate-spin" /> Saving
								</>
							)}
						</span>
					)}
					<button
						type="button"
						onClick={downloadMdx}
						className="inline-flex h-10 items-center gap-2 rounded-md bg-fierceorange px-4 text-sm font-semibold text-white hover:brightness-95">
						<ArrowDownToLine size={16} /> Export MDX
					</button>
					<button
						type="button"
						onClick={() => {
							setPendingImageUpload(null);
							setIsPublishDialogOpen(true);
						}}
						className="inline-flex h-10 items-center gap-2 rounded-md bg-primaryaccent px-4 text-sm font-semibold text-white hover:brightness-95">
						<CloudUpload size={16} /> Publish
					</button>
				</div>
			</header>

			<div
				className={`grid items-start gap-5 ${isSavedStoriesExpanded ? "xl:grid-cols-[230px_minmax(400px,1fr)_minmax(360px,0.9fr)]" : "xl:grid-cols-[56px_minmax(400px,1fr)_minmax(360px,0.9fr)]"}`}>
				<aside
					id="saved-stories-panel"
					className={`rounded-lg border border-primarybrown/20 bg-primarywhite ${isSavedStoriesExpanded ? "p-4" : "flex flex-row items-center gap-3 p-2 xl:flex-col"}`}>
					<div
						className={`flex items-center ${isSavedStoriesExpanded ? "mb-4 justify-between" : "flex-col gap-3"}`}>
						<h2 className="w-full text-sm font-bold">
							<button
								type="button"
								aria-expanded={isSavedStoriesExpanded}
								aria-controls="saved-stories-content"
								aria-label={`${isSavedStoriesExpanded ? "Collapse" : "Expand"} saved stories panel`}
								title={`${isSavedStoriesExpanded ? "Collapse" : "Expand"} saved stories`}
								onClick={() =>
									setIsSavedStoriesExpanded((expanded) => !expanded)
								}
								className="flex min-h-7 w-full items-center gap-2 text-left">
								<span className={isSavedStoriesExpanded ? "" : "sr-only"}>
									Saved stories
								</span>
								<span className="rounded bg-secondarywhite px-2 py-1 text-xs font-normal text-primarygrey">
									{savedDrafts.length}
								</span>
								{isSavedStoriesExpanded ? (
									<PanelLeftClose size={16} className="ml-auto shrink-0" />
								) : (
									<PanelLeftOpen size={16} className="ml-auto shrink-0" />
								)}
							</button>
						</h2>
					</div>
					<div
						id="saved-stories-content"
						className={isSavedStoriesExpanded ? "mt-4" : "hidden"}>
						{!isHydrated ? (
							<p className="text-sm text-primarygrey">Loading drafts...</p>
						) : savedDrafts.length === 0 ? (
							<p className="border-t border-primarybrown/15 py-4 text-sm leading-5 text-primarygrey">
								Your saved drafts will appear here.
							</p>
						) : (
							<ul className="flex flex-col gap-1">
								{savedDrafts.map((saved) => (
									<li
										key={saved.id}
										className={`group flex items-start gap-1 rounded-md border p-2 ${activeDraftId === saved.id ? "border-secondaryforestgreen/50 bg-secondaryforestgreen/5" : "border-transparent hover:bg-secondarywhite"}`}>
										<button
											type="button"
											onClick={() => loadDraft(saved)}
											className="min-w-0 flex-1 text-left">
											<span className="block truncate text-sm font-semibold">
												{saved.title || "Untitled story"}
											</span>
											<span className="mt-1 block text-xs text-primarygrey">
												{new Date(saved.updatedAt).toLocaleDateString()}
											</span>
										</button>
										<button
											type="button"
											onClick={() => deleteDraft(saved.id)}
											aria-label={`Delete ${saved.title}`}
											title="Delete draft"
											className="rounded p-1 text-primarygrey opacity-100 hover:bg-primaryred/10 hover:text-primaryred sm:opacity-0 sm:group-hover:opacity-100">
											<Trash2 size={15} />
										</button>
									</li>
								))}
							</ul>
						)}
					</div>
				</aside>

				<section className="min-w-0 space-y-5">
					<div className="rounded-lg border border-primarybrown/20 bg-primarywhite p-4 sm:p-5">
						<div className="mb-4 flex items-center justify-between border-b border-primarybrown/15 pb-3">
							<h2 className="font-bold">
								<button
									type="button"
									aria-expanded={isStoryDetailsOpen}
									aria-controls="story-details-fields"
									aria-label={`${isStoryDetailsOpen ? "Collapse" : "Expand"} story details`}
									onClick={() => setIsStoryDetailsOpen((open) => !open)}
									className="flex min-h-8 items-center gap-2 text-left">
									<span>Story details</span>
									<ChevronDown
										size={16}
										className={`transition-transform ${isStoryDetailsOpen ? "rotate-180" : ""}`}
									/>
								</button>
							</h2>
							<span className="text-xs text-primarygrey">METADATA</span>
						</div>
						<div
							id="story-details-fields"
							className={`${isStoryDetailsOpen ? "grid" : "hidden"} gap-3 sm:grid-cols-2`}>
							<label className="sm:col-span-2">
								<span className="mb-1 block text-xs font-semibold text-primarygrey">
									Title
								</span>
								<input
									value={draft.title}
									onChange={(event) =>
										updateDraft({
											title: event.target.value,
											slug: toSlug(event.target.value),
										})
									}
									className="w-full rounded-md border border-primarybrown/25 bg-transparent px-3 py-2 text-sm outline-none focus:border-secondaryforestgreen"
									placeholder="A story title"
								/>
							</label>
							<label className="sm:col-span-2">
								<span className="mb-1 block text-xs font-semibold text-primarygrey">
									Slug
								</span>
								<input
									value={draft.slug}
									onChange={(event) =>
										updateDraft({ slug: toSlug(event.target.value) })
									}
									className="w-full rounded-md border border-primarybrown/25 bg-transparent px-3 py-2 text-sm outline-none focus:border-secondaryforestgreen"
									placeholder="story-slug"
								/>
							</label>
							<label className="sm:col-span-2">
								<span className="mb-1 block text-xs font-semibold text-primarygrey">
									Description
								</span>
								<textarea
									value={draft.description}
									onChange={(event) =>
										updateDraft({ description: event.target.value })
									}
									rows={2}
									maxLength={160}
									className="w-full resize-y rounded-md border border-primarybrown/25 bg-transparent px-3 py-2 text-sm outline-none focus:border-secondaryforestgreen"
									placeholder="A short story summary"
								/>
								<span className="mt-1 block text-right text-xs text-primarygrey">
									{draft.description.length}/160
								</span>
							</label>
							<div className="sm:col-span-2">
								<label
									htmlFor="story-cover-url"
									className="mb-1 block text-xs font-semibold text-primarygrey">
									Cover image URL
								</label>
								<div className="flex gap-2">
									<input
										id="story-cover-url"
										value={draft.cover}
										onChange={(event) =>
											updateDraft({ cover: event.target.value })
										}
										className="min-w-0 flex-1 rounded-md border border-primarybrown/25 bg-transparent px-3 py-2 text-sm outline-none focus:border-secondaryforestgreen"
										placeholder="https://..."
									/>
									<label className="inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-md border border-primarybrown/25 px-3 py-2 text-xs font-semibold hover:bg-primarywhite">
										<Upload size={14} /> Upload
										<input
											type="file"
											accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
											className="sr-only"
											onChange={(event) => {
												const file = event.currentTarget.files?.[0];
												event.currentTarget.value = "";
												handleImageUpload(file, { kind: "cover" });
											}}
										/>
									</label>
								</div>
							</div>
							<label>
								<span className="mb-1 block text-xs font-semibold text-primarygrey">
									City
								</span>
								<input
									value={draft.city}
									onChange={(event) =>
										updateDraft({ city: event.target.value })
									}
									className="w-full rounded-md border border-primarybrown/25 bg-transparent px-3 py-2 text-sm outline-none focus:border-secondaryforestgreen"
									placeholder="Wroclaw"
								/>
							</label>
							<label>
								<span className="mb-1 block text-xs font-semibold text-primarygrey">
									Country
								</span>
								<input
									value={draft.country}
									onChange={(event) =>
										updateDraft({ country: event.target.value })
									}
									className="w-full rounded-md border border-primarybrown/25 bg-transparent px-3 py-2 text-sm outline-none focus:border-secondaryforestgreen"
									placeholder="Poland"
								/>
							</label>
							<label>
								<span className="mb-1 block text-xs font-semibold text-primarygrey">
									Date published
								</span>
								<input
									type="datetime-local"
									value={draft.datePublished}
									onChange={(event) =>
										updateDraft({ datePublished: event.target.value })
									}
									className="w-full rounded-md border border-primarybrown/25 bg-transparent px-3 py-2 text-sm outline-none focus:border-secondaryforestgreen"
								/>
							</label>
							<label>
								<span className="mb-1 block text-xs font-semibold text-primarygrey">
									Event start
								</span>
								<input
									type="date"
									value={draft.eventDateFrom}
									onChange={(event) =>
										updateDraft({ eventDateFrom: event.target.value })
									}
									className="w-full rounded-md border border-primarybrown/25 bg-transparent px-3 py-2 text-sm outline-none focus:border-secondaryforestgreen"
								/>
							</label>
							<label>
								<span className="mb-1 block text-xs font-semibold text-primarygrey">
									Event end
								</span>
								<input
									type="date"
									value={draft.eventDateTo}
									onChange={(event) =>
										updateDraft({ eventDateTo: event.target.value })
									}
									className="w-full rounded-md border border-primarybrown/25 bg-transparent px-3 py-2 text-sm outline-none focus:border-secondaryforestgreen"
								/>
							</label>
							<label>
								<span className="mb-1 block text-xs font-semibold text-primarygrey">
									Activity
								</span>
								<Select
									items={[
										"bikepacking",
										"cycling",
										"hiking",
										"travel",
										"photography",
										"other",
									].map((activity) => ({ label: activity, value: activity }))}
									value={draft.activityType}
									onValueChange={(value) => {
										if (typeof value === "string") {
											updateDraft({ activityType: value });
										}
									}}>
									<SelectTrigger
										aria-label="Activity"
										className="w-full bg-mybackground">
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										{[
											"bikepacking",
											"cycling",
											"hiking",
											"travel",
											"photography",
											"other",
										].map((activity) => (
											<SelectItem key={activity} value={activity}>
												{activity}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</label>
							<label>
								<span className="mb-1 block text-xs font-semibold text-primarygrey">
									Tags
								</span>
								<input
									value={draft.tags}
									onChange={(event) =>
										updateDraft({ tags: event.target.value })
									}
									className="w-full rounded-md border border-primarybrown/25 bg-transparent px-3 py-2 text-sm outline-none focus:border-secondaryforestgreen"
									placeholder="solo, nature"
								/>
							</label>
							<label>
								<span className="mb-1 block text-xs font-semibold text-primarygrey">
									Views
								</span>
								<input
									type="number"
									min={0}
									value={draft.views}
									onChange={(event) =>
										updateDraft({ views: Number(event.target.value) })
									}
									className="w-full rounded-md border border-primarybrown/25 bg-transparent px-3 py-2 text-sm outline-none focus:border-secondaryforestgreen"
								/>
							</label>
							<label>
								<span className="mb-1 block text-xs font-semibold text-primarygrey">
									Likes
								</span>
								<input
									type="number"
									min={0}
									value={draft.likes}
									onChange={(event) =>
										updateDraft({ likes: Number(event.target.value) })
									}
									className="w-full rounded-md border border-primarybrown/25 bg-transparent px-3 py-2 text-sm outline-none focus:border-secondaryforestgreen"
								/>
							</label>
						</div>
					</div>

					<div className="rounded-lg border border-primarybrown/20 bg-primarywhite p-4 sm:p-5">
						<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
							<div>
								<h2 className="font-bold">Upload settings</h2>
								<p className="mt-1 text-xs text-primarygrey">
									Quality applies to new cover, photo, and gallery uploads.
								</p>
							</div>
							<label className="flex flex-col gap-1 text-xs font-semibold text-primarygrey sm:w-64">
								<span>Cloudinary image quality</span>
								<Select
									items={[
										{ label: "Smaller files", value: "auto:eco" },
										{ label: "Balanced", value: "auto:good" },
										{ label: "Highest quality", value: "auto:best" },
									]}
									value={draft.imageQuality}
									onValueChange={(value) => {
										if (typeof value === "string") {
											updateDraft({ imageQuality: value as ImageQuality });
										}
									}}>
									<SelectTrigger
										aria-label="Cloudinary image quality"
										className="w-full bg-mybackground">
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="auto:eco">Smaller files</SelectItem>
										<SelectItem value="auto:good">Balanced</SelectItem>
										<SelectItem value="auto:best">Highest quality</SelectItem>
									</SelectContent>
								</Select>
							</label>
						</div>
					</div>

					<div className="rounded-lg border border-primarybrown/20 bg-primarywhite p-4 sm:p-5">
						<div className="mb-4 flex items-center justify-between">
							<div>
								<h2 className="font-bold">Story content</h2>
								<p className="mt-1 text-xs text-primarygrey">
									Drag a block into the canvas, or drag blocks to reorder.
								</p>
							</div>
							<div className="flex items-center">
								<span className="text-xs text-primarygrey">
									{draft.blocks.length} BLOCKS
								</span>
							</div>
						</div>
						<div className="mb-4 flex flex-wrap gap-2">
							{blockOptions.map(({ type, label, icon: Icon }) => (
								<button
									key={type}
									type="button"
									draggable
									onDragStart={(event) =>
										event.dataTransfer.setData("application/story-block", type)
									}
									onClick={() => addBlock(type)}
									className="inline-flex h-9 items-center gap-2 rounded-md border border-primarybrown/25 px-2.5 text-xs font-semibold hover:border-secondaryforestgreen hover:bg-secondaryforestgreen/5"
									title={`Drag or click to add ${label}`}>
									<Icon size={15} /> {label}
								</button>
							))}
						</div>
						<div
							onDragOver={(event) => {
								event.preventDefault();
								setDropIndex(draft.blocks.length);
							}}
							onDrop={(event) => handleDrop(event, draft.blocks.length)}
							className={`space-y-3 rounded-md border border-dashed p-3 transition-colors ${dropIndex === draft.blocks.length ? "border-secondaryforestgreen bg-secondaryforestgreen/5" : "border-primarybrown/25"}`}>
							{draft.blocks.length === 0 && (
								<p className="py-8 text-center text-sm text-primarygrey">
									Drop a block here to start writing.
								</p>
							)}
							{draft.blocks.map((block, index) => {
								const blockOption = blockOptions.find(
									(option) => option.type === block.type,
								)!;
								const BlockIcon = blockOption.icon;
								return (
									<div
										key={block.id}
										draggable
										onDragStart={(event) => {
											setDraggedBlockId(block.id);
											event.dataTransfer.setData(
												"application/story-block-id",
												block.id,
											);
											event.dataTransfer.effectAllowed = "move";
										}}
										onDragEnd={() => {
											setDraggedBlockId(null);
											setDropIndex(null);
										}}
										onDragOver={(event) => {
											event.preventDefault();
											setDropIndex(index);
										}}
										onDrop={(event) => handleDrop(event, index)}
										className={`rounded-md border bg-mybackground p-3 ${dropIndex === index ? "border-secondaryforestgreen" : "border-primarybrown/15"}`}>
										<div className="mb-3 flex items-center justify-between">
											<div className="flex items-center gap-2 text-sm font-bold">
												<GripVertical
													size={16}
													className="cursor-grab text-primarygrey"
												/>
												<BlockIcon size={15} />
												{blockOption.label}
											</div>
											<div className="flex items-center gap-1">
												<button
													type="button"
													onClick={() => moveBlock(index, index - 1)}
													disabled={index === 0}
													aria-label="Move block up"
													className="rounded p-1.5 hover:bg-primarybrown/10 disabled:opacity-30">
													<ArrowUp size={15} />
												</button>
												<button
													type="button"
													onClick={() => moveBlock(index, index + 1)}
													disabled={index === draft.blocks.length - 1}
													aria-label="Move block down"
													className="rounded p-1.5 hover:bg-primarybrown/10 disabled:opacity-30">
													<ArrowDown size={15} />
												</button>
												<button
													type="button"
													onClick={() =>
														updateDraft({
															blocks: draft.blocks.filter(
																(item) => item.id !== block.id,
															),
														})
													}
													aria-label={`Remove ${blockOption.label}`}
													className="rounded p-1.5 text-primaryred hover:bg-primaryred/10">
													<X size={15} />
												</button>
											</div>
										</div>
										{block.type === "paragraph" && (
											<textarea
												value={block.text}
												onChange={(event) =>
													updateBlock(block.id, { text: event.target.value })
												}
												rows={5}
												className="w-full resize-y rounded border border-primarybrown/20 bg-primarywhite px-3 py-2 text-sm leading-6 outline-none focus:border-secondaryforestgreen"
												placeholder="Write in Markdown. Use a blank line to start a new paragraph."
											/>
										)}
										{block.type === "quote" && (
											<textarea
												value={block.text}
												onChange={(event) =>
													updateBlock(block.id, { text: event.target.value })
												}
												rows={3}
												className="w-full resize-y rounded border border-primarybrown/20 bg-primarywhite px-3 py-2 text-sm leading-6 outline-none focus:border-secondaryforestgreen"
												placeholder="A memorable line from the story"
											/>
										)}
										{block.type === "section" && (
											<input
												value={block.text}
												onChange={(event) =>
													updateBlock(block.id, { text: event.target.value })
												}
												className="w-full rounded border border-primarybrown/20 bg-primarywhite px-3 py-2 text-sm outline-none focus:border-secondaryforestgreen"
												placeholder="Section title"
											/>
										)}
										{block.type === "highlight" && (
											<input
												value={block.text}
												onChange={(event) =>
													updateBlock(block.id, { text: event.target.value })
												}
												className="w-full rounded border border-primarybrown/20 bg-primarywhite px-3 py-2 text-sm outline-none focus:border-secondaryforestgreen"
												placeholder="Highlighted text"
											/>
										)}
										{block.type === "raw" && (
											<div className="space-y-2">
												<p className="text-xs text-primarygrey">
													Imported MDX is preserved here. Edit the source
													directly; metadata remains editable in Story details.
												</p>
												<textarea
													value={block.rawMdx}
													onChange={(event) =>
														updateBlock(block.id, {
															rawMdx: event.target.value,
														})
													}
													rows={18}
													spellCheck={false}
													className="w-full resize-y rounded border border-primarybrown/20 bg-primarywhite px-3 py-2 font-mono text-xs leading-5 outline-none focus:border-secondaryforestgreen"
													placeholder="Existing MDX source"
												/>
											</div>
										)}
										{(block.type === "checklist" ||
											block.type === "itemlist") && (
											<div className="space-y-2">
												{block.items.map((item, itemIndex) => (
													<div
														key={`${block.id}-item-${itemIndex}`}
														className="flex items-center gap-2">
														{block.type === "checklist" && (
															<input
																type="checkbox"
																checked={item.done}
																onChange={(event) =>
																	updateListItem(block, itemIndex, {
																		done: event.target.checked,
																	})
																}
																className="size-4 accent-primaryaccent"
															/>
														)}
														<input
															value={item.label}
															onChange={(event) =>
																updateListItem(block, itemIndex, {
																	label: event.target.value,
																})
															}
															className="min-w-0 flex-1 rounded border border-primarybrown/20 bg-primarywhite px-3 py-2 text-sm outline-none focus:border-secondaryforestgreen"
															placeholder={`Item ${itemIndex + 1}`}
														/>
														<button
															type="button"
															onClick={() =>
																updateBlock(block.id, {
																	items: block.items.filter(
																		(_, index) => index !== itemIndex,
																	),
																})
															}
															aria-label={`Remove item ${itemIndex + 1}`}
															className="rounded p-2 text-primaryred hover:bg-primaryred/10">
															<X size={15} />
														</button>
													</div>
												))}
												<button
													type="button"
													onClick={() =>
														updateBlock(block.id, {
															items: [
																...block.items,
																{ label: "", done: false },
															],
														})
													}
													className="inline-flex items-center gap-1 text-xs font-semibold text-secondaryforestgreen">
													<Plus size={14} /> Add item
												</button>
											</div>
										)}
										{block.type === "iframe" && (
											<input
												value={block.url}
												onChange={(event) =>
													updateBlock(block.id, { url: event.target.value })
												}
												className="w-full rounded border border-primarybrown/20 bg-primarywhite px-3 py-2 text-sm outline-none focus:border-secondaryforestgreen"
												placeholder="Embed URL"
											/>
										)}
										{block.type === "map" && (
											<div className="grid gap-2 sm:grid-cols-2">
												<label className="flex items-center gap-2 text-sm font-medium text-primaryText sm:col-span-2">
													<input
														type="checkbox"
														checked={block.shouldShowDownloadGPX}
														onChange={(event) =>
															updateBlock(block.id, {
																shouldShowDownloadGPX: event.target.checked,
															})
														}
														className="size-4 accent-primaryaccent"
													/>
													Show GPX download on map
												</label>
												<input
													value={block.mapTitle}
													onChange={(event) =>
														updateBlock(block.id, {
															mapTitle: event.target.value,
														})
													}
													className="rounded border border-primarybrown/20 bg-primarywhite px-3 py-2 text-sm outline-none focus:border-secondaryforestgreen sm:col-span-2"
													placeholder="Map title"
												/>
												<label className="flex flex-col gap-1 text-xs font-semibold text-primarygrey sm:col-span-2">
													Import GPX route
													<input
														type="file"
														accept=".gpx,application/gpx+xml,application/xml,text/xml"
														onChange={(event) => {
															const file = event.currentTarget.files?.[0];
															event.currentTarget.value = "";
															if (file) void importGpxRoute(block.id, file);
														}}
														className="w-full rounded border border-primarybrown/20 bg-primarywhite px-3 py-2 text-sm font-normal outline-none file:mr-3 file:rounded file:border-0 file:bg-secondaryforestgreen/10 file:px-3 file:py-1 file:font-semibold file:text-secondaryforestgreen"
													/>
												</label>
												<textarea
													value={block.text}
													onChange={(event) =>
														updateBlock(block.id, { text: event.target.value })
													}
													rows={2}
													className="resize-y rounded border border-primarybrown/20 bg-primarywhite px-3 py-2 text-sm outline-none focus:border-secondaryforestgreen sm:col-span-2"
													placeholder="Map description"
												/>
												<input
													inputMode="decimal"
													value={block.centerLatitude}
													onChange={(event) =>
														updateBlock(block.id, {
															centerLatitude: event.target.value,
														})
													}
													className="min-w-0 rounded border border-primarybrown/20 bg-primarywhite px-3 py-2 text-sm outline-none focus:border-secondaryforestgreen"
													placeholder="Center latitude"
												/>
												<input
													inputMode="decimal"
													value={block.centerLongitude}
													onChange={(event) =>
														updateBlock(block.id, {
															centerLongitude: event.target.value,
														})
													}
													className="min-w-0 rounded border border-primarybrown/20 bg-primarywhite px-3 py-2 text-sm outline-none focus:border-secondaryforestgreen"
													placeholder="Center longitude"
												/>
												<textarea
													value={block.route}
													onChange={(event) =>
														updateBlock(block.id, { route: event.target.value })
													}
													rows={3}
													className="resize-y rounded border border-primarybrown/20 bg-primarywhite px-3 py-2 text-sm outline-none focus:border-secondaryforestgreen sm:col-span-2"
													placeholder="Route coordinates, one latitude, longitude pair per line"
												/>
											</div>
										)}
										{block.type === "divider" && (
											<div className="py-2">
												<div className="h-1 w-full rounded-full bg-primaryaccent" />
											</div>
										)}
										{block.type === "image" && (
											<div className="grid gap-2">
												<input
													value={block.imageUrl}
													onChange={(event) =>
														updateBlock(block.id, {
															imageUrl: event.target.value,
														})
													}
													className="w-full rounded border border-primarybrown/20 bg-primarywhite px-3 py-2 text-sm outline-none focus:border-secondaryforestgreen"
													placeholder="Photo URL"
												/>
												<input
													value={block.imageAlt}
													onChange={(event) =>
														updateBlock(block.id, {
															imageAlt: event.target.value,
														})
													}
													className="w-full rounded border border-primarybrown/20 bg-primarywhite px-3 py-2 text-sm outline-none focus:border-secondaryforestgreen"
													placeholder="Photo description"
												/>
												<label className="inline-flex w-fit cursor-pointer items-center gap-2 rounded-md border border-primarybrown/25 px-3 py-2 text-xs font-semibold hover:bg-primarywhite">
													<Upload size={14} /> Upload to Cloudinary
													<input
														type="file"
														accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
														className="sr-only"
														onChange={(event) => {
															const file = event.currentTarget.files?.[0];
															event.currentTarget.value = "";
															handleImageUpload(file, {
																kind: "block",
																blockId: block.id,
															});
														}}
													/>
												</label>
											</div>
										)}
										{block.type === "gallery" && (
											<div className="space-y-2">
												{block.gallery.map((photo, photoIndex) => (
													<div
														key={`${block.id}-${photoIndex}`}
														className="grid gap-x-2 gap-y-2 sm:grid-cols-[minmax(0,1fr)_auto]">
														<input
															value={photo.url}
															onChange={(event) => {
																const gallery = [...block.gallery];
																gallery[photoIndex] = {
																	...photo,
																	url: event.target.value,
																};
																updateBlock(block.id, { gallery });
															}}
															className="min-w-0 rounded border border-primarybrown/20 bg-primarywhite px-3 py-2 text-sm outline-none focus:border-secondaryforestgreen sm:col-start-1 sm:row-start-1"
															placeholder={`Photo ${photoIndex + 1} URL`}
														/>
														<label className="inline-flex min-h-10 cursor-pointer items-center justify-center gap-2 rounded-md border border-primarybrown/25 px-3 py-2 text-xs font-semibold hover:bg-primarywhite sm:col-start-2 sm:row-start-1">
															<Upload size={14} /> Upload
															<input
																type="file"
																accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
																className="sr-only"
																onChange={(event) => {
																	const file = event.currentTarget.files?.[0];
																	event.currentTarget.value = "";
																	handleImageUpload(file, {
																		kind: "block",
																		blockId: block.id,
																		galleryIndex: photoIndex,
																	});
																}}
															/>
														</label>
														<input
															value={photo.alt}
															onChange={(event) => {
																const gallery = [...block.gallery];
																gallery[photoIndex] = {
																	...photo,
																	alt: event.target.value,
																};
																updateBlock(block.id, { gallery });
															}}
															className="min-w-0 rounded border border-primarybrown/20 bg-primarywhite px-3 py-2 text-sm outline-none focus:border-secondaryforestgreen sm:col-start-1 sm:row-start-2"
															placeholder="Description"
														/>
														<button
															type="button"
															onClick={() =>
																updateBlock(block.id, {
																	gallery: block.gallery.filter(
																		(_, itemIndex) => itemIndex !== photoIndex,
																	),
																})
															}
															aria-label="Remove gallery photo"
															className="rounded p-2 text-primaryred hover:bg-primaryred/10 sm:col-start-2 sm:row-start-2">
															<X size={15} />
														</button>
													</div>
												))}
												<button
													type="button"
													onClick={() =>
														updateBlock(block.id, {
															gallery: [...block.gallery, { url: "", alt: "" }],
														})
													}
													className="inline-flex items-center gap-1 text-xs font-semibold text-secondaryforestgreen">
													<Plus size={14} /> Add photo
												</button>
											</div>
										)}
									</div>
								);
							})}
							<div
								onDragOver={(event) => {
									event.preventDefault();
									setDropIndex(draft.blocks.length);
								}}
								onDrop={(event) => handleDrop(event, draft.blocks.length)}
								className={`flex min-h-12 items-center justify-center gap-2 rounded border border-dashed text-xs text-primarygrey ${dropIndex === draft.blocks.length ? "border-secondaryforestgreen bg-secondaryforestgreen/5" : "border-transparent"}`}>
								<Plus size={14} /> Drop next block here
							</div>
						</div>
					</div>
				</section>

				<section className="min-w-0 xl:sticky xl:top-5">
					<div
						className={`overflow-hidden rounded-lg border border-primarybrown/25 ${outputTab === "mdx" ? "bg-[#202522] text-[#e8eee8]" : "bg-primarywhite text-primaryText"}`}>
						<div className="flex items-center justify-between gap-3 border-b border-primarybrown/15 px-3 py-2">
							<div
								role="tablist"
								aria-label="Output view"
								className="flex items-center gap-1">
								<button
									type="button"
									role="tab"
									aria-selected={outputTab === "mdx"}
									onClick={() => setOutputTab("mdx")}
									className={`inline-flex h-9 items-center gap-2 rounded-md px-3 text-sm font-semibold ${outputTab === "mdx" ? "bg-primarywhite/10 text-inherit" : "text-primarygrey hover:bg-primarybrown/10"}`}>
									<Code2 size={15} /> MDX
								</button>
								<button
									type="button"
									role="tab"
									aria-selected={outputTab === "preview"}
									onClick={() => setOutputTab("preview")}
									className={`inline-flex h-9 items-center gap-2 rounded-md px-3 text-sm font-semibold ${outputTab === "preview" ? "bg-secondaryforestgreen text-white" : "text-primarygrey hover:bg-primarybrown/10"}`}>
									<Eye size={15} /> Preview
								</button>
							</div>
							<span className="text-xs text-white/50">
								{draft.slug || "story"}.mdx
							</span>
						</div>
						{outputTab === "mdx" ? (
							<pre
								role="tabpanel"
								className="max-h-[70vh] min-h-[340px] overflow-auto p-4 text-xs leading-5 sm:text-[13px]">
								<code>{mdx}</code>
							</pre>
						) : (
							<div
								role="tabpanel"
								className="max-h-[70vh] min-h-[340px] overflow-auto bg-mybackground p-4 text-primaryText">
								<MainStoryBookPage
									createdAt={
										draft.datePublished
											? new Date(draft.datePublished).toLocaleDateString(
													"en-GB",
												)
											: ""
									}
									storyCover={storyCover}
									storyId="2"
									storyTitle={draft.title}
									storyDescription={draft.description}
									storyTags={parseTags(draft.tags)}
									storyPhotoUrls={storyPhotoUrls}
									storyContent={storyContent}
									totalView={draft.views}
									totalLike={draft.likes}
								/>
							</div>
						)}
						<div className="flex items-center justify-between border-t border-primarybrown/15 px-4 py-3 text-xs text-primarygrey">
							<span>
								{outputTab === "mdx"
									? "Generated MDX source"
									: "Live story preview"}
							</span>
							<button
								type="button"
								onClick={downloadMdx}
								className={`inline-flex items-center gap-1.5 ${outputTab === "mdx" ? "text-white hover:text-primaryyellow" : "text-primaryText hover:text-secondaryforestgreen"}`}>
								<ArrowDownToLine size={14} /> Download
							</button>
						</div>
					</div>
				</section>
			</div>
			<Dialog open={isStoryLibraryOpen} onOpenChange={setIsStoryLibraryOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Open existing story</DialogTitle>
						<DialogDescription>
							Choose an MDX story from the project library to edit its metadata
							and source.
						</DialogDescription>
					</DialogHeader>
					<div className="flex flex-col gap-2 sm:flex-row">
						<label className="relative flex min-w-0 flex-1 items-center">
							<Search
								size={16}
								className="pointer-events-none absolute left-3 text-primarygrey"
							/>
							<input
								type="search"
								value={storySearchQuery}
								onChange={(event) => {
									setStorySearchQuery(event.target.value);
									setStoryLibraryPage(1);
								}}
								placeholder="Search stories"
								aria-label="Search stories by title or filename"
								className="h-10 w-full rounded-md border border-primarybrown/25 bg-primarywhite pl-9 pr-3 text-sm outline-none focus:border-secondaryforestgreen"
							/>
						</label>
						<label
							className={`inline-flex h-10 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-md border border-primarybrown/30 px-3 text-sm font-semibold hover:bg-primarywhite ${isImportingExternalStory ? "cursor-wait opacity-60" : ""}`}>
							{isImportingExternalStory ? (
								<LoaderCircle size={16} className="animate-spin" />
							) : (
								<Upload size={16} />
							)}
							Import MDX
							<input
								type="file"
								accept=".md,.mdx,text/markdown"
								disabled={isImportingExternalStory}
								className="sr-only"
								onChange={(event) => {
									void importExternalStory(event.currentTarget.files?.[0]);
									event.currentTarget.value = "";
								}}
							/>
						</label>
					</div>
					<div className="max-h-[min(60vh,28rem)] space-y-2 overflow-y-auto">
						{isLoadingStoryLibrary && (
							<p className="flex items-center gap-2 py-6 text-sm text-primarygrey">
								<LoaderCircle size={16} className="animate-spin" /> Loading
								stories...
							</p>
						)}
						{storyLibraryError && (
							<p role="alert" className="py-4 text-sm text-red-700">
								{storyLibraryError}
							</p>
						)}
						{!isLoadingStoryLibrary &&
							!storyLibraryError &&
							existingStories.length === 0 && (
								<p className="py-6 text-sm text-primarygrey">
									No MDX stories were found in the library.
								</p>
							)}
						{!isLoadingStoryLibrary &&
							!storyLibraryError &&
							existingStories.length > 0 &&
							filteredExistingStories.length === 0 && (
								<p className="py-6 text-sm text-primarygrey">
									No stories match “{storySearchQuery}”.
								</p>
							)}
						{!storyLibraryError &&
							paginatedExistingStories.map((story) => (
								<button
									key={story.slug}
									type="button"
									disabled={
										loadingStorySlug !== null || isImportingExternalStory
									}
									onClick={() => loadExistingStory(story.slug)}
									className="flex w-full items-center justify-between gap-3 rounded-md border border-primarybrown/20 px-3 py-3 text-left hover:bg-primarywhite disabled:opacity-60">
									<span className="min-w-0">
										<span className="block truncate text-sm font-semibold text-primaryText">
											{story.title}
										</span>
										<span className="block truncate text-xs text-primarygrey">
											/{story.slug}.mdx
										</span>
									</span>
									{loadingStorySlug === story.slug && (
										<LoaderCircle
											size={16}
											className="shrink-0 animate-spin"
											aria-label="Loading story"
										/>
									)}
								</button>
							))}
					</div>
					{filteredExistingStories.length > 0 && (
						<div className="flex items-center justify-between gap-3 text-xs text-primarygrey">
							<span>
								Showing {(storyLibraryPage - 1) * STORY_LIBRARY_PAGE_SIZE + 1}–
								{Math.min(
									storyLibraryPage * STORY_LIBRARY_PAGE_SIZE,
									filteredExistingStories.length,
								)}{" "}
								of {filteredExistingStories.length}
							</span>
							<div className="flex items-center gap-2">
								<button
									type="button"
									aria-label="Previous page"
									disabled={storyLibraryPage <= 1}
									onClick={() => setStoryLibraryPage((page) => page - 1)}
									className="inline-flex size-8 items-center justify-center rounded border border-primarybrown/25 disabled:opacity-40">
									<ChevronLeft size={16} />
								</button>
								<span>
									Page {storyLibraryPage} of {storyLibraryPageCount}
								</span>
								<button
									type="button"
									aria-label="Next page"
									disabled={storyLibraryPage >= storyLibraryPageCount}
									onClick={() => setStoryLibraryPage((page) => page + 1)}
									className="inline-flex size-8 items-center justify-center rounded border border-primarybrown/25 disabled:opacity-40">
									<ChevronRight size={16} />
								</button>
							</div>
						</div>
					)}
					<DialogFooter>
						<DialogClose asChild>
							<button
								type="button"
								className="inline-flex h-10 items-center justify-center rounded-md border border-primarybrown/30 px-4 text-sm font-semibold">
								Close
							</button>
						</DialogClose>
					</DialogFooter>
				</DialogContent>
			</Dialog>
			<Dialog open={isPublishDialogOpen} onOpenChange={setIsPublishDialogOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>
							{pendingImageUpload
								? "Authorize Cloudinary upload"
								: "Publish story to GitHub"}
						</DialogTitle>
						<DialogDescription>
							{pendingImageUpload ? (
								<>
									Upload{" "}
									<span className="font-medium text-primaryText">
										{pendingImageUpload.file.name}
									</span>{" "}
									securely to Cloudinary. The returned image URL will be added
									to the story draft.
								</>
							) : (
								<>
									This creates or updates{" "}
									<span className="font-medium text-primaryText">
										{draft.slug || toSlug(draft.title) || "story"}.mdx
									</span>{" "}
									on the configured branch. Enter the publisher key to authorize
									this commit.
								</>
							)}
						</DialogDescription>
					</DialogHeader>
					<form onSubmit={publishDraft} className="space-y-4">
						<label className="block">
							<span className="mb-1 block text-sm font-medium">
								Publisher key
							</span>
							<input
								type="password"
								value={publishSecret}
								autoComplete="off"
								required
								onChange={(event) => setPublishSecret(event.target.value)}
								className="w-full rounded-md border border-primarybrown/25 bg-transparent px-3 py-2 text-sm outline-none focus:border-secondaryforestgreen"
								placeholder="Enter publisher key"
							/>
						</label>
						<DialogFooter>
							<DialogClose asChild>
								<button
									type="button"
									disabled={isPublishing}
									onClick={() => {
										setPublishSecret("");
										setPendingImageUpload(null);
									}}
									className="inline-flex h-10 items-center justify-center rounded-md border border-primarybrown/30 px-4 text-sm font-semibold">
									Cancel
								</button>
							</DialogClose>
							<button
								type="submit"
								disabled={isPublishing || !publishSecret.trim()}
								className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primaryaccent px-4 text-sm font-semibold text-white disabled:opacity-60">
								{isPublishing ? (
									pendingImageUpload ? (
										<>
											<LoaderCircle size={16} className="animate-spin" />{" "}
											Uploading...
										</>
									) : (
										"Publishing..."
									)
								) : pendingImageUpload ? (
									"Upload image"
								) : (
									"Publish commit"
								)}
							</button>
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>
		</main>
	);
};

export default MystoryPlayground;
