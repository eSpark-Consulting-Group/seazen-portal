import React, { useState } from "react";
import styles from "./style.module.css";
import { useNavigate } from "react-router";
import { paths } from "../../../routes/paths";

const ProfileHeader = (props) => {
  const { showFlagOption } = props;
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [isCountryPopupOpen, setIsCountryPopupOpen] = useState(false);
  const navigate = useNavigate();

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const toggleCountryPopup = (country) => {
    setSelectedCountry(country);
    setIsPopupOpen(false);
    setIsCountryPopupOpen(!isCountryPopupOpen);
  };

  const countries = [
    { name: "Bahrian", flag: "/assets/img/flag2.svg" },
    { name: "Kuwait", flag: "/assets/img/flag1.svg" },
    { name: "Oman", flag: "/assets/img/flag4.svg" },
    { name: "Qatar", flag: "/assets/img/flag3.svg" },
    { name: "Saudi Arabia", flag: "/assets/img/flag6.svg" },
    { name: "UAE", flag: "/assets/img/flag5.svg" },
  ];

  return (
    <nav className={styles.profileHeader}>
      <div
        className={styles.profileHeaderAccount}
        onClick={() => navigate(paths.home)}
      >
        <div className={styles.profileHeaderAccountIcon}>
          <img src="/assets/img/Group 330.svg" alt="Account Icon" />
        </div>
      </div>
      <div className={styles.profileHeaderLogo}>
        <img src="/assets/img/Group 143.svg" alt="Logo" />
      </div>
      {showFlagOption && (
        <div className={styles.profileHeaderFlagProfile}>
          <div
            className={styles.profileHeaderCircleContainer}
            onClick={togglePopup}
          >
            <img src="/assets/img/flag1.svg" alt="Default Flag" />
          </div>
          {isPopupOpen && (
            <div
              className={styles.profileHeaderPopupOverlay}
              onClick={togglePopup}
            ></div>
          )}
          {isPopupOpen && (
            <div className={styles.profileHeaderPopup}>
              <h2>Select which country to order from</h2>
              <div className={styles.profileHeaderCountryList}>
                {countries.map((country, index) => (
                  <div
                    className={styles.profileHeaderCountry}
                    key={index}
                    onClick={() => toggleCountryPopup(country)}
                  >
                    <img src={country.flag} alt={country.name} />
                    <p className={styles.profileHeaderCountryName}>
                      {country.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedCountry && isCountryPopupOpen && (
            <div
              className={styles.profileHeaderPopupOverlay2}
              onClick={() => setIsCountryPopupOpen(false)}
            ></div>
          )}
          {selectedCountry && isCountryPopupOpen && (
            <div className={styles.profileHeaderPopup2}>
              <img
                className={styles.profileHeaderSymbol}
                src="/assets/img/exclaim.svg"
                alt="Exclaim Symbol"
              ></img>
              <p className={styles.profileHeaderChangeCountry}>
                You are about to change country
              </p>
              <div className={styles.profileHeaderSelectedCountry}>
                <div className={styles.profileHeaderCountryInfo}>
                  <img src="/assets/img/flag1.svg" alt="Default Flag" />
                  <h2>Kuwait</h2>
                </div>
                <img
                  className={styles.profileHeaderGreaterSign}
                  src="/assets/img/sign.svg"
                  alt="Greater Than Sign"
                ></img>
                <div className={styles.profileHeaderCountryInfo}>
                  <img src={selectedCountry.flag} alt={selectedCountry.name} />
                  <h2>{selectedCountry.name}</h2>
                </div>
              </div>
              <br></br>
              <p className={styles.profileHeaderCartClear}>
                Please note that any item in your cart will be cleared!
              </p>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button
                  className={styles.profileHeaderButtonCancel}
                  onClick={() => setIsCountryPopupOpen(false)}
                >
                  <span className={styles.profileHeaderCancelText}>Cancel</span>
                </button>
                <button
                  className={styles.profileHeaderButtonConfirm}
                  onClick={() => setIsCountryPopupOpen(false)}
                >
                  <span className={styles.profileHeaderConfirmText}>
                    Confirm
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
      <div className={styles.profileHeaderOption}>
        <div className={styles.profileHeaderOptionIcon}>
          <img src="/assets/img/Group 256.svg" alt="Option Icon" />
        </div>
      </div>
    </nav>
  );
};

export default ProfileHeader;

ProfileHeader.defaultProps = {
  showFlagOption: true,
};
