import {
	Box,
	Card,
	CardContent,
	Divider,
	Grid,
	Typography,
} from "@mui/material";
// import FolderIcon from "@mui/icons-material/Folder";
import FolderIcon from "@mui/icons-material/Folder";
import AdjustIcon from "@mui/icons-material/Adjust";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CancelIcon from "@mui/icons-material/Cancel";
import StorageIcon from "@mui/icons-material/Storage";

const ProjectSummary = () => {
	return (
		<>
			<Grid container spacing={2}>
				<Grid size={{ xs: 12, md: 6 }}>
					{/* Left Card */}
					<Card
						sx={{
							backgroundColor: "#1e1e2f",
							color: "white",
							borderRadius: 3,
						}}>
						<CardContent>
							<Grid container spacing={2}>
								<Grid size={{ xs: 12, sm: 6 }}>
									<Typography variant="subtitle2" color="gray">
										Project
									</Typography>
									<Typography variant="h6">Financial Reconciliation</Typography>
								</Grid>
								<Grid size={{ xs: 4, sm: 2 }}>
									<Typography variant="subtitle2" color="gray">
										Version
									</Typography>
									<Typography>v 2.1</Typography>
								</Grid>
								<Grid size={{ xs: 4, sm: 2 }}>
									<Typography variant="subtitle2" color="gray">
										Created On
									</Typography>
									<Typography>2025-06-01</Typography>
								</Grid>
								<Grid size={{ xs: 4, sm: 2 }}>
									<Typography variant="subtitle2" color="gray">
										Last Modified
									</Typography>
									<Typography>2025-07-22</Typography>
								</Grid>
							</Grid>

							<Divider sx={{ my: 2 }} />

							<Grid container spacing={2}>
								<Grid size={{ xs: 12, sm: 6 }}>
									<Box
										sx={{
											display: "flex",
											alignItems: "center",
											gap: 1,
											backgroundColor: "#2a2a3d",
											p: 2,
											borderRadius: 2,
										}}>
										<FolderIcon fontSize="large" />
										<Box>
											<Typography fontWeight="bold">
												Source file version 1.xlsx
											</Typography>
											<Typography variant="body2" color="gray">
												Sample • Uploaded 2 months ago
											</Typography>
										</Box>
									</Box>
								</Grid>
								<Grid size={{ xs: 12, sm: 6 }}>
									<Box
										sx={{
											display: "flex",
											alignItems: "center",
											gap: 1,
											backgroundColor: "#2a2a3d",
											p: 2,
											borderRadius: 2,
										}}>
										<FolderIcon fontSize="large" />
										<Box>
											<Typography fontWeight="bold">
												Target file version 1.xlsx
											</Typography>
											<Typography variant="body2" color="gray">
												Sample • Uploaded 2 months ago
											</Typography>
										</Box>
									</Box>
								</Grid>
							</Grid>
						</CardContent>
					</Card>
				</Grid>

				{/* Right Card */}
				<Grid size={{ xs: 12, md: 6 }}>
					<Card
						sx={{
							background: "linear-gradient(135deg, #0f2c49, #2b185f)",
							color: "white",
							borderRadius: 3,
							height: "100%",
						}}>
						<CardContent>
							<Grid container spacing={3}>
								<Grid size={{ xs: 6, sm: 4 }}>
									<Box>
										<Grid container spacing={4}>
											<Grid size={2}>
												<StorageIcon fontSize="large" />
											</Grid>
											<Grid size={10}>
												<Typography variant="h5" fontWeight="bold">
													15,000
												</Typography>
												<Typography variant="body2">
													Records in Source
												</Typography>
											</Grid>
										</Grid>
									</Box>
								</Grid>

								<Grid size={{ xs: 6, sm: 4 }}>
									<Box>
										<Grid container spacing={4}>
											<Grid size={2}>
												<AdjustIcon fontSize="large" />
											</Grid>
											<Grid size={10}>
												<Typography variant="h5" fontWeight="bold">
													14,750
												</Typography>
												<Typography variant="body2">
													Records in Target
												</Typography>
											</Grid>
										</Grid>
									</Box>
								</Grid>

								<Grid size={{ xs: 6, sm: 4 }}>
									<Box>
										<Grid container spacing={4}>
											<Grid size={2}>
												<CheckCircleIcon fontSize="large" />
											</Grid>
											<Grid size={10}>
												<Typography variant="h5" fontWeight="bold">
													14,759
												</Typography>
												<Typography variant="body2">Matched Records</Typography>
											</Grid>
										</Grid>
									</Box>
								</Grid>

								<Grid size={{ xs: 6, sm: 4 }}>
									<Box>
										<Grid container spacing={4}>
											<Grid size={2}>
												<CancelIcon fontSize="large" />
											</Grid>
											<Grid size={10}>
												<Typography variant="h5" fontWeight="bold">
													789
												</Typography>
												<Typography variant="body2">
													Unmatched Records
												</Typography>
											</Grid>
										</Grid>
									</Box>
								</Grid>

								<Grid size={{ xs: 6, sm: 4 }}>
									<Box>
										<Grid container spacing={4}>
											<Grid size={2}>
												<AccessTimeIcon fontSize="large" />
											</Grid>
											<Grid size={10}>
												<Typography variant="h5" fontWeight="bold">
													00:03:47
												</Typography>
												<Typography variant="body2">Processing Time</Typography>
											</Grid>
										</Grid>
									</Box>
								</Grid>
							</Grid>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</>
	);
};

export default ProjectSummary;
