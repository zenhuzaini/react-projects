import { ImageWithSkeleton } from "@/components/molecule/ImageWithSkeleton";
import { photoMock } from "@/mock/photo";
import { PhotoCardDetailType } from "@/types/components";
import { faker } from "@faker-js/faker";

const PharagraphPhoto = ({
	photoUrl = photoMock({ length: 1 })[0],
	text = "test test test",
}: {
	text: string;
	photoUrl: PhotoCardDetailType;
}) => {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-7 h-full lg:gap-4 w-full md:items-center">
			{/* Left image */}

			<div className="text-primaryText font-light leading-normal text-sm md:text-lg text-justify justify-center">
				<p>{text}</p>
			</div>

			{/* Right text */}
			<div className="rounded-2xl w-full h-[40vh]">
				<ImageWithSkeleton
					alt={photoUrl?.description || photoUrl?.title}
					src={photoUrl?.photoUrl}
				/>
			</div>
		</div>
	);
};

export default PharagraphPhoto;
