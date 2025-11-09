import { ImageWithSkeleton } from "@/components/molecule/ImageWithSkeleton";
import { EMPTY_STRING } from "@/const/vars";
import { photoMockStatic } from "@/mock/photo";
import { PhotoCardDetailType } from "@/types/components";

const PhotoPharagraph = ({
	photo = photoMockStatic[0],
	text = EMPTY_STRING,
}: {
	text: string;
	photo: PhotoCardDetailType;
}) => {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-7 h-full lg:gap-4 w-full md:items-center">
			{/* Left image */}
			<div className="rounded-2xl w-full h-[40vh]">
				<ImageWithSkeleton
					alt={photo?.description || photo?.title}
					src={photo.photoUrl}
				/>
			</div>

			{/* Right text */}

			<div className="text-primaryText font-light leading-normal text-sm md:text-lg text-justify justify-center">
				<p>{text}</p>
			</div>
		</div>
	);
};

export default PhotoPharagraph;
