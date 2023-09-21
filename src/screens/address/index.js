import React, { useState } from "react";
import { HomeAdress } from "../../components/address/forms/homeForm";
import "./style.css";
import AddressHeader from "../../components/address/adressHeader";
import AddressTypeSelector from "../../components/address/addressButton";
import { AppartmentAdress } from "../../components/address/forms/appartmentForm";
import { OfficeAdress } from "../../components/address/forms/officeForm";
import { useNavigate } from "react-router";
import { paths } from "../../routes/paths";

const AddressForm = () => {
  const [addressType, setAddressType] = useState("house"); // Default to 'house'
  const [countryCode, setCountryCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();

  const handleCountryCodeChange = (event) => {
    // Use regex to remove non-numeric characters
    const numericValue = event.target.value.replace(/\D/g, "");
    setCountryCode(numericValue);
  };

  const handlePhoneNumberChange = (event) => {
    // Use regex to allow only digits and optional spaces or dashes
    const regex = /^[0-9]*[-\s]?[0-9]*$/;
    if (regex.test(event.target.value)) {
      setPhoneNumber(event.target.value);
    }
  };

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
        <button className="edit-button" onClick={() => navigate(paths.location)}>
          <span className="edit-text">Edit Location</span>
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        {" "}
        {/* Add the form element and onSubmit handler */}
        {addressType === "house" && <HomeAdress />}
        {addressType === "appartment" && <AppartmentAdress />}
        {addressType === "office" && <OfficeAdress />}
        <div className="contact-style">
          <div className="contact-section">
          <h3>Contact Details</h3>
          </div>
        <div className="contact-field">
          <input
            className="country-code-input"
            type="text"
            name="CountryCode"
            placeholder="+956"
            value={countryCode}
            onChange={handleCountryCodeChange}
          />
          <input
            className="phone-number-input"
            type="text"
            name="PhoneNumber"
            placeholder="Alternative Phone Number"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
          />
        </div>
        </div>
        <button type="submit" className="address-button" onClick={()=>{navigate(paths.addresses)}}>
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
