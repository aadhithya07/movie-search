import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  // Check if this movie is already in favorites on load
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorite(favorites.some(fav => fav.imdbID === movie.imdbID));
  }, [movie.imdbID]);

  const toggleFavorite = (e) => {
    e.preventDefault(); 
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    if (isFavorite) {
      favorites = favorites.filter(fav => fav.imdbID !== movie.imdbID);
    } else {
      favorites.push(movie);
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="movie-card">
      <div className="card-image-container">
        <Link to={`/movie/${movie.imdbID}`}>
          <img src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300"} alt={movie.Title} />
        </Link>
        {/* Heart button for favorites */}
        <button className={`fav-btn ${isFavorite ? 'active' : ''}`} onClick={toggleFavorite}>
          {isFavorite ? '❤️' : '🤍'}
        </button>
      </div>
      <div className="movie-card-info">
        <h3>{movie.Title}</h3>
        <p>{movie.Year} • {movie.Type}</p>
      </div>
    </div>
  );
};

export default MovieCard;