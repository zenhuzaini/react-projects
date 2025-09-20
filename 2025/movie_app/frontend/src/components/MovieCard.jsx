import React from "react";
import "../css/MovieCard.css";
import { useMovieContext } from "../context/MovieContext";

const MovieCard = ({ movies }) => {
	const { favorites, addToFavorites, removeFromFavorites, isFavoriteMovie } =
		useMovieContext();
	const favorite = isFavoriteMovie(movies.id);

	const onFavoriteClick = () => {
		if (favorite) {
			removeFromFavorites(movies.id);
		} else {
			addToFavorites(movies);
		}
	};

	return (
		<div className="movie-card">
			<div className="movie-poster">
				<img
					src={`https://image.tmdb.org/t/p/w500/${movies.poster_path}`}
					alt={`${movies.title} Poster`}
				/>
				<div>
					<button className="favorite-btn" onClick={onFavoriteClick}>
						{favorite ? <>❤️</> : <>🩵</>}
					</button>
				</div>
			</div>
			<div className="movie-details">
				<h3 className="movie-title">{movies.title}</h3>
				<p className="movie-release-date">
					Year: {movies.release_date?.split("-")[0]}
				</p>
			</div>
		</div>
	);
};

export default MovieCard;
