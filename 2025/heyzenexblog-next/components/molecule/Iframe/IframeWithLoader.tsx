"use client";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export function IframeWithLoader({ src }: { src: string }) {
	const [loaded, setLoaded] = useState(false);

	return (
		<div className="relative w-full">
			{!loaded && (
				<div className="absolute inset-0 flex flex-col gap-4">
					<Skeleton className="h-4 w-3/4" />
					<Skeleton className="h-4 w-1/2" />
					<Skeleton className="h-4 w-full" />
				</div>
			)}

			<iframe
				src={src}
				onLoad={() => setLoaded(true)}
				className={`w-full  h-[500px]          /* desktop height */
                            sm:h-[400px]       /* small screens */
                            xs:h-[320px]       /* extra small screens (if you added xs breakpoint) */
                            max-sm:h-[250px]   /* fallback for very small mobiles */
                            border rounded-lg transition-opacity duration-300 ${
															loaded ? "opacity-100" : "opacity-0"
														}`}
			/>
		</div>
	);
}
