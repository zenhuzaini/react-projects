import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import EYLogo from "../../assets/FooterLogo.png";
import "../../css/Footer.css";

const Footer = () => {
	return (
		<div className="footer">
			<Box
				sx={{
					alignContent: "center",
					paddingTop: 4,
					display: "flex",
					justifyContent: "space-between",
				}}>
				<Box
					sx={{
						height: 100,
						width: 100,
					}}>
					<img src={EYLogo} alt="EY Logo" />
				</Box>
				<Box
					sx={{
						textAlign: "right",
						display: "flex",
						flexDirection: "column",
						gap: 1,
					}}>
					<Box>
						<Typography variant="body2" color="initial">
							Privacy Statement
						</Typography>
					</Box>

					<Box>
						<Typography variant="body2" color="initial">
							&copy; {new Date().getFullYear()} EYGM Limited | All Rights
							Reserved.
						</Typography>
						<Typography variant="body2" color="initial">
							Content within this application is confidential and meant for EY
							staff and EY clients only.
						</Typography>
					</Box>
				</Box>
			</Box>
		</div>
	);
};

export default Footer;
