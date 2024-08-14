import React, { useEffect, useState } from 'react';
import MovieCard from './MovieCards';
import { useFilters } from '../Filters/FiltersContext';

const MovieGrid = ({ movies }) => {
  const { titleSearchTerm, actorSearchTerm, selectedGenres, selectedYear, selectedSort, selectedAlphabet } = useFilters();

  // Fetch movies function
  const fetchMovies = async () => {
    try {
      const queryParams = {
        title: titleSearchTerm || '',
        actors: actorSearchTerm || '',
        genres: selectedGenres.length > 0 ? selectedGenres.join(',') : '',
        release_date: selectedYear !== 'All' ? selectedYear : '',
        sort: selectedSort,
        alphabet: selectedAlphabet,
      };

      const filteredParams = new URLSearchParams(Object.entries(queryParams).filter(([_, v]) => v !== '')).toString();
      const response = await axios.get(`/movies?${filteredParams}`);
      setMovies(response.data);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  // Use useEffect to fetch movies when any filter changes
  useEffect(() => {
    fetchMovies();
  }, [titleSearchTerm, actorSearchTerm, selectedGenres, selectedYear, selectedSort, selectedAlphabet]);

  return (
    <div className='container mx-auto my-6'>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <MovieCard 
              key={movie.id} 
              movie={{
                title: movie.Title,
                year: movie.Release_Date.split('-')[0],
                genre: movie.Genres,
                posterUrl: movie.Poster_URL,
                backdrop: movie.Backdrop_URL,
                trailer: movie.Trailers
              }} 
            />
          ))
        ) : (
          <p>No movies available</p>
        )}
      </div>
    </div>
  );
};

export default MovieGrid;
