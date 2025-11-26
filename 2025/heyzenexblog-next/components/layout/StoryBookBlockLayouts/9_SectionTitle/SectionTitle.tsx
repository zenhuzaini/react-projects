import { ZigzagCurveDivider } from "@/components/ui/divider/zigzag";

const SectionTitle = ({ text }: { text: string }) => {
	return (
		<div>
			<div className="items-center">
				<h2 className="flex col-span-2 gap-2 sm:items-center">
					<div className="text-primaryText text-3xl sm:text-2xl font-light  ">
						{text}
						<span className="text-dot">.</span>
					</div>
				</h2>
			</div>
			<div className="sm:flex justify-end items-center w-[10vw]">
				<div className="bg-primaryaccent w-full h-1 rounded-2xl"></div>
			</div>
		</div>
	);
};

export default SectionTitle;
