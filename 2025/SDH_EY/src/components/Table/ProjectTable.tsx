import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import type { ProjectTablePropsType } from "../../types/components";
import { Avatar, Box, Link, Typography } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import { tableProjectColor, pojectCard } from "../../constants/colors";

export default function ProjectTable({
	projects,
	column,
}: ProjectTablePropsType) {
	const tableColumnCell = column.map((col) => {
		return (
			<TableCell
				sx={{ color: tableProjectColor.greyishIconAndText }}
				align="left">
				{col}
			</TableCell>
		);
	});

	const tableContent = projects.map((row) => (
		<TableRow
			key={row.name}
			sx={{
				"&:last-child td, &:last-child th": {
					border: 0,
				},
				backgroundColor: tableProjectColor.rowBackground,
			}}>
			<TableCell
				sx={{ color: tableProjectColor.greyishIconAndText }}
				component="th"
				scope="row">
				<Link href="#" underline="hover">
					{row.title}
				</Link>
			</TableCell>
			<TableCell
				sx={{ color: tableProjectColor.greyishIconAndText }}
				align="left">
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						gap: 1,
					}}>
					<Avatar alt="Travis Howard" src={row.userPhoto}></Avatar>
					<h5>{row.name}</h5>
				</Box>
			</TableCell>

			<TableCell
				sx={{ color: tableProjectColor.greyishIconAndText }}
				align="left">
				{row.createdOn}
			</TableCell>

			<TableCell
				sx={{ color: tableProjectColor.greyishIconAndText }}
				align="left">
				{row.lastModified}
			</TableCell>

			<TableCell
				sx={{ color: tableProjectColor.greyishIconAndText }}
				align="left">
				<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
					<CircleIcon
						sx={{
							fontSize: "small",
							color:
								row.status !== "Completed"
									? pojectCard.projectStatusColor.yellow
									: pojectCard.projectStatusColor.green,
						}}></CircleIcon>
					<Typography
						variant="subtitle2"
						color={
							row.status !== "Completed"
								? pojectCard.projectStatusColor.yellow
								: pojectCard.projectStatusColor.green
						}>
						{row.status}
					</Typography>
				</Box>
			</TableCell>

			<TableCell
				sx={{ color: tableProjectColor.greyishIconAndText }}
				align="left">
				{row.description}
			</TableCell>
		</TableRow>
	));

	return (
		<TableContainer sx={{ borderRadius: 3 }} component={Paper}>
			<Table sx={{ minWidth: 650 }} aria-label="simple table">
				<TableHead
					sx={{
						backgroundColor: pojectCard.cardBackground,
					}}>
					<TableRow>{tableColumnCell}</TableRow>
				</TableHead>
				<TableBody>{tableContent}</TableBody>
			</Table>
		</TableContainer>
	);
}
