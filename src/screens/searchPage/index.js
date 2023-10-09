import React from 'react'
import { useState } from 'react';
import { useSearchParams, useNavigate } from "react-router-dom";

import MenuCardItem from '../../components/search/menu-card-items';
import SearchBar from '../../components/searchbar';
import { Button } from 'react-bootstrap';
import styles from './style.module.css'




const SearchScreen = () => {
    const itemList = [
        {
            id: 1,
            resturant: "../assets/img/Trapani_logo.svg",
            name: "Burger",
            foodIngredients: "rice, plate peppers, onion, red beans rice, plate peppers, onion, red beans, …",
            foodCurrency: "KWD",
            foodPrice: 6.99,
            foodImage: "../assets/img/7.png",
            category: { type: "Food", color: "#026754" }
        },
        {
            id: 2,
            resturant: "../assets/img/Trapani_logo.svg",
            name: "Burger",
            foodIngredients: "rice, plate peppers, onion, red beans rice, plate peppers, onion, red beans, …",
            foodCurrency: "PKR",
            foodPrice: 699,
            foodImage: "../assets/img/burger2.svg",
            category: { type: "Food", color: "#026754" }
        },
        {
            id: 3,
            resturant: "../assets/img/Group 13.svg",
            name: "Courer",
            foodIngredients: "rice, plate peppers, onion, red beans rice, plate peppers, onion, red beans, …",
            foodCurrency: "KWD",
            foodPrice: 6.99,
            foodImage: "../assets/img/menu_card_image.png",
            category: { type: "Services", color: "#20353F" }
        },
        {
            id: 4,
            resturant: "../assets/img/Groove_Logo.svg",
            name: "Karachi",
            foodIngredients: "rice, plate peppers, onion, red beans rice, plate peppers, onion, red beans, …",
            foodCurrency: "",
            foodPrice: null,
            foodImage: '../assets/img/location2.svg',
            category: { type: "Location", color: "#F7B500" }
        }

    ]

    const navigate = useNavigate();

    const [isSearchOpen, setIsSearchOpen] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    
    const [state, setState] = useState("All");
    const [category, setCategory] = useState([
        { type: "All", isActive: false },
        { type: "Food", isActive: false },
        { type: "Location", isActive: false },
        { type: "Services", isActive: false }])

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredItems, setFilteredItems] = useState(itemList);


    const handleSearchChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
        filterItems(query);

    };

    const filterItems = (query) => {
        const lowercasedQuery = query.toLowerCase();
        const filtered = itemList.filter((item) => {
            const itemName = item.name.toLowerCase();
            const itemIngredients = item.foodIngredients.toLowerCase();
            return itemName.includes(lowercasedQuery) || itemIngredients.includes(lowercasedQuery);
        });
        setFilteredItems(filtered);
    };

    const toggleSearch = () => {
        setSearchQuery('');
        setFilteredItems(itemList)
    };

    const handleSelectType = (item, index) => {
        setState(item.type);
        const updateCategory = [...category];
        updateCategory.map((item) => item.isActive = false);
        updateCategory[index].isActive = true;
        setCategory(updateCategory);
    }

    return (
        <div>
            <SearchBar value={searchQuery} handleSearchItem={(t) => handleSearchChange(t)} />

            <div className={`${styles.search_tabs}`}>

                {category.map((item, index) => {
                    return <Button variant="outlined"
                        className={item.isActive
                            ? `${styles.search_tabs_items_clicked}`
                            : `${styles.search_tabs_items}`}
                        key={index}
                        onClick={() => { handleSelectType(item, index) }}>{item.type}</Button>
                })}</div>

            {state === "All"
                ? filteredItems.map(item => <MenuCardItem item={item} key={item.id} />)
                : filteredItems.filter((item) => item.category.type === state).map((item) => <MenuCardItem item={item} key={item.id} />)
            }

        </div>
    )
}

export default SearchScreen;
