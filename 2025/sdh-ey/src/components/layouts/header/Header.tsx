import React from "react";
import {
	AppBar,
	Toolbar,
	Typography,
	Box,
	Tabs,
	Tab,
	Avatar,
	Breadcrumbs,
	Link,
	Container,
	ThemeProvider,
	createTheme,
	IconButton,
	InputBase,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { tabs } from "../../../constants/tabs";

// static images
import headerBackground from "../../../assets/headerBackground.png";
import EYLogo from "../../../assets/EYLogo.png";
import avatar from "../../../assets/avatarHeader.png";

import { SettingsApplications } from "@mui/icons-material";

const darkTheme = createTheme({
	palette: {
		mode: "dark",
		primary: {
			main: "#FFD700", // EY Yellow
		},
		background: {
			default: "#23222a",
			paper: "#2a2936",
		},
		text: {
			primary: "#fff",
		},
	},
});

export default function Header() {
	const [tabIndex, setTabIndex] = React.useState(0);

	return (
		<ThemeProvider theme={darkTheme}>
			<Box sx={{ flexGrow: 1 }}>
				<AppBar
					color="inherit"
					elevation={0}
					sx={{ bgcolor: "background.default" }}>
					<Toolbar>
						<div style={{ width: "100%" }}>
							<Box
								sx={{
									display: "flex",
									justifyContent: "space-between",
									p: 1,
									m: 1,

									borderRadius: 1,
								}}>
								{/* left with Logo */}
								<div style={{ display: "flex", alignItems: "center", gap: 10 }}>
									<Box
										sx={{
											width: 44,
											height: 44,
											display: "flex",
											// alignItems: "center",
											justifyContent: "flex-start",
										}}>
										<img
											src={EYLogo}
											alt="EY Logo"
											style={{
												width: "100%",
												height: "100%",
												objectFit: "contain",
												borderRadius: 8,
											}}
										/>
									</Box>
									<Typography variant="h6">Smart Data Hub</Typography>
								</div>

								{/* Right */}
								<Box
									sx={{
										flexFlow: 1,
										display: "flex",
										alignItems: "right",
										gap: 1,
									}}>
									{/* Search */}
									<Box
										sx={{
											display: "flex",
											alignItems: "center",
											bgcolor: "background.paper",
											px: 1,
											borderRadius: 2,
											mr: 2,
										}}>
										<SearchIcon />
										<InputBase
											placeholder="Search"
											sx={{ ml: 1, color: "inherit" }}
										/>
									</Box>
									<IconButton color="inherit">
										<NotificationsIcon />
									</IconButton>
									<IconButton color="inherit">
										<HelpOutlineIcon />
									</IconButton>
									<IconButton color="inherit">
										<SettingsApplications />
									</IconButton>
									<IconButton color="inherit">
										<MoreVertIcon />
									</IconButton>

									{/* User Avatar */}
									<Avatar sx={{ ml: 1 }} src={avatar}></Avatar>
								</Box>
							</Box>
						</div>
					</Toolbar>
				</AppBar>
			</Box>

			{/* Bread crumbs */}
			<Box
				sx={{
					marginTop: 10,
					background: "linear-gradient(90deg,#420273,#2fc7de,#82c2c0)",
					backgroundImage: `url(${headerBackground})`,
					minHeight: 140,
					width: "100%",
					backgroundSize: "cover",
					backgroundPosition: "center",
					color: "white",
				}}>
				<Container sx={{ py: 3 }}>
					<Breadcrumbs
						separator={<NavigateNextIcon fontSize="small" />}
						sx={{ color: "white" }}>
						<Link underline="hover" color="inherit" href="#">
							Home
						</Link>
						<Link underline="hover" color="inherit" href="#">
							Project
						</Link>
						<Typography color="white">Upload/View</Typography>
					</Breadcrumbs>
					<Typography variant="h4" mt={2} mb={1} color="white">
						Financial Reconciliation
					</Typography>
					<Typography color="white" fontSize={18}>
						View and validate reconciliation results between source and target
						files.
					</Typography>
				</Container>
			</Box>

			<Box
				sx={{
					bgcolor: "background.paper",
					borderBottom: 1,
					borderColor: "divider",
				}}>
				<Container>
					<Tabs
						value={tabIndex}
						onChange={(_, newValue) => setTabIndex(newValue)}
						aria-label="dashboard tabs"
						textColor="inherit"
						indicatorColor="primary">
						{tabs.page.financialReconciliation.map((tab, index) => (
							<Tab
								key={tab.label}
								label={tab.label}
								sx={{
									fontWeight: index === tabIndex ? 700 : 400,
									bgcolor:
										index === tabIndex
											? "background.default"
											: "background.paper",
									borderRadius: 1,
									mr: 3,
									color: "text.primary",
								}}
							/>
						))}
					</Tabs>
				</Container>
			</Box>
			{/* Main Content below */}
			{/* <Container sx={{ mt: 4 }}> */}
			{/* Replace with your tab-specific content */}
			{/* <Typography variant="h6">
					{tabs.page.financialReconciliation[tabIndex].label}
				</Typography>
			</Container> */}
		</ThemeProvider>
	);
}
