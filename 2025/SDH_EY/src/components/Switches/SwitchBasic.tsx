import Switch from "@mui/material/Switch";
import type { BasicSwitchType } from "../../types/components";

export default function BasicSwitches({
	setSwitch,
	defaultChecked,
}: BasicSwitchType) {
	return (
		<div>
			<Switch
				onChange={() => {
					setSwitch((prev: boolean) => !prev);
				}}
				defaultChecked={defaultChecked}
			/>
		</div>
	);
}
