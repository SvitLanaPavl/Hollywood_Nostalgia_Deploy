import React, {useEffect, useState } from 'react'
import './Navbar.css'
import searchIcon from '../../assets/search_icon.svg'
import closeIcon from '../../assets/close_icon.svg';
import logo from '/logoOH.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [searchActive, setSearchActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
    <div className={`navbar ${isScrolled ? 'fixed' : ''} flex py-1 px-4 justify-between shadow-2xl`}>
      <Link to='/'><div className='navbar-logo flex'>
      <img src={logo} alt="Logo" className="logo-image hover:scale-110 transition ease-in-out delay-125" />
       <span className='px-1'>Old Hollywood</span> 
      </div>
      </Link>
      <div className='navbar-right'>
        {!searchActive && (<div className='search-icon hover:scale-125 transition ease-in-out delay-125' onClick={toggleSearch}>
          <img src={searchIcon} alt='Search Icon' />
        </div>
        )}
        {searchActive && (
          <>
          <div className='search-bar shadow-lg'>
            <img src={searchIcon} alt='Search Icon' className='search-icon-inside'/>
            <input 
            type='text'
            placeholder='Title, actors, genre'
            value={searchTerm}
            onChange={handleSearchChange}
            className='thin-input'
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
        <Link to='/signup'><button className='signup-btn hover:brightness-110 rounded-full bg-primary shadow-primary text-white'>Sign up</button></Link>
        <Link to='/login'><button className='login-btn shadow-lg hover:text-white duration-300 cursor-pointer active:scale-[0.98] hover:bg-primary transition ease-in-out delay-125'>Log in</button></Link>
      </div>
    </div>
  );
};

export default Navbar