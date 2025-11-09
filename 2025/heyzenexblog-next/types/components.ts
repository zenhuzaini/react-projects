export type PhotoCardDetailType = {
	id?: string;
	city?: string;
	year?: number;
	month?: string;
	country?: string;
	photoUrl: string;
	title?: string;
	description: string;
};

export type DatePickerProps = {
	date: Date | undefined;
	setDate: (date: Date | undefined) => void;
	label?: string;
	open: boolean;
	setOpen: () => void;
};

export type MyJSONEditorProps = {
	content: any;
	setContent: (data: any) => void;
	searchInput?: string;
	title?: string;
};
