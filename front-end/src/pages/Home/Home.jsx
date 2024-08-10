import React from 'react'
import './home.css'
import Navbar from '../../components/Navbar/Navbar'
import Hero from '../../components/Hero/Hero'

const Home = () => {
  return (
    <div className='home'>
      <Navbar />
      <Hero />
    </div>
  )
}

export default Home