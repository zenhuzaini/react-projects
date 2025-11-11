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
			id: faker.number.int({ min: 1, max: 100 }).toString(),
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

export const photoMockStatic: PhotoCardDetailType[] = [
	{
		id: "99",
		city: "New Omafort",
		year: 2018,
		month: "Jan",
		country: "Saudi Arabia",
		photoUrl: "https://picsum.photos/seed/RtKQS9Uh/1907/1577",
		title: "Thursday Next Series",
		description:
			"Tergiversatio alioqui optio contego carcer repellendus itaque copiose celebrer id",
	},
	{
		id: "142",
		city: "Port St. Lucie",
		year: 2014,
		month: "Jan",
		country: "Papua New Guinea",
		photoUrl: "https://picsum.photos/seed/vMFmhl/3077/3707",
		title: "Anna Karenina",
		description:
			"Decor conturbo dolores demoror brevis totidem corroboro cura alter deficio",
	},
	{
		id: "199",
		city: "Shadfort",
		year: 2005,
		month: "Jul",
		country: "Nauru",
		photoUrl: "https://picsum.photos/seed/KSTh3R/119/2212",
		title: "The Hunger Games",
		description:
			"Teneo sollicito minima tenuis agnitio conturbo vesica desino trans addo",
	},
];
