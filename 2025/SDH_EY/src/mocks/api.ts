import { faker } from "@faker-js/faker";
import type { ProjectType } from "../types/api";
import { getRandomInt, randomBoolean } from "../services/utils";
import type { dataTableRecordsType } from "../types/components";

export const mockProjects: ProjectType[] = Array.from({ length: 30 }).map(
	(_x) => {
		const lastName = faker.person.lastName();
		return {
			id: faker.string.nanoid(10),
			name: `${faker.person.firstName()} ${
				lastName.length < 8 ? lastName : lastName.slice(0, 7)
			}`,
			status: randomBoolean() ? "Completed" : "In Progress",
			lastModified: `${faker.date.month({ abbreviated: true })} ${getRandomInt(
				1,
				31
			)}, ${getRandomInt(2022, 2025)}`,
			description: faker.lorem.sentence({ min: 10, max: 11 }).slice(0, 70),
			title: faker.book.title(), // 'Romeo and Juliet',
			createdOn: `${faker.date.month({ abbreviated: true })} ${getRandomInt(
				1,
				31
			)}, ${getRandomInt(2018, 2021)}`,
			occupation: faker.person.jobType(),
			userPhoto: faker.image.personPortrait({ size: 128 }), //faker.image.avatar(),
		};
	}
);

export function mockMatchedRecords(): dataTableRecordsType {
	const mockRows = Array.from({ length: 100 }).map((_data, i) => {
		return {
			id: i,
			matchId: faker.string.nanoid(5),
			companyCode: faker.company.name(),
			profitCenter: faker.string.numeric(6),
			inputID: faker.string.alpha({ length: { min: 5, max: 8 } }),
			docType: faker.string.alphanumeric({
				length: { min: 2, max: 3 },
				casing: "upper",
			}),
			matchAmount: faker.finance.amount({
				min: 5000,
				max: 10000,
				dec: 2,
				symbol: "$",
			}),
		};
	});
	return {
		columns: [
			{
				name: "matchId",
				type: "num",
			},
			{
				name: "companyCode",
				type: "str",
			},
			{
				name: "profitCenter",
				type: "str",
			},
			{
				name: "inputID",
				type: "str",
			},
			{
				name: "docType",
				type: "str",
			},
			{
				name: "matchAmount",
				type: "cur",
			},
		],
		rows: mockRows,
	};
}
