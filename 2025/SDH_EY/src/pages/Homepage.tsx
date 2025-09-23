import { Box } from "@mui/system";
import BannerHeader from "../components/BannerHeader/BannerHeader";
import ProjectCards from "../components/Cards/ProjectCards";
import Typography from "@mui/material/Typography";
import ToggleMenu from "../components/Menus/ToggleMenu";
import { toggleMenuOptionsMock } from "../mocks/components";
import { useEffect, useState } from "react";
import BasicSwitches from "../components/Switches/SwitchBasic";
import { mockProjects } from "../mocks/api";
import BasicPagination from "../components/Pagination/Pagination";
import type { ProjectType } from "../types/api";
import type { projectStatusCard } from "../types/components";
import ProjectTable from "../components/Table/ProjectTable";
import { projectColumn } from "../constants/table";
import { snacks, txt } from "../constants/text";
import CustomizedButton from "../components/Buttons/CustomizedButton";
import SnackBarCustomized from "../components/SnackBar/SnackBarCustomized";

const Homepage = () => {
	const [toggleOption, setToggleOption] = useState<projectStatusCard>("all");
	const [dataView, setDataView] = useState<boolean>(false);
	const [buttonClicked, setButtonClicked] = useState<boolean>(false);
	const [openedSnackBar, setOpenedSnackBar] = useState<boolean>(false);
	const [filteredProject, setFilteredProject] = useState<{
		all: {
			total: number;
			projects: ProjectType[];
		};
		completed: {
			total: number;
			projects: ProjectType[];
		};
		inProgress: {
			total: number;
			projects: ProjectType[];
		};
	}>(); //this should have initial state to avoid undefined

	useEffect(() => {
		const completedProject = mockProjects.filter((data) => {
			return data.status === "Completed";
		});
		const inProgressProject = mockProjects.filter((data) => {
			return data.status === "In Progress";
		});
		setFilteredProject({
			all: {
				total: mockProjects.length,
				projects: mockProjects,
			},
			completed: {
				total: completedProject.length,
				projects: completedProject,
			},
			inProgress: {
				total: inProgressProject.length,
				projects: inProgressProject,
			},
		});
	}, []);

	// only when button is clicked
	useEffect(() => {
		setOpenedSnackBar(true);
	}, [buttonClicked]);

	// Normally it should be retrieved from api calls
	const projectCards = () => {
		switch (toggleOption) {
			case "completed":
				return filteredProject?.completed.projects.map((project, i) => {
					return <ProjectCards project={project} key={i} />;
				});

			case "inProgress":
				return filteredProject?.inProgress.projects.map((project, i) => {
					return <ProjectCards project={project} key={i} />;
				});
			default:
				return mockProjects.map((project, i) => {
					return <ProjectCards project={project} key={i} />;
				});
		}
	};

	const tableProject = () => {
		let filteredProjects: ProjectType[] = filteredProject?.all?.projects ?? [];
		switch (toggleOption) {
			case "completed":
				filteredProjects = (filteredProject?.completed.projects ?? []).map(
					(project) => {
						return project;
					}
				);
				break;

			case "inProgress":
				filteredProjects = (filteredProject?.inProgress.projects ?? []).map(
					(project) => {
						return project;
					}
				);
				break;

			default:
				filteredProjects = filteredProject?.all?.projects ?? [];
				break;
		}

		return (
			<ProjectTable column={projectColumn} projects={filteredProjects ?? []} />
		);
	};

	return (
		<>
			{openedSnackBar ? (
				<SnackBarCustomized
					text={snacks.underDev.text}
					type={snacks.underDev.type}
					openedSnackBar={openedSnackBar}
					setOpenedSnackBar={setOpenedSnackBar}></SnackBarCustomized>
			) : null}

			<div>
				<BannerHeader
					title={txt.homepage.title}
					id="2"
					description={txt.homepage.description}
					bannerType="homepage">
					<CustomizedButton
						text={txt.homepage.createProject}
						setButtonClicked={setButtonClicked}></CustomizedButton>
				</BannerHeader>

				<div className="main-content-container">
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
						}}>
						<ToggleMenu
							toggleOption={toggleOption}
							setToggleOption={setToggleOption}
							toggleMenuData={toggleMenuOptionsMock(
								filteredProject?.all?.total,
								filteredProject?.completed.total,
								filteredProject?.inProgress.total
							)}></ToggleMenu>
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
					<Box
						sx={{
							marginTop: "1.5%",
							display: "flex",
							justifyContent: "flex-start",
							gap: 2.2,
							flexWrap: "wrap",
						}}>
						{!dataView ? projectCards() : tableProject()}
					</Box>
					<hr
						style={{
							marginTop: "2%",
							marginBottom: "2%",
							borderTop: `0.2px solid grey`,
						}}></hr>
					<Box
						sx={{
							display: "flex",
							justifyContent: "center",
						}}>
						<BasicPagination />
					</Box>
				</div>

				{/* Alert Let it be down here in the bottom*/}
			</div>
		</>
	);
};

export default Homepage;
