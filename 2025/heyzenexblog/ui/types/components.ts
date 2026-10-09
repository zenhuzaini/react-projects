import { ReactNode } from "react";

export type PhotoCardDetailType = {
	id?: string;
	city?: string;
	year?: number;
	month?: string;
	country?: string;
	photoUrl: string;
	title?: string;
	description: string;
	activityType?: string;
	activityDate?: string;
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

export type StoryContentType = {
	sectionID: string;
	textContent: string;
	photoUrls: PhotoCardDetailType[];
	items?: { label: string; done?: boolean }[];
	url?: string;
	center?: [number, number];
	route?: [number, number][];
	shouldShowDownloadGPX?: boolean;
	title?: string;
};

export type MainStoryBookPageProps = {
	storyCover: string;
	createdAt: string;
	storyId: string;
	storyTitle: string;
	storyDescription: string;
	storyTags?: string[];
	storyPhotoUrls: PhotoCardDetailType[];
	storyContent: StoryContentType[];
	totalView: number;
	totalLike: number;
};

export type ChecklistItem = {
	label: ReactNode;
	done?: boolean;
};

export type AccordionItemProps = {
	title: React.ReactNode;
	content: React.ReactNode;
};

export type AccordionComponentProps = {
	items: AccordionItemProps[];
};

export interface JustChildrenProps {
	children: ReactNode;
}
