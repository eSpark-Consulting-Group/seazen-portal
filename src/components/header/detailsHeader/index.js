import React from 'react'
import './style.css'

export const DetailsHeader = () => {
    return (
        <header className="header">
          <div className="arrowicons-style" >
            <img className="left-icons" src='/assets/img/Icon - Arrow.svg'></img>
          </div>
          <div className="caption-container">
            <p className="caption-text">KWD</p>
          <div className="caption-price">6.990</div>
          </div>
          <div className="icon-style" >
          <img className="right-icons" src='/assets/img/Icon - Bag.svg'></img>
          </div>
        </header>
      );
};
