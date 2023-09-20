import React from 'react';
import './style.css'
import { useNavigate } from 'react-router';

const MyAddresses = () => {
  const navigate = useNavigate();
  return (
    <header className="header container-fluid">
      <div className="left-icons" onClick={()=>{navigate(-1)}}>
        <img src='/assets/img/Icon - Arrow.svg'></img>
      </div>
      <div className="logo">
        <h3>Your Addresses</h3>
      </div>
      <div className="right-icons">
      <img src='/assets/img/options icon.svg'></img>
      </div>
    </header>
  );
};
export default MyAddresses;