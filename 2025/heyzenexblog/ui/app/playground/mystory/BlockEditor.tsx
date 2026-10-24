"use client";

import { useState } from "react";
import type { DragEvent } from "react";
import { ArrowDown, ArrowUp, GripVertical, Plus, X } from "lucide-react";
import BlockFields from "./BlockFields";
import { blockOptions } from "./constants";
import type {
	BlockType,
	ExistingStorySummary,
	ImageUploadTarget,
	StoryBlock,
	StoryListItem,
} from "./types";

type Props = {
	blocks: StoryBlock[];
	addBlock: (type: BlockType, index?: number) => void;
	moveBlock: (from: number, to: number) => void;
	removeBlock: (id: string) => void;
	updateBlock: (id: string, updates: Partial<StoryBlock>) => void;
	updateListItem: (
		block: StoryBlock,
		index: number,
		updates: Partial<StoryListItem>,
	) => void;
	importGpxRoute: (blockId: string, file: File) => void;
	onUploadImage: (file: File | undefined, target: ImageUploadTarget) => void;
	relatedStoryOptions: ExistingStorySummary[];
	isLoadingRelatedStories: boolean;
};

const BlockEditor = ({
	blocks,
	addBlock,
	moveBlock,
	removeBlock,
	updateBlock,
	updateListItem,
	importGpxRoute,
	onUploadImage,
	relatedStoryOptions,
	isLoadingRelatedStories,
}: Props) => {
	const [draggedBlockId, setDraggedBlockId] = useState<string | null>(null);
	const [dropIndex, setDropIndex] = useState<number | null>(null);

	const handleAdd = (type: BlockType, index?: number) => {
		addBlock(type, index);
		setDropIndex(null);
	};

	const handleDrop = (event: DragEvent<HTMLElement>, index: number) => {
		event.preventDefault();
		const paletteType = event.dataTransfer.getData("application/story-block");
		if (paletteType) {
			handleAdd(paletteType as BlockType, index);
		} else if (draggedBlockId) {
			const sourceIndex = blocks.findIndex(
				(block) => block.id === draggedBlockId,
			);
			moveBlock(sourceIndex, index);
		}
		setDraggedBlockId(null);
		setDropIndex(null);
	};

	const endDropActive = dropIndex === blocks.length;
	const endDropHandlers = {
		onDragOver: (event: DragEvent<HTMLElement>) => {
			event.preventDefault();
			setDropIndex(blocks.length);
		},
		onDrop: (event: DragEvent<HTMLElement>) => handleDrop(event, blocks.length),
	};

	return (
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
						{blocks.length} BLOCKS
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
						onClick={() => handleAdd(type)}
						className="inline-flex h-9 items-center gap-2 rounded-md border border-primarybrown/25 px-2.5 text-xs font-semibold hover:border-secondaryforestgreen hover:bg-secondaryforestgreen/5"
						title={`Drag or click to add ${label}`}>
						<Icon size={15} /> {label}
					</button>
				))}
			</div>
			<div
				{...endDropHandlers}
				className={`space-y-3 rounded-md border border-dashed p-3 transition-colors ${endDropActive ? "border-secondaryforestgreen bg-secondaryforestgreen/5" : "border-primarybrown/25"}`}>
				{blocks.length === 0 && (
					<p className="py-8 text-center text-sm text-primarygrey">
						Drop a block here to start writing.
					</p>
				)}
				{blocks.map((block, index) => {
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
										disabled={index === blocks.length - 1}
										aria-label="Move block down"
										className="rounded p-1.5 hover:bg-primarybrown/10 disabled:opacity-30">
										<ArrowDown size={15} />
									</button>
									<button
										type="button"
										onClick={() => removeBlock(block.id)}
										aria-label={`Remove ${blockOption.label}`}
										className="rounded p-1.5 text-primaryred hover:bg-primaryred/10">
										<X size={15} />
									</button>
								</div>
							</div>
							<BlockFields
								block={block}
								updateBlock={updateBlock}
								updateListItem={updateListItem}
								importGpxRoute={importGpxRoute}
								onUploadImage={onUploadImage}
								relatedStoryOptions={relatedStoryOptions}
								isLoadingRelatedStories={isLoadingRelatedStories}
							/>
						</div>
					);
				})}
				<div
					{...endDropHandlers}
					className={`flex min-h-12 items-center justify-center gap-2 rounded border border-dashed text-xs text-primarygrey ${endDropActive ? "border-secondaryforestgreen bg-secondaryforestgreen/5" : "border-transparent"}`}>
					<Plus size={14} /> Drop next block here
				</div>
			</div>
		</div>
	);
};

export default BlockEditor;
