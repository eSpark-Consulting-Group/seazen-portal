import React from "react";
import "./style.css";

const AddressTypeButton = ({ type, addressType, onClick, edit }) => (
  <button
    onClick={() => onClick(type)}
    className={
      addressType === type
        ? "active"
        : type === "apartment"
        ? "appartment"
        : type
    }
    disabled={edit ? true : false}
  >
    <img
      src={`/assets/img/${type === "apartment" ? "appartment" : type} - ${
        addressType === type ? "white" : "black"
      }.svg`}
      alt={type}
    />
    <br />
    <span
      className={
        addressType === type ? "button-text-active" : "button-text-inactive"
      }
    >
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </span>
  </button>
);

const AddressTypeSelector = ({
  addressType,
  handleAddressTypeChange,
  edit,
}) => (
  <div className="addressButtonContainer">
    {/* <h3>Select Address Type:</h3> */}
    <AddressTypeButton
      type="house"
      addressType={addressType}
      onClick={handleAddressTypeChange}
      edit={edit}
    />
    <AddressTypeButton
      type="apartment"
      addressType={addressType}
      onClick={handleAddressTypeChange}
      edit={edit}
    />
    <AddressTypeButton
      type="office"
      addressType={addressType}
      onClick={handleAddressTypeChange}
      edit={edit}
    />
  </div>
);

export default AddressTypeSelector;
