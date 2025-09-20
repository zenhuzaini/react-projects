import React from "react";
import "../css/MovieCard.css";

const MovieCard = ({ movies }) => {
	const onFavoriteClick = () => {
		console.log("Favorite button clicked!");
		alert(`You favorited`);
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
						🩵
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
