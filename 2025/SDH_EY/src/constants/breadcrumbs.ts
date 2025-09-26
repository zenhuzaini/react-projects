export const homepageBreadcrumbs = {
	home: [
		{
			title: "Home",
			link: "/",
		},
	],
};

export const projectBreadcrumbs = {
	projectUpload: [
		{
			title: "Home",
			link: "/",
		},
		{
			title: "Project",
			link: "/project",
		},
	],
	projectReconciliation: [
		{
			title: "Home",
			link: "/",
		},
		{
			title: "Project",
			link: "",
		},
		{
			title: "Reconciliation",
			link: "/project",
		},
	],
	matchedRecords: (id: string) => [
		{
			title: "Home",
			link: "/",
		},
		{
			title: "Project",
			link: "",
		},
		{
			title: "Reconciliation",
			link: `/project/${id}`,
		},
		{
			title: "Matched Transaction",
			link: "",
		},
	],

	projectAudit: [
		{
			title: "Home",
			link: "/",
		},
		{
			title: "Project",
			link: "/project",
		},
		{
			title: "Audit",
			link: "/project",
		},
	],
};
