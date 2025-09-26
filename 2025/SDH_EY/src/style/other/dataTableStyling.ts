export const matchedData = {
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
};
