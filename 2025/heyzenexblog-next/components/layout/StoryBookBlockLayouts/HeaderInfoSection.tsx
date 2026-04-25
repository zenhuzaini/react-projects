"use client";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import MountainTrail from "@/icons/MountainTrail";

import React from "react";

const HeaderInfoSection = ({
	date = "2023-10-15",
	id = 24,
}: {
	date: string;
	id: number;
}) => {
	const [isAdventureMode, setIsAdventureMode] = React.useState(false);

	const toggleAdventureMode = () => {
		setIsAdventureMode((prev) => !prev);
	};
	return (
		<section>
			<div className="flex justify-between items-center">
				<div className="flex flex-col text-xs md:text-lg">
					<p className="text-primarytextInvert font-extralight">StoryBook</p>
					<p className="text-[10px] text-primarytextInvert md:text-sm tracking-tight">
						<span className="font-extralight">Published on</span> {date}
					</p>
				</div>
				<div className="flex gap-0.5 md:gap-2 items-center">
					<div className="flex gap-1 items-center border-primaryaccent ">
						<div className="flex flex-col gap-1 items-start">
							<div className="flex gap-1">
								<span className="font-medium leading-tight">Adventure</span>
								<Switch
									checked={isAdventureMode}
									onCheckedChange={toggleAdventureMode}
									className="data-[state=checked]:bg-primaryaccent data-[state=unchecked]:bg-primaryaccent/30"
								/>
							</div>

							<span className="text-xs text-muted-foreground leading-tight">
								if on, will show more adventure vibes
							</span>
						</div>
					</div>

					<Separator
						orientation="vertical"
						className="h-4 w-2 bg-primarytextInvert"
					/>

					<div className="bg-primaryaccent w-fit sm:text-base text-[10px] p-2 flex justify-center items-center rounded">
						<h3 className="text-primarycream font-extrabold">
							<span className="text-dot">#</span>
							{id}
						</h3>
					</div>
				</div>
			</div>
		</section>
	);
};

export default HeaderInfoSection;
