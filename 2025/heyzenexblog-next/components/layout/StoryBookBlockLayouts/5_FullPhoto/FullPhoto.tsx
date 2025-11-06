import { ImageWithSkeleton } from "@/components/molecule/ImageWithSkeleton";
import { faker } from "@faker-js/faker";
import React from "react";

const FullPhoto = () => {
	return (
		<div className="grid grid-cols-1  h-full w-full ">
			{/* Right text */}
			<div className="rounded-2xl w-full h-[40vh]">
				<ImageWithSkeleton src={faker.image.url()} />
			</div>
		</div>
	);
};

export default FullPhoto;
