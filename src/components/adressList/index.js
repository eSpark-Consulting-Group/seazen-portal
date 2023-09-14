import React from 'react';
import "./style.css"
import { AddressesButton } from './addressesButton';

const Card = ({ title, title2, iconUrl, name, block, home, floor }) => {
  return (
    <div className="addresses-container">
      <div className="addresses-header">
        <img className="addresses-card-icon" src={iconUrl} alt="Icon"  />
        <p className="addresses-home-title">{title}</p>
        <p className="addresses-home-title2">{title2}</p>
      </div>
      <div className="addresses-button-section">
        <button className="addresses-delete-button">Delete</button>
        <button className="addresses-edit-button">Edit</button>
        <hr/>
      </div>
      <div className="card-content">
        <div className="addresses-map-section">
          <img src="/assets/img/map-image.svg" alt="Small Image" />
        </div>
        <div className="addresses-details">
          <p className="addresses-name">Name: {name}</p>
          <p className="addresses-name">Block: {block}</p>
          <p className="addresses-name">Home: {home}</p>
          <p className="addresses-name">Floor: {floor}</p>
        </div>
      </div>
      <AddressesButton/>
    </div>
  );
};

export default Card;
