import type { SnackbarCloseReason } from "@mui/material";
import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

type SnackBarContextType = {
	handleClick: () => void;
	handleClose: (
		_event: React.SyntheticEvent | Event,
		reason?: SnackbarCloseReason
	) => void;
	handleMessage: React.Dispatch<React.SetStateAction<string>>;
	open: boolean;
	message: string;
};

const SnackBarContext = createContext<SnackBarContextType>({
	handleClick: () => {},
	handleClose: () => {},
	handleMessage: () => {},
	open: false,
	message: "",
});

export const useSnackBarContext = () => useContext(SnackBarContext);

export const SnackBarProvider = ({ children }: { children: ReactNode }) => {
	const [open, setOpen] = useState(false);
	const [message, setMessage] = useState("under development bruh");

	const handleClick = () => {
		setOpen(true);
	};

	// Use setMessage directly to match the expected type
	const handleMessage = setMessage;

	const handleClose = (
		_event: React.SyntheticEvent | Event,
		reason?: SnackbarCloseReason
	) => {
		if (reason === "clickaway") {
			return;
		}

		setOpen(false);
	};

	// provide the state and functions and value to the childeren
	const value = {
		handleClick,
		handleClose,
		handleMessage, // now matches React.Dispatch<React.SetStateAction<string>>
		open,
		message,
	};
	return (
		<SnackBarContext.Provider value={value}>
			{children}
		</SnackBarContext.Provider>
	);
};
export default SnackBarProvider;
