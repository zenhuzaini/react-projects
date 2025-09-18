import React, { useEffect, useState } from "react";
import {
	Box,
	Button,
	IconButton,
	InputBase,
	Menu,
	MenuItem,
	Pagination,
	TextField,
	ToggleButton,
	ToggleButtonGroup,
	Typography,
} from "@mui/material";
import MatchedTable from "./MatchedTable";
import ProjectSummary from "./ProjectSummary";
import UnmatchedTable from "./UnmatchedTable";
import { Download, FilterAlt, Search as SearchIcon } from "@mui/icons-material";

function ReconsiliationDashboard() {
	const [tableType, setTableType] = useState<string>("matched");
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	const handleToggle = (
		event: React.MouseEvent<HTMLElement>,
		newTableType: string | null
	) => {
		if (newTableType !== null) setTableType(newTableType);
	};

	const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => setAnchorEl(null);

	return (
		<Box
			sx={{
				p: 3,
				// backgroundColor: "#0f172a",
			}}>
			<ProjectSummary />

			<Box
				sx={{
					marginTop: 3,
					p: 3,
					backgroundColor: "#0f172a",
					// minHeight: "100vh",
					borderRadius: 3,
					color: "white",
				}}>
				<div style={{ width: "100%" }}>
					<Box
						sx={{
							display: "flex",
							justifyContent: "space-between",
							p: 1,
							m: 1,

							borderRadius: 1,
						}}>
						{/* left with Logo */}
						<div style={{ color: "white", alignItems: "center", gap: 10 }}>
							<Typography variant="h6" gutterBottom>
								Compare Source and Target Data
							</Typography>
							<Typography variant="body2" sx={{ mb: 2 }}>
								Analyze differences between source and target records, and
								review matches.
							</Typography>
						</div>

						{/* Right */}
						<Box
							sx={{
								flexFlow: 1,
								display: "flex",
								alignItems: "right",
								gap: 1,
							}}>
							<Box display="flex" alignItems="center" gap={2}>
								<Box
									sx={{
										display: "flex",
										alignItems: "center",
										px: 1,
										borderRadius: 2,
										mr: 1,
									}}>
									<SearchIcon />
									<InputBase
										placeholder="Search"
										sx={{ ml: 1, color: "inherit" }}
									/>
								</Box>
								<div style={{ color: "white" }}>
									<ToggleButtonGroup
										value={tableType}
										exclusive
										onChange={handleToggle}
										size="small"
										color="primary">
										<ToggleButton color="primary" value="matched">
											<span style={{ color: "white" }}>Matched</span>
										</ToggleButton>
										<ToggleButton value="unmatched">
											<span style={{ color: "white" }}>Unmatched</span>
										</ToggleButton>
										<ToggleButton value="partial">
											<span style={{ color: "white" }}>Partial Matched</span>
										</ToggleButton>
									</ToggleButtonGroup>
								</div>

								<Button
									variant="outlined"
									startIcon={<Download />}
									sx={{ color: "white", borderColor: "gray" }}>
									Export
								</Button>

								<IconButton onClick={handleMenuOpen} sx={{ color: "white" }}>
									<FilterAlt />
								</IconButton>
								<Menu
									anchorEl={anchorEl}
									open={Boolean(anchorEl)}
									onClose={handleMenuClose}>
									<MenuItem>Filter by Company</MenuItem>
									<MenuItem>Filter by Amount</MenuItem>
								</Menu>
							</Box>
						</Box>
					</Box>
				</div>
				{/* ===== BOTTOM SECTION: MATCHED RECORDS TABLE ===== */}
				<Box>
					{/* Table */}
					{tableType === "matched" && <MatchedTable />}
					{tableType === "unmatched" && <UnmatchedTable />}
					{tableType === "partial" && <h2>To add</h2>}
				</Box>
			</Box>
		</Box>
	);
}

export default ReconsiliationDashboard;
