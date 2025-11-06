import { faker } from "@faker-js/faker";
import React from "react";

const Paragraph = () => {
	return (
		<div className="text-primaryText font-light leading-normal text-sm md:text-lg text-justify justify-center">
			<p>{faker.lorem.sentences(8)}</p>
		</div>
	);
};

export default Paragraph;
