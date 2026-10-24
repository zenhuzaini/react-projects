"use client";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { IMAGE_QUALITY_OPTIONS, type ImageQuality } from "./cloudinaryUpload";

const UploadSettingsCard = ({
	value,
	onChange,
}: {
	value: ImageQuality;
	onChange: (value: ImageQuality) => void;
}) => (
	<div className="rounded-lg border border-primarybrown/20 bg-primarywhite p-4 sm:p-5">
		<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
			<div>
				<h2 className="font-bold">Upload settings</h2>
				<p className="mt-1 text-xs text-primarygrey">
					Quality applies to new cover, photo, and gallery uploads.
				</p>
			</div>
			<label className="flex flex-col gap-1 text-xs font-semibold text-primarygrey sm:w-64">
				<span>Cloudinary image quality</span>
				<Select
					items={IMAGE_QUALITY_OPTIONS}
					value={value}
					onValueChange={(next) => {
						if (typeof next === "string") onChange(next as ImageQuality);
					}}>
					<SelectTrigger
						aria-label="Cloudinary image quality"
						className="w-full bg-mybackground">
						<SelectValue />
					</SelectTrigger>
					<SelectContent>
						{IMAGE_QUALITY_OPTIONS.map(({ label, value: optionValue }) => (
							<SelectItem key={optionValue} value={optionValue}>
								{label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</label>
		</div>
	</div>
);

export default UploadSettingsCard;
