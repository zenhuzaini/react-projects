import { faker } from "@faker-js/faker";
import type { PhotoCardDetailType } from "../types/components";

export const photoMock = ({
	length = 8,
}: {
	length: number;
}): PhotoCardDetailType[] => {
	return Array.from({ length }).map(() => {
		const fullDescription = faker.lorem.sentence({ min: 8, max: 20 });
		const descriptionWords = fullDescription.split(" ").slice(0, 10).join(" ");

		return {
			id: faker.string.uuid(),
			city: faker.location.city(),
			year: faker.number.int({ min: 2000, max: 2030 }),
			month: faker.date.month({ abbreviated: true }),
			country: faker.location.country(),
			photoUrl: faker.image.url(),
			title: faker.book.series(),
			description: descriptionWords,
		};
	});
};

export const basicPhotoContent = [
	{
		url: "",
		title: faker.book.series(),
		description: faker.lorem
			.sentence({ min: 8, max: 20 })
			.split(" ")
			.slice(0, 10)
			.join(" "),
	},
	{
		url: "",
		title: faker.book.series(),
		description: faker.lorem
			.sentence({ min: 8, max: 20 })
			.split(" ")
			.slice(0, 10)
			.join(" "),
	},
];
