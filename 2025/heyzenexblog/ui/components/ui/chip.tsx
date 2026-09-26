import React from "react";

const Chip = ({ text }: { text: string }) => {
	return (
		<div className="flex items-center justify-center">
			<h6 className="text-primarycream p-2 rounded-sm bg-primaryaccent text-sm">
				<span className="text-dot">#</span>
				{text}
			</h6>
		</div>
	);
};

export default Chip;
