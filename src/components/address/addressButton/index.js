import React from "react";
import styles from "./style.module.css";

const AddressTypeButton = ({ type, addressType, onClick }) => (
  <button
    onClick={() => onClick(type)}
    className={addressType === type ? styles.active : styles[type]}
  >
    {/* {console.log(type , "type")} */}
    <img
      src={`/assets/img/${type} - ${
        addressType === type ? "white" : "black"
      }.svg`}
      alt={type}
    />
    <br />
    <span
      className={
        addressType === type ? styles.buttonTextActive : styles.buttonTextInactive
      }
    >
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </span>
  </button>
);

const AddressTypeSelector = ({ addressType, handleAddressTypeChange }) => (
  <div className={styles.addressButtonContainer}>
    {/* <h3>Select Address Type:</h3> */}
    <AddressTypeButton
      type="house"
      addressType={addressType}
      onClick={handleAddressTypeChange}
    />
    <AddressTypeButton
      type="appartment"
      addressType={addressType}
      onClick={handleAddressTypeChange}
    />
    <AddressTypeButton
      type="office"
      addressType={addressType}
      onClick={handleAddressTypeChange}
    />
  </div>
);

export default AddressTypeSelector;
