import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import "../../css/ProjectDetailCard.css";
import FolderIcon from "@mui/icons-material/Folder";
import LaunchIcon from "@mui/icons-material/Launch";
import CircleIcon from "@mui/icons-material/Circle";
import { projectDetailCard } from "../../constants/colors";
import { txt } from "../../constants/text";

const ProjectDetailCard = () => {
	return (
		<div className="project-detail-card-container">
			<Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
				<Box sx={{ display: "flex", justifyContent: "space-between" }}>
					<Box>
						<Typography
							sx={{ color: projectDetailCard.greyishIconAndText }}
							variant="caption">
							{txt.project.projectDetail.project}
						</Typography>
						<Typography variant="body2">Financial Reconciliation</Typography>
					</Box>

					<Box>
						<Typography
							sx={{ color: projectDetailCard.greyishIconAndText }}
							variant="caption">
							{txt.project.projectDetail.version}
						</Typography>
						<Typography variant="body2">v 2.1</Typography>
					</Box>

					<Box>
						<Typography
							sx={{ color: projectDetailCard.greyishIconAndText }}
							variant="caption">
							{txt.project.projectDetail.createdOn}
						</Typography>
						<Typography variant="body2">2025-06-01</Typography>
					</Box>
					<Box>
						<Typography
							sx={{ color: projectDetailCard.greyishIconAndText }}
							variant="caption">
							{txt.project.projectDetail.lastModified}
						</Typography>
						<Typography variant="body2">2025-07-01</Typography>
					</Box>
				</Box>
				<Box sx={{ display: "flex", gap: 3 }}>
					<Box>
						<Typography
							sx={{ color: projectDetailCard.greyishIconAndText }}
							variant="caption">
							{txt.project.projectDetail.sourceFile}
						</Typography>
						<Box
							sx={{
								padding: "10px",
								borderRadius: "5px",
								display: "flex",
								justifyContent: "flex-start",
								gap: 1,
								minWidth: "310px",
								backgroundColor: "#33474eff",
							}}>
							<FolderIcon sx={{ fontSize: "40px", color: "#34b7eb" }} />
							<Box>
								<Box
									sx={{
										display: "flex",
										// justifyContent: "space-between",
										gap: 1,
									}}>
									<Typography variant="body2" color="initial">
										Source File version1.xslsx
									</Typography>
									<LaunchIcon sx={{ fontSize: "18px", color: "#34b7eb" }} />
								</Box>
								<Box
									sx={{
										display: "flex",
										alignItems: "center",
										gap: 1,
										justifyContent: "flex-start",
									}}>
									<Typography variant="caption" color="initial">
										Sample
									</Typography>
									<CircleIcon sx={{ fontSize: "6px", color: "#d5f1fcff" }} />
									<Typography variant="caption" color="initial">
										Uploaded 2 months ago
									</Typography>
								</Box>
							</Box>
						</Box>
					</Box>

					<Box>
						<Typography
							sx={{ color: projectDetailCard.greyishIconAndText }}
							variant="caption">
							{txt.project.projectDetail.targetFile}
						</Typography>
						<Box
							sx={{
								padding: "10px",
								borderRadius: "5px",
								display: "flex",
								justifyContent: "flex-start",
								gap: 1,
								width: "310px",
								backgroundColor: "#33474eff",
							}}>
							<FolderIcon sx={{ fontSize: "40px", color: "#34b7eb" }} />
							<Box>
								<Box
									sx={{
										display: "flex",
										// justifyContent: "space-between",
										gap: 1,
									}}>
									<Typography variant="body2" color="initial">
										Target File version1.xslsx
									</Typography>
									<LaunchIcon sx={{ fontSize: "18px", color: "#34b7eb" }} />
								</Box>
								<Box
									sx={{
										display: "flex",
										alignItems: "center",
										gap: 1,
										justifyContent: "flex-start",
									}}>
									<Typography variant="caption" color="initial">
										Sample
									</Typography>
									<CircleIcon sx={{ fontSize: "6px", color: "#d5f1fcff" }} />
									<Typography variant="caption" color="initial">
										Uploaded 2 months ago
									</Typography>
								</Box>
							</Box>
						</Box>
					</Box>
				</Box>
			</Box>
		</div>
	);
};

export default ProjectDetailCard;
