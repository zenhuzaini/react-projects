"use client";
import { Map, MapTileLayer } from "@/components/ui/map";
import { Polyline } from "react-leaflet";
import type { LatLngExpression } from "leaflet";

export default function BasicMap() {
	const center: LatLngExpression = [43.6532, -79.3832];

	const route: LatLngExpression[] = [
		[43.6532, -79.3832],
		[43.66, -79.38],
		[43.67, -79.37],
		[43.68, -79.35],
	];

	return (
		<Map className="w-full h-full" center={center} zoom={12}>
			<MapTileLayer
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				attribution="&copy; OpenStreetMap contributors"
			/>

			{/* ROUTE */}
			<Polyline
				positions={route}
				pathOptions={{
					color: "#2563eb",
					weight: 5,
					opacity: 0.9,
				}}
			/>
		</Map>
	);
}
