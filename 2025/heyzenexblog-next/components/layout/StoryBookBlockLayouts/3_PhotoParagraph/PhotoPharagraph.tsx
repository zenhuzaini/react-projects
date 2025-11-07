import { ImageWithSkeleton } from "@/components/molecule/ImageWithSkeleton";
import { faker } from "@faker-js/faker";

const PhotoPharagraph = () => {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-7 h-full lg:gap-4 w-full md:items-center">
			{/* Left image */}
			<div className="rounded-2xl w-full h-[40vh]">
				<ImageWithSkeleton src={faker.image.url()} />
			</div>

			{/* Right text */}

			<div className="text-primaryText font-light leading-normal text-sm md:text-lg text-justify justify-center">
				<p>{faker.lorem.sentences(6)}</p>
			</div>
		</div>
	);
};

export default PhotoPharagraph;
