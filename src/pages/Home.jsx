import MovieCard from "../components/MovieCard";
import { useState, useEffect, use } from "react";
import "../css/Home.css";
import { fetchTracks, searchTracks } from "../services/api.js";
import { useMovieContext } from "../contexts/MovieContexts";

function Home() {
  /*este de abajo puedo eliminarlo y usar query como principal*/
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const { query, setQuery } = useMovieContext();

  /* Este si quiero dejar la busqueda guardada en contexto
  useEffect(() => {
    if (query) setSearchQuery(query);
  }, []);
  */

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

    if (searchQuery.trim() === "") {
      loadPopularMovies();
    }
  }, [searchQuery]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (loading) return;

    setLoading(true);
    try {
      const searchResults = await searchTracks(searchQuery);
      setMovies(searchResults);
      setError(null);
    } catch (err) {
      console.log(err);
      setError("Failed to search...");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for tracks in Spotify..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setQuery(e.target.value);
          }}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

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
