import React from 'react';

const AddressTypeButton = ({ type, addressType, onClick }) => (
  <button
    onClick={() => onClick(type)}
    className={addressType === type ? 'active' : type}
  >
    <img
      src={`/assets/img/${type} - ${addressType === type ? 'white' : 'black'}.svg`}
      alt={type}
    /><br />
    <span className={addressType === type ? 'button-text-active' : 'button-text-inactive'}>
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </span>
  </button>
);

const AddressTypeSelector = ({ addressType, handleAddressTypeChange }) => (
  <div>
    <h3>Select Address Type:</h3>
    <AddressTypeButton type="house" addressType={addressType} onClick={handleAddressTypeChange} />
    <AddressTypeButton type="appartment" addressType={addressType} onClick={handleAddressTypeChange} />
    <AddressTypeButton type="office" addressType={addressType} onClick={handleAddressTypeChange} />
  </div>
);

export default AddressTypeSelector;
