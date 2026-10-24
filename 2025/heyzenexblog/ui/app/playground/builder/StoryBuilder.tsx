"use client";

import { useState } from "react";
import { PLACEHOLDER_COVER_URL } from "@/const/vars";
import BlockEditor from "./BlockEditor";
import DraftsSidebar from "./DraftsSidebar";
import OutputPanel from "./OutputPanel";
import type { OutputTab } from "./OutputPanel";
import PublishDialog from "./PublishDialog";
import StoryBuilderHeader from "./StoryBuilderHeader";
import StoryLibraryDialog from "./StoryLibraryDialog";
import StoryMetadataForm from "./StoryMetadataForm";
import type { BuilderConfig } from "./config";
import { MAX_GPX_FILE_SIZE } from "./constants";
import { toSlug } from "./draft";
import { parseGpxRoute } from "./geo";
import { toMdx, toStoryContent } from "./serialize";
import type { ExistingStoryResponse } from "./types";
import { useDraftManager } from "./useDraftManager";
import { usePublisher } from "./usePublisher";
import { useStoryLibrary } from "./useStoryLibrary";

// One builder for every MDX collection; a BuilderConfig decides what differs.
const StoryBuilder = ({ config }: { config: BuilderConfig }) => {
	const manager = useDraftManager(config);
	const { draft, updateBlock, setNotice } = manager;
	const publisher = usePublisher(manager, config);
	const [outputTab, setOutputTab] = useState<OutputTab>("mdx");
	const [isSavedExpanded, setIsSavedExpanded] = useState(true);
	const [isDetailsOpen, setIsDetailsOpen] = useState(true);

	const library = useStoryLibrary(
		config,
		(
			result: ExistingStoryResponse,
			fallbackSlug: string,
			fallbackTitle: string,
		) => {
			manager.applyImportedStory(result, fallbackSlug, fallbackTitle);
			setIsDetailsOpen(true);
			setOutputTab("mdx");
		},
	);

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

	const mdx = toMdx(draft);
	const storyContent = toStoryContent(draft.blocks, draft);
	const storyPhotoUrls = storyContent.flatMap((content) => content.photoUrls);
	const storyCover =
		draft.cover || storyPhotoUrls[0]?.photoUrl || PLACEHOLDER_COVER_URL;
	const relatedStoryOptions =
		config.collection === "story"
			? library.stories.filter(
					(story) => story.slug !== (draft.slug || toSlug(draft.title)),
				)
			: [];

	const downloadMdx = () => {
		const file = new Blob([mdx], { type: "text/markdown;charset=utf-8" });
		const url = URL.createObjectURL(file);
		const link = document.createElement("a");
		link.href = url;
		link.download = `${draft.slug || toSlug(draft.title) || config.noun}.mdx`;
		link.click();
		URL.revokeObjectURL(url);
		setNotice("MDX file downloaded");
	};

	return (
		<main className="playground-form mx-auto w-full max-w-[1600px] pb-12 text-primaryText">
			<StoryBuilderHeader
				title={config.heading}
				description={config.description}
				notice={manager.notice}
				showSaveStatus={manager.activeDraftId !== null}
				isDraftSaved={manager.isDraftSaved}
				onOpenLibrary={library.open}
				onNewDraft={manager.startNewDraft}
				onExport={downloadMdx}
				onPublish={publisher.openPublishDialog}
			/>

			<div
				className={`grid items-start gap-5 ${isSavedExpanded ? "xl:grid-cols-[230px_minmax(400px,1fr)_minmax(360px,0.9fr)]" : "xl:grid-cols-[56px_minmax(400px,1fr)_minmax(360px,0.9fr)]"}`}>
				<DraftsSidebar
					config={config}
					isExpanded={isSavedExpanded}
					onToggle={() => setIsSavedExpanded((expanded) => !expanded)}
					isHydrated={manager.isHydrated}
					drafts={manager.savedDrafts}
					activeDraftId={manager.activeDraftId}
					onLoad={manager.loadDraft}
					onDelete={manager.deleteDraft}
				/>

				<section className="min-w-0 space-y-5">
					<StoryMetadataForm
						draft={draft}
						updateDraft={manager.updateDraft}
						isOpen={isDetailsOpen}
						onToggle={() => setIsDetailsOpen((open) => !open)}
						onUploadImage={publisher.handleImageUpload}
					/>
					<BlockEditor
						config={config}
						blocks={draft.blocks}
						addBlock={manager.addBlock}
						moveBlock={manager.moveBlock}
						removeBlock={manager.removeBlock}
						updateBlock={updateBlock}
						updateListItem={manager.updateListItem}
						importGpxRoute={importGpxRoute}
						onUploadImage={publisher.handleImageUpload}
						relatedStoryOptions={relatedStoryOptions}
						isLoadingRelatedStories={library.isLoadingStoriesList}
					/>
				</section>

				<section className="min-w-0 xl:sticky xl:top-5">
					<OutputPanel
						config={config}
						draft={draft}
						mdx={mdx}
						storyContent={storyContent}
						storyPhotoUrls={storyPhotoUrls}
						storyCover={storyCover}
						tab={outputTab}
						onTabChange={setOutputTab}
						onDownload={downloadMdx}
					/>
				</section>
			</div>

			<StoryLibraryDialog library={library} config={config} />
			<PublishDialog publisher={publisher} draft={draft} config={config} />
		</main>
	);
};

export default StoryBuilder;
