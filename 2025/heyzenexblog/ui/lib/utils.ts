import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatDate(
	dateString: string,
	isValidDate: boolean = true,
): string {
	if (!isValidDate) {
		return "Invalid Date";
	}
	const date = new Date(dateString);
	const parts = {
		weekday: date.toLocaleDateString("en-US", { weekday: "short" }),
		month: date.toLocaleDateString("en-US", { month: "short" }),
		day: date.toLocaleDateString("en-US", { day: "2-digit" }),
		year: date.getFullYear(),
	};
	return `${parts.weekday}, ${parts.month} ${parts.day} ${parts.year}`;
}
