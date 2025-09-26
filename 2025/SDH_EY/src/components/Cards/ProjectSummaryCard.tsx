import { Box, Typography } from "@mui/material";
import "../../style/css/ProjectSummaryCard.css";

import {
	StorageOutlined,
	ShowChartOutlined,
	DoneAllOutlined,
	AccessTimeOutlined,
	CancelOutlined,
} from "@mui/icons-material";

import { projectDetailCard } from "../../constants/colors";

const ProjectSummaryCard = () => {
	return (
		<div
			className="project-summary-card-container"
			style={{ paddingLeft: "1.5%", paddingRight: "1.5%" }}>
			{/* Line 1 ... using wrap doesnt work. better to divide into 2 lines */}
			<Box
				sx={{
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
						<ShowChartOutlined
							sx={{
								fontSize: "40px",
								color: "whitesmoke",
							}}></ShowChartOutlined>
						<Typography
							sx={{
								fontSize: "45px",
								color: "whitesmoke",
							}}>
							44.056
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
							Records in Target
						</Typography>
					</Box>
				</Box>

				{/* Processing time */}
				<Box>
					<Box
						sx={{
							display: "flex",
							gap: 1,
							alignItems: "center",
						}}>
						<AccessTimeOutlined
							sx={{
								fontSize: "40px",
								color: "whitesmoke",
							}}></AccessTimeOutlined>
						<Typography
							sx={{
								fontSize: "45px",
								color: "whitesmoke",
							}}>
							11.445
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
							Processing Time
						</Typography>
					</Box>
				</Box>
			</Box>

			{/* line 2 */}
			<Box
				sx={{
					display: "flex",
					justifyContent: "flex-start",
					gap: 8,
				}}>
				{/* Matched record */}
				<Box>
					<Box
						sx={{
							display: "flex",
							gap: 1,
							alignItems: "center",
						}}>
						<DoneAllOutlined
							sx={{
								fontSize: "40px",
								color: "whitesmoke",
							}}></DoneAllOutlined>
						<Typography
							sx={{
								fontSize: "45px",
								color: "whitesmoke",
							}}>
							6789
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
							Matched Record
						</Typography>
					</Box>
				</Box>

				{/* Un Match Records */}
				<Box>
					<Box
						sx={{
							display: "flex",
							gap: 1,
							alignItems: "center",
						}}>
						<CancelOutlined
							sx={{
								fontSize: "40px",
								color: "whitesmoke",
							}}></CancelOutlined>
						<Typography
							sx={{
								fontSize: "45px",
								color: "whitesmoke",
							}}>
							6789
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
							Unmatched Result
						</Typography>
					</Box>
				</Box>
			</Box>
		</div>
	);
};

export default ProjectSummaryCard;
