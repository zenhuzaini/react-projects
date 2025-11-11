import { GetStoryBookBasedOnID } from "@/types/apiResponse";

export const baseUrl =
	process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3999";
export async function getStorybookById(
	id: string
): Promise<GetStoryBookBasedOnID> {
	try {
		const res = await fetch(`${baseUrl}/notion/storybook/${id}`, {
			headers: {
				"content-type": "application/x-www-form-urlencoded",
				Authorization: `Bearer ${process.env?.API_AUTH_HEADER}`,
			},
			// Optional: Avoid caching if you want live data each request
			cache: "no-store",
		});

		if (!res.ok) {
			throw new Error(`Failed to fetch storybook: ${res.status}`);
		}

		return await res.json();
	} catch (error) {
		console.error("❌ Error fetching storybook:", error);
		throw error;
	}
}
