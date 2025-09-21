import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import type { BasicAlertType } from "../../types/components";

export default function SimpleAlert({
	message,
	severity,
	variant,
}: BasicAlertType) {
	console.log("is it being called or not ");
	return (
		<Alert
			variant={variant}
			icon={<CheckIcon fontSize="inherit" />}
			severity={severity}>
			{message}
		</Alert>
	);
}
