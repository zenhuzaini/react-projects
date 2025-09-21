import { Box } from "@mui/system";
import BannerHeader from "../components/BannerHeader/BannerHeader";
import ProjectCards from "../components/Cards/ProjectCards";
import Typography from "@mui/material/Typography";
import ToggleMenu from "../components/Menus/ToggleMenu";
import { toggleMenuOptionsMock } from "../mocks/components";
import { useState } from "react";
import BasicSwitches from "../components/Switches/SwitchBasic";
import { mockProjects } from "../mocks/api";

const Homepage = () => {
	const toggleMenuData = toggleMenuOptionsMock;
	const [dataView, setDataView] = useState<boolean>(false);

	// Normally it should be retrieved from api calls
	const projects = mockProjects.map((project, i) => {
		return <ProjectCards project={project} key={i} />;
	});

	return (
		<div>
			<BannerHeader
				title="Projects"
				id="2"
				description="These are the projects. You may see the details and update "
				bannerType="homepage"></BannerHeader>

			<div className="main-content-container">
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
					}}>
					<ToggleMenu toggleMenuData={toggleMenuData}></ToggleMenu>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
						}}>
						<Typography
							variant="subtitle2"
							sx={{ display: "block" }}
							color="initial">
							Card View
						</Typography>
						<BasicSwitches
							setSwitch={setDataView}
							defaultChecked={false}></BasicSwitches>
						<Typography
							variant="subtitle2"
							sx={{ display: "block" }}
							color="initial">
							List View
						</Typography>
					</Box>
				</Box>
				<Box>
					{!dataView ? (
						<Box
							sx={{
								display: "flex",
								justifyContent: "space-between",
								flexWrap: "wrap",
							}}>
							{projects}
						</Box>
					) : null}
				</Box>
			</div>
		</div>
	);
};

export default Homepage;
