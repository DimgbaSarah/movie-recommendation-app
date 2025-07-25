import React from "react";
import "../styles/MovieList.css";

function MovieList({ movies, onSelect }) {
  const handleKeyDown = (e, movie) => {
    if (e.key === "Enter" || e.key === " ") {
      onSelect(movie);
    }
  };

  return (
    <section className="movie-list" aria-label="All Movies">
      {movies.map((movie) => (
        <div
          className="movie-card"
          key={movie._id}
          onClick={() => onSelect(movie)}
          tabIndex="0"
          role="button"
          aria-pressed="false"
          aria-label={`View details for ${movie.title}`}
          onKeyDown={(e) => handleKeyDown(e, movie)}
        >
          <img
            src={movie.poster}
            alt={`Poster for ${movie.title}`}
            className="movie-poster"
          />
          <h2>{movie.title}</h2>
          <p>
            <b>Genre:</b> {movie.genre}
          </p>
          <p>
            <b>Year:</b> {movie.year}
          </p>
          <p>{movie.description}</p>
        </div>
      ))}
    </section>
  );
}

export default MovieList;