import React from "react";
import IconPositionTabs from "../tabComponent/index.js";
import { useState } from "react";
import CateringDetails from "../../restaurant/catering/index.js";
import DineInCoditionalComponent from "../../restaurant/dineIn/dineInConditionalComponent/index.js";
import PickupConditionalComponent from "../../restaurant/pickup/pickupConditionalComponent/index.js";
import DeliveryConditionalComponent from "../../restaurant/delivery/deliveryDetails/deliveryConditionalComponent/index.js";
import { useSelector } from "react-redux";

const TabsDynamicConditionalComponent = ({
  resturantId,
  restaurantBranchHours,
  restaurantDetail,
  setOpenModal,
  setSelectedItemToDeliver,
  scheduleForLater,
  fromDetail,
  setFromDetail,
  setNotDeliver,
  setRestaurantOpen,
}) => {
  const selectedService = useSelector(
    (state) => state.resturants.selectedService
  );
  const [tabPosition, setTabPosition] = useState(selectedService);
  const [locationDeliver, setLocationDeliver] = useState(false);
  const [deliveryAvailable, setDeliveryAvailable] = useState(false);

  switch (tabPosition) {
    case "dinein":
      return (
        <div>
          <IconPositionTabs
            isDineIn={restaurantDetail?.dinein_status}
            isCatering={restaurantDetail?.catering_status}
            isDelivery={restaurantDetail?.delivery_status}
            isPickup={restaurantDetail?.pickup_status}
            tabPosition={tabPosition}
            setTabPosition={setTabPosition}
            locationDeliver={locationDeliver}
            setLocationDeliver={setLocationDeliver}
            deliveryAvailable={deliveryAvailable}
            setDeliveryAvailable={setDeliveryAvailable}
            resturantId={resturantId}
          />
          <DineInCoditionalComponent />
        </div>
      );
    case "catering":
      return (
        <div>
          <IconPositionTabs
            isDineIn={restaurantDetail?.dinein_status}
            isCatering={restaurantDetail?.catering_status}
            isDelivery={restaurantDetail?.delivery_status}
            isPickup={restaurantDetail?.pickup_status}
            tabPosition={tabPosition}
            setTabPosition={setTabPosition}
            locationDeliver={locationDeliver}
            setLocationDeliver={setLocationDeliver}
            deliveryAvailable={deliveryAvailable}
            setDeliveryAvailable={setDeliveryAvailable}
            resturantId={resturantId}
          />
          <CateringDetails />
        </div>
      );
    case "delivery":
      return (
        <div>
          <IconPositionTabs
            isDineIn={restaurantDetail?.dinein_status}
            isCatering={restaurantDetail?.catering_status}
            isDelivery={restaurantDetail?.delivery_status}
            isPickup={restaurantDetail?.pickup_status}
            tabPosition={tabPosition}
            setTabPosition={setTabPosition}
            locationDeliver={locationDeliver}
            setLocationDeliver={setLocationDeliver}
            deliveryAvailable={deliveryAvailable}
            setDeliveryAvailable={setDeliveryAvailable}
            resturantId={resturantId}
          />
          <DeliveryConditionalComponent
            locationDeliver={locationDeliver}
            setLocationDeliver={setLocationDeliver}
            deliveryAvailable={deliveryAvailable}
            setDeliveryAvailable={setDeliveryAvailable}
            errorMessage={"We don’t deliver to your location!"}
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
          />
        </div>
      );
    case "pickup":
      return (
        <div>
          <IconPositionTabs
            isDineIn={restaurantDetail?.dinein_status}
            isCatering={restaurantDetail?.catering_status}
            isDelivery={restaurantDetail?.delivery_status}
            isPickup={restaurantDetail?.pickup_status}
            tabPosition={tabPosition}
            setTabPosition={setTabPosition}
            locationDeliver={locationDeliver}
            setLocationDeliver={setLocationDeliver}
            deliveryAvailable={deliveryAvailable}
            setDeliveryAvailable={setDeliveryAvailable}
            resturantId={resturantId}
          />
          <PickupConditionalComponent
            locationDeliver={locationDeliver}
            setLocationDeliver={setLocationDeliver}
            deliveryAvailable={deliveryAvailable}
            setDeliveryAvailable={setDeliveryAvailable}
          />
        </div>
      );
    default:
      return (
        <div>
          <IconPositionTabs
            isDineIn={restaurantDetail?.dinein_status}
            isCatering={restaurantDetail?.catering_status}
            isDelivery={restaurantDetail?.delivery_status}
            isPickup={restaurantDetail?.pickup_status}
            tabPosition={tabPosition}
            setTabPosition={setTabPosition}
            locationDeliver={locationDeliver}
            setLocationDeliver={setLocationDeliver}
            deliveryAvailable={deliveryAvailable}
            setDeliveryAvailable={setDeliveryAvailable}
            resturantId={resturantId}
          />
          <DineInCoditionalComponent />
        </div>
      );
  }
};

export default TabsDynamicConditionalComponent;
