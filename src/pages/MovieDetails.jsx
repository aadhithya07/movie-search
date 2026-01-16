import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchMovieDetails } from '../services/movieService'; // Import from service

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDetails = async () => { // Renamed this local function to 'getDetails'
      setLoading(true);
      const data = await fetchMovieDetails(id); // Use the imported service function
      setMovie(data);
      setLoading(false);
    };
    getDetails();
  }, [id]);

  if (loading) return <div className="container">Loading...</div>;
  if (!movie) return <div className="container">Movie not found.</div>;

  return (
    <div className="container" style={{ padding: '20px' }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: '20px' }}>Back</button>
      <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
        <img src={movie.Poster} alt={movie.Title} style={{ borderRadius: '8px', maxWidth: '300px' }} />
        <div style={{ flex: '1', minWidth: '300px' }}>
          <h1>{movie.Title} ({movie.Year})</h1>
          <p><strong>Genre:</strong> {movie.Genre}</p>
          <p><strong>Director:</strong> {movie.Director}</p>
          <p><strong>Actors:</strong> {movie.Actors}</p>
          <p><strong>Plot:</strong> {movie.Plot}</p>
          <p><strong>IMDb Rating:</strong> ⭐ {movie.imdbRating}</p>
        </div>
      </div>
    </div>
  );
}