// import { DataGrid } from "@mui/x-data-grid";
// import { ThemeProvider, createTheme } from "@mui/material/styles";
// import CssBaseline from "@mui/material/CssBaseline";
// import Link from "@mui/material/Link";

// const columns = [
// 	{
// 		field: "matchId",
// 		headerName: "Match ID",
// 		flex: 1,
// 		renderCell: (params: any) => (
// 			<Link href="#" underline="always" color="#65a5ff" fontWeight={400}>
// 				{params.value}
// 			</Link>
// 		),
// 		sortable: false,
// 		filterable: true,
// 	},
// 	{ field: "companyCode", headerName: "Company Code", flex: 1 },
// 	{ field: "profitCenter", headerName: "Profit Center", flex: 1 },
// 	{ field: "inputId", headerName: "Input ID", flex: 1 },
// 	{ field: "docType", headerName: "Doc type", flex: 1 },
// ];

// const rows = [
// 	{
// 		id: 0,
// 		matchId: "10012",
// 		companyCode: "Company1",
// 		profitCenter: "151002",
// 		inputId: "Fifa",
// 		docType: "AA",
// 	},
// 	{
// 		id: 1,
// 		matchId: "10013",
// 		companyCode: "Company3",
// 		profitCenter: "152003",
// 		inputId: "Fiap",
// 		docType: "AF",
// 	},
// 	{
// 		id: 2,
// 		matchId: "10014",
// 		companyCode: "Company5",
// 		profitCenter: "156004",
// 		inputId: "173C",
// 		docType: "KZ",
// 	},
// 	{
// 		id: 3,
// 		matchId: "10015",
// 		companyCode: "Company4",
// 		profitCenter: "156000",
// 		inputId: "12P",
// 		docType: "KN",
// 	},
// 	{
// 		id: 4,
// 		matchId: "10016",
// 		companyCode: "Company2",
// 		profitCenter: "151001",
// 		inputId: "TRSY",
// 		docType: "ZV",
// 	},
// ];

// const theme = createTheme({
// 	palette: {
// 		mode: "dark",
// 		background: {
// 			default: "#23223e",
// 			paper: "#23223e",
// 		},
// 		text: {
// 			primary: "#ffffff",
// 			secondary: "#c4c4cc",
// 		},
// 		primary: { main: "#393869" },
// 	},
// 	components: {
// 		MuiDataGrid: {
// 			styleOverrides: {
// 				root: {
// 					border: 0,
// 					color: "#fff",
// 					backgroundColor: "#23223e",
// 				},
// 				columnHeaders: {
// 					backgroundColor: "#24243a",
// 					color: "#c4c4cc",
// 					fontWeight: 500,
// 					fontSize: "1rem",
// 				},
// 				cell: {
// 					backgroundColor: "#2c2744",
// 					color: "#fff",
// 					borderBottom: "1px solid #393869",
// 				},
// 				footerContainer: {
// 					backgroundColor: "#23223e",
// 				},
// 			},
// 		},
// 	},
// });

// export default function CustomDataGrid() {
// 	return (
// 		<ThemeProvider theme={theme}>
// 			<CssBaseline />
// 			<div style={{ height: 420, width: "100%", background: "#23223e" }}>
// 				<DataGrid
// 					columns={columns}
// 					rows={rows}
// 					pageSize={9}
// 					rowsPerPageOptions={[9]}
// 					disableSelectionOnClick
// 					sx={{
// 						fontFamily: "inherit",
// 						"& .MuiDataGrid-row": { backgroundColor: "#2c2744" },
// 						"& .Mui-selected": { backgroundColor: "rgba(100,100,100,0.1)" },
// 						"& .MuiDataGrid-columnHeaders": {
// 							backgroundColor: "#24243a",
// 							color: "#c4c4cc",
// 						},
// 						"& .MuiDataGrid-footerContainer": {
// 							backgroundColor: "#23223e",
// 							color: "#fff",
// 						},
// 						"& .MuiDataGrid-cell": {
// 							color: "#fff",
// 							borderBottom: "1px solid #393869",
// 						},
// 						"& .MuiTablePagination-root": { color: "#fff" },
// 					}}
// 					pagination
// 				/>
// 			</div>
// 		</ThemeProvider>
// 	);
// }
