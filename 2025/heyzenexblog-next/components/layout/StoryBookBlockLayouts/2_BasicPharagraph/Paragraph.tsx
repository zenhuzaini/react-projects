import { faker } from "@faker-js/faker";
import React from "react";

const Paragraph = ({ text }: { text: string }) => {
	return (
		<div className="text-primaryText font-light leading-normal text-sm md:text-lg text-justify justify-center">
			<p>{text}</p>
		</div>
	);
};

export default Paragraph;
