import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Stack } from "@mui/material";
import MenuCard from "../menu_card/index.js";
import "./style.css";

const MenuCardListConatiner = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const foodItem = "Burrito Vegetarian in a Bowl (450 g)";
  const foodIngredients = "rice, plate peppers, onion, red beans, …";
  const foodCurrency = "KWD";
  const foodPrice = 6.99;
  const foodImage = "/assets/img/menu_card_image.png";

  return (
    <div className="menu_card_list_outer_container p-3 p-sm-4">
      <div className="menu_card_list_inner_container">
        <div
          className={`card_list_title_search_container ${
            isSearchOpen ? "expanded_search" : ""
          }`}
        >
          <div className="card_list_title">
            {searchParams.get("category") || "Burrito in a Bowl"}
          </div>
          <div className={`search ${isSearchOpen ? "expanded_search" : ""}`}>
            <div
              className={`searchwrapper ${
                isSearchOpen ? "expanded_search" : ""
              }`}
            >
              <img
                src="/assets/img/Icon - Search.svg"
                alt="search_icon"
                className="searchicon"
                onClick={toggleSearch}
              />
              <input
                type="text"
                placeholder="Search"
                className={`searchbar ${isSearchOpen ? "expanded_search" : ""}`}
              />
            </div>
          </div>
        </div>

        <Stack spacing={1.5}>
          <MenuCard
            foodItem={foodItem}
            foodIngredients={foodIngredients}
            foodCurrency={foodCurrency}
            foodPrice={foodPrice}
            foodImage={foodImage}
          />
          <MenuCard
            foodItem={foodItem}
            foodIngredients={foodIngredients}
            foodCurrency={foodCurrency}
            foodPrice={foodPrice}
            foodImage={foodImage}
          />
          <MenuCard
            foodItem={foodItem}
            foodIngredients={foodIngredients}
            foodCurrency={foodCurrency}
            foodPrice={foodPrice}
            foodImage={foodImage}
          />
        </Stack>

        <div className="comment_button_container">
          <button>
            <img src="/assets/img/comment_icon.svg" alt="comment_icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuCardListConatiner;
