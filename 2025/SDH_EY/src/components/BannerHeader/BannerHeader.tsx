import { Box } from "@mui/system";
import headerBackground from "../../assets/Bg-Frame.png";
import Typography from "@mui/material/Typography";
import DropDownButton from "../Buttons/DropDownButton";

const BannerHeader = () => {
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
				paddingTop: "5%",
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
			}}>
			<div>
				<Box sx={{}}>Breadcrumbs</Box>
				<Typography variant="h4" color="initial">
					Reconciliation page
				</Typography>
				<p>Manage your project below-</p>
			</div>

			<div>
				<DropDownButton></DropDownButton>
			</div>
		</Box>
	);
};

export default BannerHeader;
