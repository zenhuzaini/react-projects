import { faker } from "@faker-js/faker";
import React from "react";

const Paragraph = ({ text }: { text: string }) => {
	return (
		<p className="text-primaryText font-light leading-normal text-[16px] md:text-lg text-justify justify-center">
			{text}
		</p>
	);
};

export default Paragraph;
