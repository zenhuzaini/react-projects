"use client";

import { ArrowDownToLine, Code2, Eye } from "lucide-react";
import MainStoryBookPage from "@/components/layout/StoryBookBlockLayouts/MainStoryBookPage";
import type { PhotoCardDetailType, StoryContentType } from "@/types/components";
import { parseTags, toSlug } from "./draft";
import type { StoryDraft } from "./types";
import type { BuilderConfig } from "./config";

export type OutputTab = "mdx" | "preview";

type Props = {
	config: BuilderConfig;
	draft: StoryDraft;
	mdx: string;
	storyContent: StoryContentType[];
	storyPhotoUrls: PhotoCardDetailType[];
	storyCover: string;
	tab: OutputTab;
	onTabChange: (tab: OutputTab) => void;
	onDownload: () => void;
};

const OutputPanel = ({
	config,
	draft,
	mdx,
	storyContent,
	storyPhotoUrls,
	storyCover,
	tab,
	onTabChange,
	onDownload,
}: Props) => (
	<div
		className={`overflow-hidden rounded-lg border border-primarybrown/25 ${tab === "mdx" ? "bg-[#202522] text-[#e8eee8]" : "bg-primarywhite text-primaryText"}`}>
		<div className="flex items-center justify-between gap-3 border-b border-primarybrown/15 px-3 py-2">
			<div
				role="tablist"
				aria-label="Output view"
				className="flex items-center gap-1">
				<button
					type="button"
					role="tab"
					aria-selected={tab === "mdx"}
					onClick={() => onTabChange("mdx")}
					className={`inline-flex h-9 items-center gap-2 rounded-md px-3 text-sm font-semibold ${tab === "mdx" ? "bg-primarywhite/10 text-inherit" : "text-primarygrey hover:bg-primarybrown/10"}`}>
					<Code2 size={15} /> MDX
				</button>
				<button
					type="button"
					role="tab"
					aria-selected={tab === "preview"}
					onClick={() => onTabChange("preview")}
					className={`inline-flex h-9 items-center gap-2 rounded-md px-3 text-sm font-semibold ${tab === "preview" ? "bg-secondaryforestgreen text-white" : "text-primarygrey hover:bg-primarybrown/10"}`}>
					<Eye size={15} /> Preview
				</button>
			</div>
			<span className="text-xs text-white/50">
				{draft.slug || config.noun}.mdx
			</span>
		</div>
		{tab === "mdx" ? (
			<pre
				role="tabpanel"
				className="max-h-[70vh] min-h-[340px] overflow-y-auto overflow-x-hidden whitespace-pre-wrap wrap-break-word p-4 text-xs leading-5 sm:text-[13px]">
				<code>{mdx}</code>
			</pre>
		) : (
			<div
				role="tabpanel"
				className="max-h-[70vh] min-h-[340px] overflow-auto bg-mybackground p-4 text-primaryText">
				<MainStoryBookPage
					createdAt={
						draft.datePublished
							? new Date(draft.datePublished).toLocaleDateString("en-GB")
							: ""
					}
					storyCover={storyCover}
					storySlug={draft.slug || toSlug(draft.title)}
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
				{tab === "mdx" ? "Generated MDX source" : `Live ${config.noun} preview`}
			</span>
			<button
				type="button"
				onClick={onDownload}
				className={`inline-flex items-center gap-1.5 ${tab === "mdx" ? "text-white hover:text-primaryyellow" : "text-primaryText hover:text-secondaryforestgreen"}`}>
				<ArrowDownToLine size={14} /> Download
			</button>
		</div>
	</div>
);

export default OutputPanel;
