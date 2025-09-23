import type { snackCategoryType } from "../types/components";

export const txt = {
	homepage: {
		title: "Projects",
		description: "Manage your project below - edit or delete as needed.",
		createProject: "Create Project",
	},
};

export const snacks: snackCategoryType = {
	underDev: {
		type: "info",
		text: "Still under development 🏗️ 💅",
	},
	somethingWentWrong: {
		type: "warning",
		text: "Something went wrong ☠️",
	},
};
