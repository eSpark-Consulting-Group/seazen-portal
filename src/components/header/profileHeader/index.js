import React, { useState, useRef, useEffect } from "react";
import "./style.css";
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
    setIsPopupOpen(false); // Close the first popup
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
    <nav className="profile-header">
      <div
        className="profileHeaderaccount"
        onClick={() => navigate(paths.home)}
      >
        <div className="profileHeaderaccount-icon">
          <img src="/assets/img/Group 330.svg" alt="Account Icon" />
        </div>
      </div>
      <div className="profileHeaderlogo">
        <img src="/assets/img/Group 143.svg" alt="Logo" />
      </div>
      {showFlagOption && (
        <div className="profileHeaderflag-profile">
          <div className="profileHeadercircle-container" onClick={togglePopup}>
            <img src="/assets/img/flag1.svg" alt="Default Flag" />
          </div>
          {isPopupOpen && (
            <div
              className="profileHeaderpopup-overlay"
              onClick={togglePopup}
            ></div>
          )}
          {isPopupOpen && (
            <div className="profileHeaderpopup">
              <div>
                <div className="profileHeaderpopup-heading" >
                  <h2>Select which country to order from</h2>
                </div>
              </div>
              <div className="profileHeadercountry-list">
                {countries.map((country, index) => (
                  <div
                    className="profileHeadercountry"
                    key={index}
                    onClick={() => toggleCountryPopup(country)}
                  >
                    <img src={country.flag} alt={country.name} />
                    <p className="profileHeadercountry-name">{country.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedCountry && isCountryPopupOpen && (
            <div
              className="profileHeaderpopup-overlay2"
              onClick={() => setIsCountryPopupOpen(false)}
            ></div>
          )}
          {selectedCountry && isCountryPopupOpen && (
            <div className="profileHeaderpopup2">
              <img
                className="profileHeadersymbol"
                src="/assets/img/exclaim.svg"
              ></img>
              <p className="profileHeaderchange-country">
                You are about to change country
              </p>
              <div className="profileHeaderselected-country">
                <div className="profileHeadercountry-info">
                  <img src="/assets/img/flag1.svg" alt="Default Flag" />
                  <h2>Kuwait</h2>
                </div>
                <img
                  className="profileHeadergreater-sign"
                  src="/assets/img/sign.svg"
                ></img>
                <div className="profileHeadercountry-info">
                  <img src={selectedCountry.flag} alt={selectedCountry.name} />
                  <h2>{selectedCountry.name}</h2>
                </div>
              </div>
              <br></br>
              <p className="profileHeadercart-clear">
                Please note that any item in your cart will be cleared!
              </p>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button
                  className="profileHeaderbutton-cancel"
                  onClick={() => setIsCountryPopupOpen(false)}
                >
                  <span className="profileHeadercancel-text">Back</span>
                </button>
                <button
                  className="profileHeaderbutton-confirm"
                  onClick={() => setIsCountryPopupOpen(false)}
                >
                  <span className="profileHeaderconfirm-text">Confirm</span>
                </button>
              </div>
            </div>
          )}
        </div>  
      )}
      <div className="profileHeaderoption">
        <div className="profileHeaderoption-icon">
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
