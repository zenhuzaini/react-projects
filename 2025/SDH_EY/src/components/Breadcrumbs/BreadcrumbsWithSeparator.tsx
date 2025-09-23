import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import type { breadcrumbProps } from "../../types/components";

function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
	event.preventDefault();
	console.info("You clicked a breadcrumb.");
}

export default function BreadcrumbsWithSeparator({
	breadcrumbsData,
}: breadcrumbProps) {
	const breadcrumbs = breadcrumbsData.map((bc, i) => {
		if (breadcrumbsData.length === 1 || i !== breadcrumbsData.length - 1) {
			return (
				<Link
					sx={{ color: "whitesmoke" }}
					underline="hover"
					key={i}
					color="inherit"
					href={bc.link}
					onClick={handleClick}>
					{bc.title}
				</Link>
			);
		} else {
			return (
				<Typography key={i} sx={{ color: "text.primary" }}>
					{bc.title}
				</Typography>
			);
		}
	});

	return (
		<Breadcrumbs
			separator={<NavigateNextIcon fontSize="small" />}
			aria-label="breadcrumb">
			{breadcrumbs}
		</Breadcrumbs>
	);
}
