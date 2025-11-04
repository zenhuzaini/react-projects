import ArrowRight from "@/icons/ArrowRight";
import Link from "next/link";
import { ImageWithSkeleton } from "../molecule/ImageWithSkeleton";
import { faker } from "@faker-js/faker";

const UnderDevelopment = () => {
	return (
		<div className="w-full h-[80vh] flex">
			<div className="grid grid-cols-1 md:grid-cols-2 lg:gap-4 w-full">
				<div className="rounded-2xl w-full h-full">
					<ImageWithSkeleton src={faker.image.url()}></ImageWithSkeleton>
				</div>
				<div className="rounded-2xl content-center">
					<div className="text-primaryText font-bold tracking-tighter leading-[0.8] flex flex-col gap-6 lg:gap-1 ">
						<h2 className="text-primaryaccent font-extrabold text-5xl lg:text-9xl">
							Oopssy...
						</h2>
						<h2 className="text-3xl lg:text-4xl font-light  ">
							This page is still under{" "}
							<span className="line-through">
								<span className="text-primaryaccent">construction</span>
							</span>{" "}
							<span className="text-primaryaccent">development</span>
							<span className="text-dot">.</span>
						</h2>
						<Link href={"/"}>
							<h2 className="text-2xl font-extralight lg:text-4xl ">
								lesh go{" "}
								<span className="text-primaryaccent">
									home <ArrowRight></ArrowRight>
								</span>
							</h2>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UnderDevelopment;
