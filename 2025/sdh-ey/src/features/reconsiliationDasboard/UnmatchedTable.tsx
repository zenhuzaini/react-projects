import {
	Box,
	Typography,
	Button,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Checkbox,
	IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import FilterListIcon from "@mui/icons-material/FilterList";

export default function UnmatchedTable() {
	const fileA = [
		{ id: 1, cocd: 1, profit: 101, bal: "$1000", re: "DB" },
		{ id: 2, cocd: 2, profit: 101, bal: "$700", re: "DB" },
		{ id: 3, cocd: 3, profit: 101, bal: "$400", re: "DB" },
		{ id: 4, cocd: 1, profit: 102, bal: "$600", re: "DB" },
		{ id: 5, cocd: 2, profit: 102, bal: "$100", re: "DB" },
	];

	const fileB = [
		{ id: 1, comp: 1, profit: 101, amount: "$300" },
		{ id: 2, comp: 2, profit: 101, amount: "$200" },
		{ id: 3, comp: 3, profit: 101, amount: "$1000" },
		{ id: 4, comp: 1, profit: 102, amount: "$700" },
		{ id: 5, comp: 2, profit: 102, amount: "$100" },
	];

	const renderHeader = (label: string) => (
		<Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
			<Typography variant="body2" sx={{ fontWeight: 600, color: "white" }}>
				{label}
			</Typography>
			<ArrowDropDownIcon fontSize="small" sx={{ color: "gray" }} />
			<FilterListIcon fontSize="small" sx={{ color: "gray" }} />
		</Box>
	);

	return (
		<Box sx={{ bgcolor: "#1e1e2e", color: "#fff", minHeight: "100vh", p: 3 }}>
			{/* Top summary cards */}
			<Box sx={{ display: "flex", gap: 2, mt: 2 }}>
				<Paper sx={{ p: 2, flex: 1, bgcolor: "#2a2a3d", textAlign: "center" }}>
					<Typography variant="h5">38</Typography>
					<Typography variant="body2">Total Unmatched Records</Typography>
				</Paper>
				<Paper sx={{ p: 2, flex: 1, bgcolor: "#2a2a3d", textAlign: "center" }}>
					<Typography variant="h5">$11642.28</Typography>
					<Typography variant="body2">Total Unmatched Amount</Typography>
				</Paper>
				<Paper sx={{ p: 2, flex: 1, bgcolor: "#2a2a3d", textAlign: "center" }}>
					<Typography variant="h5">$1000</Typography>
					<Typography variant="body2">Calculated Amount</Typography>
				</Paper>
				<Paper sx={{ p: 2, flex: 1, bgcolor: "#2a2a3d", textAlign: "center" }}>
					<Typography variant="h5">$500</Typography>
					<Typography variant="body2">Difference Amount</Typography>
				</Paper>
			</Box>

			{/* Actions Button */}
			<Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
				<Button variant="contained" sx={{ bgcolor: "#ffeb3b", color: "black" }}>
					Actions
				</Button>
			</Box>

			{/* File Comparison Tables */}
			<Box sx={{ display: "flex", gap: 2, mt: 3 }}>
				{/* File A */}
				<TableContainer component={Paper} sx={{ flex: 1, bgcolor: "#2a2a3d" }}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell sx={{ color: "white" }}>Status</TableCell>
								<TableCell>{renderHeader("CoCd")}</TableCell>
								<TableCell>{renderHeader("Profit Ctr")}</TableCell>
								<TableCell>{renderHeader("BAL C/F")}</TableCell>
								<TableCell>{renderHeader("RE")}</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{fileA.map((row) => (
								<TableRow key={row.id}>
									<TableCell>
										<Checkbox sx={{ color: "white" }} />
										<IconButton size="small" color="error">
											<CloseIcon />
										</IconButton>
									</TableCell>
									<TableCell sx={{ color: "white" }}>{row.cocd}</TableCell>
									<TableCell sx={{ color: "white" }}>{row.profit}</TableCell>
									<TableCell sx={{ color: "white" }}>{row.bal}</TableCell>
									<TableCell sx={{ color: "white" }}>{row.re}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>

				{/* File B */}
				<TableContainer component={Paper} sx={{ flex: 1, bgcolor: "#2a2a3d" }}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell sx={{ color: "white" }}>Status</TableCell>
								<TableCell>{renderHeader("Comp")}</TableCell>
								<TableCell>{renderHeader("Profit Ctr")}</TableCell>
								<TableCell>{renderHeader("Amount")}</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{fileB.map((row) => (
								<TableRow key={row.id}>
									<TableCell>
										<Checkbox sx={{ color: "white" }} />
										<IconButton size="small" color="error">
											<CloseIcon />
										</IconButton>
									</TableCell>
									<TableCell sx={{ color: "white" }}>{row.comp}</TableCell>
									<TableCell sx={{ color: "white" }}>{row.profit}</TableCell>
									<TableCell sx={{ color: "white" }}>{row.amount}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Box>
		</Box>
	);
}
