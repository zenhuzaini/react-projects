import React from "react";

const HeaderInfoSection = ({
	date = "2023-10-15",
	id = 24,
}: {
	date: string;
	id: number;
}) => {
	return (
		<section>
			<div className="flex justify-between items-center">
				<div className="flex flex-col text-xs md:text-lg">
					<p className="text-primarytextInvert font-extralight">StoryBook</p>
					<p className="text-[10px] text-primarytextInvert md:text-sm tracking-tight">
						<span className="font-extralight">Published on</span> {date}
					</p>
				</div>
				<div className="flex gap-1">
					<div className="flex">
						<h3 className="text-primaryText font-semibold">
							<span className="text-dot">#</span>
							Basic view
						</h3>
						<h3 className="text-primary font-semibold">
							<span className="text-dot">#</span>
							Adventure
						</h3>
					</div>
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
