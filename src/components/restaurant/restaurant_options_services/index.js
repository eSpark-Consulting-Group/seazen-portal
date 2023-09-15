import React from "react";
import "./style.css";
import RestaurantDetails from "../details/index.js"
import TabsDynamicConditionalComponent from "../../tabs/tabsConditionalRenderingComponent/index.js";

const RestaurantOptionsServicesContainer = ({restaurantDetail, restaurantBranchHours}) => {
  return (
    <div className="options_services_outer_container">
      <RestaurantDetails restaurantDetail={restaurantDetail} restaurantBranchHours={restaurantBranchHours}/>
      <TabsDynamicConditionalComponent restaurantDetail={restaurantDetail}/>
    </div>
  );
};

export default RestaurantOptionsServicesContainer;
