import React, { useState } from 'react'
import './Navbar.css'
import searchIcon from '../../assets/search_icon.svg'
import closeIcon from '../../assets/close_icon.svg';
import logo from '/logoOH.png';

const Navbar = () => {
  const [searchActive, setSearchActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleSearch = () => {
    setSearchActive(!searchActive);
    setSearchTerm('');
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  const handleCancel = () => {
    setSearchTerm('');
    setSearchActive(false);
  };

  return (
    <div className='navbar'>
      <div className='navbar-logo'>
      <img src={logo} alt="Logo" className="logo-image" />
       <span>Old Hollywood</span> 
      </div>
      <div className='navbar-right'>
        {!searchActive && (<div className='search-icon' onClick={toggleSearch}>
          <img src={searchIcon} alt='Search Icon' />
        </div>
        )}
        {searchActive && (
          <>
          <div className='search-bar'>
            <img src={searchIcon} alt='Search Icon' className='search-icon-inside'/>
            <input 
            type='text'
            placeholder='Title, actors, genre'
            value={searchTerm}
            onChange={handleSearchChange} 
            />
            {searchTerm && (
              <img src={closeIcon}
              alt='Close Icon'
              className='close-icon'
              onClick={clearSearch}
              />
            )}
          </div>
          <span className='cancel-text' onClick={handleCancel}>Cancel</span>
          </>
        )}
        <button className='signup-btn hover:brightness-110 hover:opacity-7 rounded-full bg-primary shadow-primary text-white'>Sign up</button>
        <button className='login-btn shadow-lg hover:text-white duration-300 cursor-pointer active:scale-[0.98] hover:bg-primary'>Log in</button>
      </div>
    </div>
  );
};

export default Navbar