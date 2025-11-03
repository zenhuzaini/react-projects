import { faker } from "@faker-js/faker";

import { ImageWithSkeleton } from "../ImageWithSkeleton";
import Map from "@/icons/Map";
import Calendar from "@/icons/Calendar";
import ArrowRight from "@/icons/ArrowRight";
import { PhotoCardDetailType } from "@/types/components";

const PostCard = ({ photoDetail }: { photoDetail: PhotoCardDetailType }) => {
	return (
		<div className="bg-primarycardbg  h-[30vh] sm:h-[20vw] w-full rounded-2xl overflow-hidden">
			<div className="h-[70%] sm:h-[14vw] w-full">
				<ImageWithSkeleton src={faker.image.url()}></ImageWithSkeleton>
			</div>
			<div className="bg-primarycardbg h-[30%] sm:h-[6vw]">
				<div className="flex justify-between items-center p-4 sm:p-6">
					<div className="flex flex-col gap-2">
						<h2 className="text-primarytextInvert text-2xl sm:text-3xl md:text-3xl font-semibold tracking-tighter leading-[0.8]">
							{photoDetail.title}
							<span className="text-primaryaccent">.</span>
						</h2>

						<p className="text-primarytextInvert text-[9px] sm:text-xs font-normal tracking-tight flex gap-4">
							<span className="tracking-tight text-xs sm:text-sm font-light flex gap-1 items-center">
								<Map size={4} />
								<span>{photoDetail.country}</span>
							</span>

							<span className="tracking-tight text-xs sm:text-sm font-light flex gap-1 items-center">
								<Calendar size={4}></Calendar>
								<span>
									{photoDetail.month} {photoDetail.year}
								</span>
							</span>
						</p>
					</div>

					<div className="flex-row text-xs font-extralight text-right">
						<ArrowRight />
					</div>
				</div>
			</div>
		</div>
	);
};

export default PostCard;
