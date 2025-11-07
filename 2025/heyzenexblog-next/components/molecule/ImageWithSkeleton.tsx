"use client";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";

export const ImageWithSkeleton = ({
	src,
	alt = "Just an image",
	rounded = "rounded-2xl",
	fadeSpeed,
}: {
	src: string;
	alt?: string;
	rounded?: string;
	fadeSpeed?: "slow" | "medium" | "fast";
}) => {
	const [loading, setLoading] = useState(true);

	let easeDuration = "";

	switch (fadeSpeed) {
		case "slow":
			easeDuration = "duration-1000"; // max supported duration ~ 1 second
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
		<div className={`relative h-full w-full overflow-hidden ${rounded}`}>
			{loading && <Skeleton className="absolute inset-0 h-full w-full" />}
			<Image
				src={src}
				alt={alt}
				fill
				className={`object-cover transition-opacity ${easeDuration} ease-in ${
					loading ? "opacity-0" : "opacity-100"
				}`}
				sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
				onLoad={() => setLoading(false)}
				loading="lazy"
			/>
		</div>
	);
};
