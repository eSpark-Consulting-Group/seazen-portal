import { useState } from "react";
import MenuCard from "../menu_card/index.js";
import "./style.css";

const MenuCardListConatiner = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <div className="menu_card_list_outer_container">
      <div className="menu_card_list_inner_container">
        <div
          className={`card_list_title_search_container ${
            isSearchOpen ? "expanded" : ""
          }`}
        >
          <div className="card_list_title">Burrito in a Bowl</div>
          <div className={`search_container ${isSearchOpen ? "expanded" : ""}`}>
            <div className={`search_wrapper ${isSearchOpen ? "expanded" : ""}`}>
              <img
                src="/assets/img/Icon - Search.svg"
                alt="search_icon"
                className="search_icon"
                onClick={toggleSearch}
              />
              <input
                type="text"
                placeholder="Search"
                className={`search_bar ${isSearchOpen ? "expanded" : ""}`}
              />
            </div>
          </div>
        </div>
        <MenuCard />
        <MenuCard />
        <MenuCard />
        <div className="comment_button_container">
          <button>
            <img src=".\assets\img\comment_icon.svg" alt="comment_icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuCardListConatiner;
