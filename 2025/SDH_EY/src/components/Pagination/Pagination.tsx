import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function BasicPagination() {
	return (
		<div
			style={{
				borderRadius: "8px",
				// width: "500px",
				height: "50px",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",

				backgroundColor: "whitesmoke",
			}}>
			<Stack spacing={2}>
				<Pagination sx={{ color: "whitesmoke" }} count={10} color="primary" />
			</Stack>
		</div>
	);
}
