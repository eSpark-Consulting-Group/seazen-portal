import React from 'react';
import './style.css'

const CustomButton = ({ iconSrc, text }) => {
  return (
    <button className="custom-button">
      <img src={iconSrc} alt="Icon" className="button-icon" />
      <span className="button-text">{text}</span>
    </button>
  );
};

const Button = () => {
  return (
    <>  <div className='Title'>
    <h2>Restaurant</h2>
    </div>
    <div className="app">
      <CustomButton iconSrc="/assets/img/Dine_In.png" text="Dine In" />
      <CustomButton iconSrc="/assets/img/Catering.png" text="Catering" />
      <CustomButton iconSrc="/assets/img/Delivery.png" text="Delivery" />
      <CustomButton iconSrc="/assets/img/Pickup.png" text="Pickup" />
    </div>
    </>

  );
};

export default Button;
