"use client";

import PhotoDialog from "@/components/molecule/Dialog/PhotoDialog";
import { ImageWithSkeleton } from "@/components/molecule/ImageWithSkeleton";
import { PhotoCardDetailType } from "@/types/components";
import { faker, ur } from "@faker-js/faker";
import React, { useState } from "react";

// Each pattern returns a "grid-template" and an array of item configs (spans, row starts, etc)
const getLayout = (n: number) => {
	switch (n) {
		case 1:
			return { grid: "grid-cols-1", items: [{ colSpan: 2 }] };
		case 2:
			return { grid: "grid-cols-2", items: [{ colSpan: 1 }, { colSpan: 1 }] };
		case 3:
			return {
				grid: "grid-cols-2 grid-rows-2",
				items: [
					{ colSpan: 2 }, // item 0
					{ colSpan: 1 }, // item 1
					{ colSpan: 1 }, // item 2
				],
			};
		case 4:
			return { grid: "grid-cols-2", items: Array(4).fill({ colSpan: 1 }) };
		case 5:
			return {
				grid: "grid-cols-3 grid-rows-2",
				items: [
					{ colSpan: 2 }, // item 0
					{ colSpan: 1 }, // item 1
					{ colSpan: 1 }, // item 2
					{ colSpan: 1 }, // item 3
					{ colSpan: 1 }, // item 4
				],
			};
		case 6:
			return { grid: "grid-cols-3", items: Array(6).fill({ colSpan: 1 }) };
		case 7:
			return {
				grid: "grid-cols-3 grid-rows-3",
				items: [
					{ colSpan: 2 }, // item 0,
					{ colSpan: 1 },
					{ colSpan: 1 },
					{ colSpan: 2 }, // item 3
					{ colSpan: 1 },
					{ colSpan: 1 },
					{ colSpan: 1 }, // item 6, mobile: col-span-2, md+: col-span-1
				],
			};
		case 8:
			return {
				grid: "grid-cols-3 grid-rows-3",
				items: [
					{ colSpan: 2 },
					{ colSpan: 1 },
					{ colSpan: 1 },
					{ colSpan: 2 },
					{ colSpan: 1 },
					{ colSpan: 1 },
					{ colSpan: 1 },
					{ colSpan: 3 },
				],
			};
		case 9:
		default: {
			// For n > 9, use grid-cols-3 by default, last item spans remaining cols if last row is partial
			const gridCols = 3;
			const items = Array(n).fill({ colSpan: 1 });
			const remainder = n % gridCols;
			if (remainder !== 0) {
				items[n - 1] = { colSpan: gridCols - remainder + 1 };
			}
			return { grid: "grid-cols-3", items };
		}
	}
};

const PhotoCollectionGrid = ({
	photoUrls,
}: {
	photoUrls: PhotoCardDetailType[];
}) => {
	const { grid, items } = getLayout(photoUrls.length);
	// State to track modal open and src of clicked image
	const [selectedImage, setSelectedImage] = useState<string>();
	const [isDialogPhotoOpen, setIsDialogPhotoOpen] = useState<boolean>(false);
	const clickImage = (imageUrl: string) => {
		setIsDialogPhotoOpen((prev) => !prev);
		setSelectedImage(imageUrl);
	};

	return (
		<>
			<div className={`grid grid-cols-2 sm:${grid} gap-2 sm:gap-4`}>
				{photoUrls.map((image, idx) => {
					const colSpan = items[idx]?.colSpan || 1;
					let spanClass = "";
					if (colSpan === 2) spanClass = "col-span-2";
					if (colSpan === 3) spanClass = "lg:col-span-3";
					return (
						<div
							onClick={() => clickImage(image?.photoUrl)}
							key={idx}
							className={`rounded-2xl w-full overflow-hidden h-[30vh] sm:h-[40vh] ${
								colSpan > 1 ? `${spanClass}` : ""
							}`}>
							<ImageWithSkeleton
								src={image?.photoUrl}
								alt={image?.description}
							/>
						</div>
					);
				})}
			</div>

			{isDialogPhotoOpen && (
				<PhotoDialog
					fadeSpeed="fast"
					open={isDialogPhotoOpen}
					onOpenChange={setIsDialogPhotoOpen}
					src={selectedImage as string}
					// Close action
				/>
			)}
		</>
	);
};

export default PhotoCollectionGrid;
