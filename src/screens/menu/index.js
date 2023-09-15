import React from "react";
import Navbar from "../../components/header/generalHeader/index.js";
import RestaurantOptionsServicesContainer from "../../components/restaurant/restaurant_options_services/index.js";
import "./style.css";

const Menu = () => {
  return (
      <div className="menu_outer_container">
        <Navbar />
        <RestaurantOptionsServicesContainer />
      </div>
  );
};

export default Menu;
