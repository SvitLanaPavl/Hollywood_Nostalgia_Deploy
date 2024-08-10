import React, { useState } from 'react'
import searchIcon from '../../assets/search_icon.svg'
import closeIcon from '../../assets/close_icon.svg'
import movieIcon from '../../assets/movie_icon.svg'
import nextIcon from '../../assets/next.svg'
import prevIcon from '../../assets/prev.svg'
import downIcon from '../../assets/down.svg'
import './Filters.css'

const genres = ['Action', 'Adventure', 'Animation', 'Comedy',
  'Crime', 'Documentary', 'Drama', 'Family', 'Fantasy', 'History',
  'Horror', 'Music', 'Mystery', 'Romance', 'Science Fiction',
  'Thriller', 'War', 'Western'];

const Filters = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleGenres, setVisibleGenres] = useState(7); //initially 7 genres are visible
  const [currentGenreIndex, setCurrentGenreIndex] = useState(0);
  const [selectedSort, setSelectedSort] = useState('Latest')
  const [isSortOpen, setIsSortOpen] = useState(false);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  const handleNextGenres = () => {
    if (currentGenreIndex + visibleGenres < genres.length) {
      setCurrentGenreIndex(currentGenreIndex + 1);
    }
  };

  const handlePrevGenres = () => {
    if (currentGenreIndex > 0) {
      setCurrentGenreIndex(currentGenreIndex - 1);
    }
  };

  const toggleSortDropdown = () => {
    setIsSortOpen(!isSortOpen);
  };

  const handleSortSelection = (sortType) => {
    setSelectedSort(sortType);
    setIsSortOpen(false);
  };
  return (
    <div className="container mx-auto flex flex-col gap-6 mt-10">
      {/* First Row */}
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <img src={movieIcon} alt="Movie Icon" className="w-9 h-8" />
          <h2 className="text-white text-2xl font-semibold ml-4">Movies</h2>
        </div>
        <div className='search-bar shadow-lg flex items-center'>
          <img src={searchIcon} alt='Search Icon' className='search-icon-inside'/>
          <input 
            type='text'
            placeholder='Title, actors, genre'
            value={searchTerm}
            onChange={handleSearchChange}
            className='thin-input bg-transparent outline-none text-white placeholder-white px-2'
          />
          {searchTerm && (
            <img src={closeIcon}
              alt='Close Icon'
              className='close-icon cursor-pointer'
              onClick={clearSearch}
            />
          )}
        </div>
        <div className="w-9 h-8"></div> {/* Empty div for alignment */}
      </div>
      <hr className="border-t-2 border-gray-custom w-full" />

      {/* Second Row */}
      <div className="flex mx-auto justify-around items-center gap-4 w-full">
        {currentGenreIndex > 0 && (
          <img src={prevIcon} alt="Previous Icon" onClick={handlePrevGenres} className="cursor-pointer" />
        )}
        <div className="flex justify-between flex-grow overflow-hidden">
          {genres.slice(currentGenreIndex, currentGenreIndex + visibleGenres).map((genre, index) => (
            <button
              key={genre}
              className={`flex justify-center items-center px-6 py-2 hover:brightness-110 rounded-full ${index % 2 === 0 ? 'bg-primary' : 'bg-gray-custom'} w-[151px] h-[39px] text-white font-regular`}
            >
              {genre}
            </button>
          ))}
        </div>
        {currentGenreIndex + visibleGenres < genres.length && (
          <img src={nextIcon} alt="Next Icon" onClick={handleNextGenres} className="cursor-pointer" />
        )}
      </div>

      {/* Third Row */}
      <div className="flex items-center gap-8">
        <div className="text-white opacity-50 text-lg font-regular">
          Sort By:
        </div>
        <div className="relative">
          <button
            onClick={toggleSortDropdown}
            className="flex justify-between items-center px-3 py-2 rounded-full bg-primary text-white font-regular w-[100px] h-[39px]"
          >
            {selectedSort} <img src={downIcon} alt="Down Icon" />
          </button>
          {isSortOpen && (
            <div className="absolute mt-2 w-full rounded-lg bg-gray-custom' shadow-lg">
              <div className="flex flex-col p-3">
                <div className="flex justify-between items-center cursor-pointer" onClick={() => handleSortSelection('Latest')}>
                  Latest {selectedSort === 'Latest' && <img src={downIcon} alt="Check Icon" />}
                </div>
                <div className="flex justify-between items-center cursor-pointer mt-2" onClick={() => handleSortSelection('Oldest')}>
                  Oldest {selectedSort === 'Oldest' && <img src={downIcon} alt="Check Icon" />}
                </div>
              </div>
            </div>
          )}
        </div>
        <button className="flex justify-between items-center px-3 py-2 rounded-full bg-gray-custom text-white font-regular w-[100px] h-[39px]">
          Year <img src={downIcon} alt="Down Icon" />
        </button>
        <button className="flex justify-between items-center px-3 py-2 rounded-full bg-gray-custom text-white font-regular w-[100px] h-[39px]">
          A-Z <img src={downIcon} alt="Down Icon" />
        </button>
      </div>
    </div>
  );
};

export default Filters;