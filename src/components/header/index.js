import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { paths } from "../../routes/paths";
import "./style.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchContainerRef = useRef(null);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const closeSearch = (e) => {
    if (
      searchContainerRef.current &&
      !searchContainerRef.current.contains(e.target)
    ) {
      setIsSearchOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", closeSearch);

    return () => {
      document.removeEventListener("click", closeSearch);
    };
  }, []);

  return (
    <nav className={`header ${isSearchOpen ? "search-expanded" : ""}`}>
      <div className="element account" onClick={() => {
        navigate(paths.profile);
      }}>
        <div className="account-icon">
          <img src="/assets/img/account.svg" alt="Account Icon" />
        </div>
      </div>
      <div className="element logo">
        <img src="/assets/img/Logo.png" alt="Logo" />
      </div>
      <div
        className="element shopping"
        onClick={() => {
          navigate(paths.cart);
        }}
      >
        <div className="shopping-icon">
          <img src="/assets/img/cart.svg" alt="Shopping Icon" />
        </div>
      </div>
      <div
        ref={searchContainerRef}
        className={`search-container ${isSearchOpen ? "expanded" : ""}`}
      >
        <div className={`search-wrapper ${isSearchOpen ? "expanded" : ""}`}>
          <img
            src="/assets/img/Icon - Search.svg"
            className="search-icon"
            onClick={toggleSearch}
            alt="search icon"
          />
          <input
            type="text"
            placeholder="Search"
            className={`search-bar ${isSearchOpen ? "expanded" : ""}`}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
