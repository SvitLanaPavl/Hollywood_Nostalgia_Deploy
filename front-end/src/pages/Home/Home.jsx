import React from 'react'
import './home.css'
import Navbar from '../../components/Navbar/Navbar'
import Hero from '../../components/Hero/Hero'
import Filters from '../../components/Filters/Filters'
import MovieGrid from '../../components/MovieCards/MovieGrid'

const Home = () => {
  return (
    <div className='home'>
      <Navbar />
      <Hero />
      <Filters />
      <MovieGrid />
    </div>
  )
}

export default Home