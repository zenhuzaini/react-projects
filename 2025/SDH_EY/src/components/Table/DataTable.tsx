import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import type { DataTablePropsType } from "../../types/components";
import { formatString } from "../../services/utils";

export default function DataTable({
	checkboxSelection,
	dataGridType = "reconciliation_matched",
	page = 0,
	pageSize = 5,
	rowsPerPage = [5, 10],
	sx,
	data,
}: DataTablePropsType) {
	const columns: GridColDef[] = data.columns.map((column, id) => {
		return {
			field: column.name,
			headerName: formatString(column.name),
			sortable: true,
			width: id < 2 ? 200 : 150,
		};
	});
	return (
		<Paper sx={{ width: "100%" }}>
			<DataGrid
				columnHeaderHeight={45}
				density="comfortable"
				rows={data.rows}
				columns={columns}
				initialState={{ pagination: { paginationModel: { page, pageSize } } }}
				pageSizeOptions={rowsPerPage}
				checkboxSelection={checkboxSelection}
				sx={sx}
			/>
		</Paper>
	);
}
