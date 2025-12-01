export const ZigzagCurveDivider = ({
	increaseLength,
}: {
	increaseLength: number;
}) => {
	let zigzagPathLength = `
          M 0 20
          Q 20 0, 40 20
          Q 60 40, 80 20
          `;

	let currentStartTop = 60;
	let currentStopValue = 80;
	for (let index = 1; index < increaseLength; index++) {
		const upDown = index % 2 == 0 ? 40 : 0;
		currentStartTop = currentStartTop + 40;
		currentStopValue = currentStopValue + 40;
		let newDot = `Q ${currentStartTop} ${upDown}, ${currentStopValue} 20`;

		zigzagPathLength += newDot;
	}

	return (
		<svg width="100%" height="40" style={{ display: "block" }}>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d={zigzagPathLength}
				strokeWidth={3}
				color="bg-primaryaccent"
				stroke="currentColor"
				className="bg-primaryaccent"
				fill="none"
			/>
		</svg>
	);
};
