import "../css/Favorites.css";
import { useMovieContext } from "../contexts/MovieContexts";
import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import { fetchUserTopTracks } from "../services/api.js";

function Profile() {
  const { userLists } = useMovieContext();
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
        const popularMovies = await fetchUserTopTracks(user_id);
        setMovies(popularMovies);
      } catch (err) {
        console.log(err);
        setError("Failed to load popular tracks...");
      } finally {
        setLoading(false);
      }
    };
    loadPopularMovies();
  }, []);

  if (movies || loading) {
    return (
      <div className="favorites">
        <h2>Your Top Tracks</h2>
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
  } else {
    /* FIXME: movies is always true */
    return (
      <div className="favorites-empty">
        <h2>No Lists</h2>
        <p>Start adding tracks to your lists!</p>
      </div>
    );
  }
}

export default Profile;
