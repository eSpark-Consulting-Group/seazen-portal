import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import styles from "./style.module.css";
import Navbar, { NavbarVariants } from "../../components/header";

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
    <Stack
      sx={{
        p: 3,
      }}
    >
      <Navbar variant={NavbarVariants.backWithProfile} />
      <div className={styles.editProfileStyle}>
        <h2>Edit Your Profile</h2>
        <form className={styles.editProfileformStyle} onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              placeholder="First Name"
              className={styles.editProfileleftName}
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
              className={styles.editProfilerightName}
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
              className={styles.editProfileemailStyle}
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
              className={styles.editProfilerightNumber}
            />
          </div>
          <div>
            <input
              type="text"
              id="countryCode"
              value={countryCode}
              placeholder="965"
              className={styles.editProfileleftCode}
              onChange={(e) => setCountryCode(e.target.value)}
            />
          </div>
          <button className={styles.editProfileButton} type="submit">
            <span className={styles.editProfileText}>Save Changes</span>
          </button>
        </form>
      </div>
    </Stack>
  );
};
