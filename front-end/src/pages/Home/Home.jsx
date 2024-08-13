import React, { useState } from 'react'
import './home.css'
import Navbar from '../../components/Navbar/Navbar'
import Hero from '../../components/Hero/Hero'
import Filters from '../../components/Filters/Filters'
import MovieGrid from '../../components/MovieCards/MovieGrid'
import Pagination from '../../components/Pagination/Pagination'
import Footer from '../../components/Footer/Footer'

const Home = () => {

    // State for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const moviesPerPage = 18; // 6 movies per row, 3 rows
    const totalMovies = 620; // Not sure how many movies in the database
  
    const handlePageChange = (page) => {
      setCurrentPage(page);
      // We are supposed to fetch some data here... not sure yet
    };
  return (
    <div className='home'>
      <Navbar />
      <Hero />
      <Filters />
      <MovieGrid />
      <Pagination
        currentPage={currentPage}
        totalMovies={totalMovies}
        moviesPerPage={moviesPerPage}
        onPageChange={handlePageChange}
      />
      <Footer />
    </div>
  )
}

export default Home