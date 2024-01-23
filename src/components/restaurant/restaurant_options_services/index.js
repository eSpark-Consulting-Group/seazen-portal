import React from "react";
import "./style.css";
import RestaurantDetails from "../details/index.js";
import TabsDynamicConditionalComponent from "../../tabs/tabsConditionalRenderingComponent/index.js";

const RestaurantOptionsServicesContainer = ({
  restaurantDetail,
  restaurantBranchHours,
  resturantId,
  setOpenModal,
  setSelectedItemToDeliver,
  scheduleForLater,
  fromDetail,
  setFromDetail,
  setNotDeliver,
  setRestaurantOpen,
  setOrderAmFromDelivery,
  orderAmFromDelivery,
}) => {
  return (
    <div>
      <div className="options_services_outer_container"></div>
      <RestaurantDetails
        restaurantDetail={restaurantDetail}
        orderAmFromDelivery={orderAmFromDelivery}
      />
      <div style={{ marginTop: 25 }}>
        <TabsDynamicConditionalComponent
          resturantId={resturantId}
          restaurantBranchHours={restaurantBranchHours}
          restaurantDetail={restaurantDetail}
          setOpenModal={setOpenModal}
          setSelectedItemToDeliver={setSelectedItemToDeliver}
          scheduleForLater={scheduleForLater}
          fromDetail={fromDetail}
          setFromDetail={setFromDetail}
          setNotDeliver={setNotDeliver}
          setRestaurantOpen={setRestaurantOpen}
          setOrderAmFromDelivery={setOrderAmFromDelivery}
        />
      </div>
    </div>
  );
};

export default RestaurantOptionsServicesContainer;
