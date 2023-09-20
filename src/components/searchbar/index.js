import React from 'react'
import styles from '../../screens/searchPage/style.module.css'

const SearchBar = ({isSearchOpen, searchParams, toggleSearch, handleSearchItem}) => {
  return (
    <div className={`${styles.menu_card_list_outer_container} px-3 px-sm-4 pt-3 pt-sm-4 pb-0`} >
    <div className={`${styles.menu_card_list_inner_container}`} >
      <div
        className={`${styles.card_list_title_search_container} ${
          isSearchOpen ? `${styles.expanded_search}` : ""
        }`}
        
      >
        <div className={`${styles.card_list_title}`}>
          {searchParams.get("category")}
        </div>
        <div className={`${styles.search} ${isSearchOpen ? `${styles.expanded_search}` : ""}`}>
          <div
            className={`${styles.searchwrapper} ${
              isSearchOpen ? `${styles.expanded_search}` : ""
            }`}
          >
            <img
              src="/assets/img/Icon - Search.svg"
              alt="search_icon"
              className={`${styles.searchicon}`}
              onClick={toggleSearch}
            />
            <input
              type="text"
              placeholder="Search"
              onChange={(event) => handleSearchItem(event)}
              className={`${styles.searchbar} ${isSearchOpen ? `${styles.expanded_search}` : ""}`}                   
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default SearchBar;
