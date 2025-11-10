"use client";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";

export const ImageWithSkeleton = ({
	src,
	alt = "Just an image",
	rounded = "rounded-2xl",
	fadeSpeed,
	isForDialog = false,
}: {
	src: string;
	alt?: string;
	rounded?: string;
	fadeSpeed?: "slow" | "medium" | "fast";
	isForDialog?: boolean;
}) => {
	const [loading, setLoading] = useState(true);
	const [size, setSize] = useState<{ width: number; height: number } | null>(
		null
	);

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

	const imageProps = isForDialog
		? {
				width: size?.width ?? 800, // fallback size
				height: size?.height ?? 600,
				onLoadingComplete: (img: any) => {
					const aspectRatio = img.naturalWidth / img.naturalHeight;
					let displayWidth = Math.min(img.naturalWidth, 800);
					let displayHeight = displayWidth / aspectRatio;

					setSize({ width: displayWidth, height: displayHeight });
					setLoading(false);
				},
		  }
		: {
				fill: true,
				sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
		  };

	return (
		<div className={`relative h-full w-full overflow-hidden ${rounded}`}>
			{loading && <Skeleton className="absolute inset-0 h-full w-full" />}
			<Image
				src={src}
				alt={alt}
				loading="lazy"
				className={`object-cover transition-opacity ${easeDuration} ease-in ${
					loading ? "opacity-0" : "opacity-100"
				} ${rounded}`}
				onLoad={() => setLoading(false)}
				{...imageProps}
			/>
		</div>
	);
};
