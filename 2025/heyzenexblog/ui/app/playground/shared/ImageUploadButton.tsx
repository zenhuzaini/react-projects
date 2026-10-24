"use client";

import { Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import { IMAGE_ACCEPT } from "./cloudinaryUpload";

const ImageUploadButton = ({
	label,
	className,
	onSelect,
}: {
	label: string;
	className?: string;
	onSelect: (file: File | undefined) => void;
}) => (
	<label
		className={cn(
			"inline-flex cursor-pointer items-center gap-2 rounded-md border border-primarybrown/25 px-3 py-2 text-xs font-semibold hover:bg-primarywhite",
			className,
		)}>
		<Upload size={14} /> {label}
		<input
			type="file"
			accept={IMAGE_ACCEPT}
			className="sr-only"
			onChange={(event) => {
				const file = event.currentTarget.files?.[0];
				event.currentTarget.value = "";
				onSelect(file);
			}}
		/>
	</label>
);

export default ImageUploadButton;
