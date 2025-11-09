const XMark = ({
	size = 6,
	className = "text-primarytextInvert ",
}: {
	size?: number;
	className?: string;
}) => {
	const px = size * 4;
	return (
		<div>
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
					d="M6 18 18 6M6 6l12 12"
				/>
			</svg>
		</div>
	);
};

export default XMark;
