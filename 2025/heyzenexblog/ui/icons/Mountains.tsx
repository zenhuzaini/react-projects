const Mountains = ({
	size = 6,
	className = "text-primaryText",
}: {
	size?: number;
	className?: string;
}) => {
	const px = size * 4;

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 64 46"
			aria-hidden="true"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className={className}
			width={px}
			height={(px * 46) / 64}>
			{/* Large sun, partly hidden by the peaks drawn after it */}
			<circle
				cx="46"
				cy="17"
				r="11"
				className="fill-primaryaccent stroke-none"
			/>
			{/* Back peak */}
			<path d="M30 40 L44 22 L50 29 L62 40 Z" className="fill-mybackground" />
			{/* Main mountain with a snow line */}
			<path
				d="M2 40 L18 16 L24 24 L31 11 L46 40 Z"
				className="fill-mybackground"
			/>
			<path d="M27.5 18 L29.5 21 L31 17.5 L33 21 L34.5 18.5" />
			{/* Ground */}
			<path d="M2 40 H62" />
			{/* Winding trail up the mountain */}
			<path
				d="M25 40 C18 38 31 35 25 32 C21 30 29 28 28 25"
				className="stroke-primaryaccent"
				strokeDasharray="1 3.5"
			/>
			{/* Birds */}
			<path d="M8 9 q2.5 -3 5 0 q2.5 -3 5 0" strokeWidth="1.5" />
		</svg>
	);
};

export default Mountains;
