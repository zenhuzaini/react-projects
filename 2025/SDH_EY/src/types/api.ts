import type { PropEntity } from "./main";

export type ProjectType = PropEntity<{
	title: string;
	description: string;
	status: "In Progress" | "Completed";
	createdOn: string;
	lastModified: string;
	userPhoto: string;
	name: string;
	occupation: string;
}>;

export type ProjectPropsType = {
	project: ProjectType;
};
