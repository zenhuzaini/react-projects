import { ImageWithSkeleton } from "@/components/molecule/ImageWithSkeleton";
import { faker } from "@faker-js/faker";
import { Link, ArrowRight } from "lucide-react";
import React from "react";

const PhotoPharagraph = () => {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-7 lg:gap-4 w-full  h-72 md:items-center">
			{/* Left image */}
			<div className="rounded-2xl w-full h-[40vh] sm:h-[50vh] md:h-[60vh]">
				<ImageWithSkeleton src={faker.image.url()} />
			</div>

			{/* Right text */}
			<div className="rounded-2xl flex flex-col justify-center">
				<div className="text-primaryText font-bold tracking-tighter leading-[0.8] flex flex-col gap-6 lg:gap-1">
					<h2 className="text-primaryaccent font-extrabold text-5xl lg:text-9xl">
						Oopssie..
					</h2>
					<h2 className="text-3xl lg:text-4xl font-light">
						This page is still under{" "}
						<span className="line-through">
							<span className="text-primaryaccent">construction</span>
						</span>{" "}
						<span className="text-primaryaccent">development</span>
						<span className="text-dot">.</span>
					</h2>
					<Link href="/" className="flex gap-2 items-center">
						<h2 className="text-2xl font-extralight lg:text-4xl">
							lesshhgo<span className="text-primaryaccent">home</span>
						</h2>
						<ArrowRight />
					</Link>
				</div>
			</div>
		</div>
	);
};

export default PhotoPharagraph;
