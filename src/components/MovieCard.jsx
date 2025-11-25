import "../css/MovieCard.css";
import { useMovieContext } from "../contexts/MovieContexts";
import SpotifyLogo from "../assets/SpotifyLogo.png";

function MovieCard({ movie }) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
  const favorite = isFavorite(movie.id);

  function onFavoriteClick(e) {
    e.preventDefault();
    if (favorite) removeFromFavorites(movie.id);
    else addToFavorites(movie);
  }

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img src={movie.url} alt={movie.title} />
        <div className="movie-overlay">
          <button
            className={`favorite-btn ${favorite ? "active" : ""}`}
            onClick={onFavoriteClick}
          >
            ❤
          </button>
        </div>

        <div className="movie-info">
          <button
            className="track-link"
            onClick={() => {
              window.open(movie.track, "_blank");
            }}
          >
            <div className="movie-text">
              <h3>{movie.title}</h3>
              <p>{movie.artist}</p>
              <p>{movie.release_date?.split("-")[0]}</p>
            </div>
            <div className="spotify-logo">
              <img src={SpotifyLogo} alt="" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
