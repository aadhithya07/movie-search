import React from 'react';

export default function SearchBar({ query, setQuery, type, setType, onSearch }) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8 p-4 bg-gray-100 rounded-lg">
      <input 
        className="flex-grow p-2 border rounded"
        type="text" 
        placeholder="Search movies..." 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <select 
        className="p-2 border rounded bg-white"
        value={type} 
        onChange={(e) => setType(e.target.value)}
      >
        <option value="">All Types</option>
        <option value="movie">Movies</option>
        <option value="series">Series</option>
      </select>
      <button 
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        onClick={onSearch}
      >
        Search
      </button>
    </div>
  );
}