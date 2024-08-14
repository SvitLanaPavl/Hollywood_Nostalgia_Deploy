import React, { useState, useEffect } from 'react';
import './Home.css';
import Navbar from '../../components/Navbar/Navbar';
import Hero from '../../components/Hero/Hero';
import Filters from '../../components/Filters/Filters';
import MovieGrid from '../../components/MovieCards/MovieGrid';
import Pagination from '../../components/Pagination/Pagination';
import Footer from '../../components/Footer/Footer';
import axios from 'axios';
import { useFilters } from '../../components/Filters/FiltersContext';

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const moviesPerPage = 18;

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

  useEffect(() => {
    fetchMovies();
  }, [titleSearchTerm, actorSearchTerm, selectedGenres, selectedYear, selectedSort, selectedAlphabet]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  return (
    <div className='home'>
      <Navbar />
      <Hero />
      <Filters />
      <MovieGrid movies={currentMovies} />
      <Pagination
        currentPage={currentPage}
        totalMovies={movies.length}
        moviesPerPage={moviesPerPage}
        onPageChange={handlePageChange}
      />
      <Footer />
    </div>
  );
};

export default Home;
