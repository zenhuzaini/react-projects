// These types are meant tp be used to define the props for component
export type BaseProp = {
	id?: string;
};

export type PropEntity<T> = {
	[K in keyof T]: T[K];
} & BaseProp;

export type HeaderBannerType = PropEntity<{
	bannerType: "homepage" | "reconciliation";
	title: string;
	description: string;
}>;

export type ToggleMenuType = PropEntity<{
	icon?: string; //the value of this needs to be defined . a string or components from MUI?
	text: string;
	value: string;
	isDisabled: boolean;
}>;

export type ToggleMenuButtonType = {
	toggleMenuData: ToggleMenuType[];
};

export type BasicSwitchType = {
	setSwitch: React.Dispatch<React.SetStateAction<boolean>>;
	defaultChecked: boolean;
};
