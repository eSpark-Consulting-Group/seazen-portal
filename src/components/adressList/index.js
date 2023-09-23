import React from 'react';
import "./style.css"

const Card = ({ title, title2, iconUrl, name, block, home, floor, AdditionalDirections }) => {
  return (
    <div className=" container-fluid">
      <div className="addresses-container  container-fluid">
      <div className="addresses-header">
        <img className="addresses-card-icon" src={iconUrl} alt="Icon"  />
        <p className="addresses-home-title">{title}</p>
        <p className="addresses-home-title2">{title2}</p>
      </div>
      <div className="addresses-button-section">
        <div className="addresses-button-container">
        <button className="addresses-delete-button"><span className="addresses-delete-text">Delete</span></button>
        <button className="addresses-edit-button"><span className="addresses-edit-text">Edit</span></button>
        </div>
        <hr/>
      </div>
      <div className="addresses-content">
      <div className="addresses-details-and-map">
      <div className="addresses-details">
          <p className="addresses-name">{name}</p>
          <p className="addresses-name">{block}</p>
          <p className="addresses-name">{home}</p>
          <p className="addresses-name">{floor}</p>
          <p className="additional-addresses">Additional Directions; <br/> {AdditionalDirections}</p>
        </div>
        
        
      </div>
      <div className="addresses-map-section">
          <img src="/assets/img/map-image.svg" alt="Small Image" />
        </div>
      </div>
    </div>
    
    </div>

  );
};

export default Card;
