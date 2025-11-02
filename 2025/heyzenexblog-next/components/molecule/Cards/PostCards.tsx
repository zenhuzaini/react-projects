import { ArrowRight } from "lucide-react";
import { ImageWithSkeleton } from "../ImageWithSkeleton";
import { PhotoCardDetailType } from "@/types/components";

const PostCards = ({ photoDetail }: { photoDetail: PhotoCardDetailType }) => {
	return (
		<div className="grid grid-cols-5 h-[30vh] rounded-2xl overflow-hidden  bg-primarycardbg">
			<div className="col-start-1 col-end-4 sm:col-end-5 w-full h-full">
				<ImageWithSkeleton src={photoDetail.photoUrl}></ImageWithSkeleton>
			</div>
			<div className="pl-3 col-start-4 col-end-6 sm:col-start-5 pr-3 sm:pl-5 flex flex-col gap-5 justify-center">
				<h2 className="text-base text-primarytextInvert sm:text-3xl md:text-3xl font-bold tracking-tighter leading-[0.8]">
					{photoDetail?.title}
					<span className="text-primaryaccent">.</span>
				</h2>

				<p className="hidden font-extralight text-primarytextInvert text-[16px] tracking-tight leading-normal">
					{photoDetail?.description}
				</p>

				<div className="flex justify-between">
					<div className="flex-row text-xs text-primarytextInvert font-extralight text-left">
						<h2 className="font-semibold tracking-tight leading-[0.8]">
							{photoDetail.city}, {photoDetail.country}
						</h2>
						<p className="text-[9px] sm:text-xs font-normal tracking-tight">
							{photoDetail.month} {photoDetail.year}
						</p>
					</div>

					<div className="hidden sm:flex flex-row text-xs font-extralight text-right">
						<ArrowRight />
					</div>
				</div>
			</div>
		</div>
	);
};

export default PostCards;
