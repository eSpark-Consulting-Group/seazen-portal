import React, { useEffect, useState } from "react";
import "./style.css";
import BasicCard from "../../cards/index";

const OrderTypeButtonExpandable = ({
  iconSrc,
  text,
  handleButtonClickIndex,
  buttonOneText,
  buttonTwoText,
  setIsButtonExpanded,
  isButtonExpanded,
  clicked,
  id,
  handleOrderTypeFilter,
  customButtonExpandedClass // New prop to pass the custom class
}) => {
  const [expanded, setToggleExpanded] = useState(false);
  const [filterClassDelivery, setToggleFilterClassDelivery] = useState(false);
  const [filterClassNear, setToggleFilterClassNear] = useState(false);
  const [filterSelectedNow, setFilterSelectedNow] = useState();

  useEffect(() => {
    if (expanded === false) {
      handleOrderTypeFilter(false, false, filterSelectedNow);
      setToggleFilterClassDelivery(false);
      setToggleFilterClassNear(false);
    }
  }, [expanded]);

  useEffect(() => {
    handleOrderTypeFilter(
      filterClassDelivery,
      filterClassNear,
      filterSelectedNow
    );
  }, [filterClassDelivery, filterClassNear]);

  const handleFilterClick = (orderType) => {
    if (!filterClassDelivery) {
      orderType === "delivery" && setFilterSelectedNow(orderType);
    }
    if (!filterClassNear) {
      orderType === "near" && setFilterSelectedNow(orderType);
    }
    if (orderType === "delivery") {
      setToggleFilterClassDelivery(!filterClassDelivery);
    } else {
      setToggleFilterClassNear(!filterClassNear);
    }
  };

  const handleClick = () => {
    if (id !== 1) {
      setToggleExpanded(!expanded);
      setIsButtonExpanded({ expanded: !expanded, id: id });
    } else {
      setIsButtonExpanded({ expanded: false });
    }
    handleButtonClickIndex(id);
  };

  return (
    <div
      className={`custom-button ${isButtonExpanded.expanded && isButtonExpanded.id === id ? "expanded" : ""} ${
        clicked ? "clicked" : ""
      } ${customButtonExpandedClass}`}
    >
      <img
        src={iconSrc}
        alt="Icon"
        className="orderTypebutton-icon"
        onClick={handleClick}
      />
      {((isButtonExpanded.expanded && isButtonExpanded.id === id) ||
        !isButtonExpanded.expanded) && (
        <span className={`orderTypebutton-text`}>{text}</span>
      )}
      <span className="orderTypebutton-content">
        {isButtonExpanded.expanded && isButtonExpanded.id === id && (
          <div className="options">
            <button
              className={`orderTypebutton-style-one ${
                filterClassDelivery && "orderTypebutton-style-one-active"
              }`}
              onClick={() => handleFilterClick("delivery")}
            >
              {buttonOneText}
            </button>
            <button
              className={`orderTypebutton-style-two ${
                filterClassNear && "orderTypebutton-style-two-active"
              }`}
              onClick={() => handleFilterClick("near")}
            >
              {buttonTwoText}
            </button>
          </div>
        )}
      </span>
    </div>
  );
};

const RestaurantsOrderTypeButton = () => {
  const [clickedButtonIndex, setClickedButtonIndex] = useState(null);
  const [isButtonExpanded, setIsButtonExpanded] = useState({
    expanded: false,
    id: null,
  });
  const [orderTypeFilter, setOrderTypeFilter] = useState();

  const handleButtonClickIndex = (index) => {
    if (index === clickedButtonIndex) {
      // If the same button is clicked again, remove the border
      setClickedButtonIndex(null);
    } else {
      // If a different button is clicked, set the border for that button
      setClickedButtonIndex(index);
    }
  };

  const handleOrderTypeFilter = (
    deliveryFilter,
    nearFilter,
    filterSelectedNow
  ) => {
    setOrderTypeFilter({
      delivery: deliveryFilter,
      near: nearFilter,
      selectedNow: filterSelectedNow,
    });
  };

  const data = [
    {
      iconSrc: "/assets/img/Dinein.svg",
      OrderType: "Dine In",
      locations: "Dine In Locations",
      where: "Near Me",
    },
    {
      iconSrc: "/assets/img/Catering.svg",
      OrderType: "Catering",
      locations: "Dine In Locations",
      where: "Near Me",
    },
    {
      iconSrc: "/assets/img/Delivery.svg",
      OrderType: "Delivery",
      locations: "Available for Delivery",
      where: "Delivers to Me",
    },
    {
      iconSrc: "/assets/img/Pickup.svg",
      OrderType: "Pickup",
      locations: "Available for Pickup",
      where: "Near Me",
    },
  ];

  return (
    <>
      <div className="restaurant-title">
        <h4>Restaurants</h4>
      </div>
      <div className="orderType-button-container">
        {data.map((item, index) => {
          return (
            <OrderTypeButtonExpandable
              iconSrc={item.iconSrc}
              text={item.OrderType}
              key={index}
              id={index}
              handleButtonClickIndex={handleButtonClickIndex}
              buttonOneText={item.locations}
              buttonTwoText={item.where}
              setIsButtonExpanded={setIsButtonExpanded}
              isButtonExpanded={isButtonExpanded}
              clicked={index === 1 ? clickedButtonIndex === 1 : false}
              handleOrderTypeFilter={handleOrderTypeFilter}
              customButtonExpandedClass={isButtonExpanded.expanded ? "custom-button-expanded" : ""}
            />
          );
        })}
      </div>
      {/* Pass the clickedButtonIndex to BasicCard */}
      <BasicCard
        clickedButtonIndex={clickedButtonIndex}
        orderTypeFilter={orderTypeFilter}
      />
    </>
  );
};

export default RestaurantsOrderTypeButton;
