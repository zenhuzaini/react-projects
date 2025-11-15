const ShortDescription = ({
	text,
	shouldCenter = false,
}: {
	text: string;
	shouldCenter?: boolean;
}) => {
	return (
		<p
			className={`text-2xl md:text-3xl font-extralight text-primarytextInvert ${
				shouldCenter ? "text-center" : ""
			}`}>
			<span className="text-2xl md:text-4xl font-bold text-primaryaccent">
				"
			</span>
			{text}
			<span className="text-dot">.</span>
			<span className="text-2xl md:text-4xl font-bold text-primaryaccent">
				"
			</span>
		</p>
	);
};

export default ShortDescription;
