import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import { Icon } from "@mui/material";
import type {
	toggleOptionsType,
	ToggleMenuButtonType,
} from "../../types/components";

export default function ToggleMenu({
	toggleOption,
	setToggleOption,
	toggleMenuData,
}: ToggleMenuButtonType) {
	const handleOption = (
		_event: React.MouseEvent<HTMLElement>,
		newOption: toggleOptionsType //this type should be extendable in the future, by changing it to a more generic one
	) => {
		setToggleOption(newOption);
	};

	return (
		<ToggleButtonGroup
			value={toggleOption}
			exclusive
			sx={{
				backgroundColor: "whitesmoke",
			}}
			onChange={handleOption}
			color="primary"
			aria-label="text alignment">
			{toggleMenuData?.map((x) => {
				return (
					<ToggleButton
						key={x.id}
						value={x.value}
						aria-label={x.text}
						disabled={x.isDisabled}>
						{/* https://mui.com/material-ui/icons/#font-material-icons */}
						{x.icon ? <Icon>{x.icon}</Icon> : null}
						{x.text}
					</ToggleButton>
				);
			})}
		</ToggleButtonGroup>
	);
}
