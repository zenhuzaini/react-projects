import React from "react";
import {
	Box,
	Paper,
	Typography,
	LinearProgress,
	TextField,
	IconButton,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

interface UploadedFileProps {
	filename: string;
	sizeKb: number;
	progress: number; // e.g. 0 to 100
	completed: boolean;
	setDescription: React.Dispatch<string>;
	description: string;
}

const UploadBarProgress: React.FC<UploadedFileProps> = ({
	filename,
	sizeKb,
	progress,
	completed,
	description,
	setDescription,
}) => {
	return (
		<Paper
			elevation={3}
			sx={{
				p: 2,
				borderRadius: 2,
				background: "#43424fff",
				color: "#fff",
				minWidth: 600,
			}}>
			<Box display="flex" alignItems="center" mb={1}>
				<InsertDriveFileIcon sx={{ fontSize: 40, color: "#A6A4B0" }} />
				<Box ml={2} flex="1">
					<Typography fontWeight={600} fontSize={20}>
						{filename}
					</Typography>
					<Typography variant="body2" color="#A6A4B0">
						{sizeKb} KB
					</Typography>
				</Box>
				{completed && (
					<IconButton>
						<CheckCircleIcon sx={{ color: "#A6E36F", fontSize: 28 }} />
					</IconButton>
				)}
			</Box>
			<Box>
				<LinearProgress
					variant="determinate"
					value={progress}
					sx={{
						height: 6,
						borderRadius: 2,
						background: "#39374A",
						"& .MuiLinearProgress-bar": { background: "#A6E36F" },
					}}
				/>
				<Box mt={1} display="flex" justifyContent="flex-end">
					<Typography fontSize={16} color="#A6A4B0">
						{progress}% completed
					</Typography>
				</Box>
			</Box>
			<Box mt={2}>
				<Typography color="#A6A4B0" fontSize={16}>
					Add descriptions to the uploaded files. (Optional)
				</Typography>

				<TextField
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					fullWidth
					variant="outlined"
					placeholder="Description"
					sx={{
						mt: 1,
						input: { color: "#fff" },
						"& .MuiOutlinedInput-root": {
							background: "#33323eff",
							borderRadius: 1,
							"& fieldset": { borderColor: "#39374A" },
						},
					}}
				/>
			</Box>
		</Paper>
	);
};

export default UploadBarProgress;
