import React from "react";

const CheckSymbol = ({
	size = 6,
	className = "text-primarytextInvert",
}: {
	size?: number;
	className?: string;
}) => {
	const px = size * 4;
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth="1.5"
			stroke="currentColor"
			className={className}
			width={px}
			height={px}>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="m4.5 12.75 6 6 9-13.5"
			/>
		</svg>
	);
};

export default CheckSymbol;
