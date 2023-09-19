import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
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
}) => {
  const [expanded, setToggleExpanded] = useState(false);
  const [filterClassDelivery, setToggleFilterClassDelivery] = useState(false);
  const [filterClassNear, setToggleFilterClassNear] = useState(false);

  const handleClick = () => {
    if (id !== 1) {
      setToggleExpanded(!expanded);
      setIsButtonExpanded({ expanded: !expanded, id: id });
    } else {
      setIsButtonExpanded({ expanded: false });
    }
    handleButtonClickIndex(id);
  };

  useEffect(() => {
    if (filterClassNear) {
      handleOrderTypeFilter("near");
    } else if (filterClassDelivery) {
      handleOrderTypeFilter("delivery");
    } else {
      handleOrderTypeFilter(null);
    }
  }, [filterClassDelivery, filterClassNear]);

  const handleFilterClick = (orderType) => {
    if (orderType === "delivery") {
      setToggleFilterClassDelivery(!filterClassDelivery);
    } else {
      setToggleFilterClassNear(!filterClassNear);
    }
  };

  return (
    <div
      className={`${styles.customButton} ${
        isButtonExpanded.expanded && isButtonExpanded.id === id
          ? styles.expanded
          : ""
      } ${clicked ? styles.clicked : ""}`}
    >
      <img
        src={iconSrc}
        alt="Icon"
        className={styles.orderTypeButtonIcon}
        onClick={handleClick}
      />
      {((isButtonExpanded.expanded && isButtonExpanded.id === id) ||
        !isButtonExpanded.expanded) && (
        <span className={styles.orderTypeButtonText}>{text}</span>
      )}
      <span className={styles.orderTypeButtonContent}>
        {isButtonExpanded.expanded && isButtonExpanded.id === id && (
          <div className={styles.options}>
            <button
              className={`${styles.orderTypeButtonStyleOne} ${
                filterClassDelivery && styles.orderTypeButtonStyleOneActive
              }`}
              onClick={() => handleFilterClick("delivery")}
            >
              {buttonOneText}
            </button>
            <button
              className={`${styles.orderTypeButtonStyleTwo} ${
                filterClassNear && styles.orderTypeButtonStyleTwoActive
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

  const handleOrderTypeFilter = (orderType) => {
    setOrderTypeFilter(orderType);
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
      <div className={styles.restaurantTitle}>
        <h4>Restaurants</h4>
      </div>
      <div className={styles.orderTypeButtonContainer}>
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
