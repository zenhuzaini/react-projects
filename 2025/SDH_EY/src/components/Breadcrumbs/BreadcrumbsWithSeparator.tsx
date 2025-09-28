import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import type { breadcrumbProps } from "../../types/components";
import { NavLink } from "react-router-dom";

export default function BreadcrumbsWithSeparator({
	breadcrumbsData,
}: breadcrumbProps) {
	const breadcrumbs = breadcrumbsData.map((bc, i) => {
		if (breadcrumbsData.length === 1 || i !== breadcrumbsData.length - 1) {
			return <NavLink to={bc.link}>{bc.title}</NavLink>;
		} else {
			return (
				<Typography
					key={i}
					sx={{
						color:
							i === breadcrumbsData.length - 1 ? "whitesmoke" : "text.primary",
					}}>
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
