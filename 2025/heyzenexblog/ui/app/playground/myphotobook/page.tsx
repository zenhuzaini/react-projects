"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import {
	ArrowDown,
	ArrowDownToLine,
	ArrowUp,
	Check,
	CloudUpload,
	Code2,
	Eye,
	ImagePlus,
	Layers3,
	LoaderCircle,
	Minus,
	Plus,
	Quote,
	Text,
	Trash2,
	X,
} from "lucide-react";
import PhotoCollectionGrid from "@/components/layout/StoryBookBlockLayouts/6_PhotoCollectionGrid/PhotoCollectionGrid";
import ShortDescription from "@/components/layout/StoryBookBlockLayouts/1_ShortDescription/ShortDescription";
import HeaderInfoSection from "@/components/layout/StoryBookBlockLayouts/HeaderInfoSection";
import { ImageWithSkeleton } from "@/components/molecule/ImageWithSkeleton";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import Heading from "@/components/molecule/Headings/Heading";
import type { PhotoCardDetailType } from "@/types/components";

type PhotoItem = { id: string; url: string; alt: string };
type PhotoBlock = {
	id: string;
	type: "paragraph" | "quote" | "photo" | "gallery";
	text: string;
	url: string;
	alt: string;
	photos: PhotoItem[];
	insideCenter: boolean;
};
type PhotoBookDraft = {
	id: string;
	storyId: number;
	title: string;
	slug: string;
	description: string;
	cover: string;
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
	blocks: PhotoBlock[];
	createdAt: string;
	updatedAt: string;
};

const STORAGE_KEY = "heyzenex-myphotobook-drafts";
const EXAMPLE_COVER =
	"https://d2exd72xrrp1s7.cloudfront.net/www/ah/ahlfc1lxgvbtjwbqtulk2n465l6lvrec-p664172611-full/19a8d650ab5?width=3072&height=2304&crop=false&q=70";
const EXAMPLE_PHOTOS: PhotoItem[] = [
	{
		id: "example-photo-1",
		url: "https://d2exd72xrrp1s7.cloudfront.net/www/19/19ab3pq3qtjbvwat2ewvw9xb150l3j6hy-p468787590-full/1901cf21008?width=1920&crop=false&q=70",
		alt: "Me eating a snack in the morning with a nice view",
	},
	{
		id: "example-photo-2",
		url: "https://d2exd72xrrp1s7.cloudfront.net/www/1d/1dxupgsqmmd7l1ex9ekmhn98yx50l3j7g5-p468787602-full/1901cf214d5?width=1920&crop=false&q=70",
		alt: "Beautiful view of the Odra river from the camping place",
	},
	{
		id: "example-photo-3",
		url: "https://d2exd72xrrp1s7.cloudfront.net/www/13/13jz4407motghjeb7dpyzttvm5l6lvs0v-p664172613-full/19a8d650e2c?width=1920&crop=false&q=70",
		alt: "Flower and sunset",
	},
	{
		id: "example-photo-4",
		url: "https://d2exd72xrrp1s7.cloudfront.net/www/x9/x9t8dhrvfmfy1imizb0d70mvh52syvwsr-p493302181-full/1913cce3bb2?width=1920&crop=false&q=70",
		alt: "Loaded bike ready for an overnighter",
	},
	{
		id: "example-photo-5",
		url: "https://d2exd72xrrp1s7.cloudfront.net/www/zi/zijdyi95s0j5178tjpdopl97c52syw2fl-p493302382-full/1913cce577a?width=1920&crop=false&q=70",
		alt: "View from the tent",
	},
];

const createBlock = (
	type: PhotoBlock["type"],
	insideCenter = true,
): PhotoBlock => ({
	id: crypto.randomUUID(),
	type,
	text: "",
	url: "",
	alt: "",
	photos: [],
	insideCenter,
});

const createExampleDraft = (): PhotoBookDraft => ({
	id: "photobook-example",
	storyId: 1,
	title: "Wroclaw Old Town",
	slug: "1-wroclaw-old-town",
	description:
		"My first solo bikepacking overnighter at Jezioro Dziewicze (Virgin Lake), Wrocław, Poland",
	cover: EXAMPLE_COVER,
	city: "Wroclaw",
	country: "Poland",
	activityType: "photography",
	tags: "photography, wroclaw, poland, city, travel",
	views: 211,
	likes: 51,
	datePublished: "2025-11-26T10:31",
	eventDateFrom: "2025-11-30",
	eventDateTo: "2025-11-05",
	nextPostSlug: "2-solo-bikepacking-velo-dunajec-day-1-the-adventure-begins",
	prevPostSlug: "2-solo-bikepacking-velo-dunajec-day-1-the-adventure-begins",
	blocks: [
		{
			...createBlock("quote", false),
			id: "example-quote",
			text: "This is the story of my first time going bikepacking alone.",
		},
		{
			...createBlock("paragraph"),
			id: "example-paragraph",
			text: "I woke up to birds singing, unzipped my tent, and boom — beautiful lake, green forest, total peace. That moment alone made the whole trip worth it.",
		},
		{
			...createBlock("gallery"),
			id: "example-gallery",
			photos: EXAMPLE_PHOTOS,
		},
	],
	createdAt: "",
	updatedAt: "",
});

const createNewDraft = (): PhotoBookDraft => ({
	...createExampleDraft(),
	id: crypto.randomUUID(),
	storyId: 1,
	title: "Untitled PhotoBook",
	slug: "",
	description: "",
	cover: "",
	city: "",
	country: "",
	activityType: "photography",
	tags: "",
	views: 0,
	likes: 0,
	datePublished: "",
	eventDateFrom: "",
	eventDateTo: "",
	nextPostSlug: "",
	prevPostSlug: "",
	blocks: [createBlock("paragraph")],
	createdAt: "",
	updatedAt: "",
});

const toSlug = (value: string) =>
	value
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-|-$/g, "");

const stampDraft = (draft: PhotoBookDraft, timestamp: string) => ({
	...draft,
	slug: draft.slug || toSlug(draft.title),
	createdAt: draft.createdAt || timestamp,
	updatedAt: timestamp,
});

const upsertDraft = (drafts: PhotoBookDraft[], draft: PhotoBookDraft) =>
	drafts.some((saved) => saved.id === draft.id)
		? drafts.map((saved) => (saved.id === draft.id ? draft : saved))
		: [draft, ...drafts];

const normalizeDraft = (draft: PhotoBookDraft): PhotoBookDraft => ({
	...createNewDraft(),
	...draft,
	blocks: Array.isArray(draft.blocks)
		? draft.blocks.map((block) => ({
				...createBlock(block.type, block.insideCenter),
				...block,
				text: block.text ?? "",
				url: block.url ?? "",
				alt: block.alt ?? "",
				photos: Array.isArray(block.photos) ? block.photos : [],
			}))
		: [createBlock("paragraph")],
});

const serializeDraft = (draft: PhotoBookDraft) => {
	const metadata = {
		slug: draft.slug || toSlug(draft.title),
		title: draft.title,
		id: draft.storyId,
		views: draft.views,
		likes: draft.likes,
		cover: draft.cover,
		description: draft.description,
		datePublished: draft.datePublished
			? new Date(draft.datePublished).toString()
			: "",
		dateModified: draft.updatedAt,
		eventDateTo: draft.eventDateTo,
		eventDateFrom: draft.eventDateFrom,
		tags: draft.tags
			.split(",")
			.map((tag) => tag.trim())
			.filter(Boolean),
		city: draft.city,
		country: draft.country,
		activityType: draft.activityType,
		nextPostSlug: draft.nextPostSlug,
		prevPostSlug: draft.prevPostSlug,
	};
	const groups: { insideCenter: boolean; source: string[] }[] = [];
	for (const block of draft.blocks) {
		let source = "";
		switch (block.type) {
			case "paragraph":
				source = block.text.trim();
				break;
			case "quote":
				source = `<Quo\n\ttext={${JSON.stringify(block.text)}}\n\tshouldCenter={true}\n/>`;
				break;
			case "photo":
				if (block.url.trim()) {
					source = `<Pho photo={{ photoUrl: ${JSON.stringify(block.url)}, description: ${JSON.stringify(block.alt)} }} />`;
				}
				break;
			case "gallery": {
				const photos = block.photos
					.filter((photo) => photo.url.trim())
					.map(
						(photo) =>
							`\t{ photoUrl: ${JSON.stringify(photo.url)}, description: ${JSON.stringify(photo.alt)} },`,
					)
					.join("\n");
				if (photos) source = `<PhoCol photo={[\n${photos}\n]} />`;
				break;
			}
		}
		if (!source) continue;
		const previous = groups[groups.length - 1];
		if (previous?.insideCenter === block.insideCenter) {
			previous.source.push(source);
		} else {
			groups.push({ insideCenter: block.insideCenter, source: [source] });
		}
	}
	const body = groups
		.map((group) => {
			const content = group.source.join("\n\n");
			return group.insideCenter ? `<Center>\n${content}\n</Center>` : content;
		})
		.join("\n\n");
	return `export const metadata = ${JSON.stringify(metadata, null, 2)};\n\n${body}\n`;
};

const localDateTime = (date: string) => {
	if (!date) return "";
	const parsed = new Date(date);
	return Number.isNaN(parsed.getTime()) ? date : parsed.toLocaleString("en-GB");
};

const PhotoBookPlayground = () => {
	const [draft, setDraft] = useState<PhotoBookDraft>(createExampleDraft);
	const [savedDrafts, setSavedDrafts] = useState<PhotoBookDraft[]>([]);
	const [activeDraftId, setActiveDraftId] = useState<string | null>(null);
	const [isHydrated, setIsHydrated] = useState(false);
	const [notice, setNotice] = useState("");
	const [view, setView] = useState<"mdx" | "preview">("preview");
	const [publishOpen, setPublishOpen] = useState(false);
	const [publishSecret, setPublishSecret] = useState("");
	const [isPublishing, setIsPublishing] = useState(false);

	useEffect(() => {
		try {
			const stored = localStorage.getItem(STORAGE_KEY);
			if (stored) {
				setSavedDrafts(
					(JSON.parse(stored) as PhotoBookDraft[]).map(normalizeDraft),
				);
			}
		} catch {
			setNotice("Saved photobooks could not be read from this browser.");
		}
		setIsHydrated(true);
	}, []);

	useEffect(() => {
		if (!isHydrated || !activeDraftId) return;
		const saved = savedDrafts.find((item) => item.id === activeDraftId);
		if (saved && JSON.stringify(saved) === JSON.stringify(draft)) return;
		const timeout = window.setTimeout(() => {
			const updated = stampDraft(
				{ ...draft, id: activeDraftId },
				new Date().toISOString(),
			);
			const next = upsertDraft(savedDrafts, updated);
			setDraft(updated);
			setSavedDrafts(next);
			try {
				localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
			} catch {
				setNotice("Draft could not be saved in this browser.");
			}
		}, 500);
		return () => window.clearTimeout(timeout);
	}, [activeDraftId, draft, isHydrated, savedDrafts]);

	const updateDraft = (updates: Partial<PhotoBookDraft>) =>
		setDraft((current) => ({ ...current, ...updates }));
	const updateBlock = (id: string, updates: Partial<PhotoBlock>) =>
		setDraft((current) => ({
			...current,
			blocks: current.blocks.map((block) =>
				block.id === id ? { ...block, ...updates } : block,
			),
		}));
	const addBlock = (type: PhotoBlock["type"]) =>
		updateDraft({ blocks: [...draft.blocks, createBlock(type)] });
	const moveBlock = (index: number, offset: number) => {
		const nextIndex = index + offset;
		if (nextIndex < 0 || nextIndex >= draft.blocks.length) return;
		const blocks = [...draft.blocks];
		[blocks[index], blocks[nextIndex]] = [blocks[nextIndex], blocks[index]];
		updateDraft({ blocks });
	};
	const persistImmediately = (next: PhotoBookDraft[]) => {
		setSavedDrafts(next);
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
		} catch {
			setNotice("Draft could not be saved in this browser.");
		}
	};
	const startNewDraft = () => {
		const now = new Date().toISOString();
		const activeSaved = activeDraftId
			? savedDrafts.find((item) => item.id === activeDraftId)
			: undefined;
		const draftsToKeep =
			activeSaved && JSON.stringify(activeSaved) !== JSON.stringify(draft)
				? upsertDraft(
						savedDrafts,
						stampDraft({ ...draft, id: activeDraftId as string }, now),
					)
				: savedDrafts;
		const fresh = stampDraft(createNewDraft(), now);
		const next = upsertDraft(draftsToKeep, fresh);
		setDraft(fresh);
		setActiveDraftId(fresh.id);
		setNotice("New photobook created and saved automatically.");
		persistImmediately(next);
	};
	const loadDraft = (saved: PhotoBookDraft) => {
		setDraft(normalizeDraft(saved));
		setActiveDraftId(saved.id);
		setNotice("");
	};
	const deleteDraft = (id: string) => {
		const next = savedDrafts.filter((saved) => saved.id !== id);
		persistImmediately(next);
		if (activeDraftId === id) {
			if (next[0]) {
				loadDraft(next[0]);
			} else {
				setDraft(createExampleDraft());
				setActiveDraftId(null);
			}
		}
	};
	const exportMdx = () => {
		const blob = new Blob([serializeDraft(draft)], {
			type: "text/mdx;charset=utf-8",
		});
		const url = URL.createObjectURL(blob);
		const anchor = document.createElement("a");
		anchor.href = url;
		anchor.download = `${draft.slug || toSlug(draft.title) || "photobook"}.mdx`;
		anchor.click();
		URL.revokeObjectURL(url);
	};
	const publishDraft = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const slug = draft.slug || toSlug(draft.title);
		if (!slug) {
			setNotice("Add a title before publishing.");
			return;
		}
		setIsPublishing(true);
		try {
			const content = serializeDraft({ ...draft, slug });
			const response = await fetch("/api/stories/publish", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"x-publish-secret": publishSecret,
				},
				body: JSON.stringify({
					collection: "photobook",
					slug,
					title: draft.title,
					content,
				}),
			});
			const result = (await response.json().catch(() => ({}))) as {
				error?: string;
				path?: string;
				branch?: string;
			};
			if (!response.ok) throw new Error(result.error || "Could not publish.");
			const timestamp = new Date().toISOString();
			const published = stampDraft({ ...draft, slug }, timestamp);
			setDraft(published);
			setActiveDraftId(published.id);
			persistImmediately(upsertDraft(savedDrafts, published));
			setPublishOpen(false);
			setPublishSecret("");
			setNotice(
				`Published ${result.path || `${slug}.mdx`} to ${result.branch || "GitHub"}.`,
			);
		} catch (error) {
			setNotice(error instanceof Error ? error.message : "Could not publish.");
		} finally {
			setIsPublishing(false);
		}
	};

	const mdx = serializeDraft(draft);
	const isSaved =
		activeDraftId !== null &&
		savedDrafts.some(
			(saved) =>
				saved.id === activeDraftId &&
				JSON.stringify(saved) === JSON.stringify(draft),
		);
	const previewPhotos = (photos: PhotoItem[]): PhotoCardDetailType[] =>
		photos
			.filter((photo) => photo.url.trim())
			.map((photo) => ({
				id: photo.id,
				photoUrl: photo.url,
				description: photo.alt || draft.title,
				city: draft.city,
				country: draft.country,
				activityType: draft.activityType,
				activityDate: draft.eventDateFrom,
			}));
	const updateGalleryPhoto = (
		block: PhotoBlock,
		photoId: string,
		updates: Partial<PhotoItem>,
	) =>
		updateBlock(block.id, {
			photos: block.photos.map((photo) =>
				photo.id === photoId ? { ...photo, ...updates } : photo,
			),
		});

	return (
		<main className="mx-auto w-full max-w-[1600px] pb-12 text-primaryText">
			<header className="mb-7 flex flex-col gap-4 border-b border-primarybrown/20 pb-6 md:flex-row md:items-stretch">
				<Heading
					title="PhotoBook builder"
					description="Compose a visual story from photographs and short notes."
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
						onClick={startNewDraft}
						className="inline-flex h-10 items-center gap-2 rounded-md border border-primarybrown/30 px-3 text-sm font-semibold hover:bg-primarywhite">
						<Plus size={16} /> New
					</button>
					{activeDraftId && (
						<span
							aria-live="polite"
							title={isSaved ? "All changes saved" : "Saving changes"}
							className={`inline-flex h-10 items-center gap-2 rounded-md px-3 text-sm font-semibold ${isSaved ? "bg-secondaryforestgreen/10 text-secondaryforestgreen" : "bg-primaryaccent/10 text-primaryaccent"}`}>
							{isSaved ? (
								<Check size={16} />
							) : (
								<LoaderCircle size={16} className="animate-spin" />
							)}
							{isSaved ? "Saved" : "Saving"}
						</span>
					)}
					<button
						type="button"
						onClick={exportMdx}
						className="inline-flex h-10 items-center gap-2 rounded-md bg-fierceorange px-4 text-sm font-semibold text-white hover:brightness-95">
						<ArrowDownToLine size={16} /> Export MDX
					</button>
					<button
						type="button"
						onClick={() => setPublishOpen(true)}
						className="inline-flex h-10 items-center gap-2 rounded-md bg-primaryaccent px-4 text-sm font-semibold text-white hover:brightness-95">
						<CloudUpload size={16} /> Publish
					</button>
				</div>
			</header>

			<div className="grid items-start gap-5 xl:grid-cols-[230px_minmax(400px,1fr)_minmax(360px,0.95fr)]">
				<aside className="rounded-lg border border-primarybrown/20 bg-primarywhite p-4">
					<h2 className="mb-3 text-sm font-bold">Saved photobooks</h2>
					{!isHydrated ? (
						<p className="text-sm text-primarygrey">Loading drafts...</p>
					) : savedDrafts.length === 0 ? (
						<p className="border-t border-primarybrown/15 py-4 text-sm text-primarygrey">
							Your drafts will appear here.
						</p>
					) : (
						<ul className="space-y-1">
							{savedDrafts.map((saved) => (
								<li
									key={saved.id}
									className={`flex items-start gap-1 rounded-md border p-2 ${activeDraftId === saved.id ? "border-secondaryforestgreen/50 bg-secondaryforestgreen/5" : "border-transparent hover:bg-secondarywhite"}`}>
									<button
										type="button"
										onClick={() => loadDraft(saved)}
										className="min-w-0 flex-1 text-left">
										<span className="block truncate text-sm font-semibold">
											{saved.title || "Untitled PhotoBook"}
										</span>
										<span className="block truncate text-xs text-primarygrey">
											{saved.slug || "No slug"}
										</span>
									</button>
									<button
										type="button"
										aria-label={`Delete ${saved.title || "PhotoBook draft"}`}
										title="Delete draft"
										onClick={() => deleteDraft(saved.id)}
										className="rounded p-1 text-primarygrey hover:bg-primaryred/10 hover:text-primaryred">
										<Trash2 size={15} />
									</button>
								</li>
							))}
						</ul>
					)}
				</aside>

				<div className="space-y-5">
					<section className="rounded-lg border border-primarybrown/20 bg-primarywhite p-4">
						<h2 className="mb-4 text-sm font-bold">Photobook details</h2>
						<div className="grid gap-3 sm:grid-cols-2">
							<label className="block sm:col-span-2">
								<span className="mb-1 block text-xs font-semibold">Title</span>
								<input
									aria-label="Title"
									value={draft.title}
									onChange={(event) =>
										updateDraft({ title: event.target.value })
									}
									className="w-full rounded border border-primarybrown/25 bg-transparent px-3 py-2 text-sm outline-none focus:border-secondaryforestgreen"
								/>
							</label>
							<label className="block sm:col-span-2">
								<span className="mb-1 block text-xs font-semibold">Slug</span>
								<input
									aria-label="Slug"
									value={draft.slug}
									onChange={(event) =>
										updateDraft({ slug: toSlug(event.target.value) })
									}
									className="w-full rounded border border-primarybrown/25 bg-transparent px-3 py-2 text-sm outline-none focus:border-secondaryforestgreen"
								/>
							</label>
							<label className="block sm:col-span-2">
								<span className="mb-1 block text-xs font-semibold">
									Description
								</span>
								<textarea
									aria-label="Description"
									rows={3}
									value={draft.description}
									onChange={(event) =>
										updateDraft({ description: event.target.value })
									}
									className="w-full resize-y rounded border border-primarybrown/25 bg-transparent px-3 py-2 text-sm outline-none focus:border-secondaryforestgreen"
								/>
							</label>
							<label className="block sm:col-span-2">
								<span className="mb-1 block text-xs font-semibold">
									Cover image URL
								</span>
								<input
									aria-label="Cover image URL"
									type="url"
									value={draft.cover}
									onChange={(event) =>
										updateDraft({ cover: event.target.value })
									}
									className="w-full rounded border border-primarybrown/25 bg-transparent px-3 py-2 text-sm outline-none focus:border-secondaryforestgreen"
								/>
							</label>
							<label className="block">
								<span className="mb-1 block text-xs font-semibold">City</span>
								<input
									aria-label="City"
									value={draft.city}
									onChange={(event) =>
										updateDraft({ city: event.target.value })
									}
									className="w-full rounded border border-primarybrown/25 bg-transparent px-3 py-2 text-sm"
								/>
							</label>
							<label className="block">
								<span className="mb-1 block text-xs font-semibold">
									Country
								</span>
								<input
									aria-label="Country"
									value={draft.country}
									onChange={(event) =>
										updateDraft({ country: event.target.value })
									}
									className="w-full rounded border border-primarybrown/25 bg-transparent px-3 py-2 text-sm"
								/>
							</label>
							<label className="block">
								<span className="mb-1 block text-xs font-semibold">
									Published
								</span>
								<input
									aria-label="Published"
									type="datetime-local"
									value={draft.datePublished}
									onChange={(event) =>
										updateDraft({ datePublished: event.target.value })
									}
									className="w-full rounded border border-primarybrown/25 bg-transparent px-3 py-2 text-sm"
								/>
							</label>
							<label className="block">
								<span className="mb-1 block text-xs font-semibold">
									Activity start
								</span>
								<input
									aria-label="Activity start"
									type="date"
									value={draft.eventDateFrom}
									onChange={(event) =>
										updateDraft({ eventDateFrom: event.target.value })
									}
									className="w-full rounded border border-primarybrown/25 bg-transparent px-3 py-2 text-sm"
								/>
							</label>
							<label className="block">
								<span className="mb-1 block text-xs font-semibold">
									Activity end
								</span>
								<input
									aria-label="Activity end"
									type="date"
									value={draft.eventDateTo}
									onChange={(event) =>
										updateDraft({ eventDateTo: event.target.value })
									}
									className="w-full rounded border border-primarybrown/25 bg-transparent px-3 py-2 text-sm"
								/>
							</label>
							<label className="block sm:col-span-2">
								<span className="mb-1 block text-xs font-semibold">Tags</span>
								<input
									aria-label="Tags"
									value={draft.tags}
									onChange={(event) =>
										updateDraft({ tags: event.target.value })
									}
									className="w-full rounded border border-primarybrown/25 bg-transparent px-3 py-2 text-sm"
								/>
							</label>
						</div>
					</section>

					<section className="rounded-lg border border-primarybrown/20 bg-primarywhite p-4">
						<div className="mb-4 flex items-center justify-between gap-2">
							<div>
								<h2 className="text-sm font-bold">PhotoBook content</h2>
								<p className="mt-1 text-xs text-primarygrey">
									{draft.blocks.length} blocks
								</p>
							</div>
						</div>
						<div className="mb-4 flex flex-wrap gap-2">
							<button
								type="button"
								onClick={() => addBlock("paragraph")}
								className="inline-flex h-9 items-center gap-2 rounded border border-primarybrown/25 px-3 text-xs font-semibold hover:bg-secondarywhite">
								<Text size={15} /> Text
							</button>
							<button
								type="button"
								onClick={() => addBlock("quote")}
								className="inline-flex h-9 items-center gap-2 rounded border border-primarybrown/25 px-3 text-xs font-semibold hover:bg-secondarywhite">
								<Quote size={15} /> Quote
							</button>
							<button
								type="button"
								onClick={() => addBlock("photo")}
								className="inline-flex h-9 items-center gap-2 rounded border border-primarybrown/25 px-3 text-xs font-semibold hover:bg-secondarywhite">
								<ImagePlus size={15} /> Photo
							</button>
							<button
								type="button"
								onClick={() => addBlock("gallery")}
								className="inline-flex h-9 items-center gap-2 rounded border border-primarybrown/25 px-3 text-xs font-semibold hover:bg-secondarywhite">
								<Layers3 size={15} /> Gallery
							</button>
						</div>
						<div className="space-y-3">
							{draft.blocks.map((block, index) => (
								<article
									key={block.id}
									className="rounded-md border border-primarybrown/20 bg-secondarywhite p-3">
									<div className="mb-3 flex items-center gap-2">
										<span className="text-xs font-bold uppercase text-primarygrey">
											{block.type === "paragraph" ? "Text" : block.type}
										</span>
										<div className="ml-auto flex items-center gap-1">
											<button
												type="button"
												aria-label="Move block up"
												disabled={index === 0}
												onClick={() => moveBlock(index, -1)}
												className="rounded p-1 text-primarygrey hover:bg-primarywhite disabled:opacity-30">
												<ArrowUp size={15} />
											</button>
											<button
												type="button"
												aria-label="Move block down"
												disabled={index === draft.blocks.length - 1}
												onClick={() => moveBlock(index, 1)}
												className="rounded p-1 text-primarygrey hover:bg-primarywhite disabled:opacity-30">
												<ArrowDown size={15} />
											</button>
											<button
												type="button"
												aria-label="Remove block"
												onClick={() =>
													updateDraft({
														blocks: draft.blocks.filter(
															(item) => item.id !== block.id,
														),
													})
												}
												className="rounded p-1 text-primaryred hover:bg-primaryred/10">
												<X size={15} />
											</button>
										</div>
									</div>
									{(block.type === "paragraph" || block.type === "quote") && (
										<textarea
											aria-label={`${block.type} text`}
											rows={block.type === "paragraph" ? 5 : 3}
											value={block.text}
											onChange={(event) =>
												updateBlock(block.id, { text: event.target.value })
											}
											className="w-full resize-y rounded border border-primarybrown/20 bg-primarywhite px-3 py-2 text-sm leading-6 outline-none focus:border-secondaryforestgreen"
											placeholder={
												block.type === "paragraph"
													? "Write a note for this photobook"
													: "A short line to remember"
											}
										/>
									)}
									{block.type === "photo" && (
										<div className="space-y-2">
											<input
												aria-label="Photo URL"
												type="url"
												value={block.url}
												onChange={(event) =>
													updateBlock(block.id, { url: event.target.value })
												}
												className="w-full rounded border border-primarybrown/20 bg-primarywhite px-3 py-2 text-sm"
												placeholder="Photo URL"
											/>
											<input
												aria-label="Photo description"
												value={block.alt}
												onChange={(event) =>
													updateBlock(block.id, { alt: event.target.value })
												}
												className="w-full rounded border border-primarybrown/20 bg-primarywhite px-3 py-2 text-sm"
												placeholder="Photo description"
											/>
										</div>
									)}
									{block.type === "gallery" && (
										<div className="space-y-2">
											{block.photos.map((photo) => (
												<div
													key={photo.id}
													className="grid gap-2 sm:grid-cols-[1fr_1fr_auto]">
													<input
														aria-label="Gallery photo URL"
														type="url"
														value={photo.url}
														onChange={(event) =>
															updateGalleryPhoto(block, photo.id, {
																url: event.target.value,
															})
														}
														className="min-w-0 rounded border border-primarybrown/20 bg-primarywhite px-3 py-2 text-sm"
														placeholder="Photo URL"
													/>
													<input
														aria-label="Gallery photo description"
														value={photo.alt}
														onChange={(event) =>
															updateGalleryPhoto(block, photo.id, {
																alt: event.target.value,
															})
														}
														className="min-w-0 rounded border border-primarybrown/20 bg-primarywhite px-3 py-2 text-sm"
														placeholder="Photo description"
													/>
													<button
														type="button"
														aria-label="Remove gallery photo"
														onClick={() =>
															updateBlock(block.id, {
																photos: block.photos.filter(
																	(item) => item.id !== photo.id,
																),
															})
														}
														className="inline-flex size-10 items-center justify-center rounded text-primaryred hover:bg-primaryred/10">
														<Minus size={16} />
													</button>
												</div>
											))}
											<button
												type="button"
												onClick={() =>
													updateBlock(block.id, {
														photos: [
															...block.photos,
															{ id: crypto.randomUUID(), url: "", alt: "" },
														],
													})
												}
												className="inline-flex h-9 items-center gap-2 rounded border border-primarybrown/25 px-3 text-xs font-semibold">
												<Plus size={14} /> Add photo
											</button>
										</div>
									)}
									<label className="mt-3 flex items-center gap-2 text-xs text-primarygrey">
										<input
											type="checkbox"
											checked={block.insideCenter}
											onChange={(event) =>
												updateBlock(block.id, {
													insideCenter: event.target.checked,
												})
											}
										/>{" "}
										Place inside centered content
									</label>
								</article>
							))}
						</div>
					</section>
				</div>

				<section className="overflow-hidden rounded-lg border border-primarybrown/20 bg-primarywhite">
					<div className="flex items-center justify-between gap-3 border-b border-primarybrown/15 p-3">
						<div
							className="flex gap-1"
							role="tablist"
							aria-label="PhotoBook output">
							<button
								type="button"
								role="tab"
								aria-selected={view === "preview"}
								onClick={() => setView("preview")}
								className={`inline-flex h-9 items-center gap-2 rounded-md px-3 text-sm font-semibold ${view === "preview" ? "bg-secondaryforestgreen text-white" : "text-primarygrey hover:bg-secondarywhite"}`}>
								<Eye size={15} /> Preview
							</button>
							<button
								type="button"
								role="tab"
								aria-selected={view === "mdx"}
								onClick={() => setView("mdx")}
								className={`inline-flex h-9 items-center gap-2 rounded-md px-3 text-sm font-semibold ${view === "mdx" ? "bg-primarymidnight text-white" : "text-primarygrey hover:bg-secondarywhite"}`}>
								<Code2 size={15} /> MDX
							</button>
						</div>
						<span className="max-w-[45%] truncate text-xs text-primarygrey">
							{draft.slug || toSlug(draft.title) || "photobook"}.mdx
						</span>
					</div>
					{view === "mdx" ? (
						<pre
							role="tabpanel"
							className="max-h-[75vh] min-h-[420px] overflow-auto bg-primarymidnight p-4 text-xs leading-5 text-white">
							<code>{mdx}</code>
						</pre>
					) : (
						<article
							role="tabpanel"
							className="max-h-[80vh] min-h-[420px] overflow-auto bg-primarymidnight p-4 text-white sm:p-6">
							<div className="mx-auto max-w-3xl space-y-6">
								<HeaderInfoSection
									text="PhotoBook"
									date={localDateTime(draft.datePublished)}
									id={draft.storyId}
								/>
								{draft.cover && (
									<div className="relative aspect-video overflow-hidden rounded-lg">
										<ImageWithSkeleton
											src={draft.cover}
											alt={draft.title}
											rounded="rounded-lg"
											loading="eager"
										/>
									</div>
								)}
								<header className="space-y-2">
									<h1 className="text-3xl font-bold text-white sm:text-5xl">
										{draft.title || "Untitled PhotoBook"}
									</h1>
									<p className="text-sm text-white/70">
										{[draft.city, draft.country].filter(Boolean).join(", ")}
									</p>
									<p className="text-base leading-7 text-white/80">
										{draft.description}
									</p>
								</header>
								<div className="space-y-7">
									{draft.blocks.map((block) => {
										const photos = previewPhotos(block.photos);
										const content =
											block.type === "paragraph" ? (
												<p className="whitespace-pre-line text-base leading-7 text-white/90">
													{block.text}
												</p>
											) : block.type === "quote" ? (
												<div className="border-l-2 border-primaryaccent pl-5">
													<ShortDescription
														text={block.text || "Your quote"}
														shouldCenter={false}
														fontSize="medium"
													/>
												</div>
											) : block.type === "photo" ? (
												block.url ? (
													<figure className="space-y-2">
														<div className="relative aspect-4/3 overflow-hidden rounded-lg">
															<ImageWithSkeleton
																src={block.url}
																alt={block.alt || draft.title}
																rounded="rounded-lg"
															/>
														</div>
														{block.alt && (
															<figcaption className="text-xs text-white/60">
																{block.alt}
															</figcaption>
														)}
													</figure>
												) : null
											) : photos.length ? (
												<PhotoCollectionGrid photo={photos} />
											) : null;
										return content ? (
											<div
												key={block.id}
												className={
													block.insideCenter ? "mx-auto max-w-2xl" : ""
												}>
												{content}
											</div>
										) : null;
									})}
								</div>
								<footer className="flex flex-wrap gap-2 border-t border-white/15 pt-4">
									{draft.tags
										.split(",")
										.map((tag) => tag.trim())
										.filter(Boolean)
										.map((tag) => (
											<span key={tag} className="text-xs text-white/70">
												#{tag}
											</span>
										))}
								</footer>
							</div>
						</article>
					)}
					<div className="flex items-center justify-between border-t border-primarybrown/15 px-4 py-3 text-xs text-primarygrey">
						<span>
							{view === "mdx"
								? "Generated MDX source"
								: "Live photobook preview"}
						</span>
						<button
							type="button"
							onClick={exportMdx}
							className="inline-flex items-center gap-1.5 hover:text-secondaryforestgreen">
							<ArrowDownToLine size={14} /> Download
						</button>
					</div>
				</section>
			</div>

			<Dialog open={publishOpen} onOpenChange={setPublishOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Publish PhotoBook</DialogTitle>
						<DialogDescription>
							This publishes{" "}
							{draft.slug || toSlug(draft.title) || "your photobook"}.mdx to the
							configured GitHub branch.
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
									className="inline-flex h-10 items-center justify-center rounded-md border border-primarybrown/30 px-4 text-sm font-semibold">
									Cancel
								</button>
							</DialogClose>
							<button
								type="submit"
								disabled={isPublishing || !publishSecret.trim()}
								className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primaryaccent px-4 text-sm font-semibold text-white disabled:opacity-60">
								{isPublishing ? (
									<>
										<LoaderCircle size={16} className="animate-spin" />{" "}
										Publishing...
									</>
								) : (
									<>
										<CloudUpload size={16} /> Publish
									</>
								)}
							</button>
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>
		</main>
	);
};

export default PhotoBookPlayground;
