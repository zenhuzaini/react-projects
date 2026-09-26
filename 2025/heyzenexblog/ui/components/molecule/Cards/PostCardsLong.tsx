import ArrowRight from "@/icons/ArrowRight";
import { ImageWithSkeleton } from "../ImageWithSkeleton";
import { PhotoCardDetailType } from "@/types/components";
import { animationForArrow } from "@/animation/animation";
import ActivityAvatar from "../User/Avatar/ActivityAvatar";
import { EMPTY_STRING } from "@/const/vars";

const PostCardsLong = ({
	photoDetail,
}: {
	photoDetail: PhotoCardDetailType;
}) => {
	return (
		<div className="grid grid-cols-6 h-[30vh] sm:h-[40vh] rounded-2xl overflow-hidden  bg-primarycardbg">
			{/* I want this to be full */}
			<div className="col-start-1 col-end-4 sm:col-end-5 w-full h-full">
				<ImageWithSkeleton
					rounded="rounded-tl-2xl rounded-bl-2xl"
					src={photoDetail.photoUrl}></ImageWithSkeleton>
			</div>
			{/* but when I hover, it will open this. so the image above will have only 80%. I want this only for dekstop */}
			<div className="px-3 md:px-6 col-start-4 col-end-7 sm:col-start-5 flex flex-col gap-5 justify-center">
				<h2 className="text-2xl md:text-3xl lg:text-4xl text-primarytextInvert font-bold tracking-tight sm:tracking-tighter leading-[1.1]">
					{photoDetail?.title}
					<span className="text-primaryaccent">.</span>
				</h2>

				<p className="hidden md:flex font-extralight text-primarytextInvert sm:text-[13px] md:text-[16px] tracking-tight leading-normal">
					{photoDetail?.description}
				</p>

				<div className="flex sm:justify-between gap-2 sm:gap-0">
					<ActivityAvatar
						shouldShowAvatar={false}
						variant="dark"
						activityType={photoDetail.activityType || "posted"}
						alt="User Avatar"
						avatarName="Zen"
						publishedDate={
							photoDetail?.activityDate || EMPTY_STRING
						}></ActivityAvatar>
				</div>

				<div className="hidden text-xs font-extralight self-end">
					<ArrowRight />
				</div>
			</div>
		</div>
	);
};

export default PostCardsLong;
