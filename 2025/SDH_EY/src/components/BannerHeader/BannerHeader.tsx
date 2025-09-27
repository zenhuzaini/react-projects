import { Box } from "@mui/system";
import headerBackground from "../../assets/Bg-Frame.png";
import Typography from "@mui/material/Typography";
import type { HeaderBannerType } from "../../types/components";
import BreadcrumbsWithSeparator from "../Breadcrumbs/BreadcrumbsWithSeparator";

const BannerHeader = ({
	title,
	description,
	breadcrumbsData,
	children,
}: HeaderBannerType) => {
	return (
		<Box
			sx={{
				width: "100%",
				height: 250,
				backgroundRepeat: "no-repeat",
				backgroundPosition: "center",
				backgroundSize: "cover",
				backgroundImage: `url(${headerBackground})`,
				paddingLeft: "5%",
				paddingRight: "5%",
				paddingTop: title && description ? "3%" : "0",
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
			}}>
			<div>
				<Box
					sx={{
						marginBottom: "5%",
					}}>
					<BreadcrumbsWithSeparator
						breadcrumbsData={breadcrumbsData}></BreadcrumbsWithSeparator>
				</Box>
				{title && description ? (
					<>
						<Typography variant="h4" color="initial">
							{title}
						</Typography>
						<p>{description}</p>
					</>
				) : null}
			</div>
			<div>{children}</div>
		</Box>
	);
};

export default BannerHeader;
