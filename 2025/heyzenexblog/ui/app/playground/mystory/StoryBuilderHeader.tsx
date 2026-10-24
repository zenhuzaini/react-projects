"use client";

import {
	ArrowDownToLine,
	Check,
	CloudUpload,
	FolderOpen,
	LoaderCircle,
	Plus,
} from "lucide-react";
import Heading from "@/components/molecule/Headings/Heading";
import { outlineButtonClass } from "./styles";

type Props = {
	notice: string;
	showSaveStatus: boolean;
	isDraftSaved: boolean;
	onOpenLibrary: () => void;
	onNewDraft: () => void;
	onExport: () => void;
	onPublish: () => void;
};

const StoryBuilderHeader = ({
	notice,
	showSaveStatus,
	isDraftSaved,
	onOpenLibrary,
	onNewDraft,
	onExport,
	onPublish,
}: Props) => (
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
				onClick={onOpenLibrary}
				className={outlineButtonClass}>
				<FolderOpen size={16} /> Open MDX
			</button>
			<button type="button" onClick={onNewDraft} className={outlineButtonClass}>
				<Plus size={16} /> New
			</button>
			{showSaveStatus && (
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
				onClick={onExport}
				className="inline-flex h-10 items-center gap-2 rounded-md bg-fierceorange px-4 text-sm font-semibold text-white hover:brightness-95">
				<ArrowDownToLine size={16} /> Export MDX
			</button>
			<button
				type="button"
				onClick={onPublish}
				className="inline-flex h-10 items-center gap-2 rounded-md bg-primaryaccent px-4 text-sm font-semibold text-white hover:brightness-95">
				<CloudUpload size={16} /> Publish
			</button>
		</div>
	</header>
);

export default StoryBuilderHeader;
