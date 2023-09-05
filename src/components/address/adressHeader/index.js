import React from 'react';
import './style.css'

const AddressHeader = () => {
  return (
    <header className="header">
      <div className="left-icons">
        <img src='/assets/img/Icon - Arrow.svg'></img>
      </div>
      <div className="logo">
        <h3>Add New Address</h3>
      </div>
      <div className="right-icons">
      <img src='/assets/img/Group 256.svg'></img>
      </div>
    </header>
  );
};

export default AddressHeader;
