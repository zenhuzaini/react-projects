import { faker } from "@faker-js/faker";
import type { ProjectType } from "../types/api";
import { getRandomInt, randomBoolean } from "../services/utils";
import type {
	BasicCardDetailType,
	dataTableRecordsType,
} from "../types/components";
import { tableProjectColor } from "../constants/colors";

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

export function mockMatchedTransaction1(length: number): dataTableRecordsType {
	const mockRows = Array.from({ length }).map((_data, i) => {
		return {
			id: i,
			CoompanyCode: i,
			status: "❌",
			profitCenter: faker.string.numeric(6),
			Re: faker.string.alphanumeric({
				length: { min: 2, max: 2 },
				casing: "upper",
			}),
			balance: faker.finance.amount({
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
				name: "status",
				type: "str",
			},
			{
				name: "CoompanyCode",
				type: "str",
			},
			{
				name: "profitCenter",
				type: "str",
			},
			{
				name: "balance",
				type: "cur",
			},
			{
				name: "Re",
				type: "str",
			},
		],
		rows: mockRows,
	};
}

export function mockMatchedTransaction2(length: number): dataTableRecordsType {
	const mockRows = Array.from({ length }).map((_data, i) => {
		return {
			id: i,
			CocD: i,
			status: true,
			profitCenter: faker.string.numeric(6),
			insurance: "-",
			amount: faker.finance.amount({
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
				name: "status",
				type: "str",
			},
			{
				name: "CoCd",
				type: "str",
			},
			{
				name: "profitCenter",
				type: "str",
			},
			{
				name: "amount",
				type: "cur",
			},
			{
				name: "insurance",
				type: "str",
			},
		],
		rows: mockRows,
	};
}

export const summaryDataSource = {
	recordsInSource: faker.number.float({ min: 1, max: 10, fractionDigits: 3 }),
	matchedRecords: faker.number.int({ min: 100000, max: 150000 }),
	recordsInTarget: faker.number.float({ min: 10, max: 100, fractionDigits: 3 }),
	unmatchedRecords: faker.number.int({ min: 500, max: 10000 }),
	processingTime: `00:${faker.number.int({
		min: 10,
		max: 60,
	})}:${faker.number.int({ min: 10, max: 60 })}`,
	totalUnmatchedRecords: faker.number.int({ min: 100, max: 10000 }),
	totalUnmatchedAmount: faker.finance.amount({
		min: 5000,
		max: 100000,
		dec: 2,
		symbol: "$",
	}),
	calculatedAmount: faker.finance.amount({
		min: 100,
		max: 1000,
		dec: 2,
		symbol: "$",
	}),
	differenceAmount: faker.finance.amount({
		min: 100,
		max: 500,
		dec: 2,
		symbol: "$",
	}),
	totalPartialUnmatchedRecords: faker.number.int({ min: 100, max: 10000 }),
	totalPartialUnmatchedAmount: faker.finance.amount({
		min: 5000,
		max: 100000,
		dec: 2,
		symbol: "$",
	}),
};

export const dataCardMock: BasicCardDetailType[][] = [
	[
		{
			value: `${faker.number.int({ min: 10, max: 60 })}`,
			valueVariant: "h4",
			description: "Total Unmatched Records",
			descriptionVariant: "body2",
			backgroundColor: tableProjectColor.rowBackground,
			textColor: "whitesmoke",
		},
		{
			value: `${faker.finance.amount({
				min: 100,
				max: 1000,
				dec: 2,
				symbol: "$",
			})}`,
			valueVariant: "h4",
			description: "Total Unmatched amount",
			descriptionVariant: "body2",
			backgroundColor: tableProjectColor.rowBackground,
			textColor: "whitesmoke",
		},
	],

	[
		{
			value: `${faker.finance.amount({
				min: 100,
				max: 1000,
				dec: 2,
				symbol: "$",
			})}`,
			valueVariant: "h4",
			description: "Calculated Amount",
			descriptionVariant: "body2",
			backgroundColor: "linear-gradient(90deg, #463b6a 0%, #52477a 100%)",
			textColor: "whitesmoke",
		},
		{
			value: `${faker.finance.amount({
				min: 100,
				max: 1000,
				dec: 2,
				symbol: "$",
			})}`,
			valueVariant: "h4",
			description: "Difference amount",
			descriptionVariant: "body2",
			backgroundColor: "linear-gradient(90deg, #463b6a 0%, #52477a 100%)",
			textColor: "whitesmoke",
		},
	],
];
