import React from 'react';
import './style.css'
import DetailsButton from '../../socialButtonTabs/detailsButtons';
import { Footer } from '../../footer/footerContent';

const ProfileStructure = ({ name, phoneNumber, email, imageUrl, onEditClick }) => {
  return (
    <div className="profile-section">
      <div className="left-section">
        <img src={imageUrl} alt="Profile" className="image-style" />
        <div className="profile-name">{name}</div>
        <div className="profile-number">{phoneNumber}</div>
        <div className="profile-email">{email}</div>
      </div>
      <div className="right-section">
        <button onClick={onEditClick} className="profile-edit-button">
          <img src="/assets/img/Group 106.svg"></img>
        </button>
      </div>
      <div className="inline-container">
      <img className="map-style" src='/assets/img/map.svg'></img>
      <p>My Addresses</p>
      </div>
      <div className="inline-container2">
      <img className="box-style" src='/assets/img/box.svg'></img>
      <p>My Orders</p>
      </div>
      <DetailsButton/>
      <Footer showCommentOption={false} />
    </div>
  );
};

export default ProfileStructure;


