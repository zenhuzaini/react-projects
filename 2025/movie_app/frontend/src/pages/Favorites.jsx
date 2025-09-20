import React from "react";
import "../css/Favorites.css";
import { useMovieContext } from "../context/MovieContext";
import MovieCard from "../components/MovieCard";

const Favorites = () => {
	const { favorites } = useMovieContext();

	const movieList =
		favorites &&
		favorites.map((movie, idx) => {
			return <MovieCard key={idx} movies={movie} />;
		});

	return (
		<>
			{favorites.length === 0 ? (
				<div className="favorites-empty">
					<h2>Your Favorites List is Empty</h2>
					<p>Add movies to your favorites to see them here.</p>
				</div>
			) : (
				<div className="favorites">
					<h2>My Favorite Movies</h2>
					<div className="movies-grid">{movieList}</div>
				</div>
			)}
		</>
	);
};

export default Favorites;
