import { useEffect, useState } from "react";
import { movies } from "../mocks/mock";
import MovieCard from "../components/MovieCard";
import "../css/Home.css";
import { searchMovies, getPopularMovies } from "../services/api";

const Home = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [moviesData, setMoviesData] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(
		() => {
			const loadPupularMovies = async () => {
				try {
					const popularMovies = await getPopularMovies();
					setMoviesData(popularMovies);
				} catch (error) {
					setError(error.message);
					console.error("Error loading popular movies:", error);
				} finally {
					setLoading(false);
				}
			};

			loadPupularMovies();

			// fetch("https://www.omdbapi.com/?s=batman&apikey=thewdb")
		},
		// this is called dependency array
		// if empty, it runs once when component mounts
		//  if has variables, it runs when those variables change
		[]
	);

	const handleSerach = (e) => {
		e.preventDefault();
		console.log("Searching for:", searchTerm);
		//if user presses search with empty input or only spaces, do nothing
		if (!searchTerm.trim()) return;
		//won't allow us to search when we are searching something already
		if (loading) return;
		setLoading(true);

		try {
			console.log("Searchingss for:", searchTerm);

			const fetchSearchedMovies = async () => {
				const searchedMovies = await searchMovies(searchTerm);
				console.log("searching movies:", searchedMovies);
				setMoviesData(searchedMovies);
			};
			fetchSearchedMovies();
			setError(null);
		} catch (error) {
			console.log("Error searching movies:", error);
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	const movieList = moviesData.map((movie, idx) => {
		return (
			movie.title.toLocaleLowerCase().startsWith(searchTerm) && (
				<MovieCard key={idx} movies={movie} />
			)
		);
	});

	return (
		<div className="home">
			<form onSubmit={handleSerach} className="search-form">
				<input
					type="text"
					placeholder="Search movies..."
					className="serach-input"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
				<button type="submit" className="search-button">
					Search
				</button>
			</form>
			<h2>Movie List</h2>
			{error && <div className="error-message">{error}</div>}
			<div className="movies-grid">
				{loading ? <div className="loading">loading...</div> : movieList}
			</div>
		</div>
	);
};

export default Home;
