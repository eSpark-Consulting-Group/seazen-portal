import React from "react";
import "./style.css";
import RestaurantDetails from "../details/index.js";
import TabsDynamicConditionalComponent from "../../tabs/tabsConditionalRenderingComponent/index.js";

const RestaurantOptionsServicesContainer = ({
  restaurantDetail,
  restaurantBranchHours,
  resturantId,
}) => {
  return (
    <div>
      <div className="options_services_outer_container"></div>
      <RestaurantDetails
        restaurantDetail={restaurantDetail}
        restaurantBranchHours={restaurantBranchHours}
      />
      <TabsDynamicConditionalComponent
        resturantId={resturantId}
        restaurantBranchHours={restaurantBranchHours}
        restaurantDetail={restaurantDetail}
      />
    </div>
  );
};

export default RestaurantOptionsServicesContainer;
