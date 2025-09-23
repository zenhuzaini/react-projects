// These types are meant tp be used to define the props for component
import type { ProjectType } from "./api";
import type { PropEntity } from "./main";

export type HeaderBannerType = PropEntity<{
	bannerType?: "homepage" | "reconciliation";
	title: string;
	description: string;
	children?: React.ReactNode;
}>;

export type ToggleMenuType = PropEntity<{
	icon?: string; //the value of this needs to be defined . a string or components from MUI?
	text: string;
	value: string;
	isDisabled: boolean;
}>;

export type projectStatusCard = "all" | "completed" | "inProgress";
export type ToggleMenuButtonType = {
	toggleMenuData?: ToggleMenuType[];
	toggleOption: projectStatusCard;
	setToggleOption: React.Dispatch<React.SetStateAction<projectStatusCard>>;
};

export type BasicSwitchType = {
	setSwitch: React.Dispatch<React.SetStateAction<boolean>>;
	defaultChecked: boolean;
};

export type BasicAlertType = {
	message?: string;
	variant?: "outlined" | "filled";
	severity?: "success" | "info" | "warning" | "error";
};

// Table component
export type ProjectTablePropsType = {
	projects: ProjectType[];
	column: string[];
};

export type projectButtonProps = {
	text: string;
	setButtonClicked: React.Dispatch<React.SetStateAction<boolean>>;
};

export type snackTypes = {
	type: "warning" | "info" | "success";
	text: string;
};

export type snackCategoryType = {
	underDev: snackTypes;
	somethingWentWrong: snackTypes;
};

export type snackBarProps = {
	setOpenedSnackBar: React.Dispatch<React.SetStateAction<boolean>>;
	openedSnackBar: boolean;
} & snackTypes;
