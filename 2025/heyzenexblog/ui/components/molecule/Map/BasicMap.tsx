"use client";
import { useEffect } from "react";
import { Map, MapTileLayer } from "@/components/ui/map";
import { Polyline, useMap } from "react-leaflet";
import { latLngBounds, type LatLngExpression } from "leaflet";

function FitRouteBounds({ route }: { route: LatLngExpression[] }) {
	const map = useMap();

	useEffect(() => {
		if (route.length > 1) {
			map.fitBounds(latLngBounds(route), { padding: [20, 20], maxZoom: 14 });
		}
	}, [map, route]);

	return null;
}

export default function BasicMap({
	center: initialCenter,
	route: initialRoute,
}: {
	center?: LatLngExpression;
	route?: LatLngExpression[];
}) {
	const center: LatLngExpression = initialCenter ?? [43.6532, -79.3832];

	const displayRoute: LatLngExpression[] = initialRoute ?? [
		[43.6532, -79.3832],
		[43.66, -79.38],
		[43.67, -79.37],
		[43.68, -79.35],
	];
	const routeForBounds = initialRoute ?? [];

	return (
		<Map className="w-full h-full" center={center} zoom={12}>
			<MapTileLayer
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				attribution="&copy; OpenStreetMap contributors"
			/>
			{routeForBounds.length > 1 && <FitRouteBounds route={routeForBounds} />}

			{/* ROUTE */}
			<Polyline
				positions={displayRoute}
				pathOptions={{
					color: "#2563eb",
					weight: 5,
					opacity: 0.9,
				}}
			/>
		</Map>
	);
}
