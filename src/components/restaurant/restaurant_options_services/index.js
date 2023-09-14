import React from "react";
import "./style.css";
import RestaurantDetails from "../details/index.js"
import TabsDynamicConditionalCoponent from "../../tabs/tabsConditionalRenderingComponent/index.js";

const RestaurantOptionsServicesContainer = () => {
  return (
    <div className="options_services_outer_container">
      <RestaurantDetails />
      <TabsDynamicConditionalCoponent />
    </div>
  );
};

export default RestaurantOptionsServicesContainer;
