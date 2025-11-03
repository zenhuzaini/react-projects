import ArrowRight from "@/icons/ArrowRight";
import { ImageWithSkeleton } from "../ImageWithSkeleton";
import { PhotoCardDetailType } from "@/types/components";
import { animationForArrow } from "@/animation/animation";

const PostCardsLong = ({
	photoDetail,
}: {
	photoDetail: PhotoCardDetailType;
}) => {
	return (
		<div className="grid grid-cols-6 h-[30vh] rounded-2xl overflow-hidden  bg-primarycardbg">
			{/* I want this to be full */}
			<div className="col-start-1 col-end-4 sm:col-end-5 w-full h-full">
				<ImageWithSkeleton src={photoDetail.photoUrl}></ImageWithSkeleton>
			</div>
			{/* but when I hover, it will open this. so the image above will have only 80%. I want this only for dekstop */}
			<div className="p-3 col-start-4 col-end-7 sm:col-start-5  m:pl-5 flex flex-col gap-5 justify-center">
				<h2 className="text-2xl sm:text-4xl text-primarytextInvert font-bold tracking-tight sm:tracking-tighter leading-[1.1]">
					{photoDetail?.title}
					<span className="text-primaryaccent">.</span>
				</h2>

				<p className="hidden font-extralight text-primarytextInvert text-[16px] tracking-tight leading-normal">
					{photoDetail?.description}
				</p>

				<div className="flex sm:justify-between gap-2 sm:gap-0">
					<div className="sm:flex-col sm:flex gap-0.5 sm:gap-0 text-xs sm:text-sm text-primarytextInvert font-extralight tracking-tight text-left">
						<h2 className="sm:leading-[0.8]">
							{photoDetail.city}, {photoDetail.country}
						</h2>
						<p className="">
							{photoDetail.month} {photoDetail.year}
						</p>
					</div>

					<div className="hidden sm:flex flex-row text-xs font-extralight text-right">
						<ArrowRight />
					</div>
				</div>

				<div className="sm:hidden flex text-xs font-extralight self-end">
					<ArrowRight />
				</div>
			</div>
		</div>
	);
};

export default PostCardsLong;
