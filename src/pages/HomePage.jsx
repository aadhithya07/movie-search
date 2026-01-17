import React, { useState, useEffect } from 'react';
import { fetchMovies } from '../services/movieService';
import MovieCard from '../components/MovieCard';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('Batman'); 
  const [type, setType] = useState(''); // Requirement: Filter by type
  const [page, setPage] = useState(1);  // Requirement: Pagination
  const [error, setError] = useState(null);

  const getMovies = async () => {
    if (!search.trim()) return;
    try {
      const data = await fetchMovies(search, type, page);
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

  // Re-run search automatically when page or type changes
  useEffect(() => {
    getMovies();
  }, [page, type]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1); // Reset to first page for new search
    getMovies();
  };

  return (
    <div className="container">
      <form onSubmit={handleSearch} className="search-section">
        <input 
          type="text" 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
          placeholder="Search movies..." 
        />
        
        {/* Requirement: Filter by type dropdown */}
        <select value={type} onChange={(e) => { setType(e.target.value); setPage(1); }}>
          <option value="">All Types</option>
          <option value="movie">Movies</option>
          <option value="series">Series</option>
          <option value="episode">Episodes</option>
        </select>
        
        <button type="submit">Search</button>
      </form>

      {error && <p className="error-text">{error}</p>}

      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>

      {/* Requirement: Pagination Controls */}
      {movies.length > 0 && (
        <div className="pagination">
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</button>
          <span>Page {page}</span>
          <button onClick={() => setPage(page + 1)}>Next</button>
        </div>
      )}
    </div>
  );
};

export default HomePage;