"use client";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton"; // shadcn skeleton
import { useState } from "react";

export const ImageWithSkeleton = ({
	src,
	alt = "Just an image",
}: {
	src: string;
	alt?: string;
}) => {
	const [loading, setLoading] = useState(true);

	return (
		<div className="relative h-full w-full rounded-2xl overflow-hidden">
			{loading && (
				<>
					<Skeleton className="absolute inset-0 h-full w-full" />
				</>
			)}
			<Image
				src={src}
				alt={alt}
				fill
				className={`object-cover transition-opacity duration-1500 ease-in ${
					loading ? "opacity-0" : "opacity-100"
				}`}
				sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
				priority
				onLoad={() => {
					setLoading(false);
				}}
			/>
		</div>
	);
};
