interface SectionTitleProps {
	left?: React.ReactNode;
	right?: React.ReactNode;
}

const SectionTitle = ({
	left = (
		<>
			SEE
			<br />
			THROUGH
		</>
	),
	right = <h2>MY EYES.</h2>,
}: SectionTitleProps) => {
	return (
		<div className="grid grid-cols-8">
			<div className="col-span-3 flex gap-2 sm:gap-2 items-center">
				<h2 className=" text-primaryText text-2xl sm:text-2xl font-light  leading-[0.8]">
					{left}
				</h2>

				<div className="text-primaryaccent text-2xl sm:text-5xl font-extrabold tracking-tighter  leading-[0.8]">
					{right}
				</div>
			</div>

			<div className="hidden col-start-8 sm:flex justify-end items-center">
				<div className="bg-primaryaccent w-6 h-2"></div>
			</div>
		</div>
	);
};

export default SectionTitle;
