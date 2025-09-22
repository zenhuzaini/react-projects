import type { ToggleMenuType } from "../types/components";

export const toggleMenuOptionsMock = (
	a: number = 0,
	c: number = 0,
	i: number = 0
): ToggleMenuType[] => [
	{ text: `All (${a})`, isDisabled: false, value: "all" },
	{ text: `Completed (${c})`, isDisabled: false, value: "completed" },
	{ text: `In Progress (${i})`, isDisabled: false, value: "inProgress" },
];
