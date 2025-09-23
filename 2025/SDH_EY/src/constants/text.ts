import type { snackCategoryType } from "../types/components";

export const txt = {
	homepage: {
		title: "Projects",
		description: "Manage your project below - edit or delete as needed.",
		buttons: {
			createProject: "Create Project",
		},
	},
	project: {
		upload: {},
		reconciliation: {
			title: "Financial Reciliation",
			description:
				"View and validate reconciliation results between source and target files.",
			buttons: {
				bannerButton: "Execution History",
			},
		},
		audit: {
			title: "Projects",
			description: "Manage your project below - edit or delete as needed.",
			createProject: "Create Project",
		},

		menus: [
			{ text: "Data Source", isDisabled: false, value: "dataSource" },
			{
				text: "Reconcilitaion Dashboard",
				isDisabled: false,
				value: "reconciliation",
			},
			{ text: "Audit Logs", isDisabled: false, value: "audit" },
		],
	},
};

export const snacks: snackCategoryType = {
	underDev: {
		type: "info",
		text: "Under development 🏗️ 💅",
	},
	somethingWentWrong: {
		type: "warning",
		text: "Something went wrong ☠️",
	},
};
