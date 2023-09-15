import React from 'react'
import './style.css'

export const DetailsHeader = () => {
    return (
        <header className="detailsheaderheader">
          <img className="detailsHeaderBackground" src="/assets/img/image.png"/>
          <div className="detailsheaderarrowicons-style" >
            <img className="detailsheaderleft-icons" src='/assets/img/Icon - Arrow.svg'></img>
          </div>
          <div className="detailsheadercaption-container">
            <p className="detailsheadercaption-text">KWD</p>
          <div className="detailsheadercaption-price">6.990</div>
          </div>
          <div className="detailsheadericon-style" >
          <img className="detailsheaderright-icons" src='/assets/img/Icon - Bag.svg'></img>
          </div>
        </header>
      );
};
