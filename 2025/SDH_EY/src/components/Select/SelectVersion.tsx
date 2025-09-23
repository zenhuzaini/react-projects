import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { type SelectChangeEvent } from "@mui/material/Select";
import { txt } from "../../constants/text";
import type { historyVersionPropsType } from "../../types/components";
import Select from "@mui/material/Select";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";

export default function SelectVersion({
	versions,
	selectedIdVersion,
	setSelectedIdVersion,
}: historyVersionPropsType) {
	const options = versions.map((version, i) => {
		return (
			<MenuItem key={i} value={version.id}>
				<Box
					sx={{
						display: "flex",
						gap: 3,
						justifyContent: "space-between",
						alignItems: "center",
					}}>
					<Typography>{version.version}</Typography>
					<Typography>{version.date}</Typography>
				</Box>
			</MenuItem>
		);
	});

	const handleChange = (event: SelectChangeEvent) => {
		setSelectedIdVersion(event.target.value);
	};

	return (
		<FormControl sx={{ m: 1, minWidth: 200 }} size="small">
			<InputLabel id="demo-select-small-label" sx={{ color: "whitesmoke" }}>
				{txt.project.reconciliation.buttons.bannerButton}
			</InputLabel>
			<Select
				sx={{ color: "whitesmoke", border: "1px solid whitesmoke" }}
				labelId="demo-select-small-label"
				id="demo-select-small"
				value={selectedIdVersion}
				label={txt.project.reconciliation.buttons.bannerButton}
				onChange={handleChange}>
				<MenuItem value="">
					<em>None</em>
				</MenuItem>
				{options}
			</Select>
		</FormControl>
	);
}
