import { MAX_GPX_ROUTE_POINTS } from "./constants";

export const parseCoordinatePair = (
	value: string,
): [number, number] | undefined => {
	const parts = value.split(",").map((coordinate) => coordinate.trim());
	if (parts.length !== 2 || parts.some((coordinate) => !coordinate)) {
		return undefined;
	}
	const coordinates = parts.map(Number);
	if (
		coordinates.length !== 2 ||
		coordinates.some((coordinate) => !Number.isFinite(coordinate))
	) {
		return undefined;
	}
	return [coordinates[0], coordinates[1]];
};

export const parseRoute = (value: string): [number, number][] =>
	value
		.split("\n")
		.map((line) => parseCoordinatePair(line))
		.filter((coordinates): coordinates is [number, number] =>
			Boolean(coordinates),
		);

export const parseGpxRoute = (source: string): [number, number][] => {
	if (/<!DOCTYPE|<!ENTITY/i.test(source)) {
		throw new Error(
			"GPX files with document types or entities are not supported.",
		);
	}

	const document = new DOMParser().parseFromString(source, "application/xml");
	if (document.getElementsByTagName("parsererror").length) {
		throw new Error("The selected file is not valid GPX/XML.");
	}

	const elements = Array.from(document.getElementsByTagName("*"));
	const trackNodes = elements.filter(
		(element) => element.localName === "trkpt",
	);
	const routeNodes = elements.filter(
		(element) => element.localName === "rtept",
	);
	const pointNodes = trackNodes.length ? trackNodes : routeNodes;
	const points = pointNodes.flatMap((element) => {
		const latitudeValue = element.getAttribute("lat");
		const longitudeValue = element.getAttribute("lon");
		if (latitudeValue === null || longitudeValue === null) return [];
		const latitude = Number(latitudeValue);
		const longitude = Number(longitudeValue);
		if (
			!Number.isFinite(latitude) ||
			!Number.isFinite(longitude) ||
			latitude < -90 ||
			latitude > 90 ||
			longitude < -180 ||
			longitude > 180
		) {
			return [];
		}
		return [[latitude, longitude] as [number, number]];
	});

	if (points.length < 2) {
		throw new Error(
			"The GPX file must contain at least two track or route points.",
		);
	}
	if (points.length <= MAX_GPX_ROUTE_POINTS) return points;

	return Array.from({ length: MAX_GPX_ROUTE_POINTS }, (_, index) => {
		const pointIndex = Math.round(
			(index * (points.length - 1)) / (MAX_GPX_ROUTE_POINTS - 1),
		);
		return points[pointIndex];
	});
};
