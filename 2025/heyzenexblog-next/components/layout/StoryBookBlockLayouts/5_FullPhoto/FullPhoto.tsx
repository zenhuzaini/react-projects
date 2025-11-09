import { ImageWithSkeleton } from "@/components/molecule/ImageWithSkeleton";
import { photoMock } from "@/mock/photo";
import { PhotoCardDetailType } from "@/types/components";
import { faker } from "@faker-js/faker";
import React from "react";

const FullPhoto = ({
	photoUrl = photoMock({ length: 1 })[0],
}: {
	photoUrl: PhotoCardDetailType;
}) => {
	return (
		<div className="grid grid-cols-1  h-full w-full ">
			{/* Right text */}
			<div className="rounded-2xl w-full h-[40vh]">
				<ImageWithSkeleton
					alt={photoUrl?.description || photoUrl?.title}
					src={photoUrl.photoUrl}
				/>
			</div>
		</div>
	);
};

export default FullPhoto;
