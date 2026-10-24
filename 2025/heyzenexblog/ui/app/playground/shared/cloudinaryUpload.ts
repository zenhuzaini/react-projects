export type ImageQuality = "auto:eco" | "auto:good" | "auto:best";

export const IMAGE_QUALITY_OPTIONS: { label: string; value: ImageQuality }[] = [
	{ label: "Smaller files", value: "auto:eco" },
	{ label: "Balanced", value: "auto:good" },
	{ label: "Highest quality", value: "auto:best" },
];

export const DEFAULT_IMAGE_QUALITY: ImageQuality = "auto:good";
export const MAX_IMAGE_UPLOAD_SIZE = 10 * 1024 * 1024;
export const IMAGE_ACCEPT =
	"image/jpeg,image/png,image/webp,image/avif,image/gif";
