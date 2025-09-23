import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import type { BasicAlertType } from "../../types/components";

export default function SimpleAlert({
	message = "this is still under development",
	variant = "outlined",
	severity = "info",
}: BasicAlertType) {
	return (
		<Alert
			variant={variant}
			icon={<CheckIcon fontSize="inherit" />}
			severity={severity}>
			{message}
		</Alert>
	);
}
