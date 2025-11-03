import { faker } from "@faker-js/faker";

import { ImageWithSkeleton } from "../ImageWithSkeleton";
import Map from "@/icons/Map";
import Calendar from "@/icons/Calendar";
import ArrowRight from "@/icons/ArrowRight";
import { PhotoCardDetailType } from "@/types/components";
import { Separator } from "@/components/ui/separator";

const PostCard = ({ photoDetail }: { photoDetail: PhotoCardDetailType }) => {
	return (
		<div className="bg-primarycardbg  h-[30vh] sm:h-[20vw] w-full rounded-2xl overflow-hidden">
			<div className="h-[70%] sm:h-[14vw] w-full">
				<ImageWithSkeleton src={faker.image.url()}></ImageWithSkeleton>
			</div>
			<div className="bg-primarycardbg h-[30%] sm:h-[6vw]">
				<div className="items-center p-4 sm:p-6">
					<div className="flex flex-col gap-2">
						<h2 className="text-primarytextInvert text-lg sm:text-3xl md:text-3xl tracking-tight font-semibold leading-[0.8]">
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
