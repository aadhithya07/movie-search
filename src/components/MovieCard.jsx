import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  if (!movie) return null;

  return (
    <Link to={`/movie/${movie.imdbID}`} className="movie-card">
      <img 
        src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300"} 
        alt={movie.Title} 
      />
      <div className="movie-card-info">
        <h3>{movie.Title}</h3>
        <p>{movie.Year}</p>
      </div>
    </Link>
  );
};

export default MovieCard;