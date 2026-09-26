"use client";

import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";

export const ImageWithSkeleton = ({
	src,
	alt = "Just an image",
	rounded = "rounded-2xl",
	fadeSpeed,
	customClassName,
	fill = true,
}: {
	src: string;
	alt?: string;
	rounded?: string;
	fadeSpeed?: "slow" | "medium" | "fast";
	customClassName?: string;
	fill?: boolean;
}) => {
	const [loading, setLoading] = useState(true);

	let easeDuration = "";

	switch (fadeSpeed) {
		case "slow":
			easeDuration = "duration-1000";
			break;
		case "medium":
			easeDuration = "duration-700";
			break;
		case "fast":
			easeDuration = "duration-150";
			break;
		default:
			easeDuration = "duration-1000";
			break;
	}

	return (
		<figure
			className={`relative overflow-hidden ${rounded} ${
				fill ? "h-full w-full" : "w-fit h-fit"
			}`}>
			{loading && (
				<Skeleton
					className={`absolute inset-0 ${
						fill ? "h-full w-full" : "h-[300px] w-[300px]"
					}`}
				/>
			)}

			<Image
				src={src}
				alt={alt}
				{...(fill
					? {
							fill: true,
						}
					: {
							width: 1600,
							height: 1200,
						})}
				className={
					customClassName ||
					`transition-opacity ${easeDuration} ease-in ${
						fill ? "object-cover" : "object-contain"
					} ${loading ? "opacity-0" : "opacity-100"}`
				}
				sizes={
					fill
						? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
						: "100vw"
				}
				onLoad={() => setLoading(false)}
				loading="lazy"
			/>
		</figure>
	);
};
