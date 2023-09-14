import React from 'react';
import '../../profileDetails/profileStructure/style.css'
import DetailsButton from '../../socialButtonTabs/detailsButtons';
import { Footer } from '../../footer';

const Structure = ({ name, register, imageUrl }) => {
  return (
    <div className="profile-section">
      <div className="left-section">
        <img src={imageUrl} alt="Profile" className="image-style" />
        <div className="profile-name">{name}</div>
        <div className="profile-register">{register}</div>
      <div>
        <button className="guest-register-button" >
          <span className="guest-register-text">Register</span>
        </button>
      </div>
      </div>
      <DetailsButton/>
      <Footer showCommentOption={false} />
    </div>
  );
};

export default Structure;


