import { createContext, useContext, useEffect, useState } from "react";

const MovieContext = createContext();
export const useMovieContext = () => useContext(MovieContext);
export const MovieProvider = ({ children }) => {
	const [favorites, setFavorites] = useState([]);

	//we should use local storage to persist the favorites list
	useEffect(() => {
		const storedFavorites = localStorage.getItem("favorites");
		if (storedFavorites) {
			setFavorites(JSON.parse(storedFavorites));
		}
	}, []);

	//if there is some changes in favorites, update local storage
	useEffect(() => {
		localStorage.setItem("favorites", JSON.stringify(favorites));
	}, [favorites]);

	//function to add movie to favorites
	const addToFavorites = (movie) => {
		// we cannt use like favorites.push(movie) because it will not trigger a re-render
		//so we need to create a new array and set it to the state
		setFavorites((prev) => [...prev, movie]);
	};

	//function to remove movie from favorites
	const removeFromFavorites = (movieId) => {
		setFavorites((prev) => prev.filter((movie) => movie.id !== movieId));
	};

	//function to check if a movie is in favorites
	const isFavoriteMovie = (movieId) => {
		return favorites.some((movie) => movie.id === movieId);
	};

	// provide the state and functions and value to the childeren
	const value = {
		favorites,
		addToFavorites,
		removeFromFavorites,
		isFavoriteMovie,
	};

	return (
		<MovieContext.Provider value={value}>{children}</MovieContext.Provider>
	);
};
export default MovieProvider;
