import Button, { type ButtonProps } from "@mui/material/Button";
import type { projectButtonProps } from "../../types/components";
import { yellow } from "@mui/material/colors";
import { styled } from "@mui/material/styles";

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
	color: theme.palette.getContrastText(yellow[500]),
	backgroundColor: yellow[500],
	"&:hover": {
		backgroundColor: yellow[100],
	},
}));

export default function CustomizedButton({
	text,
	setButtonClicked,
}: projectButtonProps) {
	const onClick = () => {
		setButtonClicked((prev) => !prev);
	};
	return <ColorButton onClick={onClick}>{text}</ColorButton>;
}
