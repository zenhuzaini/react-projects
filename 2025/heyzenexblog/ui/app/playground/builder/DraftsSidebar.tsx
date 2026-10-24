"use client";

import { PanelLeftClose, PanelLeftOpen, Trash2 } from "lucide-react";
import type { BuilderConfig } from "./config";
import type { StoryDraft } from "./types";

type Props = {
	config: BuilderConfig;
	isExpanded: boolean;
	onToggle: () => void;
	isHydrated: boolean;
	drafts: StoryDraft[];
	activeDraftId: string | null;
	onLoad: (draft: StoryDraft) => void;
	onDelete: (id: string) => void;
};

const DraftsSidebar = ({
	config,
	isExpanded,
	onToggle,
	isHydrated,
	drafts,
	activeDraftId,
	onLoad,
	onDelete,
}: Props) => (
	<aside
		id="saved-stories-panel"
		className={`rounded-lg border border-primarybrown/20 bg-primarywhite ${isExpanded ? "p-4" : "flex flex-row items-center gap-3 p-2 xl:flex-col"}`}>
		<div
			className={`flex items-center ${isExpanded ? "mb-4 justify-between" : "flex-col gap-3"}`}>
			<h2 className="w-full text-sm font-bold">
				<button
					type="button"
					aria-expanded={isExpanded}
					aria-controls="saved-stories-content"
					aria-label={`${isExpanded ? "Collapse" : "Expand"} saved ${config.nounPlural} panel`}
					title={`${isExpanded ? "Collapse" : "Expand"} saved ${config.nounPlural}`}
					onClick={onToggle}
					className="flex min-h-7 w-full items-center gap-2 text-left">
					<span className={isExpanded ? "first-letter:uppercase" : "sr-only"}>
						Saved {config.nounPlural}
					</span>
					<span className="rounded bg-secondarywhite px-2 py-1 text-xs font-normal text-primarygrey">
						{drafts.length}
					</span>
					{isExpanded ? (
						<PanelLeftClose size={16} className="ml-auto shrink-0" />
					) : (
						<PanelLeftOpen size={16} className="ml-auto shrink-0" />
					)}
				</button>
			</h2>
		</div>
		<div id="saved-stories-content" className={isExpanded ? "mt-4" : "hidden"}>
			{!isHydrated ? (
				<p className="text-sm text-primarygrey">Loading drafts...</p>
			) : drafts.length === 0 ? (
				<p className="border-t border-primarybrown/15 py-4 text-sm leading-5 text-primarygrey">
					Your saved drafts will appear here.
				</p>
			) : (
				<ul className="flex flex-col gap-1">
					{drafts.map((saved) => (
						<li
							key={saved.id}
							className={`group flex items-start gap-1 rounded-md border p-2 ${activeDraftId === saved.id ? "border-secondaryforestgreen/50 bg-secondaryforestgreen/5" : "border-transparent hover:bg-secondarywhite"}`}>
							<button
								type="button"
								onClick={() => onLoad(saved)}
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
								onClick={() => onDelete(saved.id)}
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
);

export default DraftsSidebar;
