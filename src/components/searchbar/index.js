import React from 'react'
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import styles from '../../screens/searchPage/style.module.css'

const SearchBar = ({ isSearchOpen, searchParams, toggleSearch, handleSearchItem, value }) => {

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: "15px",
    backgroundColor: "#FAFAFA",
    marginRight: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 0,
    width: '100%',
    height: "30px",
    [theme.breakpoints.down('sm')]: {
      width: '90%',
      margin: 'auto'
    },
    [theme.breakpoints.up('sm')]: {
      width: '90%',
      margin: 'auto'
    },
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));
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
        onClick={toggleSearch}

      />
    </div>
  )
}

export default SearchBar;
