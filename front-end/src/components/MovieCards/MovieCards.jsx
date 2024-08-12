import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import playIcon from '../../assets/play.svg';
import heartIcon from '../../assets/heart.svg';
import './MovieCards.css';

const MovieCard = ({ movie }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const hoverTimeoutRef = useRef(null);
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(true);
    }, 2000); // 2 seconds delay before expanding
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimeoutRef.current);
    setIsHovered(false);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleWatchTrailer = () => {
    navigate(`/trailer/${movie.id}`); // this will navigate to the player page with the movie ID from DB
  }

  return (
    <div 
      className={`relative w-[201px] h-[294px] rounded-lg bg-white overflow-hidden transition-all duration-500 ease-in-out cursor-pointer ${
        isHovered ? 'w-[470px] h-[300px] rounded-2xl z-20' : 'z-10'
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleWatchTrailer}
    >
      <div
        className="w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${movie.posterUrl})` }}
      >
        {!isHovered ? (
          <div className="absolute bottom-0 w-full p-2.5 bg-[rgba(51,51,51,0.94)] flex flex-col gap-0.5">
            <h3 className="w-[171px] text-white font-inter text-lg font-bold tracking-tight">
              {movie.title}
            </h3>
            <div className="flex justify-between items-center text-white/75 font-inter text-sm">
              <span>{movie.year}</span>
              <span>{movie.genre}</span>
              <img 
                src={heartIcon} 
                alt="Favorite" 
                className={`w-5 h-5 cursor-pointer ${isFavorite ? 'fill-red-500' : ''}`} 
                onClick={toggleFavorite} 
                style={{ filter: isFavorite ? 'invert(29%) sepia(89%) saturate(7487%) hue-rotate(338deg) brightness(95%) contrast(101%)' : 'none' }}
              />
            </div>
          </div>
        ) : (
          <div className="absolute bottom-0 w-full h-[75px] p-5 bg-[rgba(51,51,51,0.94)] flex items-center gap-2.5">
            <div className='flex justify-center items-center round hover:scale-125 transition ease-in-out duration-300'>
              <img src={playIcon} alt="Play Icon"
              className="w-4 h-4 cursor-pointer"
              onClick={handleWatchTrailer} // This will navigate to trailer
              />
            </div>
            <span className="text-white font-kaisei text-lg ms-2 hover:text-primary hover:opacity-90 transition ease-in-out duration-300"
            onClick={handleWatchTrailer}>
              Watch Trailer</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
