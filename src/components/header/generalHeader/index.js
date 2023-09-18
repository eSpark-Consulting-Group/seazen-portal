// src/Navbar.js
import React from "react";
import { useNavigate } from "react-router";
import "./style.css";
import { paths } from "../../../routes/paths";

const Navbar = ({restaurantDetail}) => {
  const navigate = useNavigate();
  return (
    <div className="Nav_Image_Container">
      <img alt="background_image" src="\assets\img\menu_background_image.png" />
      <nav className="upper_navigation">
        <div className="back_button" onClick={() => navigate(paths.home)}>
          <div className="back_button-icon">
            <img alt="Arrow_Icon" src="/assets/img/Icon - Arrow.svg" />
          </div>
        </div>
        <div className="shopping_container pointer" onClick={() => navigate(paths.cart)}>
          <div className="shopping_icon">
            <img alt="Bag_Icon" src="/assets/img/Icon - Bag.svg" />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
