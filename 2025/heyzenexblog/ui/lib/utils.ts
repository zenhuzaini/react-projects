import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatDate(
	dateString: string,
	isValidDate: boolean = !isNaN(new Date(dateString).getTime()),
	dateOptions?: Intl.DateTimeFormatOptions,
	locale: string = "en-US",
): string {
	if (!isValidDate) {
		return "Invalid Date";
	}
	const date = new Date(dateString);

	if (dateOptions) {
		return date.toLocaleDateString(locale, dateOptions);
	}
	const parts = {
		weekday: date.toLocaleDateString("en-US", { weekday: "short" }),
		month: date.toLocaleDateString("en-US", { month: "short" }),
		day: date.toLocaleDateString("en-US", { day: "2-digit" }),
		year: date.getFullYear(),
	};

	return `${parts.weekday}, ${parts.month} ${parts.day} ${parts.year}`;
}

// Works for ISO dates ("2024-08-14") and Date strings; returns no parts when the date is invalid.
export function getMonthYear(dateString: string): {
	month?: string;
	year?: number;
} {
	const date = new Date(dateString);
	if (Number.isNaN(date.getTime())) return {};
	return {
		month: date.toLocaleDateString("en-US", { month: "short" }),
		year: date.getFullYear(),
	};
}
