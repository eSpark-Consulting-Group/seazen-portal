import React, { useState } from "react";
import FormHeader from "../../components/header/formHeader";
import "./style.css";

export const EditForm = () => {
  // Initialize state variables for form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("");

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Do something with the form data, e.g., send it to a server or perform validation
    console.log("Form submitted:", {
      firstName,
      lastName,
      email,
      phone: `${countryCode} ${phone}`,
    });
  };
  return (
    <div>
      <FormHeader />
      <div className="edit-style">
        <h2>Edit Your Profile</h2>
        <form className="form-style" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              placeholder="First Name"
              className="left-name"
            />
          </div>
          <div>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              placeholder="Last Name"
              className="right-name"
            />
          </div>
          <div>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="test@gmail.com"
              className="email-style"
            />
          </div>
          <div>
            <label htmlFor="phone">Phone:</label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              placeholder="11223344"
              className="right-number"
            />
          </div>
          <div>
            <input
              type="text"
              id="countryCode"
              value={countryCode}
              placeholder="965"
              className="left-code"
              onChange={(e) => setCountryCode(e.target.value)}
            />
          </div>
          <button className="edit-button" type="submit">
            <span className="edit-text">Save Changes</span>
          </button>
        </form>
      </div>
    </div>
  );
};
