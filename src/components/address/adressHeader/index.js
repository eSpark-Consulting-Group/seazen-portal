import React from 'react';
import './style.css'

const AddressHeader = () => {
  return (
    <header className="addressheader">
      <div className="addressHeaderleft-icons">
        <img src='/assets/img/Icon - Arrow.svg'></img>
      </div>
      <div className="addressHeaderlogo">
        <h3>Add New Address</h3>
      </div>
      <div className="addressHeaderright-icons">
      <img src='/assets/img/Group 256.svg'></img>
      </div>
    </header>
  );
};

export default AddressHeader;
