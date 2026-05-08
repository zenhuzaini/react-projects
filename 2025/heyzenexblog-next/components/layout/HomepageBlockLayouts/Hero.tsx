import EnterAnimation from "@/animation/EnterAnimation";
import { ImageWithSkeleton } from "../../molecule/ImageWithSkeleton";

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
				<ImageWithSkeleton
					src={
						"https://d2exd72xrrp1s7.cloudfront.net/www/bl/bl7nf04qu2jc1kjnqblizutxk50b7tgrf-p466137801-full/18ff9557e5a?width=3360&crop=false&q=70"
					}
				></ImageWithSkeleton>
			</div>
			<div className="col-span-10 sm:col-span-20 row-span-4 relative rounded-2xl overflow-hidden">
				<ImageWithSkeleton
					src={
						"https://res.cloudinary.com/djufavji1/image/upload/v1762553897/IMG_5881_Original_jloeub.jpg"
					}
				></ImageWithSkeleton>
			</div>
		</div>
	);
};

export default Hero;
