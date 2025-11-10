const ShortDescription = ({ text }: { text: string }) => {
	return (
		<p className="text-2xl md:text-3xl font-extralight text-primarytextInvert">
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
