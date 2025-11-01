import { faker } from "@faker-js/faker";
import type { PhotoCardDetailType } from "../types/components";

export const photoMock = ({
	length = 15,
	height = 200,
	width = 300,
}: {
	length: number;
	height?: number;
	width?: number;
}): PhotoCardDetailType[] => {
	return Array.from({ length }).map(() => {
		return {
			id: faker.string.uuid(),
			city: faker.location.city(),
			year: faker.number.int({ min: 2000, max: 2030 }),
			month: faker.date.month({ abbreviated: true }),
			country: faker.location.country(),
			photoUrl: faker.image.urlPicsumPhotos({ width, height, blur: 0 }), // 'https://picsum.photos/seed/NWbJM2B/640/480'
		};
	});
};
