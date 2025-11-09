import { animationForArrow } from "@/animation/animation";
import React from "react";

const AtSymbol = ({
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
					d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25"
				/>
			</svg>
		</div>
	);
};

export default AtSymbol;
