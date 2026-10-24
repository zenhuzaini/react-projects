import type { PhotoCardDetailType } from "../types/components";

// Static (faker-free) sample photos, so importing them does not pull faker into a bundle.
export const photoMockStatic: PhotoCardDetailType[] = [
	{
		id: "99",
		city: "New Omafort",
		year: 2018,
		month: "Jan",
		country: "Saudi Arabia",
		photoUrl: "https://picsum.photos/seed/RtKQS9Uh/1907/1577",
		title: "Thursday Next Series",
		description:
			"Tergiversatio alioqui optio contego carcer repellendus itaque copiose celebrer id",
	},
	{
		id: "142",
		city: "Port St. Lucie",
		year: 2014,
		month: "Jan",
		country: "Papua New Guinea",
		photoUrl: "https://picsum.photos/seed/vMFmhl/3077/3707",
		title: "Anna Karenina",
		description:
			"Decor conturbo dolores demoror brevis totidem corroboro cura alter deficio",
	},
	{
		id: "199",
		city: "Shadfort",
		year: 2005,
		month: "Jul",
		country: "Nauru",
		photoUrl: "https://picsum.photos/seed/KSTh3R/119/2212",
		title: "The Hunger Games",
		description:
			"Teneo sollicito minima tenuis agnitio conturbo vesica desino trans addo",
	},
];
