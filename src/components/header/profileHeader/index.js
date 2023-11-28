import React, { useState, useRef, useEffect } from "react";
// import "./style.css";
import { useNavigate } from "react-router-dom";
import { paths } from "../../../routes/paths";
import countryList from "../../../api/common/getAllCountries";
import { useDispatch, useSelector } from "react-redux";
import { resetCart } from "../../../store/reducers/cartSlice";
import clearCart from "../../../api/cart/clearCart";
import { addCountry } from "../../../store/reducers/authSlice";
import {
  getCategoryItemList,
  getRestaurantsBanner,
} from "../../../store/reducers/resturantsSlice";
import { LazyLoadImage } from "react-lazy-load-image-component";

const ProfileHeader = (props) => {
  const { showFlagOption, customIcon } = props;
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [isCountryPopupOpen, setIsCountryPopupOpen] = useState(false);
  const [currentFlag, setCurrentFlag] = useState(""); // Default flag
  const [currentCountryName, setCountryName] = useState(""); // Default flag
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const isCountry = localStorage.getItem("country");
    if (isCountry) {
      setCurrentFlag(JSON.parse(isCountry).flag);
      setCountryName(JSON.parse(isCountry).name_en);
    }
    fetchAllCountries();
  }, []);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const toggleCountryPopup = (country) => {
    setSelectedCountry(country);
    setIsPopupOpen(false); // Close the first popup
    if (country.name_en !== currentCountryName) {
      setIsCountryPopupOpen(!isCountryPopupOpen);
    }
  };

  const handleConfirmCountryChange = () => {
    clearCartItems();
    setCurrentFlag(selectedCountry.flag);
    setCountryName(selectedCountry.name_en);
    localStorage.setItem("country", JSON.stringify(selectedCountry));
    dispatch(addCountry(selectedCountry));
    setIsCountryPopupOpen(false);
  };

  const fetchAllCountries = () => {
    countryList()
      .then((res) => {
        setCountries(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const clearCartItems = () => {
    dispatch(resetCart());
    dispatch(getRestaurantsBanner([]));
    dispatch(getCategoryItemList([]));
    clearCart()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <nav className="profile-header">
      <div
        className={customIcon ? "home-icon" : "profileHeaderaccount"}
        onClick={() => navigate(paths.home)}
      >
        <div
          className={
            customIcon ? "home-icon-header" : "profileHeaderaccount-icon"
          }
        >
          {customIcon ? (
            <img
              style={{ width: "21.47px" }}
              src="/assets/img/home.png"
              alt="Home Icon"
            />
          ) : (
            <img src="/assets/img/Group 330.svg" alt="Account Icon" />
          )}{" "}
        </div>
      </div>
      {/* <div className="profileHeaderlogo">
        <img
          style={{ width: "90px" }}
          src="/assets/img/order seazen logo.svg"
          alt="Logo"
        />
      </div> */}
      {showFlagOption && (
        <div className="profileHeaderflag-profile">
          <div className="profileHeadercircle-container" onClick={togglePopup}>
            <LazyLoadImage src={currentFlag} alt="Flag" effect="blur" />
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
                <div className="profileHeaderpopup-heading">
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
                    <img src={country.flag} alt={country.name_en} />
                    <p className="profileHeadercountry-name">
                      {country.name_en}
                    </p>
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
                  <img src={currentFlag} alt="Current Flag" />
                  <h2>
                    {currentCountryName === "United Arab Emirates"
                      ? "UAE"
                      : currentCountryName}
                  </h2>
                </div>
                <img
                  className="profileHeadergreater-sign"
                  src="/assets/img/sign.svg"
                ></img>
                <div className="profileHeadercountry-info">
                  <img
                    src={selectedCountry.flag}
                    alt={selectedCountry.name_en}
                  />
                  <h2>
                    {selectedCountry.name_en === "United Arab Emirates"
                      ? "UAE"
                      : selectedCountry.name_en}
                  </h2>
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
                  onClick={handleConfirmCountryChange}
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
