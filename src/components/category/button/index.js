import React, { useState } from "react";
import "./style.css";
import BasicCard from "../../cards/index";

const CustomButton = ({
  iconSrc,
  text,
  expanded,
  toggleExpanded,
  buttonOneText,
  buttonTwoText,
  onClick,
  clicked,
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      toggleExpanded();
    }
  };

  return (
    <button
      className={`custom-button ${expanded ? "expanded" : ""} ${
        clicked ? "clicked" : ""
      }`}
      onClick={handleClick}
    >
      <img src={iconSrc} alt="Icon" className="button-icon" />
      <span className={`button-text ${expanded ? "show" : "hide"}`}>{text}</span>
      <span className="button-content">
        {expanded && (
          <div className="options">
            <button className="button-style-one">{buttonOneText}</button>
            <button className="button-style-two">{buttonTwoText}</button>
          </div>
        )}
      </span>
    </button>
  );
};


const Button = () => {
  const [clickedButtonIndex, setClickedButtonIndex] = useState(null);

  const toggleButton = (index) => {
    if (index === clickedButtonIndex) {
      // If the same button is clicked again, remove the border
      setClickedButtonIndex(null);
    } else {
      // If a different button is clicked, set the border for that button
      setClickedButtonIndex(index);
    }
  };

  return (
    <>
      <div className="Title">
        <h4>Restaurants</h4>
      </div>
      <div className="app">
        <CustomButton
          iconSrc="/assets/img/Dinein.svg"
          text="Dine In"
          expanded={clickedButtonIndex === 0}
          toggleExpanded={() => toggleButton(0)}
          buttonOneText="Dine In Locations"
          buttonTwoText="Near Me"
        />

        <CustomButton
          iconSrc="/assets/img/Catering.svg"
          text="Catering"
          onClick={() => toggleButton(1)}
          clicked={clickedButtonIndex === 1}
          
        />

        <CustomButton
          iconSrc="/assets/img/Delivery.svg"
          text="Delivery"
          expanded={clickedButtonIndex === 2}
          toggleExpanded={() => toggleButton(2)}
          buttonOneText="Available for Delivery"
          buttonTwoText="Delivers to Me"
        />

        <CustomButton
          iconSrc="/assets/img/Pickup.svg"
          text="Pickup"
          expanded={clickedButtonIndex === 3}
          toggleExpanded={() => toggleButton(3)}
          buttonOneText="Available for Pickup"
          buttonTwoText="Near Me"
        />
      </div>
      {/* Pass the clickedButtonIndex to BasicCard */}
      <BasicCard clickedButtonIndex={clickedButtonIndex} />
    </>
  );
};

export default Button;
