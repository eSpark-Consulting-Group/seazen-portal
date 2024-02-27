import React from "react";
import { useDispatch } from "react-redux";

import { Card } from "@mui/material";

import deliveryIcon from "./delivery-icon.svg";
import pickupIcon from "./pickup-icon.svg";
import cateringIcon from "./catering-icon.svg";
import dineInIcon from "./dinein-icon.svg";


import "./style.css";
import { setSelectedService } from "../../store/reducers/resturantsSlice";

const images = [
  {
    name: "first card image",
    image: "/assets/img/restaurants-1-6.svg",
    service: { doesDelivery: true, isNear: true },
  },
  {
    name: "second card image",
    image: "/assets/img/restaurants-1-6.svg",
    service: { doesDelivery: true, isNear: true },
  },
  {
    name: "third card image",
    image: "/assets/img/restaurants-1-6.svg",
    service: { doesDelivery: true, isNear: true },
  },
  {
    name: "fourth card image",
    image: "/assets/img/restaurants-5-6.svg",
    service: { doesDelivery: true, isNear: true },
  },
  {
    name: "fifth card image",
    image: "/assets/img/restaurants-2-6.svg",
    service: { doesDelivery: true, isNear: true },
  },
  {
    name: "sixth card image",
    image: "/assets/img/restaurants-6-6.svg",
    service: { doesDelivery: true, isNear: true },
  },
];

const icons = {
  delivery_status: {
    id: 2,
    orderType: "delivery",
    image: deliveryIcon,
  },
  pickup_status: {
    id: 3,
    orderType: "pickUp",
    image: pickupIcon,
  },
  catering_status: {
    id: 1,
    orderType: "catering",
    image: cateringIcon,
  },
  dinein_status: {
    id: 0,
    orderType: "dineIn",
    image: dineInIcon,
  },
};

const BasicCard = (props) => {
  const {
    clickedButtonIndex,
    orderTypeFilter,
    restaurantsData,
    goToRestaurantMenuPage,
    selectedText,
    typesState,
  } = props;

  const newRestaurantData = [...restaurantsData];
  const dispatch = useDispatch();

  const getCardClassName = (service) => {
    if (orderTypeFilter) {
      const { delivery, near, selectedNow } = orderTypeFilter;
      const { doesDelivery, isNear } = service;
      if (delivery && !near) {
        return doesDelivery
          ? "restaurantCard-border-delivery " +
              (clickedButtonIndex !== null ? "expanded" : "another-class")
          : "";
      }

      if (!delivery && near) {
        return isNear
          ? "restaurantCard-border-near " +
              (clickedButtonIndex !== null ? "expanded" : "another-class")
          : "";
      }

      if (delivery && near) {
        if (doesDelivery && isNear) {
          return selectedNow === "delivery"
            ? "restaurantCard-border-delivery"
            : "restaurantCard-border-near";
        }
        if (!doesDelivery && isNear) {
          return "restaurantCard-border-near";
        }
        if (!isNear && doesDelivery) {
          return "restaurantCard-border-delivery";
        }
      }
    }
  };

  const getClassNameAccordingToFilter = (orderTypeId, service) => {
    if (
      orderTypeId === clickedButtonIndex &&
      orderTypeFilter &&
      orderTypeId !== 1
    ) {
      const { delivery, near, selectedNow } = orderTypeFilter;
      const { doesDelivery, isNear } = service;
      if (delivery && !near) {
        return doesDelivery && "button-icons-styles-delivery";
      }

      if (!delivery && near) {
        return isNear && "button-icons-styles-near";
      }

      if (delivery && near) {
        if (doesDelivery && isNear) {
          return selectedNow === "delivery"
            ? "button-icons-styles-delivery"
            : "button-icons-styles-near";
        }
        if (!doesDelivery && isNear) {
          return "button-icons-styles-near";
        }
        if (!isNear && doesDelivery) {
          return "button-icons-styles-delivery";
        }
      }

      if (!doesDelivery && !isNear) {
        return "button-icons-styles-none";
      }
    }
  };
  const getServicesIcon = (serviceName) => {
    return (
      <div className="icon-row">
        <img
          className={getClassNameAccordingToFilter(
            icons[serviceName].id,
            images[1].service
          )}
          src={icons[serviceName]?.image}
          // alt={`Icon ${i + 1}`}
          style={{ width: iconWidth, height: iconHeight }}
        />
      </div>
    );
  };

  // Define the width and height for the SVG icons
  const iconWidth = "9px";
  const iconHeight = "11px";

  const serviceSelect = (serviceStatus, text) => {
    let noRoute;

    if (text === "Dine In" && serviceStatus?.dinein_status) {
      noRoute = "dinein";
    } else if (serviceStatus?.catering_status && text === "Catering") {
      noRoute = "catering";
    } else if (serviceStatus?.delivery_status && text === "Delivery") {
      noRoute = "delivery";
    } else if (serviceStatus?.pickup_status && text === "Pickup") {
      noRoute = "pickup";
    } else {
      noRoute = null;
    }

    return noRoute;
  };

  return (
    <div>
      <div
        className="restaurantCard-container container-fluid"
        id="parent-of-all"
      >
        {newRestaurantData
          .sort((restaurantA, restaurantB) => restaurantA.display_order - restaurantB.display_order)
          .map((restaurant, index) => {
            return (
                <div
                  key={index}
                  className={`restaurantCards restaurantCard-large ${
                    selectedText !== "Delivery" &&
                    (restaurant?.dinein_status || restaurant?.pickup_status)
                      ? getCardClassName(images[index].service)
                      : !restaurant?.delivery_status ||
                        !restaurant.catering_status
                      ? "delivery-false"
                      : ""
                  } ${
                    selectedText === "Catering" &&
                    selectedText !== "Dine In" &&
                    selectedText !== "Delivery" &&
                    selectedText !== "Pickup" &&
                    typesState.catering
                      ? "catering-border"
                      : ""
                  }`}
                  id="when-deliver"
                >
                  <Card
                    sx={{
                      width: "100%",
                      borderRadius: "10px",
                      boxShadow: "none",
                      border: "none",
                      maxHeight: "98%",
                      position: "relative",
                    }}
                    className="restaurantCards"
                    onClick={() => {
                      if (selectedText !== "") {
                        dispatch(
                          setSelectedService(
                            serviceSelect(restaurant, selectedText)
                          )
                        );
                      }

                      goToRestaurantMenuPage(restaurant.id);
                    }}
                  >
                    <img
                      className="restaurantCard-img"
                      src={restaurant?.image}
                      alt={`${restaurant?.name_en}`}
                    />
                    <div
                      className={`svg-container ${
                        clickedButtonIndex !== null
                          ? "expanded expanded-width"
                          : "collapsed"
                      }`}
                    >
                      <div
                        className="inner-svg-container"
                        id="inner-svg-container"
                      >
                        {restaurant.catering_status && (
                          <div className="icon-row">
                            <img
                              className={
                                selectedText === "Catering" &&
                                selectedText !== "Dine In" &&
                                selectedText !== "Delivery" &&
                                selectedText !== "Pickup"
                                  ? "catering-bg"
                                  : ""
                              }
                              src={icons["catering_status"]?.image}
                              // alt={`Icon ${i + 1}`}
                              style={{ width: "12px", height: "11px" }}
                            />
                          </div>
                        )}
                        {restaurant.delivery_status && (
                          <div className="icon-row" id="icon-row">
                            <img
                              className="icons"
                              src={icons["delivery_status"]?.image}
                              style={{ width: iconWidth, height: iconHeight }}
                              id="deliver-icon"
                            />
                          </div>
                        )}
                        {restaurant.dinein_status &&
                          getServicesIcon("dinein_status")}
                        {restaurant.pickup_status &&
                          getServicesIcon("pickup_status")}
                      </div>
                    </div>
                  </Card>
                </div>
              )
          })}
      </div>
    </div>
  );
};

export default BasicCard;
