import { Box, display } from "@mui/system";
import "../../css/Navbar.css";
import EYLogo from "../../assets/EyLogo.png";
import avatar from "../../assets/AvatarHeader.png";
import {
	HelpOutlineOutlined,
	NotificationsNoneOutlined,
	SettingsOutlined,
	MoreHorizOutlined,
	Search,
} from "@mui/icons-material";
import { Avatar, IconButton, InputBase } from "@mui/material";

const Navbar = () => {
	return (
		<Box
			sx={{
				maxHeight: 60,
				width: "100%",
				padding: 4,
				bgcolor: "#191c24",
				display: "flex",
				position: "fixed",
				justifyContent: "space-between",
				zIndex: 1,
			}}>
			<Box
				sx={{ marginLeft: 5, gap: 1, display: "flex", alignItems: "center" }}>
				<Box
					sx={{
						height: 40,
						width: 40,
					}}>
					<img src={EYLogo} alt="EY Logo" />
				</Box>
				<h4>Smart Data Hub</h4>
			</Box>
			<Box
				sx={{
					marginRight: 5,
					gap: 1,
					display: "flex",
					alignItems: "center",
					justifyContent: "flex-end",
				}}>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
					}}>
					<Search />
					<InputBase placeholder="Search" sx={{ ml: 1, color: "inherit" }} />
				</Box>
				<IconButton size="small" color="inherit">
					<NotificationsNoneOutlined></NotificationsNoneOutlined>
				</IconButton>

				<IconButton size="small" color="inherit">
					<HelpOutlineOutlined></HelpOutlineOutlined>
				</IconButton>

				<IconButton size="small" color="inherit">
					<SettingsOutlined></SettingsOutlined>
				</IconButton>

				<IconButton size="small" color="inherit">
					<MoreHorizOutlined></MoreHorizOutlined>
				</IconButton>

				<IconButton size="small" color="inherit">
					<Avatar alt="Travis Howard" src={avatar} />
				</IconButton>
			</Box>
		</Box>
	);
};

export default Navbar;
