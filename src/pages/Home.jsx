import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import "../css/Home.css";
import { fetchTracks, searchTracks } from "../services/api.js";
import { useMovieContext } from "../contexts/MovieContexts";
import { SearchForm } from "../components/SearchForm.jsx";

function Home() {
  const { query, setQuery } = useMovieContext();
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const user_id = document.cookie
    .split("; ")
    .find((row) => row.startsWith("user_id="))
    ?.split("=")[1];

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await fetchTracks();
        setMovies(popularMovies);
      } catch (err) {
        console.log(err);
        setError("Failed to load popular tracks...");
      } finally {
        setLoading(false);
      }
    };

    if (query.trim() === "") {
      loadPopularMovies();
    }
  }, [query]);

  async function handleSearch(text) {
    setQuery(text);
    if (!text.trim()) return;
    if (loading) return;

    setLoading(true);
    try {
      const searchResults = await searchTracks(text);
      setMovies(searchResults);
      setError(null);
    } catch (err) {
      console.log(err);
      setError("Failed to search...");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="home">
      <SearchForm onSearch={handleSearch} />
      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="movies-grid">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
