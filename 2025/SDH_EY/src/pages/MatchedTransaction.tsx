import { useParams } from "react-router-dom";
import BannerHeader from "../components/BannerHeader/BannerHeader";
import { projectBreadcrumbs } from "../constants/breadcrumbs";
import "../style/css/MatchedTransaction.css";
import {
	PaidOutlined,
	StorageOutlined,
	FileDownloadOutlined,
	FilterAltOutlined,
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
								13.445
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
								Records in Source
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
								13.445
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
								Records in Source
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
								13.445
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
								Records in Source
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
								13.445
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
								Records in Source
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
