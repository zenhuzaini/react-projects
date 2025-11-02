import { faker } from "@faker-js/faker";
import type { PhotoCardDetailType } from "../types/components";

export const photoMock = ({
	length = 8,
}: {
	length: number;
}): PhotoCardDetailType[] => {
	return Array.from({ length }).map(() => {
		return {
			id: faker.string.uuid(),
			city: faker.location.city(),
			year: faker.number.int({ min: 2000, max: 2030 }),
			month: faker.date.month({ abbreviated: true }),
			country: faker.location.country(),
			photoUrl: faker.image.url(), // 'https://picsum.photos/seed/NWbJM2B/640/480'
		};
	});
};
