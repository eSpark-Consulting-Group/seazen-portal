import React, { useState } from 'react';
import './style.css';

export const HomeAdress = () => {
  const [countryCode, setCountryCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleCountryCodeChange = (event) => {
    // Use regex to remove non-numeric characters
    const numericValue = event.target.value.replace(/\D/g, '');
    setCountryCode(numericValue);
  };

  const handlePhoneNumberChange = (event) => {
    // Use regex to allow only digits and optional spaces or dashes
    const regex = /^[0-9]*[-\s]?[0-9]*$/;
    if (regex.test(event.target.value)) {
      setPhoneNumber(event.target.value);
    }
  };

  return (
    <form className="container-style">
      <input className="form-style" id='required' type="text" name="Block"  placeholder="Block&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(Required)" />
      <input className="form-style" type="text" name="Street" placeholder="Street" />
      <input className="form-style" type="text" name="Avenue" placeholder="Avenue (Optional)" />
      <input className="form-style" type="text" name="House Number" placeholder="House Number" />
      <input className="form-style" type="text" name="Address Label" placeholder="Address Label (Optional)" />
      <textarea className="form-style" name="AdditionalDirection" id="AdditionalDirection" placeholder="Additional Direction"></textarea>
      <h3 className="contact-style">Contact Details</h3>
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
    </form>
  );
};
