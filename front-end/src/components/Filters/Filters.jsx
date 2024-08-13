import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import searchIcon from '../../assets/search_icon.svg';
import closeIcon from '../../assets/close_icon.svg';
import movieIcon from '../../assets/movie_icon.svg';
import nextIcon from '../../assets/next.svg';
import prevIcon from '../../assets/prev.svg';
import downIcon from '../../assets/down.svg';
import checkIcon from '../../assets/check.svg';
import './Filters.css';

const genres = [
  'Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Documentary', 'Drama',
  'Family', 'Fantasy', 'History', 'Horror', 'Music', 'Mystery', 'Romance',
  'Science Fiction', 'Thriller', 'War', 'Western'
];

const Filters = () => {
  const [titleSearchTerm, setTitleSearchTerm] = useState('');
  const [actorSearchTerm, setActorSearchTerm] = useState('');
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedYear, setSelectedYear] = useState('All');
  const [selectedSort, setSelectedSort] = useState('Latest');
  const [selectedAlphabet, setSelectedAlphabet] = useState('A-Z');
  const [visibleGenres, setVisibleGenres] = useState(7);
  const [currentGenreIndex, setCurrentGenreIndex] = useState(0);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isYearOpen, setIsYearOpen] = useState(false);
  const [isAlphabetOpen, setIsAlphabetOpen] = useState(false);

  // fetch movies with filters
  const fetchMovies = useCallback(async () => {
    try {
      // construct the query string with filters
      const queryParams = {
        title: titleSearchTerm || '',
        actors: actorSearchTerm || '',
        genres: selectedGenres.length > 0 ? selectedGenres.join(',') : '',
        release_date: selectedYear !== 'All' ? selectedYear : ''
      };
  
      // remove any parameters with empty values
      const filteredParams = Object.fromEntries(Object.entries(queryParams).filter(([_, v]) => v !== ''));
  
      const query = new URLSearchParams(filteredParams).toString();
  
      const response = await axios.get(`/movies?${query}`);
      console.log('Movies:', response.data);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  }, [titleSearchTerm, actorSearchTerm, selectedGenres, selectedYear]);

  // fetch movies whenever filters change
  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  // Search handlers
  const handleSearchChange = (setter) => (e) => setter(e.target.value);
  const handleGenreToggle = (genre) => {
    setSelectedGenres(prevGenres =>
      prevGenres.includes(genre)
        ? prevGenres.filter(g => g !== genre)
        : [...prevGenres, genre]
    );
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      fetchMovies();
    }
  };

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

  // Dropdown handlers
  const toggleDropdown = (dropdownType) => {
    if (dropdownType === 'sort') {
      setIsSortOpen(!isSortOpen);
      setIsYearOpen(false);
      setIsAlphabetOpen(false);
    } else if (dropdownType === 'year') {
      setIsYearOpen(!isYearOpen);
      setIsSortOpen(false);
      setIsAlphabetOpen(false);
    } else if (dropdownType === 'alphabet') {
      setIsAlphabetOpen(!isAlphabetOpen);
      setIsSortOpen(false);
      setIsYearOpen(false);
    }
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
            onChange={handleSearchChange(setTitleSearchTerm)}
            onKeyDown={handleKeyDown}
            className='thin-input bg-transparent outline-none text-white placeholder-white px-2'
          />
          {titleSearchTerm && (
            <img src={closeIcon}
              alt='Close Icon'
              className='close-icon cursor-pointer'
              onClick={() => setTitleSearchTerm('')}
            />
          )}
        </div>
        <div className='search-bar shadow-lg flex items-center'>
          <img src={searchIcon} alt='Search Icon' className='search-icon-inside' />
          <input
            type='text'
            placeholder='Actors'
            value={actorSearchTerm}
            onChange={handleSearchChange(setActorSearchTerm)}
            onKeyDown={handleKeyDown}
            className='thin-input bg-transparent outline-none text-white placeholder-white px-2'
          />
          {actorSearchTerm && (
            <img src={closeIcon}
              alt='Close Icon'
              className='close-icon cursor-pointer'
              onClick={() => setActorSearchTerm('')}
            />
          )}
        </div>
        <div className="w-9 h-8"></div>
      </div>
      <hr className="border-t-2 border-gray-custom w-full" />

      {/* Second Row */}
      <div className="flex mx-auto justify-around items-center gap-4 w-full">
        {currentGenreIndex > 0 && (
          <img src={prevIcon} alt="Previous Icon" onClick={() => setCurrentGenreIndex(currentGenreIndex - 1)} className="cursor-pointer" />
        )}
        <div className="flex justify-between flex-grow overflow-hidden">
          {genres.slice(currentGenreIndex, currentGenreIndex + visibleGenres).map((genre) => (
            <button
              key={genre}
              className={`flex justify-center items-center px-6 py-2 hover:brightness-110 rounded-full ${selectedGenres.includes(genre) ? 'bg-primary' : 'bg-gray-custom'} w-[151px] h-[39px] text-white font-regular`}
              onClick={() => handleGenreToggle(genre)}
            >
              {genre}
            </button>
          ))}
        </div>
        {currentGenreIndex + visibleGenres < genres.length && (
          <img src={nextIcon} alt="Next Icon" onClick={() => setCurrentGenreIndex(currentGenreIndex + 1)} className="cursor-pointer" />
        )}
      </div>

      {/* Third Row */}
      <div className="flex items-center gap-8">
        <div className="text-white opacity-50 text-lg font-regular">Sort By:</div>
        <div className="relative">
          <button
            onClick={() => toggleDropdown('sort')}
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
            onClick={() => toggleDropdown('year')}
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
            onClick={() => toggleDropdown('alphabet')}
            className="flex justify-between items-center px-3 py-2 rounded-full hover:brightness-110 bg-primary text-white font-regular w-[100px] h-[39px]"
          >
            {selectedAlphabet} <img src={downIcon} alt="Down Icon" />
          </button>
          {isAlphabetOpen && (
            <div className="absolute mt-1 w-full rounded-lg bg-secondary shadow-lg max-h-40 overflow-y-auto z-30">
              <div className="flex flex-col pt-1 pb-1">
                {alphabets.map((alphabet) => (
                  <div key={alphabet}
                    className={`flex indent-3 p-0.5 justify-between cursor-pointer rounded hover:bg-[rgba(0,0,0,0.2)]`}
                    onClick={() => handleAlphabetSelection(alphabet)}>
                    {alphabet} {selectedAlphabet === alphabet && <img src={checkIcon} className='me-1' alt="Check Icon" />}
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
