import React, { useState, useRef } from 'react';
import { FaPlay, FaPause, FaTimes } from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';
import './Player.css';
import videoPl from '../../assets/gonew.jpg';
import close from '../../assets/close_trailer.svg';

const Player = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPause, setShowPause] = useState(false);
  const videoRef = useRef(null);

  const handlePlayPause = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleClose = () => {
    navigate('/'); // Navigate back to home
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-black to-gray-800">
      <div className="relative w-[1089px] h-[669px] bg-white rounded-2xl overflow-hidden shadow-lg">
        {/* Close Icon */}
        <div className='absolute top-4 right-4 cursor-pointer hover:scale-110 transition ease-in-out delay-300 z-30' onClick={handleClose}>
          <img src={close} alt='Clsoe Icon' />
        </div>
        <div
          className="absolute inset-0 flex justify-center items-center bg-cover bg-center"
          style={{
            backgroundImage: `url(${videoPl})`, // Background image for the video
          }}
          onMouseEnter={() => setShowPause(isPlaying)}
          onMouseLeave={() => setShowPause(false)}
        >
          {!isPlaying && (
            <FaPlay
              className="text-white text-6xl cursor-pointer hover:scale-125 transition ease-in-out delay-125 duration-300"
              onClick={handlePlayPause}
            />
          )}
          {isPlaying && showPause && (
            <FaPause
              className="text-white text-6xl cursor-pointer hover:scale-125 transition ease-in-out delay-125 duration-300"
              onClick={handlePlayPause}
            />
          )}
          <video
            ref={videoRef}
            className={`absolute inset-0 w-full h-full ${isPlaying ? '' : 'hidden'}`} // Hide video when not playing
            controls
          >
            {/* Placeholder for video source */}
            <source src="#" type="video/mp4" />
          </video>
        </div>

        {/* Conditionally render the control bar */}
        {!isPlaying && (
          <div className="absolute bottom-0 w-full h-[120px] px-10 flex justify-between items-center bg-opacity-94 bg-secondary">
            <div className="flex-column justify-between w-80">
              <h2 className="text-start mb-3 font-kaisei text-3xl font-extrabold">Movie Title</h2>
              <div className='flex justify-between'>
                <p className="text-white font-kaisei text-sm font-semibold">Year</p>
                <p className="text-white font-kaisei text-sm font-semibold">Genre</p>
                <p className="text-white font-kaisei text-sm font-semibold">Actors</p>
              </div>
            </div>

            <div className="flex gap-4">
              <button className="w-[200px] h-[55px] font-kaisei flex justify-center items-center gap-2 rounded-full bg-primary text-white font-semibold hover:brightness-110 duration-300">
                Watch Now
              </button>
              <button className="w-[200px] h-[55px] font-kaisei flex justify-center items-center gap-2 rounded-full border border-primary text-primary font-semibold bg-transparent  hover:text-white duration-300 cursor-pointer active:scale-[0.98] hover:bg-primary transition ease-in-out delay-125">
                Add
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Player;
