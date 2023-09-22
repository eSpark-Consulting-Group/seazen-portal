import React from 'react'
import { useNavigate } from "react-router-dom";
import styles from '../../screens/searchPage/style.module.css'
import { paths } from '../../routes/paths';

const SearchBar = ({ isSearchOpen, searchParams, toggleSearch, handleSearchItem, value }) => {
  const navigate = useNavigate();

  return (
    <div className={`${styles.mySearchBar}`} >
      <img
        src="/assets/img/Icon - Search.svg"
        alt="search_icon"
        className={`${styles.searchicon}`}

      />
      <input className={`${styles.mySearchBarInput}`} type="text" value={value} placeholder='Search...' onChange={(event) => handleSearchItem(event)} />
      <img
        src="/assets/img/Closebutton.svg"
        alt="close_icon"
        className={`${styles.searchicon}`}
        onClick={() => {navigate(paths.home)}}
      />
    </div>
  )
}

export default SearchBar;
