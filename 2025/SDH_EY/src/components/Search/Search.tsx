import { Search } from "@mui/icons-material";
import { InputBase } from "@mui/material";
import { Box } from "@mui/system";

const SearchComponent = () => {
	return (
		<Box
			sx={{
				display: "flex",
				alignItems: "center",
			}}>
			<Search />
			<InputBase
				placeholder="Search"
				size="small"
				sx={{ ml: 1, color: "whitesmoke" }}
			/>
		</Box>
	);
};

export default SearchComponent;
