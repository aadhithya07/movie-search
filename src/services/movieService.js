const API_KEY = "7e8ce15a";
const BASE_URL = 'https://www.omdbapi.com/';

export const fetchMovies = async (query, type = '', page = 1) => {
  const response = await fetch(`${BASE_URL}?s=${query}&type=${type}&page=${page}&apikey=${API_KEY}`);
  return await response.json();
};

export const fetchMovieDetails = async (id) => {
  const response = await fetch(`${BASE_URL}?i=${id}&plot=full&apikey=${API_KEY}`);
  return await response.json();
};