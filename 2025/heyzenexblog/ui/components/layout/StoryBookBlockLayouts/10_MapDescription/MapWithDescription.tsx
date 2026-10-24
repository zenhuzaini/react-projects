"use client";

import { Download } from "lucide-react";
import dynamic from "next/dynamic";
import { LatLngExpression } from "leaflet";
import type { LatLngTuple } from "leaflet";
import { animationForLift } from "@/animation/animation";

const BasicMap = dynamic(() => import("@/components/molecule/Map/BasicMap"), {
	ssr: false,
	loading: () => (
		<div className="h-full w-full animate-pulse rounded-2xl bg-gray-200" />
	),
});

const escapeXml = (value: string) =>
	value.replace(/[<>&"']/g, (character) => {
		const entities: Record<string, string> = {
			"<": "&lt;",
			">": "&gt;",
			"&": "&amp;",
			'"': "&quot;",
			"'": "&apos;",
		};
		return entities[character];
	});

const MapWithDescription = ({
	center,
	route,
	description,
	title,
	shouldShowDownloadGPX = false,
}: {
	center?: LatLngExpression;
	route?: LatLngTuple[];
	description?: string;
	title?: string;
	shouldShowDownloadGPX?: boolean;
}) => {
	const downloadGpx = () => {
		if (!route || route.length < 2) return;

		const trackPoints = route
			.map(
				([latitude, longitude]) =>
					`      <trkpt lat="${latitude}" lon="${longitude}"></trkpt>`,
			)
			.join("\n");
		const trackName = escapeXml(
			title?.trim() || description?.trim() || "Story route",
		);
		const content = `<?xml version="1.0" encoding="UTF-8"?>\n<gpx version="1.1" creator="Heyzenex Story Builder" xmlns="http://www.topografix.com/GPX/1/1">\n  <trk>\n    <name>${trackName}</name>\n    <trkseg>\n${trackPoints}\n    </trkseg>\n  </trk>\n</gpx>`;
		const fileUrl = URL.createObjectURL(
			new Blob([content], { type: "application/gpx+xml;charset=utf-8" }),
		);
		const link = document.createElement("a");
		link.href = fileUrl;
		const filename = (title?.trim() || "story-route")
			.replace(/[<>:"/\\|?*\x00-\x1f]/g, "-")
			.replace(/\s+/g, " ")
			.replace(/[. ]+$/g, "");
		link.download = `${filename || "story-route"}.gpx`;
		document.body.appendChild(link);
		link.click();
		link.remove();
		window.setTimeout(() => URL.revokeObjectURL(fileUrl), 1000);
	};

	return (
		<div className="">
			<div className="relative z-0 isolate h-[40vh] min-h-96 w-full overflow-hidden rounded-2xl">
				<BasicMap center={center} route={route} />
			</div>
			<div className="mt-4">
				<div className="flex flex-wrap items-start justify-between gap-3">
					<div className="min-w-0 flex-1">
						{title && <p className="font-medium text-primaryText">{title}</p>}
						<p className="text-sm text-muted-foreground">
							{description ??
								"This map shows the location related to the story. You can interact with the map to explore the area."}
						</p>
					</div>
					{shouldShowDownloadGPX && route && route.length > 1 && (
						<button
							type="button"
							onClick={downloadGpx}
							className={`inline-flex shrink-0 items-center gap-2 rounded-md bg-primaryaccent px-3 py-2 text-sm font-semibold text-primarycream ${animationForLift}`}>
							<Download size={15} /> GPX
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default MapWithDescription;
