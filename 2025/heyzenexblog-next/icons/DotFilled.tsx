import { animationForArrow } from "@/animation/animation";
import React from "react";

const DotFilled = ({
	size = 6,
	className = "text-primarytextInvert",
}: {
	size?: number;
	className?: string;
}) => {
	const px = size * 4;
	return (
		<div className={`${animationForArrow}`}>
			<svg
				className={className}
				width={px}
				height={px}
				viewBox="0 0 15 15"
				fill="none"
				xmlns="http://www.w3.org/2000/svg">
				<path
					d="M9.875 7.5C9.875 8.81168 8.81168 9.875 7.5 9.875C6.18832 9.875 5.125 8.81168 5.125 7.5C5.125 6.18832 6.18832 5.125 7.5 5.125C8.81168 5.125 9.875 6.18832 9.875 7.5Z"
					fill="currentColor"></path>
			</svg>
		</div>
	);
};

export default DotFilled;
