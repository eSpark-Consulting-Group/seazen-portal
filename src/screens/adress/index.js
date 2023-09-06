import React, { useState } from "react";
import { HomeAdress } from "../../components/address/forms/homeForm";
import "./style.css";
import AddressHeader from "../../components/address/adressHeader";
import AddressTypeSelector from "../../components/address/addressButton";
import { AppartmentAdress } from "../../components/address/forms/appartmentForm";
import { OfficeAdress } from "../../components/address/forms/officeForm";

const AddressForm = () => {
  const [addressType, setAddressType] = useState("house"); // Default to 'house'

  const handleAddressTypeChange = (type) => {
    setAddressType(type);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    // Handle form submission logic here, e.g., save the form data
  };

  return (
    <div className="button-style">
      <AddressHeader />
      <AddressTypeSelector
        addressType={addressType}
        handleAddressTypeChange={handleAddressTypeChange}
      />

      <div className="edit-container">
        <p className="address-name">Salmiya</p>
        <button className="edit-button">
          <span className="edit-text">Edit Location</span>
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        {" "}
        {/* Add the form element and onSubmit handler */}
        {addressType === "house" && <HomeAdress />}
        {addressType === "appartment" && <AppartmentAdress />}
        {addressType === "office" && <OfficeAdress />}
        <button type="submit" className="address-button">
          {" "}
          {/* Use type='submit' to make it a submit button */}
          <a href="#" className="address-text">
            Save
          </a>
        </button>
      </form>
    </div>
  );
};

export default AddressForm;
