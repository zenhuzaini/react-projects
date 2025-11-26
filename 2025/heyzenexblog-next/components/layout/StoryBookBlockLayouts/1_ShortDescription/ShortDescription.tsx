const ShortDescription = ({
	text,
	shouldCenter = false,
	shouldItalic = false,
	fontSize = "large",
}: {
	text: string;
	shouldCenter?: boolean;
	shouldItalic?: boolean;
	fontSize?: "small" | "medium" | "large";
}) => {
	let fontSizeClassName = "";
	switch (fontSize) {
		case "small":
			fontSizeClassName = "text-lg md:text-1xl";
			break;
		case "medium":
			fontSizeClassName = "text-1xl md:text-2xl";
			break;
		case "large":
			fontSizeClassName = "text-2xl md:text-3xl";
			break;
		default:
			fontSizeClassName = "text-xl md:text-3xl";
			break;
	}

	return (
		<p
			className={`${fontSizeClassName}  font-extralight text-primarytextInvert ${
				shouldCenter ? "text-center" : ""
			} ${shouldItalic ? "italic" : ""}`}>
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
