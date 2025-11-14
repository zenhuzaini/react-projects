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
	right = <>MY EYES</>,
}: SectionTitleProps) => {
	return (
		<div className="grid grid-cols-8">
			<h2 className="col-span-6 flex gap-2 sm:gap-2 sm:items-center">
				<div className=" text-primaryText text-2xl sm:text-2xl font-light  leading-[0.9]">
					{left}
				</div>

				<div className="text-primaryaccent flex justify-center items-end  text-2xl sm:text-5xl font-extrabold tracking-tighter leading-[0.9]">
					{right}
					<span className="text-dot">.</span>
				</div>
			</h2>

			<div className="hidden col-start-8 sm:flex justify-end items-center ">
				<div className="bg-primaryaccent w-6 h-2 rounded-3xl"></div>
			</div>
		</div>
	);
};

export default SectionTitle;
