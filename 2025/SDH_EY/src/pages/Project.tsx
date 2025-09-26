import { useState } from "react";
import BannerHeader from "../components/BannerHeader/BannerHeader";
import { projectBreadcrumbs } from "../constants/breadcrumbs";
import { txt } from "../constants/text";
import type {
	historyVersionType,
	toggleOptionsType,
} from "../types/components";
import { versionOptions } from "../mocks/versions";
import "../css/Project.css";

import SelectVersion from "../components/Select/SelectVersion";
import ToggleMenu from "../components/Menus/ToggleMenu";
import ProjectDetailCard from "../components/Cards/ProjectDetailCard";
import ProjectSummaryCard from "../components/Cards/ProjectSummaryCard";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { FilterAltOutlined, SettingsOutlined } from "@mui/icons-material";
import SearchComponent from "../components/Search/Search";
import DataTable from "../components/Table/DataTable";

const Project = () => {
	const [version, _setVersion] = useState<historyVersionType[]>(versionOptions);
	const [selectedIdVersion, setSelectedIdVersion] = useState<string>("");
	const [toggleOption, setToggleOption] =
		useState<toggleOptionsType>("reconciliation");

	const [menuTableOption, setMenuTableOption] =
		useState<toggleOptionsType>("matched");

	// todo, check the active tab and change the title value
	return (
		<>
			<div>
				<BannerHeader
					breadcrumbsData={projectBreadcrumbs.projectReconciliation}
					title={txt.project.reconciliation.title}
					id="3"
					description={txt.project.reconciliation.description}>
					<SelectVersion
						versions={version}
						selectedIdVersion={selectedIdVersion}
						setSelectedIdVersion={setSelectedIdVersion}></SelectVersion>
				</BannerHeader>

				<div className="menuProject">
					<ToggleMenu
						toggleOption={toggleOption}
						setToggleOption={setToggleOption}
						toggleMenuData={txt.project.menus}></ToggleMenu>
				</div>

				{/* This will depend on the content */}
				<main className="main-content-container-project">
					<Box
						sx={{
							display: "flex",
							gap: 3,
						}}>
						<ProjectDetailCard></ProjectDetailCard>
						<ProjectSummaryCard></ProjectSummaryCard>
					</Box>
					{/* Table */}

					<Box
						sx={{
							marginTop: "20px",
							backgroundColor: "#34343e",
							borderRadius: "10px",
						}}>
						{/* First Option --title and some option */}
						<Box
							sx={{
								padding: "1%",
							}}>
							<Box sx={{ justifyContent: "space-between", display: "flex" }}>
								{/* left */}
								<Box>
									<Typography variant="body1">
										Compare Source and target Data
									</Typography>
									<Typography variant="body2">
										Analyze differences between source and target records, and
										review matches.
									</Typography>
								</Box>
								{/* right */}
								<Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
									<SearchComponent></SearchComponent>
									<ToggleMenu
										toggleOption={menuTableOption}
										setToggleOption={setMenuTableOption}
										size="small"
										toggleMenuData={txt.project.menuTable}></ToggleMenu>
									<Box sx={{ display: "flex" }}>
										<FileDownloadOutlinedIcon></FileDownloadOutlinedIcon>
										<Typography variant="body1" color="initial">
											Export
										</Typography>
									</Box>
									<FilterAltOutlined></FilterAltOutlined>
								</Box>
							</Box>
						</Box>

						{/* Second option -- based on selected option */}
						<Box sx={{}}>
							<Box
								sx={{
									padding: "1%",
									marginBottom: "5px",
									display: "flex",
									justifyContent: "space-between",
								}}>
								<Typography>Matched Records</Typography>
								<SettingsOutlined></SettingsOutlined>
							</Box>
							<DataTable
								checkboxSelection={false}
								dataGridType="reconciliation_matched"
								page={0}
								pageSize={5}
								rowsPerPage={[5, 10]}></DataTable>
						</Box>
					</Box>
				</main>
			</div>
		</>
	);
};

export default Project;
