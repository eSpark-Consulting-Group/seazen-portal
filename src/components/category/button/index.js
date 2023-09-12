import React, { useState } from "react";
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
  id
}) => {
  const [expanded, setToggleExpanded] = useState(false);

  const handleClick = () => {
    handleButtonClickIndex(id);
    if (id !== 1) {
      setToggleExpanded(!expanded);
      setIsButtonExpanded({ expanded: !expanded, id: id })
    }else{
      setIsButtonExpanded({expanded:false})
    }
  }

  return (
    <div
      className={`custom-button ${isButtonExpanded.expanded && isButtonExpanded.id === id ? "expanded" : ""} ${clicked ? "clicked" : ""
        }`}
      onClick={handleClick}
    >
      <img src={iconSrc} alt="Icon" className="button-icon" />
      {((isButtonExpanded.expanded && isButtonExpanded.id === id) || !isButtonExpanded.expanded) && <span className={`button-text`}>{text}</span>}
      <span className="button-content">
        {(isButtonExpanded.expanded && isButtonExpanded.id === id) && (
          <div className="options">
            <button className="button-style-one">{buttonOneText}</button>
            <button className="button-style-two">{buttonTwoText}</button>
          </div>
        )}
      </span>
    </div>
  );
};


const Button = () => {
  const [clickedButtonIndex, setClickedButtonIndex] = useState(null);
  const [isButtonExpanded, setIsButtonExpanded] = useState({ expanded: false, id: null });

  const handleButtonClickIndex = (index) => {
    if (index === clickedButtonIndex) {
      // If the same button is clicked again, remove the border
      setClickedButtonIndex(null);
    } else {
      // If a different button is clicked, set the border for that button
      setClickedButtonIndex(index);
    }
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
      where: "Delivers to Me"
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
        {
          data.map((item, index) => {
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
              />
            );
          })
        }
      </div>
      {/* Pass the clickedButtonIndex to BasicCard */}
      <BasicCard clickedButtonIndex={clickedButtonIndex} />
    </>
  );
};

export default Button;
