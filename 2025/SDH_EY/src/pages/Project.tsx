import { useState } from "react";
import BannerHeader from "../components/BannerHeader/BannerHeader";
import { projectBreadcrumbs } from "../constants/breadcrumbs";
import { txt } from "../constants/text";
import type {
	historyVersionType,
	toggleOptionsType,
} from "../types/components";
import { versionOptions } from "../mocks/versions";
import "../style/css/Project.css";
import SelectVersion from "../components/Select/SelectVersion";
import ToggleMenu from "../components/Menus/ToggleMenu";
import ProjectDetailCard from "../components/Cards/ProjectDetailCard";
import ProjectSummaryCard from "../components/Cards/ProjectSummaryCard";
import { Box } from "@mui/system";
import { Divider, Typography } from "@mui/material";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { FilterAltOutlined, SettingsOutlined } from "@mui/icons-material";
import SearchComponent from "../components/Search/Search";
import DataTable from "../components/Table/DataTable";
import {
	dataCardMock,
	mockMatchedRecords,
	mockMatchedTransaction1,
} from "../mocks/api";
import { matchedData } from "../style/other/dataTableStyling";
import CustomizedButton from "../components/Buttons/CustomizedButton";
import ProjectCardBasic from "../components/Cards/ProjectCardBasic";
import { StorageOutlined } from "@mui/icons-material";
import FileUploadComponent from "../components/FileUpload/FileUploadComponent";

const Project = () => {
	const [version, _setVersion] = useState<historyVersionType[]>(versionOptions);
	const [selectedIdVersion, setSelectedIdVersion] = useState<string>("");
	const [toggleOption, setToggleOption] =
		useState<toggleOptionsType>("dataSource");
	const [menuDataTableOption, setMenuDataTableOption] =
		useState<toggleOptionsType>("matched");
	const [_buttonClicked, setButtonClicked] = useState<boolean>(false);

	//to
	const dataTableViewOption = () => {
		switch (menuDataTableOption) {
			case "matched":
				return (
					<div>
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
							data={mockMatchedRecords()}
							checkboxSelection={false}
							dataGridType="reconciliation_matched"
							page={0}
							pageSize={5}
							rowsPerPage={[5, 10, 15, 20]}
							sx={matchedData}></DataTable>
					</div>
				);
				break;
			case "unmatched":
				return (
					<div>
						<Box
							sx={{
								padding: "1%",
								marginBottom: "5px",
								display: "flex",
								justifyContent: "space-between",
							}}>
							<Typography>Unmatched Records</Typography>
							<CustomizedButton
								text={"Action"}
								setButtonClicked={setButtonClicked}></CustomizedButton>
						</Box>

						<Box
							sx={{
								marginLeft: "1%",
								marginBottom: "2%",
								display: "flex",
								gap: 3,
							}}>
							<ProjectCardBasic data={dataCardMock}></ProjectCardBasic>
						</Box>

						{/* File A / B typography */}
						<Box
							sx={{
								display: "flex",
								gap: 2,
								marginBottom: "1%",
							}}>
							<Box
								sx={{
									alignItems: "center",
									paddingLeft: "3%",
									paddingRight: "5%",
									flex: 1,
									minWidth: 0,
									display: "flex",
									justifyContent: "space-between",
								}}>
								<Typography variant="body2" color="initial">
									File A
								</Typography>
								<SettingsOutlined></SettingsOutlined>
							</Box>

							<Box
								sx={{
									alignItems: "center",
									paddingLeft: "3%",
									paddingRight: "3%",
									flex: 1,
									minWidth: 0,
									display: "flex",
									justifyContent: "space-between",
								}}>
								<Typography variant="body2" color="initial">
									File b
								</Typography>
								<SettingsOutlined></SettingsOutlined>
							</Box>
						</Box>

						{/* Table A / B  */}
						<Box sx={{ display: "flex", gap: 2 }}>
							<Box sx={{ flex: 1, minWidth: 0 }}>
								<div style={{ height: "100%" }}>
									<DataTable
										data={mockMatchedTransaction1(15)}
										checkboxSelection={false}
										dataGridType="reconciliation_matched"
										rowsPerPage={[5, 10, 15]}
										page={0}
										pageSize={5}
										sx={{
											// width: "50%",
											...matchedData,
										}}></DataTable>
								</div>
							</Box>

							<Box sx={{ flex: 1, minWidth: 0 }}>
								<div style={{ height: "100%" }}>
									<DataTable
										data={mockMatchedTransaction1(15)}
										checkboxSelection={false}
										dataGridType="reconciliation_matched"
										rowsPerPage={[5, 10, 15]}
										page={0}
										pageSize={5}
										sx={{
											// width: "50%",
											...matchedData,
										}}></DataTable>
								</div>
							</Box>
						</Box>
					</div>
				);
				break;
			case "partialMatched":
				break;
			default:
				break;
		}
	};

	// this is to shew if the user wants to pick data source, reconciliation or audit
	const projectViewOptions = () => {
		switch (toggleOption) {
			case "reconciliation":
				return (
					<div>
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
											toggleOption={menuDataTableOption}
											setToggleOption={setMenuDataTableOption}
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

							{/* Second option -- based on selected menu option */}
							<Box sx={{}}>{dataTableViewOption()}</Box>
						</Box>
					</div>
				);
				break;
			case "dataSource":
				return (
					<div>
						<Box
							sx={{
								padding: "1%",
								// width: "100px",
								height: "max-content",
								backgroundColor: "#32323dff",
								borderRadius: "10px",
							}}>
							<Typography variant="body2" color="initial">
								Upload Data
							</Typography>
							<Box sx={{ marginTop: "2%" }}>
								<Box
									sx={{
										display: "flex",
										gap: 1,
										alignItems: "center",
										marginBottom: "1%",
									}}>
									<StorageOutlined></StorageOutlined>
									<Typography variant="body2" color="initial">
										File upload section
									</Typography>
								</Box>
								<Divider></Divider>
								<FileUploadComponent />
							</Box>
						</Box>
					</div>
				);
				break;
			case "audit":
				return (
					<div>
						<div>
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
									<Box
										sx={{ justifyContent: "space-between", display: "flex" }}>
										{/* left */}
										<Box>
											<Typography variant="body1">
												Compare Source and target Data
											</Typography>
											<Typography variant="body2">
												Analyze differences between source and target records,
												and review matches.
											</Typography>
										</Box>
										{/* right */}
										<Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
											<SearchComponent></SearchComponent>
											<ToggleMenu
												toggleOption={menuDataTableOption}
												setToggleOption={setMenuDataTableOption}
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
										<Typography>Unmatched Records</Typography>
										<CustomizedButton
											text={"Action"}
											setButtonClicked={setButtonClicked}></CustomizedButton>
									</Box>
									<DataTable
										data={mockMatchedRecords()}
										checkboxSelection={false}
										dataGridType="reconciliation_matched"
										page={0}
										pageSize={5}
										rowsPerPage={[5, 10, 15, 20]}
										sx={matchedData}></DataTable>
								</Box>
							</Box>
						</div>
					</div>
				);
				break;
			default:
				return null;
		}
	};
	return (
		<div>
			<BannerHeader
				breadcrumbsData={projectBreadcrumbs.projectReconciliation}
				title={txt.project.reconciliation.title}
				id="3"
				description={txt.project.reconciliation.description}>
				{toggleOption === "reconciliation" && (
					<SelectVersion
						versions={version}
						selectedIdVersion={selectedIdVersion}
						setSelectedIdVersion={setSelectedIdVersion}></SelectVersion>
				)}
			</BannerHeader>

			<div className="menuProject">
				<ToggleMenu
					toggleOption={toggleOption}
					setToggleOption={setToggleOption}
					toggleMenuData={txt.project.menus}></ToggleMenu>
			</div>

			{/* This will depend on the content */}

			<main className="main-content-container-project">
				{projectViewOptions()}
			</main>
		</div>
	);
};

export default Project;
