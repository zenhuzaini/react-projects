import { EMPTY_STRING } from "@/const/vars";

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
	const trimmedText = text.trimEnd();
	const appendPeriod = trimmedText.length > 0 && !/[.!?…]$/.test(trimmedText);

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
				shouldCenter ? "text-center" : EMPTY_STRING
			} ${shouldItalic ? "italic" : EMPTY_STRING}`}>
			<span className="text-2xl md:text-4xl font-bold text-primaryaccent">
				&quot;
			</span>
			{text}
			{appendPeriod && <span className="text-dot">.</span>}
			<span className="text-2xl md:text-4xl font-bold text-primaryaccent">
				&quot;
			</span>
		</p>
	);
};

export default ShortDescription;
