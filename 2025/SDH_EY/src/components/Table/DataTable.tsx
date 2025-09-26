import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import type { DataTablePropsType } from "../../types/components";
import styled from "@emotion/styled";
// import "../../css/dataTable.css";

const columns: GridColDef[] = [
	{ field: "id", headerName: "ID", width: 50 },
	{ field: "firstName", headerName: "First name" },
	{ field: "lastName", headerName: "Last name", width: 130 },
	{
		field: "age",
		headerName: "Age",
		// type: "number",
		width: 90,
	},
	{
		field: "fullName",
		headerName: "Full name",
		description: "This column has a value getter and is not sortable.",
		sortable: false,
		width: 160,
		valueGetter: (_value: any, row: { firstName: any; lastName: any }) =>
			`${row.firstName || ""} ${row.lastName || ""}`,
	},
];

const rows = [
	{ id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
	{ id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
	{ id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
	{ id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
	{ id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
	{ id: 6, lastName: "Melisandre", firstName: null, age: 150 },
	{ id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
	{ id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
	{ id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

export default function DataTable({
	checkboxSelection,
	dataGridType = "reconciliation_matched",
	page = 0,
	pageSize = 5,
	rowsPerPage = [5, 10],
}: DataTablePropsType) {
	const ROW_HEIGHT = 54;
	const HEADER_HEIGHT = 53;
	return (
		<Paper sx={{ width: "100%" }}>
			<DataGrid
				columnHeaderHeight={45}
				density="comfortable"
				rows={rows}
				columns={columns}
				initialState={{ pagination: { paginationModel: { page, pageSize } } }}
				pageSizeOptions={rowsPerPage}
				checkboxSelection={checkboxSelection}
				sx={{
					fontFamily: "inherit",

					"& .MuiDataGrid-main": {
						border: 1,
					},

					// ROW CSS
					"& .MuiDataGrid-row": { backgroundColor: "#2c2744" },
					"& .MuiDataGrid-row:hover": {
						backgroundColor: "#362f39ff", // Your desired hover color
					},
					"& .MuiDataGrid-row.Mui-selected": {
						backgroundColor: "#151222ff", // Your selected row background color
						color: "#fff", // Optional: text color for contrast
						"&:hover": {
							backgroundColor: "#56497f", // Darker shade for hovered+selected
						},
					},
					// END ROW

					"& .MuiDataGrid-columnHeaders": {
						border: 0,
						borderTop: 0,
						borderBottom: 1,
						borderRadius: 0,
						backgroundColor: "#664343ff",
					},
					"& .MuiDataGrid-columnHeader": {
						backgroundColor: "#ffffffff !important",
					},
					"& .MuiDataGrid-columnHeaderTitle": {
						color: "#292945ff",
						fontWeight: 600,
					},

					"& .MuiDataGrid-cell": {
						color: "#fff",
						borderBottom: "none", //"1px solid #393869",
					},
					"& .MuiDataGrid-footerContainer": {
						backgroundColor: "#343439ff",
						// borderRadius: "10px",
						color: "#fff",
					},
					"& .MuiTablePagination-root": { color: "#fff" },
				}}
			/>
		</Paper>
	);
}
