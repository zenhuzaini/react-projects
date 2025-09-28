// These types are meant tp be used to define the props for component
import type { OverridableStringUnion } from "@mui/types";
import type { ProjectType } from "./api";
import type { PropEntity } from "./main";
import type {
	TypographyPropsVariantOverrides,
	TypographyVariant,
} from "@mui/material";

export type HeaderBannerType = PropEntity<{
	bannerType?: "homepage" | "reconciliation";
	title?: string;
	description?: string;
	children?: React.ReactNode;
	breadcrumbsData: breadcrumbLists[];
}>;

export type ToggleMenuType = PropEntity<{
	icon?: string; //the value of this needs to be defined . a string or components from MUI?
	text: string;
	value: string;
	isDisabled: boolean;
}>;

export type toggleOptionsType =
	| "all"
	| "completed"
	| "inProgress"
	// this is for  menu project. A bit messy. Needs to refactor
	| "dataSource"
	| "reconciliation"
	| "audit"
	// Menu project table
	| "unmatched"
	| "matched"
	| "partialMatched";

export type ToggleMenuButtonType = {
	size?: "small" | "large";
	toggleMenuData?: ToggleMenuType[];
	toggleOption: toggleOptionsType;
	setToggleOption: React.Dispatch<React.SetStateAction<toggleOptionsType>>;
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

export type breadcrumbLists = {
	title: string;
	link: string;
};
export type breadcrumbProps = {
	breadcrumbsData: breadcrumbLists[];
};

export type historyVersionType = {
	id: number;
	version: string;
	date: string;
};

export type historyVersionPropsType = {
	versions: historyVersionType[];
	selectedIdVersion: string;
	setSelectedIdVersion: React.Dispatch<string>;
};

export type projectMenusType = "upload" | "reconciliation" | "audit";

export type DataTablePropsType = {
	checkboxSelection: boolean;
	dataGridType:
		| "reconciliation_matched"
		| "reconciliation_unmatched"
		| "reconciliation_partially_matched";
	page?: number;
	pageSize?: number;
	rowsPerPage: number[];
	sx?: any;
	data: dataTableRecordsType;
};

export type dataTableRecordsType = {
	columns: {
		name: string;
		type?: "num" | "str" | "cur" | undefined;
	}[];
	rows: any[];
};

// Carsd basic
export type BasicCardDetailType = {
	value: string;
	valueVariant: OverridableStringUnion<
		TypographyVariant | "inherit",
		TypographyPropsVariantOverrides
	>;
	description: string;
	descriptionVariant: OverridableStringUnion<
		TypographyVariant | "inherit",
		TypographyPropsVariantOverrides
	>;
	backgroundColor: string;
	textColor: string;
};

export type BasicCardDetailPropsType = PropEntity<{
	data: BasicCardDetailType[][];
}>;
