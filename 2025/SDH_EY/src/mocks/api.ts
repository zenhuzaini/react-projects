import { faker } from "@faker-js/faker";
import type { ProjectType } from "../types/api";
import { getRandomInt, randomBoolean } from "../services/utils";

export const mockProjects: ProjectType[] = Array.from({ length: 30 }).map(
	(_x, i) => {
		const lastName = faker.person.lastName();
		return {
			id: `${i}`,
			name: `${faker.person.firstName()} ${
				lastName.length < 8 ? lastName : lastName.slice(0, 7)
			}`,
			status: randomBoolean() ? "Completed" : "In Progress",
			lastModified: `${faker.date.month({ abbreviated: true })} ${getRandomInt(
				1,
				31
			)}, ${getRandomInt(2022, 2025)}`,
			description: faker.lorem.sentence({ min: 10, max: 11 }).slice(0, 70),
			title: `Q${i} Final`,
			createdOn: `${faker.date.month({ abbreviated: true })} ${getRandomInt(
				1,
				31
			)}, ${getRandomInt(2018, 2021)}`,
			occupation: faker.person.jobType(),
			userPhoto: faker.image.personPortrait({ size: 128 }), //faker.image.avatar(),
		};
	}
);
