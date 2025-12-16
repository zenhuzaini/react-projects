import { faker } from "@faker-js/faker";

import { ImageWithSkeleton } from "../ImageWithSkeleton";
import Map from "@/icons/Map";
import Calendar from "@/icons/Calendar";
import ArrowRight from "@/icons/ArrowRight";
import { PhotoCardDetailType } from "@/types/components";

const PostCard = ({ photoDetail }: { photoDetail: PhotoCardDetailType }) => {
	return (
		<div className="bg-primarycardbg flex flex-col h-[30vh] sm:h-[50vh]  w-full rounded-2xl overflow-hidden">
			{/* photo section */}
			<div className="h-full w-full">
				<ImageWithSkeleton
					rounded="rounded-tl-2xl rounded-tr-2xl"
					src={photoDetail.photoUrl}></ImageWithSkeleton>
			</div>
			{/* title / detail section */}
			<div className="bg-primarycardbg">
				<div className="items-center p-4 sm:p-4">
					<div className="flex flex-col gap-2">
						<h2 className="text-primarytextInvert text-lg sm:text-1xl md:text-2xl tracking-tight font-semibold leading-[1.1]">
							{photoDetail.title}
							<span className="text-primaryaccent">.</span>
						</h2>

						<div className="text-primarytextInvert text-xs sm:text-sm  font-extralight tracking-tight flex justify-between">
							<p className="flex gap-3">
								<span className="flex gap-1 items-center">
									<span className="hidden lg:flex">
										<Map size={4} />
									</span>
									<span>{photoDetail.country}</span>
								</span>

								<span className="flex gap-1 items-center">
									<span className="hidden lg:flex">
										<Calendar size={4}></Calendar>
									</span>

									<span>
										{photoDetail.month} {photoDetail.year}
									</span>
								</span>
							</p>

							<div className=" text-xs font-extralight text-right">
								<ArrowRight />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PostCard;
