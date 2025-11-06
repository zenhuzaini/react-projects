import { ImageWithSkeleton } from "../../molecule/ImageWithSkeleton";
import { faker } from "@faker-js/faker";

const Hero = () => {
	return (
		<div className="grid grid-flow-col grid-rows-4 gap-4">
			<div className="col-span-1 row-span-2">
				<div className="text-primaryText text-5xl lg:text-9xl font-extrabold tracking-tighter leading-[0.8]">
					<h2>YOU FOUND</h2>
					<h2>
						ME{" "}
						<span className="text-primaryaccent font-style-heading">
							HERE<span className="text-dot">.</span>
						</span>
					</h2>
				</div>
			</div>
			<div className="col-span-1 row-span-2 relative rounded-2xl overflow-hidden">
				<ImageWithSkeleton src={faker.image.url()}></ImageWithSkeleton>
			</div>
			<div className="col-span-10 sm:col-span-20 row-span-4 relative rounded-2xl overflow-hidden">
				<ImageWithSkeleton src={faker.image.url()}></ImageWithSkeleton>
			</div>
		</div>
	);
};

export default Hero;
