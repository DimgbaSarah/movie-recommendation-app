import React, { useEffect, useState } from "react";
import api from "../api";
import "../styles/MovieList.css"; // reuse styles

function Recommendations({ user, onSelect }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (user) {
      api.get("/movies/recommendations")
        .then(res => setMovies(res.data))
        .catch(() => setMovies([]));
    }
  }, [user]);

  if (!user) return null;
  if (movies.length === 0) return <div>No recommendations yet. Review some movies!</div>;

  return (
    <div>
      <h2>Recommended for You</h2>
      <div className="movie-list">
        {movies.map(movie => (
          <div className="movie-card" key={movie._id} onClick={() => onSelect(movie)}>
            <img src={movie.poster} alt={movie.title} className="movie-poster" />
            <h2>{movie.title}</h2>
            <p><b>Genre:</b> {movie.genre}</p>
            <p><b>Year:</b> {movie.year}</p>
            <p>{movie.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Recommendations;