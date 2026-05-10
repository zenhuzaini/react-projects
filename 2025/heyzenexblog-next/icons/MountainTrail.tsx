import { animationForArrow } from "@/animation/animation";
import React from "react";

const MountainTrail = ({
	size = 6,
	className = "text-primarytextInvert",
}: {
	size?: number;
	className?: string;
}) => {
	const px = size * 4;

	return (
		<div className={animationForArrow}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 256 256"
				fill="none"
				stroke="currentColor"
				strokeWidth="10"
				strokeLinecap="round"
				strokeLinejoin="round"
				className={className}
				width={px}
				height={px}>
				{/* Mountain */}
				<path d="M32 150 L75 85 L102 102 L118 75 H136 L160 32 L185 78 L196 72 L216 105 H232" />

				{/* Left tree trunk */}
				<path d="M86 146 V210" />
				{/* Left tree branches */}
				<path d="M70 160 L86 146 L102 160" />
				<path d="M70 176 L86 162 L102 176" />
				<path d="M70 192 L86 178 L102 192" />

				{/* Right tree trunk */}
				<path d="M182 146 V210" />
				{/* Right tree branches */}
				<path d="M166 160 L182 146 L198 160" />
				<path d="M166 176 L182 162 L198 176" />
				<path d="M166 192 L182 178 L198 192" />

				{/* Dashed trail */}
				<path d="M135 90 L131 100" />
				<path d="M122 111 C118 117 116 124 116 130" />
				<path d="M121 148 C127 156 132 161 137 166" />
				<path d="M145 178 C147 186 146 195 142 204" />
				<path d="M130 213 L124 220" />
			</svg>
		</div>
	);
};

export default MountainTrail;
