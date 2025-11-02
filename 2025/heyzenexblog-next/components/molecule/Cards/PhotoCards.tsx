import React from "react";
import { ImageWithSkeleton } from "../ImageWithSkeleton";
import { PhotoCardDetailType } from "@/types/components";

const PhotoCards = ({ photoDetail }: { photoDetail: PhotoCardDetailType }) => {
	return (
		<div className="w-full h-full">
			<ImageWithSkeleton src={photoDetail.photoUrl}></ImageWithSkeleton>
			<div className={`absolute bottom-0 left-0 w-full p-2 rounded-b-sm`}>
				{/* Black fade background */}
				<div className="absolute inset-0 bg-linear-to-t from-primarymidnight/50 to-transparent rounded-b-sm z-0"></div>

				<div className="relative flex justify-between items-center lg:m-6">
					<div className="flex">
						<h2 className="text-accenttext text-base sm:text-3xl md:text-3xl font-semibold tracking-tighter leading-[0.8]">
							{photoDetail.city}
							<span className="text-primaryaccent">.</span>
						</h2>
					</div>
					<div className="flex-row text-xs font-extralight text-right">
						<h2 className="text-accenttext font-semibold tracking-tight leading-[0.8]">
							{photoDetail.country}
						</h2>
						<p className="text-accenttext text-[9px] sm:text-xs font-normal tracking-tight">
							{photoDetail.month} {photoDetail.year}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PhotoCards;
