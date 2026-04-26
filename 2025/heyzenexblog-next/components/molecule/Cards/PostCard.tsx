import { faker } from "@faker-js/faker";

import { ImageWithSkeleton } from "../ImageWithSkeleton";
import Map from "@/icons/Map";
import Calendar from "@/icons/Calendar";
import ArrowRight from "@/icons/ArrowRight";
import { PhotoCardDetailType } from "@/types/components";
import ActivityAvatar from "../User/Avatar/ActivityAvatar";

const PostCard = ({ photoDetail }: { photoDetail: PhotoCardDetailType }) => {
	return (
		<div className="relative h-[30vh] sm:h-[50vh] w-full rounded-2xl overflow-hidden group cursor-pointer">
			{/* Background Image */}
			<ImageWithSkeleton src={photoDetail.photoUrl} rounded="rounded-2xl" />

			{/* Gradient overlay */}
			<div className="absolute inset-0 bg-linear-0  from-black/40 via-black/20 to-transparent" />

			{/* Content */}
			<div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 flex flex-col gap-3">
				<h2 className="text-white text-lg sm:text-xl md:text-2xl font-semibold leading-tight">
					{photoDetail.title}
				</h2>

				<div className="flex justify-between items-end text-xs sm:text-sm">
					<ActivityAvatar
						variant="light"
						smallAvatar={true}
						activityType={photoDetail.activityType || "posted"}
						alt="User Avatar"
						avatarName="Zen"
						publishedDate="2023-10-15"></ActivityAvatar>

					{/* <div className="flex gap-1">
						<span className="flex items-center gap-2 ">
							{photoDetail.country}
						</span>

						<span className="flex items-center gap-2">
							<Calendar size={4} />
							{photoDetail.month} {photoDetail.year}
						</span>
					</div> */}

					{/* Arrow */}
					<div className="  p-2 rounded-full group-hover:translate-x-1 transition">
						<ArrowRight className="text-accenttext" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default PostCard;
