import { useParams } from "react-router-dom";
import BannerHeader from "../components/BannerHeader/BannerHeader";
import { projectBreadcrumbs } from "../constants/breadcrumbs";
import "../style/css/MatchedTransaction.css";
import {
	PaidOutlined,
	StorageOutlined,
	FileDownloadOutlined,
	FilterAltOutlined,
	SettingsOutlined,
} from "@mui/icons-material";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { projectDetailCard } from "../constants/colors";
import SearchComponent from "../components/Search/Search";
import CustomizedButton from "../components/Buttons/CustomizedButton";
import { useState } from "react";
import DataTable from "../components/Table/DataTable";
import { mockMatchedTransaction1 } from "../mocks/api";
import { matchedData } from "../style/other/dataTableStyling";

const MatchedTransaction = () => {
	const { projectId } = useParams();
	const [_buttonClicked, setButtonClicked] = useState<boolean>(false);

	return (
		<div>
			<BannerHeader
				breadcrumbsData={projectBreadcrumbs.matchedRecords(projectId as string)}
				id="1"></BannerHeader>

			<div className="summary-project">
				{/* Summary Project */}
				<Box
					sx={{
						paddingLeft: "3%",
						paddingRight: "3%",

						display: "flex",
						justifyContent: "space-between",
					}}>
					{/* source */}
					<Box>
						<Box
							sx={{
								display: "flex",
								gap: 1,
								alignItems: "center",
							}}>
							<StorageOutlined
								sx={{
									fontSize: "40px",
									color: "whitesmoke",
								}}></StorageOutlined>
							<Typography
								sx={{
									fontSize: "45px",
									color: "whitesmoke",
								}}>
								10
							</Typography>
						</Box>
						<Box
							sx={{
								top: "-10px",
								position: "relative",
								display: "flex",
								justifyContent: "flex-end",
							}}>
							<Typography
								variant="caption"
								sx={{ color: projectDetailCard.greyishIconAndText }}>
								Total records from file A
							</Typography>
						</Box>
					</Box>

					<Box>
						<Box
							sx={{
								display: "flex",
								gap: 1,
								alignItems: "center",
							}}>
							<StorageOutlined
								sx={{
									fontSize: "40px",
									color: "whitesmoke",
								}}></StorageOutlined>
							<Typography
								sx={{
									fontSize: "45px",
									color: "whitesmoke",
								}}>
								15
							</Typography>
						</Box>
						<Box
							sx={{
								top: "-10px",
								position: "relative",
								display: "flex",
								justifyContent: "flex-end",
							}}>
							<Typography
								variant="caption"
								sx={{ color: projectDetailCard.greyishIconAndText }}>
								Total records from file B
							</Typography>
						</Box>
					</Box>

					<Box>
						<Box
							sx={{
								display: "flex",
								gap: 1,
								alignItems: "center",
							}}>
							<StorageOutlined
								sx={{
									fontSize: "40px",
									color: "whitesmoke",
								}}></StorageOutlined>
							<Typography
								sx={{
									fontSize: "45px",
									color: "whitesmoke",
								}}>
								25
							</Typography>
						</Box>
						<Box
							sx={{
								top: "-10px",
								position: "relative",
								display: "flex",
								justifyContent: "flex-end",
							}}>
							<Typography
								variant="caption"
								sx={{ color: projectDetailCard.greyishIconAndText }}>
								Total Records
							</Typography>
						</Box>
					</Box>

					<Box>
						<Box
							sx={{
								display: "flex",
								gap: 1,
								alignItems: "center",
							}}>
							<PaidOutlined
								sx={{
									fontSize: "40px",
									color: "whitesmoke",
								}}></PaidOutlined>
							<Typography
								sx={{
									fontSize: "45px",
									color: "whitesmoke",
								}}>
								$3638
							</Typography>
						</Box>
						<Box
							sx={{
								top: "-10px",
								position: "relative",
								display: "flex",
								justifyContent: "flex-end",
							}}>
							<Typography
								variant="caption"
								sx={{ color: projectDetailCard.greyishIconAndText }}>
								Matched Amount
							</Typography>
						</Box>
					</Box>
				</Box>
			</div>

			<div className="matched-transaction-content-container">
				{/* Tables */}
				<Box
					sx={{
						marginTop: "50px",
						backgroundColor: "#34343e",
						borderRadius: "10px",
					}}>
					{/* First Option --title and some option */}
					<Box
						sx={{
							paddingLeft: "3%",
							paddingRight: "3%",
							paddingTop: "1%",
							paddingBottom: "1%",
						}}>
						<Box
							sx={{
								alignItems: "center",
								justifyContent: "space-between",
								display: "flex",
							}}>
							{/* left */}

							<Typography variant="body1">Matched Transaction</Typography>

							{/* right */}
							<Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
								<CustomizedButton
									text={"Action"}
									setButtonClicked={setButtonClicked}></CustomizedButton>
								<SearchComponent></SearchComponent>

								<Box sx={{ display: "flex" }}>
									<FileDownloadOutlined></FileDownloadOutlined>
									<Typography variant="body1" color="initial">
										Export
									</Typography>
								</Box>
								<FilterAltOutlined></FilterAltOutlined>
							</Box>
						</Box>
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
				</Box>
			</div>
		</div>
	);
};

export default MatchedTransaction;
