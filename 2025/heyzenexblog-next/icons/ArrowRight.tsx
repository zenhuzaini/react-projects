import { animationForArrow } from "@/animation/animation";

const ArrowRight = ({
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
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
				/>
			</svg>
		</div>
	);
};

export default ArrowRight;
