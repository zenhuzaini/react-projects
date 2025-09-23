import * as React from "react";
import Snackbar, { type SnackbarCloseReason } from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import type { snackBarProps } from "../../types/components";

export default function SnackBarCustomized({
	text,
	type,
	openedSnackBar,
	setOpenedSnackBar,
}: snackBarProps) {
	const handleClose = (
		_event?: React.SyntheticEvent | Event,
		reason?: SnackbarCloseReason
	) => {
		if (reason === "clickaway") {
			return;
		}

		setOpenedSnackBar(false);
	};

	return (
		<div>
			<Snackbar
				open={openedSnackBar}
				autoHideDuration={6000}
				onClose={handleClose}>
				<Alert
					onClose={handleClose}
					severity={type}
					variant="filled"
					sx={{ width: "100%" }}>
					{text}
				</Alert>
			</Snackbar>
		</div>
	);
}
