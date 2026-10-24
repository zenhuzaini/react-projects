import { ImageWithSkeleton } from "@/components/molecule/ImageWithSkeleton";
import { PhotoCardDetailType } from "@/types/components";
import React from "react";

const FullPhoto = ({ photo }: { photo: PhotoCardDetailType }) => {
	return (
		<div className="grid grid-cols-1  h-full w-full ">
			{/* Right text */}
			<div className="rounded-2xl w-full h-[40vh]">
				<ImageWithSkeleton
					alt={photo?.description || photo?.title}
					src={photo.photoUrl}
				/>
			</div>
		</div>
	);
};

export default FullPhoto;
