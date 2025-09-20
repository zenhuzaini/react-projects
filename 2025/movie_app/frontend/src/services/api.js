const API_KEY = "88214f0d762913ddcb0eec00105ac608";
const ACCESS_TOKEN =
	"eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ODIxNGYwZDc2MjkxM2RkY2IwZWVjMDAxMDVhYzYwOCIsIm5iZiI6MTc1ODM0OTgwNi4zMTIsInN1YiI6IjY4Y2U0OWVlOTI4ODBjNjU3MWFjNzhlOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BAScHZNWet7XSgWo80Sd2k0rS2gNX7gF8pqu3B-5Iuw";
const BASE_URL = " https://api.themoviedb.org";

export const getPopularMovies = async (page = 1) => {
	try {
		const response = await fetch(
			`${BASE_URL}/3/movie/popular?api_key=${API_KEY}&page=${page}`
		);
		if (!response.ok) {
			throw new Error("Failed to fetch popular movies");
		}
		const data = await response.json();
		return data.results;
	} catch (error) {
		console.error("Error fetching popular movies:", error);
		return [];
	}
};

export const searchMovies = async (query, page = 1) => {
	try {
		const response = await fetch(
			`${BASE_URL}/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
				query
			)}&page=${page}`
		);
		if (!response.ok) {
			throw new Error("Failed to search movies");
		}
		const data = await response.json();
		return data.results;
	} catch (error) {
		console.error("Error searching movies:", error);
		return [];
	}
};
