import { Switch } from "@/components/ui/switch";
import Moon from "./icons/Moon";
import Sun from "./icons/Sun";
import Header from "@/components/layout/Header";
import Image from "next/image";
import { faker } from "@faker-js/faker";

export default function Home() {
	return (
		<div className="ml-2 mr-2 flex flex-col gap-2 sm:ml-20 sm:mr-20 sm:gap-10">
			<Header></Header>
			<div>
				<div className="grid grid-flow-col grid-rows-4 gap-4">
					<div className="col-span-1 row-span-2">
						<div className="text-primaryText text-5xl sm:text-9xl font-extrabold tracking-tighter leading-[0.8]">
							<h2>YOU FOUND</h2>
							<h2>ME HERE.</h2>
						</div>
					</div>
					<div className="col-span-1 row-span-2 bg-amber-200 relative rounded-2xl overflow-hidden">
						<Image
							src={faker.image.url()}
							alt="Description"
							fill
							className="object-cover"
							sizes="100vw"
							priority
						/>
					</div>
					<div className="col-span-10 sm:col-span-20 row-span-4 bg-amber-200 relative rounded-2xl overflow-hidden">
						<Image
							src={faker.image.url()}
							alt="Description"
							fill
							className="object-cover"
							sizes="100vw"
							priority
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
