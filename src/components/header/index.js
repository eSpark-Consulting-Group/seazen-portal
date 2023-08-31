// src/Navbar.js
import React, { useState } from 'react';
import './style.css'

const Navbar = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };
  return (
    <nav className="navbar">
      <div className="account">
        <div className="account-icon">
        <img src='/assets/img/Profile_Icon.png' />
        </div>
        </div>
      <div className="logo">
        <img src='/assets/img/Logo.png'></img>
      </div>
      <div className="shopping">
      <div className="shopping-icon">
        <img src='/assets/img/Icon - Bag.png' />
      </div>
      </div>
      <div className={`search-container ${isSearchOpen ? 'expanded' : ''}`}>
        <div className={`search-wrapper ${isSearchOpen ? 'expanded' : ''}`}>
          <img src='/assets/img/Icon - Search.png' className="search-icon" onClick={toggleSearch} />
          <input type="text" placeholder="Search" className="search-bar" />
        </div>
      </div>
      
    </nav>
  );
};

export default Navbar;


