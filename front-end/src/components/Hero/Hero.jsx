import React from 'react'
import './Hero.css'
import starIcon from '../../assets/star_icon.svg'
import halfStarIcon from '../../assets/half_star_icon.svg'



const Hero = () => {
  return (
    <div className='hero-container w-100 shadow-inner'>
      <div className='hero-overlay'>
        <div className='hero-content pt-6 grid grid-cols-3 gap-4'>
          <h1 className='hero-title col-span-3'>
            Step back in time with <br />
            <span className='highlight'>OLD HOLLYWOOD</span>
          </h1>
          <p className='hero-description col-span-1'>
          Discover the magic of the Golden Age of Hollywood! Immerse yourself in timeless classics and iconic performances.
          </p>
          <div className='hero-rating col-span-3'>
            <div className='stars flex'>
              <img src={starIcon} alt='Stars' className='pe-1' />
              <img src={starIcon} alt='Stars' className='pe-1'/>
              <img src={starIcon} alt='Stars' className='pe-1' />
              <img src={starIcon} alt='Stars' className='pe-1'/>
              <img src={halfStarIcon} alt='Stars' className='pe-1'/>
            </div>
            <span className='rating-score'>4.5</span>
            <span className='rating-text'>Only the best</span>
          </div>
          <button className='discover-button col-span-2 hover:brightness-110 rounded-full bg-primary shadow-primary text-white transition ease-in-out delay-125'>Discover</button>
        </div>
      </div>
    </div>
  )
}

export default Hero