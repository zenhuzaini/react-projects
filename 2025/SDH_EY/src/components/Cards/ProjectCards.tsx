import { Box, flex } from "@mui/system";
import React from "react";
import "../../css/ProjectCard.css";
import Typography from "@mui/material/Typography";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CircleIcon from "@mui/icons-material/Circle";
import { projectStatusColor } from "../../constants/colors";
import { Avatar } from "@mui/material";
import TodayOutlinedIcon from "@mui/icons-material/TodayOutlined";
import LoopOutlinedIcon from "@mui/icons-material/LoopOutlined";
import avatarCard from "../../assets/Avatar.png";

const ProjectCards = () => {
	return (
		<div className="card-container">
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
							color: projectStatusColor.yellow,
						}}></CircleIcon>
					<Typography variant="subtitle2" color={projectStatusColor.yellow}>
						In Progress
					</Typography>
				</Box>
			</Box>

			<Box
				sx={{
					display: "flex",
					gap: 1,
				}}>
				<Avatar alt="Travis Howard" src={avatarCard}></Avatar>

				<Box>
					<h5>Ben House</h5>
					<h6>Project Owner</h6>
				</Box>

				<Box>
					<Box>
						<TodayOutlinedIcon></TodayOutlinedIcon>
					</Box>
					<Box>
						<LoopOutlinedIcon></LoopOutlinedIcon>
					</Box>
				</Box>
			</Box>

			<Box>
				<p>matches financial transaction data between SAP and Oracle</p>
			</Box>
		</div>
	);
};

export default ProjectCards;
