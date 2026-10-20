import React from "react";
import { ImageWithSkeleton } from "../ImageWithSkeleton";
import { PhotoCardDetailType } from "@/types/components";
import ArrowRight from "@/icons/ArrowRight";
import { animationForArrow } from "@/animation/animation";

const PhotoCards = ({ photoDetail }: { photoDetail: PhotoCardDetailType }) => {
	const cityLength = photoDetail.city?.length ?? 0;
	const citySizeClass =
		cityLength > 15
			? "text-[10px] sm:text-xs md:text-base"
			: cityLength > 10
				? "text-xs sm:text-sm md:text-xl"
				: "text-sm sm:text-lg md:text-2xl";

	return (
		<div className="w-full h-full hover:pointer-none:">
			<ImageWithSkeleton
				src={photoDetail.photoUrl}
				customClassName="object-cover transition-transform duration-700 group-hover:scale-[1.1]"
			/>
			<div className="hidden absolute top-0 m-1 justify-end w-full  pt-3 pr-6">
				<div
					className={`bg-accenttext h-fit w-fit rounded-2xl p-1 ${animationForArrow}`}>
					<ArrowRight size={4} />
				</div>
			</div>
			<div className={`absolute bottom-0 left-0 w-full p-2 rounded-b-sm`}>
				{/* Black fade background */}
				<div className="absolute inset-0 bg-linear-to-t from-primarymidnight/50 to-transparent rounded-b-sm z-0"></div>

				<div className="relative flex min-w-0 items-center gap-2 lg:m-6">
					<div className="min-w-0 flex-1">
						<h2
							title={photoDetail.city}
							className={`truncate whitespace-nowrap font-semibold tracking-tighter leading-[0.8] text-accenttext ${citySizeClass}`}>
							{photoDetail.city}
							<span className="text-primaryaccent">.</span>
						</h2>
					</div>
					<div className="max-w-[38%] shrink-0 text-right text-xs font-extralight">
						<h2 className="truncate whitespace-nowrap text-accenttext font-semibold tracking-tight leading-[0.8]">
							{photoDetail.country}
						</h2>
						<p className="whitespace-nowrap text-accenttext text-[9px] sm:text-xs font-normal tracking-tight">
							{photoDetail.month} {photoDetail.year}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PhotoCards;
