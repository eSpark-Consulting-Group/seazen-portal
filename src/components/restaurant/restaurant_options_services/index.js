import React from "react";
import styles from "./style.module.css";
import RestaurantDetails from "../details/index.js";
import TabsDynamicConditionalComponent from "../../tabs/tabsConditionalRenderingComponent/index.js";

const RestaurantOptionsServicesContainer = ({
  restaurantDetail,
  restaurantBranchHours,
}) => {
  return (
    <div>
      <div className={styles.optionsServicesOuterContainer}></div>
      <RestaurantDetails
        restaurantDetail={restaurantDetail}
        restaurantBranchHours={restaurantBranchHours}
      />
      <TabsDynamicConditionalComponent restaurantDetail={restaurantDetail} />
    </div>
  );
};

export default RestaurantOptionsServicesContainer;
