import React, { useState, useRef, useEffect } from 'react';
import './style.css';

const Navbar = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const searchContainerRef = useRef(null);

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
    };

    const closeSearch = (e) => {
        if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
            setIsSearchOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', closeSearch);

        return () => {
            document.removeEventListener('click', closeSearch);
        };
    }, []);

    return (
        <nav className={`navbar ${isSearchOpen ? 'search-expanded' : ''}`}>
            <div className="element account">
                <div className="account-icon">
                    <img src='/assets/img/Profile_Icon.png' alt="Account Icon" />
                </div>
            </div>
            <div className="element logo">
                <img src='/assets/img/Logo.png' alt="Logo" />
            </div>
            <div className="element shopping">
                <div className="shopping-icon">
                    <img src='/assets/img/Icon - Bag.png' alt="Shopping Icon" />
                </div>
            </div>
            <div
                ref={searchContainerRef}
                className={`search-container ${isSearchOpen ? 'expanded' : ''}`}
            >
                <div className={`search-wrapper ${isSearchOpen ? 'expanded' : ''}`}>
                    <img src='/assets/img/Icon - Search.png' className="search-icon" onClick={toggleSearch} />
                    <input type="text" placeholder="Search" className={`search-bar ${isSearchOpen ? 'expanded' : ''}`} />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
