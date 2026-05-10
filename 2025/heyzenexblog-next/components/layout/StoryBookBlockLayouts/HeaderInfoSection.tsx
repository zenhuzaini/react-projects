"use client";

const HeaderInfoSection = ({
	date = "2023-10-15",
	id = 24,
	text = "StoryBook",
}: {
	text?: string;
	date: string;
	id: number;
}) => {
	return (
		<section>
			<div className="flex justify-between items-center">
				<div className="flex flex-col text-xs md:text-lg">
					<p className="text-primarytextInvert font-extralight">{text}</p>
					<p className="text-[10px] text-primarytextInvert md:text-sm tracking-tight">
						<span className="font-extralight">Published on</span> {date}
					</p>
				</div>
				<div className="bg-primaryaccent w-fit sm:text-base text-[10px] p-2 flex justify-center items-center rounded">
					<h3 className="text-primarycream font-extrabold">
						<span className="text-dot">#</span>
						{id}
					</h3>
				</div>
			</div>
		</section>
	);
};

export default HeaderInfoSection;
