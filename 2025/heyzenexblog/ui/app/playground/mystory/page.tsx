"use client";

import { DragEvent, useEffect, useState } from "react";
import {
	ArrowDown,
	ArrowDownToLine,
	ArrowUp,
	Check,
	Code2,
	GripVertical,
	ImagePlus,
	Layers3,
	Plus,
	Quote,
	Text,
	Trash2,
	Type,
	X,
} from "lucide-react";

type BlockType = "paragraph" | "quote" | "image" | "gallery" | "section";

type StoryBlock = {
	id: string;
	type: BlockType;
	text: string;
	imageUrl: string;
	imageAlt: string;
	gallery: { url: string; alt: string }[];
};

type StoryDraft = {
	id: string;
	title: string;
	slug: string;
	description: string;
	cover: string;
	city: string;
	country: string;
	activityType: string;
	tags: string;
	eventDateFrom: string;
	eventDateTo: string;
	blocks: StoryBlock[];
	createdAt: string;
	updatedAt: string;
};

const STORAGE_KEY = "heyzenex-mystory-drafts";

const blockOptions: { type: BlockType; label: string; icon: typeof Text }[] = [
	{ type: "paragraph", label: "Paragraph", icon: Text },
	{ type: "quote", label: "Quote", icon: Quote },
	{ type: "image", label: "Photo", icon: ImagePlus },
	{ type: "gallery", label: "Gallery", icon: Layers3 },
	{ type: "section", label: "Section title", icon: Type },
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
});

const createDraft = (
	id = crypto.randomUUID(),
	blockId = crypto.randomUUID(),
): StoryDraft => ({
	id,
	title: "Untitled story",
	slug: "untitled-story",
	description: "",
	cover: "",
	city: "",
	country: "",
	activityType: "bikepacking",
	tags: "",
	eventDateFrom: "",
	eventDateTo: "",
	blocks: [createBlock("paragraph", blockId)],
	createdAt: "",
	updatedAt: "",
});

const toSlug = (value: string) =>
	value
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-|-$/g, "");

const toMdx = (draft: StoryDraft) => {
	const metadata = {
		slug: draft.slug || toSlug(draft.title),
		title: draft.title,
		id: 1,
		views: 0,
		likes: 0,
		cover: draft.cover,
		description: draft.description,
		datePublished: draft.createdAt || draft.updatedAt,
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
		nextPostSlug: "",
		prevPostSlug: "",
	};

	const blocks = draft.blocks
		.map((block) => {
			switch (block.type) {
				case "paragraph":
					return block.text.trim();
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
			}
		})
		.filter(Boolean)
		.join("\n\n");

	return `export const metadata = ${JSON.stringify(metadata, null, 2)};\n\n<Center>\n${blocks}\n</Center>\n`;
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

	useEffect(() => {
		try {
			const storedDrafts = localStorage.getItem(STORAGE_KEY);
			if (storedDrafts)
				setSavedDrafts(JSON.parse(storedDrafts) as StoryDraft[]);
		} catch {
			setNotice("Saved drafts could not be read from this browser.");
		}
		setIsHydrated(true);
	}, []);

	const updateDraft = (updates: Partial<StoryDraft>) =>
		setDraft((current) => ({ ...current, ...updates }));

	const updateBlock = (id: string, updates: Partial<StoryBlock>) =>
		setDraft((current) => ({
			...current,
			blocks: current.blocks.map((block) =>
				block.id === id ? { ...block, ...updates } : block,
			),
		}));

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

	const saveDraft = () => {
		const now = new Date().toISOString();
		const updatedDraft = {
			...draft,
			slug: draft.slug || toSlug(draft.title),
			createdAt: draft.createdAt || now,
			updatedAt: now,
		};
		const nextDrafts = activeDraftId
			? savedDrafts.map((item) =>
					item.id === activeDraftId ? updatedDraft : item,
				)
			: [updatedDraft, ...savedDrafts];
		setDraft(updatedDraft);
		setSavedDrafts(nextDrafts);
		setActiveDraftId(updatedDraft.id);
		localStorage.setItem(STORAGE_KEY, JSON.stringify(nextDrafts));
		setNotice(activeDraftId ? "Draft updated" : "Draft saved");
	};

	const startNewDraft = () => {
		setDraft(createDraft());
		setActiveDraftId(null);
		setNotice("");
	};

	const loadDraft = (saved: StoryDraft) => {
		setDraft(saved);
		setActiveDraftId(saved.id);
		setNotice("");
	};

	const deleteDraft = (id: string) => {
		const nextDrafts = savedDrafts.filter((item) => item.id !== id);
		setSavedDrafts(nextDrafts);
		localStorage.setItem(STORAGE_KEY, JSON.stringify(nextDrafts));
		if (activeDraftId === id) startNewDraft();
		setNotice("Draft deleted");
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

	return (
		<main className="mx-auto w-full max-w-[1600px] pb-12 text-primaryText">
			<header className="mb-7 flex flex-col justify-between gap-5 border-b border-primarybrown/20 pb-6 md:flex-row md:items-end">
				<div>
					<p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-primaryfreshgreen">
						Playground / My Story
					</p>
					<h1 className="text-3xl font-extrabold sm:text-4xl">Story builder</h1>
					<p className="mt-2 max-w-2xl text-sm text-primarygrey">
						Arrange story blocks, save drafts in this browser, and export a
						ready-to-edit MDX file.
					</p>
				</div>
				<div className="flex flex-wrap items-center gap-2">
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
					<button
						type="button"
						onClick={saveDraft}
						className="inline-flex h-10 items-center gap-2 rounded-md bg-secondaryforestgreen px-4 text-sm font-semibold text-white hover:bg-navbar">
						<Check size={16} /> Save draft
					</button>
					<button
						type="button"
						onClick={downloadMdx}
						className="inline-flex h-10 items-center gap-2 rounded-md bg-fierceorange px-4 text-sm font-semibold text-white hover:brightness-95">
						<ArrowDownToLine size={16} /> Export MDX
					</button>
				</div>
			</header>

			<div className="grid items-start gap-5 xl:grid-cols-[230px_minmax(400px,1fr)_minmax(360px,0.9fr)]">
				<aside className="rounded-lg border border-primarybrown/20 bg-primarywhite p-4">
					<div className="mb-4 flex items-center justify-between">
						<h2 className="text-sm font-bold">Saved stories</h2>
						<span className="rounded bg-secondarywhite px-2 py-1 text-xs text-primarygrey">
							{savedDrafts.length}
						</span>
					</div>
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
				</aside>

				<section className="min-w-0 space-y-5">
					<div className="rounded-lg border border-primarybrown/20 bg-primarywhite p-4 sm:p-5">
						<div className="mb-4 flex items-center justify-between border-b border-primarybrown/15 pb-3">
							<h2 className="font-bold">Story details</h2>
							<span className="text-xs text-primarygrey">METADATA</span>
						</div>
						<div className="grid gap-3 sm:grid-cols-2">
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
							<label className="sm:col-span-2">
								<span className="mb-1 block text-xs font-semibold text-primarygrey">
									Cover image URL
								</span>
								<input
									value={draft.cover}
									onChange={(event) =>
										updateDraft({ cover: event.target.value })
									}
									className="w-full rounded-md border border-primarybrown/25 bg-transparent px-3 py-2 text-sm outline-none focus:border-secondaryforestgreen"
									placeholder="https://..."
								/>
							</label>
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
								<select
									value={draft.activityType}
									onChange={(event) =>
										updateDraft({ activityType: event.target.value })
									}
									className="w-full rounded-md border border-primarybrown/25 bg-mybackground px-3 py-2 text-sm outline-none focus:border-secondaryforestgreen">
									{[
										"bikepacking",
										"cycling",
										"hiking",
										"travel",
										"photography",
										"other",
									].map((activity) => (
										<option key={activity} value={activity}>
											{activity}
										</option>
									))}
								</select>
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
							<span className="text-xs text-primarygrey">
								{draft.blocks.length} BLOCKS
							</span>
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
											</div>
										)}
										{block.type === "gallery" && (
											<div className="space-y-2">
												{block.gallery.map((photo, photoIndex) => (
													<div
														key={`${block.id}-${photoIndex}`}
														className="grid gap-2 sm:grid-cols-2">
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
															className="min-w-0 rounded border border-primarybrown/20 bg-primarywhite px-3 py-2 text-sm outline-none focus:border-secondaryforestgreen"
															placeholder={`Photo ${photoIndex + 1} URL`}
														/>
														<div className="flex gap-2">
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
																className="min-w-0 flex-1 rounded border border-primarybrown/20 bg-primarywhite px-3 py-2 text-sm outline-none focus:border-secondaryforestgreen"
																placeholder="Description"
															/>
															<button
																type="button"
																onClick={() =>
																	updateBlock(block.id, {
																		gallery: block.gallery.filter(
																			(_, itemIndex) =>
																				itemIndex !== photoIndex,
																		),
																	})
																}
																aria-label="Remove gallery photo"
																className="rounded p-2 text-primaryred hover:bg-primaryred/10">
																<X size={15} />
															</button>
														</div>
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
					<div className="overflow-hidden rounded-lg border border-primarybrown/25 bg-[#202522] text-[#e8eee8]">
						<div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
							<div className="flex items-center gap-2 text-sm font-semibold">
								<Code2 size={16} /> MDX output
							</div>
							<span className="text-xs text-white/50">
								{draft.slug || "story"}.mdx
							</span>
						</div>
						<pre className="max-h-[70vh] min-h-[340px] overflow-auto p-4 text-xs leading-5 sm:text-[13px]">
							<code>{mdx}</code>
						</pre>
						<div className="flex items-center justify-between border-t border-white/10 px-4 py-3 text-xs text-white/55">
							<span>Live source preview</span>
							<button
								type="button"
								onClick={downloadMdx}
								className="inline-flex items-center gap-1.5 text-white hover:text-primaryyellow">
								<ArrowDownToLine size={14} /> Download
							</button>
						</div>
					</div>
				</section>
			</div>
		</main>
	);
};

export default MystoryPlayground;
