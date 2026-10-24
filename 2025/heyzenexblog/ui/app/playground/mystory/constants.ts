import {
	BookOpen,
	Code2,
	Highlighter,
	ImagePlus,
	Layers3,
	Link2,
	List,
	ListChecks,
	MapPin,
	Minus,
	Quote,
	Text,
	Type,
} from "lucide-react";
import type { BlockType } from "./types";

export const STORAGE_KEY = "heyzenex-mystory-drafts";
export const MAX_GPX_FILE_SIZE = 20 * 1024 * 1024;
export const MAX_GPX_ROUTE_POINTS = 2000;
export const MAX_IMAGE_UPLOAD_SIZE = 10 * 1024 * 1024;
export const STORY_LIBRARY_PAGE_SIZE = 5;

export const blockOptions: {
	type: BlockType;
	label: string;
	icon: typeof Text;
}[] = [
	{ type: "paragraph", label: "Paragraph", icon: Text },
	{ type: "quote", label: "Quote", icon: Quote },
	{ type: "image", label: "Photo", icon: ImagePlus },
	{ type: "gallery", label: "Gallery", icon: Layers3 },
	{ type: "section", label: "Section title", icon: Type },
	{ type: "checklist", label: "Checklist", icon: ListChecks },
	{ type: "itemlist", label: "Item list", icon: List },
	{ type: "iframe", label: "Map embed", icon: Link2 },
	{ type: "map", label: "Map with description", icon: MapPin },
	{ type: "divider", label: "Divider", icon: Minus },
	{ type: "highlight", label: "Highlight", icon: Highlighter },
	{ type: "related", label: "Related posts", icon: BookOpen },
	{ type: "raw", label: "MDX source", icon: Code2 },
];
