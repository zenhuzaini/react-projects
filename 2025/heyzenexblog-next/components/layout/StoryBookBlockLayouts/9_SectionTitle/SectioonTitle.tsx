import React from "react";

const SectioonTitle = ({ text }: { text: string }) => {
	return (
		<div className="grid grid-cols-8">
			<h2 className="flex col-span-2 gap-2 sm:items-center">
				<div className=" text-primaryText text-2xl sm:text-2xl font-light  ">
					{text}
					<span className="text-dot">.</span>
				</div>
			</h2>

			<div className="hidden col-start-8 sm:flex justify-end items-center ">
				<div className="bg-primaryaccent w-6 h-2 rounded-3xl"></div>
			</div>
		</div>
	);
};

export default SectioonTitle;
