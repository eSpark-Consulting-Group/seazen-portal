import React, { useState } from 'react';
import { HomeAdress } from '../../components/address/homeForm';
import AddressHeader from '../../components/address/addressHeader';
import './style.css'

const AddressForm = () => {
  const [addressType, setAddressType] = useState('house'); // Default to 'house'

  const handleAddressTypeChange = (type) => {
    setAddressType(type);
  };

  return (
    <div className='button-style'>
      <AddressHeader />
      <div>
        <h3>Select Address Type:</h3>
        <button
          onClick={() => handleAddressTypeChange('house')}
          className={addressType === 'house' ? 'active' : 'house'}
        >
          <img
            src={addressType === 'house' ? '/assets/img/house - white.svg' : '/assets/img/house - black.svg'}
            alt="House"
          /><br/>
          <span className={addressType === 'house' ? 'button-text-active' : 'button-text-inactive'}>
            House
          </span>
        </button>
        <button
          onClick={() => handleAddressTypeChange('apartment')}
          className={addressType === 'apartment' ? 'active' : 'apartment'}
        >
          <img
            src={addressType === 'apartment' ? '/assets/img/appartment - white.svg' : '/assets/img/appartment - black.svg'}
            alt="Apartment"
          /><br/>
          <span className={addressType === 'apartment' ? 'button-text-active' : 'button-text-inactive'}>
          Apartment
          </span>
        </button>
        <button
          onClick={() => handleAddressTypeChange('office')}
          className={addressType === 'office' ? 'active' : 'office'}
        >
          <img
            src={addressType === 'office' ? '/assets/img/office - white.svg' : '/assets/img/office - black.svg'}
            alt="Office"
          /><br/>
          <span className={addressType === 'office' ? 'button-text-active' : 'button-text-inactive'}>
          Office
          </span>
        </button>
      </div>

      <div>
        {addressType === 'house' && (
          <HomeAdress/>
        )}

        {addressType === 'apartment' && (
          <form>
            {/* Apartment address form fields */}
            <label>Apartment Number:</label>
            <input type="text" name="apartmentNumber" />
            {/* Add more fields as needed */}
          </form>
        )}

        {addressType === 'office' && (
          <form>
            {/* Office address form fields */}
            <label>Office Name:</label>
            <input type="text" name="officeName" placeholder='office' />
            {/* Add more fields as needed */}
          </form>
        )}

        <button>Store Address</button>
      </div>
    </div>
  );
};

export default AddressForm;
