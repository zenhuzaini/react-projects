import React from "react";

const ChevronLeft = ({ size = 6 }: { size?: number }) => {
	const px = size * 4;
	return (
		<div>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="currentColor"
				className="text-primarytextInvert"
				width={px}
				height={px}>
				<path
					fillRule="evenodd"
					d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z"
					clipRule="evenodd"
				/>
			</svg>
		</div>
	);
};

export default ChevronLeft;
