import React, { useState } from "react";
import "./style.css";


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
  const [expandedButton, setExpandedButton] = useState(null);
  const [cateringClicked, setCateringClicked] = useState(false);
  


  const toggleButton = (index) => {
    if (index === expandedButton) {
      setExpandedButton(null);
    } else {
      setExpandedButton(index);
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
          expanded={expandedButton === 0}
          toggleExpanded={() => toggleButton(0)}
          buttonOneText="Dine In Locations"
          buttonTwoText="Near Me"
        />

        <CustomButton
          iconSrc="/assets/img/Catering.svg"
          text="Catering"
          onClick={() => setCateringClicked(!cateringClicked)}
          clicked={cateringClicked} // Pass the cateringClicked state as a prop
        />

        <CustomButton
          iconSrc="/assets/img/Delivery.svg"
          text="Delivery"
          expanded={expandedButton === 2}
          toggleExpanded={() => toggleButton(2)}
          buttonOneText="Available to delivery"
          buttonTwoText="Delivers to me"
        />

        <CustomButton
          iconSrc="/assets/img/Pickup.svg"
          text="Pickup"
          expanded={expandedButton === 3}
          toggleExpanded={() => toggleButton(3)}
          buttonOneText="Available to Pickup"
          buttonTwoText="Near Me"
        />
      </div>
    </>
  );
};

export default Button;