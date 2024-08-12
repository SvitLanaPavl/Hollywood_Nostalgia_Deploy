import React from 'react';
import MovieCard from './MovieCards';
import casablanca from '../../assets/casablanca.webp'
import gone from '../../assets/gone.jpg'
import key from '../../assets/key.jpg'
import wonderful from '../../assets/wonderful.jpg'
import fury from '../../assets/fury.jpg'
import bandits from '../../assets/bandits.jpg'

// This is dummu data before it gets populated from database
const movies = [
  // Populate this array with movie data objects, each containing title, year, genre, and posterUrl
  { title: 'Casablanca', year: '1942', genre: 'Drama', posterUrl: casablanca },
  { title: 'It\'s a wonderful life', year: '1946', genre: 'Drama', posterUrl: wonderful },
  { title: 'Key Largo', year: '1948', genre: 'Crime', posterUrl: key },
  { title: 'Fury', year: '1936', genre: 'Crime', posterUrl: fury },
  { title: 'Gone with the Wind', year: '1939', genre: 'Romance', posterUrl: gone },
  { title: 'Street Bandits', year: '1951', genre: 'Crime', posterUrl: bandits },
  { title: 'Casablanca', year: '1942', genre: 'Drama', posterUrl: casablanca },
  { title: 'It\'s a wonderful life', year: '1946', genre: 'Drama', posterUrl: wonderful },
  { title: 'Key Largo', year: '1948', genre: 'Crime', posterUrl: key },
  { title: 'Fury', year: '1936', genre: 'Crime', posterUrl: fury },
  { title: 'Gone with the Wind', year: '1939', genre: 'Romance', posterUrl: gone },
  { title: 'Street Bandits', year: '1951', genre: 'Crime', posterUrl: bandits },
  { title: 'Casablanca', year: '1942', genre: 'Drama', posterUrl: casablanca },
  { title: 'It\'s a wonderful life', year: '1946', genre: 'Drama', posterUrl: wonderful },
  { title: 'Key Largo', year: '1948', genre: 'Crime', posterUrl: key },
  { title: 'Fury', year: '1936', genre: 'Crime', posterUrl: fury },
  { title: 'Gone with the Wind', year: '1939', genre: 'Romance', posterUrl: gone },
  { title: 'Street Bandits', year: '1951', genre: 'Crime', posterUrl: bandits },
];

const MovieGrid = () => {
  return (
    <div className='container mx-auto my-6'>
    <div className="grid grid-cols-6 gap-6">
      {movies.map((movie, index) => (
        <MovieCard key={index} movie={movie} />
      ))}
    </div>
    </div>
  );
};

export default MovieGrid;