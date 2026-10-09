"use client";

import dynamic from "next/dynamic";
import { LatLngExpression } from "leaflet";

const BasicMap = dynamic(
	() => import("@/components/molecule/Map/BasicMap"),
	{
		ssr: false,
		loading: () => <div className="h-full w-full animate-pulse rounded-2xl bg-gray-200" />,
	},
);

const MapWithDescription = ({
	center,
	route,
	description,
}: {
	center?: LatLngExpression;
	route?: LatLngExpression[];
	description?: string;
}) => {
	return (
		<div className="">
			<div className="w-full h-[40vh] rounded-2xl">
				<BasicMap center={center} route={route} />
			</div>
			<div className="mt-4">
				<p className="text-sm text-muted-foreground">
					{description ??
						"This map shows the location related to the story. You can interact with the map to explore the area."}
				</p>
			</div>
		</div>
	);
};

export default MapWithDescription;
