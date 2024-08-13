import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios'; // Make sure to install axios
import searchIcon from '../../assets/search_icon.svg';
import closeIcon from '../../assets/close_icon.svg';
import movieIcon from '../../assets/movie_icon.svg';
import nextIcon from '../../assets/next.svg';
import prevIcon from '../../assets/prev.svg';
import downIcon from '../../assets/down.svg';
import checkIcon from '../../assets/check.svg';
import './Filters.css';

const genres = [
  'Action', 'Adventure', 'Animation', 'Comedy',
  'Crime', 'Documentary', 'Drama', 'Family', 'Fantasy', 'History',
  'Horror', 'Music', 'Mystery', 'Romance', 'Science Fiction',
  'Thriller', 'War', 'Western'
];

const Filters = () => {
  const [titleSearchTerm, setTitleSearchTerm] = useState('');
  const [actorSearchTerm, setActorSearchTerm] = useState('');
  const [visibleGenres, setVisibleGenres] = useState(7); // Initially 7 genres are visible
  const [currentGenreIndex, setCurrentGenreIndex] = useState(0);
  const [selectedSort, setSelectedSort] = useState('Latest');
  const [selectedYear, setSelectedYear] = useState('Year');
  const [selectedAlphabet, setSelectedAlphabet] = useState('A-Z');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isYearOpen, setIsYearOpen] = useState(false);
  const [isAlphabetOpen, setIsAlphabetOpen] = useState(false);

  // Fetch functions
  const fetchTitles = useCallback(async (query) => {
    try {
      const response = await axios.get(`/movies?title=${encodeURIComponent(query)}`);
      console.log('Titles:', response.data);
    } catch (error) {
      console.error('Error fetching titles:', error);
    }
  }, []);

  const fetchActors = useCallback(async (query) => {
    try {
      const response = await axios.get(`/movies?actors=${encodeURIComponent(query)}`);
      console.log('Actors:', response.data);
    } catch (error) {
      console.error('Error fetching actors:', error);
    }
  }, []);

  // Search handlers
  const handleTitleSearchChange = (e) => {
    setTitleSearchTerm(e.target.value);
  };

  const handleActorSearchChange = (e) => {
    setActorSearchTerm(e.target.value);
  };

  const handleKeyDown = (event, searchTerm, fetchFunction) => {
    if (event.key === 'Enter') {
      fetchFunction(searchTerm);
    }
  };

  // Clear search inputs
  const clearTitleSearch = () => {
    setTitleSearchTerm('');
  };

  const clearActorSearch = () => {
    setActorSearchTerm('');
  };

  // Genre navigation
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

  // Dropdown handlers
  const toggleSortDropdown = () => {
    setIsSortOpen(!isSortOpen);
    setIsYearOpen(false);
    setIsAlphabetOpen(false);
  };

  const toggleYearDropdown = () => {
    setIsYearOpen(!isYearOpen);
    setIsSortOpen(false);
    setIsAlphabetOpen(false);
  };

  const toggleAlphabetDropdown = () => {
    setIsAlphabetOpen(!isAlphabetOpen);
    setIsSortOpen(false);
    setIsYearOpen(false);
  };

  // Dropdown selection handlers
  const handleSortSelection = (sortType) => {
    setSelectedSort(sortType);
    setIsSortOpen(false);
  };

  const handleYearSelection = (year) => {
    setSelectedYear(year);
    setIsYearOpen(false);
  };

  const handleAlphabetSelection = (alphabet) => {
    setSelectedAlphabet(alphabet);
    setIsAlphabetOpen(false);
  };

  // Generate arrays for dropdowns
  const alphabets = ['All', ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i))];
  const years = ['All', ...Array.from({ length: 1961 - 1920 }, (_, i) => (1920 + i).toString())];

  return (
    <div className="container mx-auto flex flex-col gap-6 mt-10">
      {/* First Row */}
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <img src={movieIcon} alt="Movie Icon" className="w-9 h-8" />
          <h2 className="text-white text-2xl font-semibold ml-4">Movies</h2>
        </div>
        <div className='search-bar shadow-lg flex items-center'>
          <img src={searchIcon} alt='Search Icon' className='search-icon-inside' />
          <input
            type='text'
            placeholder='Title'
            value={titleSearchTerm}
            onChange={handleTitleSearchChange}
            onKeyDown={(event) => handleKeyDown(event, titleSearchTerm, fetchTitles)}
            className='thin-input bg-transparent outline-none text-white placeholder-white px-2'
          />
          {titleSearchTerm && (
            <img src={closeIcon}
              alt='Close Icon'
              className='close-icon cursor-pointer'
              onClick={clearTitleSearch}
            />
          )}
        </div>
        <div className='search-bar shadow-lg flex items-center'>
          <img src={searchIcon} alt='Search Icon' className='search-icon-inside' />
          <input
            type='text'
            placeholder='Actors'
            value={actorSearchTerm}
            onChange={handleActorSearchChange}
            onKeyDown={(event) => handleKeyDown(event, actorSearchTerm, fetchActors)}
            className='thin-input bg-transparent outline-none text-white placeholder-white px-2'
          />
          {actorSearchTerm && (
            <img src={closeIcon}
              alt='Close Icon'
              className='close-icon cursor-pointer'
              onClick={clearActorSearch}
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
            className="flex justify-between items-center px-3 py-2 rounded-full hover:brightness-110 bg-primary text-white font-regular w-[100px] h-[39px]"
          >
            {selectedSort} <img src={downIcon} alt="Down Icon" />
          </button>
          {isSortOpen && (
            <div className="absolute mt-1 w-full rounded-lg bg-secondary shadow-lg max-h-40 overflow-y-auto z-30">
              <div className="flex flex-col pt-1 pb-1">
                {['Latest', 'Oldest'].map((sortType) => (
                  <div key={sortType}
                    className={`flex indent-3 p-0.5 justify-between cursor-pointer rounded hover:bg-[rgba(0,0,0,0.2)]`}
                    onClick={() => handleSortSelection(sortType)}>
                    {sortType} {selectedSort === sortType && <img src={checkIcon} className='me-1' alt="Check Icon" />}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        {/* Year Dropdown */}
        <div className="relative">
          <button
            onClick={toggleYearDropdown}
            className="flex justify-between items-center px-3 py-2 rounded-full hover:brightness-110 bg-primary text-white font-regular w-[100px] h-[39px]"
          >
            {selectedYear} <img src={downIcon} alt="Down Icon" />
          </button>
          {isYearOpen && (
            <div className="absolute mt-1 w-full rounded-lg bg-secondary shadow-lg max-h-40 overflow-y-auto z-30">
              <div className="flex flex-col pt-1 pb-1">
                {years.map((year) => (
                  <div key={year}
                    className={`flex indent-3 p-0.5 justify-between cursor-pointer rounded hover:bg-[rgba(0,0,0,0.2)]`}
                    onClick={() => handleYearSelection(year)}>
                    {year} {selectedYear === year && <img src={checkIcon} className='me-1' alt="Check Icon" />}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        {/* Alphabet Dropdown */}
        <div className="relative">
          <button
            onClick={toggleAlphabetDropdown}
            className="flex justify-between items-center px-3 py-2 rounded-full hover:brightness-110 bg-primary text-white font-regular w-[100px] h-[39px]"
          >
            {selectedAlphabet} <img src={downIcon} alt="Down Icon" />
          </button>
          {isAlphabetOpen && (
            <div className="absolute mt-1 w-full rounded-lg bg-secondary shadow-lg max-h-40 overflow-y-auto z-30">
              <div className="flex flex-col pt-1 pb-1">
                {alphabets.map((letter) => (
                  <div key={letter}
                    className={`flex indent-3 p-0.5 justify-between cursor-pointer rounded hover:bg-[rgba(0,0,0,0.2)]`}
                    onClick={() => handleAlphabetSelection(letter)}>
                    {letter} {selectedAlphabet === letter && <img src={checkIcon} className='me-1' alt="Check Icon" />}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Filters;
