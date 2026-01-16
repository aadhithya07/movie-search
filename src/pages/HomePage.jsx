import React, { useState, useEffect } from 'react';
import { fetchMovies } from '../services/movieService';
import MovieCard from '../components/MovieCard';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('Batman'); 
  const [error, setError] = useState(null);

  const getMovies = async () => {
    if (!search.trim()) return;
    try {
      const data = await fetchMovies(search);
      if (data.Response === "True") {
        setMovies(data.Search);
        setError(null);
      } else {
        setMovies([]);
        setError(data.Error);
      }
    } catch (err) {
      setError("Failed to fetch movies.");
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className="container" style={{ padding: '20px' }}>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '30px' }}>
        <input 
          type="text" 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
          style={{ padding: '8px', width: '250px' }}
        />
        <button onClick={getMovies} style={{ padding: '8px 16px', cursor: 'pointer' }}>
          Search
        </button>
      </div>

      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

      {/* This grid class restores your working layout from image_3c091a.jpg */}
      <div className="movie-grid">
        {movies && movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;