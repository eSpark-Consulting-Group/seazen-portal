import React from 'react'
import { useState } from 'react';
import { useSearchParams, useNavigate } from "react-router-dom";

import MenuCardItem from '../../components/search/menu-card-items';
import SearchBar from '../../components/searchbar';
import { Button } from 'react-bootstrap';
import styles from './style.module.css'
import { makeStyles } from '@mui/material';


const SearchScreen = () => {
    const navigate = useNavigate();

    const [isSearchOpen, setIsSearchOpen] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const [state , setState] = useState("All");
    const [typeState, setTypeState] = useState(false)
    const [searchInput, setSearchInput] = useState("");
    const [category, setCategory] = useState([
        {type: "All", isActive: false},
        {type: "Food", isActive: false},
        {type: "Location", isActive: false},
        {type: "Services", isActive: false}])

    const toggleSearch = () => {
      setIsSearchOpen(!isSearchOpen);
    };


    const itemList = [
        {
            id: 1,
            resturant: "../assets/img/Trapani_logo.svg",
            name: "Burger",
            foodIngredients: "rice, plate peppers, onion, red beans rice, plate peppers, onion, red beans, …",
            foodCurrency: "KWD",
            foodPrice: 6.99,
            foodImage: "../assets/img/7.png",
            category: {type:"Food",color:"green"}
        },
        {
            id: 2,
            resturant: "../assets/img/Trapani_logo.svg",
            name: "Burger",
            foodIngredients: "rice, plate peppers, onion, red beans rice, plate peppers, onion, red beans, …",
            foodCurrency: "PKR",
            foodPrice: 699,
            foodImage: "../assets/img/burger2.svg",
            category: {type:"Food",color:"green"}
        },
        {
            id: 3,
            resturant: "../assets/img/Group 13.svg",
            name: "Courer",
            foodIngredients: "Description of the place; rice, plate peppers, onion, red beans rice, plate peppers, onion, red beans, …",
            foodCurrency: "KWD",
            foodPrice: 6.99,
            foodImage: "../assets/img/menu_card_image.png",
            category: {type:"Services",color:"darkblue"}
        },
        {
            id: 4,
            resturant: "../assets/img/Groove_Logo.svg",
            name: "Karachi",
            foodIngredients: "rice, plate peppers, onion, red beans rice, plate peppers, onion, red beans, …",
            foodCurrency: "",
            foodPrice: null,
            foodImage: '../assets/img/location2.svg',
            category: {type:"Location",color:"orange"}
        }
        
    ]

    const handleSelectType = (item, index) =>{
        setState(item.type);
        const updateCategory = [...category];
        updateCategory.map((item) => item.isActive = false);
        updateCategory[index].isActive = true;
        setCategory(updateCategory);     
    }

    const handleSearchItem = (event) => {
        setSearchInput(event.target.value);
        console.log(itemList);
    }


  return (
    <div className={styles.page}>
        <SearchBar handleSearchItem={handleSearchItem} isSearchOpen={isSearchOpen} toggleSearch={toggleSearch} searchParams={searchParams} />

        <div className={`${styles.search_tabs}`}>

        {category.map((item, index)=>{
            return <Button variant="outlined" 
            className={item.isActive 
                ? `${styles.search_tabs_items_clicked}` 
                : `${styles.search_tabs_items}`} 
                key={index} 
                onClick={()=>{handleSelectType(item , index)}}>{item.type}</Button> 
        })}</div>

        {state === "All" 
         ? itemList.map(item => <MenuCardItem item={item} key={item.id} />)
         : itemList.filter((item)=>item.category.type === state).map((item)=> <MenuCardItem item={item} key={item.id} />)
        }
        </div>
  )
}

export default SearchScreen;
