import type { ProjectType } from "../types/api";

export const mockProjects: ProjectType[] = Array.from({ length: 15 }).map(
	(_x, i) => {
		return {
			id: `${i}`,
			name: "Alejandro",
			status: i % 3 == 0 ? "Completed" : "In Progress",
			lastModified: `Mar ${i + 1}0, 2004`,
			description:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis quisquam",
			title: `Q${i} Final`,
			createdOn: `Jan ${i + 2}, 2001`,
			occupation: "Monster Slayer",
			userPhoto: "",
		};
	}
);
