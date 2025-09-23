import { Box } from "@mui/system";
import "../../css/ProjectCard.css";
import Typography from "@mui/material/Typography";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CircleIcon from "@mui/icons-material/Circle";
import { pojectCard } from "../../constants/colors";
import { Avatar } from "@mui/material";
import TodayOutlinedIcon from "@mui/icons-material/TodayOutlined";
import LoopOutlinedIcon from "@mui/icons-material/LoopOutlined";
import avatarCard from "../../assets/Avatar.png";
import type { ProjectPropsType } from "../../types/api";

const ProjectCards = ({ project }: ProjectPropsType) => {
	const onCardClick = () => {
		return;
	};
	return (
		<div
			// intentionally adding 2 inlines with style and class
			// for learning purposes
			className="card-container"
			style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
			}}
			onClick={onCardClick}>
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
				}}>
				<Box
					sx={{
						display: "flex",
						gap: 1,
						alignItems: "center",
					}}>
					<Typography variant="body1" color="initial">
						Q2 Final reconciliation
					</Typography>
					<ArrowForwardIcon sx={{ fontSize: "small" }}></ArrowForwardIcon>
				</Box>

				<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
					<CircleIcon
						sx={{
							fontSize: "small",
							color:
								project.status !== "Completed"
									? pojectCard.projectStatusColor.yellow
									: pojectCard.projectStatusColor.green,
						}}></CircleIcon>
					<Typography
						variant="subtitle2"
						color={
							project.status !== "Completed"
								? pojectCard.projectStatusColor.yellow
								: pojectCard.projectStatusColor.green
						}>
						{project.status}
					</Typography>
				</Box>
			</Box>

			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
				}}>
				<Box
					sx={{
						display: "flex",
						gap: 1,
					}}>
					<Avatar
						alt="Travis Howard"
						src={project.userPhoto ?? avatarCard}></Avatar>

					<Box>
						<h5>{project.name}</h5>
						<h6>{project.occupation}</h6>
					</Box>
				</Box>

				<Box>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							gap: 1,
						}}>
						<TodayOutlinedIcon
							sx={{
								fontSize: "medium",
								color: pojectCard.greyishIconAndText,
							}}></TodayOutlinedIcon>
						<Typography
							variant="subtitle2"
							sx={{ fontSize: 12, color: pojectCard.greyishIconAndText }}>
							Created on:
						</Typography>
						<Typography variant="subtitle2" sx={{ fontSize: 12 }}>
							{project.createdOn}
						</Typography>
					</Box>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							gap: 1,
						}}>
						<LoopOutlinedIcon
							sx={{
								fontSize: "medium",
								color: pojectCard.greyishIconAndText,
							}}></LoopOutlinedIcon>
						<Typography
							variant="subtitle2"
							sx={{ fontSize: 12, color: pojectCard.greyishIconAndText }}>
							Last Modified:
						</Typography>
						<Typography variant="subtitle2" sx={{ fontSize: 12 }}>
							{project.lastModified}
						</Typography>
					</Box>
				</Box>
			</Box>

			<Box>
				<p>{project.description}</p>
			</Box>
		</div>
	);
};

export default ProjectCards;
