import React, { useEffect, useLayoutEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { HomeAdress } from "../../components/address/forms/homeForm";
// import AddressHeader from "../../components/address/adressHeader";
import AddressTypeSelector from "../../components/address/addressButton";
import { AppartmentAdress } from "../../components/address/forms/appartmentForm";
import { OfficeAdress } from "../../components/address/forms/officeForm";
import MyAddresses from "../../components/header/myAdresses";
import { useNavigate } from "react-router";

import { paths } from "../../routes/paths";

import addAddressApiCall from "../../api/address/addAddress";
import updateAddressApiCall from "../../api/address/updateAddress";

import "./style.css";

const AddressForm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const contactInfo = useSelector((state) => state.auth.country);
  const { whatsapp_country_code, whatsapp_no } = contactInfo;

  const token = localStorage.getItem("token");

  const [addressType, setAddressType] = useState("house"); // Default to 'house'
  const [address, setAddress] = useState({
    block: "",
    street: "",
    avenue: "",
    house_no: "",
    address_label: "",
    additional_direction: "",
    building: "",
    floor: "",
    apartment_no: "",
    company_name: "",
    country_code: "",
    mobile_number: "",
    address_type: addressType,
    latitude: location?.state?.latlng.lat,
    longitude: location?.state?.latlng.lng,
  });
  const [errorState, setErrorState] = useState({
    blockErr: false,
    buildingErr: false,
    floorErr: false,
    companyNameErr: false,
    additionalDirErr: false,
    countryCodeErr: false,
  });
  const [clickEv, setClickEv] = useState(false);

  useLayoutEffect(() => {
    if (location?.state?.edit) {
      const state = location?.state?.data;
      setAddress({
        block: state.block ? state.block : "",
        street: state.street ? state.street : "",
        avenue: state.avenue ? state.avenue : "",
        house_no: state.house_no ? state.house_no : "",
        address_label: state.address_label ? state.address_label : "",
        additional_direction: state.additional_direction
          ? state.additional_direction
          : "",
        building: state.building ? state.building : "",
        floor: state.floor ? state.floor : "",
        apartment_no: state.apartment_no ? state.apartment_no : "",
        company_name: state.company_name ? state.company_name : "",
        country_code: state.phone_country_code ? state.phone_country_code : "",
        mobile_number: state.phone_no ? state.phone_no : "",
        address_type: state.address_type.toLowerCase()
          ? state.address_type.toLowerCase()
          : "",
        latitude: location?.state?.latlng.lat,
        longitude: location?.state?.latlng.lng,
      });
      setAddressType(state.address_type.toLowerCase());
    }
  }, [location?.state?.edit]);

  const handleAddressTypeChange = (type) => {
    setClickEv(false);
    setAddressType(type);
    setErrorState({
      blockErr: false,
      streetErr: false,
      houseNoErr: false,
      buildingErr: false,
      floorErr: false,
      apartmentNoerr: false,
      companyNameErr: false,
      additionalDirErr: false,
    });
    setAddress((prevState) => ({
      ...prevState,
      address_type: type,
    }));
  };

  const handleChange = (key, value) => {
    if (key === "country_code") {
      // Use regex to remove non-numeric characters
      const numericValue = value.replace(/\D/g, "");
      setAddress((prevAddress) => ({
        ...prevAddress,
        country_code: numericValue,
      }));
      //
    } else if (key === "mobile_number") {
      // Use regex to allow only digits and optional spaces or dashes
      const regex = /^[0-9]*[-\s]?[0-9]*$/;
      if (regex.test(value)) {
        setAddress((prevAddress) => ({
          ...prevAddress,
          mobile_number: value,
        }));
      }
      //
    } else {
      setAddress((prevAddress) => ({ ...prevAddress, [key]: value }));
    }
  };

  const apiCall = () => {
    const updateAddress = {
      ...address,
      country_code: whatsapp_country_code,
      mobile_number: whatsapp_no,
    };

    addAddressApiCall(updateAddress, token).then((res) => {
      if (res.success === "ok") {
        if (
          location?.state?.path === "/cart" ||
          location?.state?.path === "/home" ||
          location?.state?.path?.includes("menu-item-details") ||
          location?.state?.path === "menu/restaurant"
        ) {
          const addToStorage = {
            lat: location?.state?.latlng?.lat,
            lng: location?.state?.latlng?.lng,
            address: location?.state?.name,
          };

          localStorage.setItem("selected", JSON.stringify(addToStorage));

          if (
            location?.state?.path?.includes("menu-item-details") ||
            location?.state?.path === "menu/restaurant"
          ) {
            navigate(
              `${paths.menu}/restaurant/${location?.state?.restaurant_id}/delivery`
            );
          } else if (location?.state?.path === "/home") {
            navigate(paths.home);
          } else {
            navigate(paths.cart);
          }
        } else if (location?.state?.path === "/profile") {
          navigate(paths.addresses, { state: { path: location?.state?.path } });
        } else {
          navigate(paths.addresses, { state: { path: location.pathname } });
        }
      }
    });
  };

  const updateApiCall = () => {
    const updateAddress = {
      ...address,
      country_code: whatsapp_country_code,
      mobile_number: whatsapp_no,
    };

    updateAddressApiCall(updateAddress, location?.state?.data.id, token).then(
      (res) => {
        if (res.success === "ok") {
          if (
            location?.state?.path === "/cart" ||
            location?.state?.path === "/home" ||
            location?.state?.path?.includes("menu-item-details") ||
            location?.state?.path === "menu/restaurant"
          ) {
            const addToStorage = {
              lat: location?.state?.latlng?.lat,
              lng: location?.state?.latlng?.lng,
              address: location?.state?.name,
            };

            localStorage.setItem("selected", JSON.stringify(addToStorage));

            if (
              location?.state?.path?.includes("menu-item-details") ||
              location?.state?.path === "menu/restaurant"
            ) {
              navigate(
                `${paths.menu}/restaurant/${location?.state?.restaurant_id}`
              );
            } else if (location?.state?.path === "/home") {
              navigate(paths.home);
            } else {
              navigate(paths.cart);
            }
          } else if (location?.state?.path === "/profile") {
            navigate(paths.addresses, {
              state: { path: location?.state?.path },
            });
          } else {
            navigate(paths.addresses, { state: { path: location.pathname } });
          }
        }
      }
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    // Handle form submission logic here, e.g., save the form data
    setClickEv(true);

    if (addressType === "house") {
      if (
        address.block !== "" &&
        address.street !== "" &&
        address.house_no !== ""
      ) {
        setClickEv(false);
        if (location?.state?.edit) {
          updateApiCall();
        } else {
          apiCall();
        }
      }
    }
    if (addressType === "apartment") {
      if (
        address.block !== "" &&
        address.street !== "" &&
        address.building !== "" &&
        address.floor !== "" &&
        address.apartment_no !== ""
      ) {
        setClickEv(false);
        if (location?.state?.edit) {
          updateApiCall();
        } else {
          apiCall();
        }
      }
    }
    if (addressType === "office") {
      if (
        address.block !== "" &&
        address.street !== "" &&
        address.building !== "" &&
        address.floor !== "" &&
        address.company_name !== ""
      ) {
        setClickEv(false);
        if (location?.state?.edit) {
          updateApiCall();
        } else {
          apiCall();
        }
      }
    }
  };

  useEffect(() => {
    if (clickEv) {
      if (addressType === "house") {
        if (address.block === "") {
          setErrorState((prev) => ({
            ...prev,
            blockErr: true,
          }));
        }
        if (address.street === "") {
          setErrorState((prev) => ({
            ...prev,
            streetErr: true,
          }));
        }
        if (address.house_no === "") {
          setErrorState((prev) => ({
            ...prev,
            houseNoErr: true,
          }));
        }

        if (address.block !== "") {
          setErrorState((prev) => ({
            ...prev,
            blockErr: false,
          }));
        }
        if (address.street !== "") {
          setErrorState((prev) => ({
            ...prev,
            streetErr: false,
          }));
        }
        if (address.house_no !== "") {
          setErrorState((prev) => ({
            ...prev,
            houseNoErr: false,
          }));
        }
      } else if (addressType === "apartment") {
        if (address.block === "") {
          setErrorState((prev) => ({
            ...prev,
            blockErr: true,
          }));
        }
        if (address.street === "") {
          setErrorState((prev) => ({
            ...prev,
            streetErr: true,
          }));
        }
        if (address.building === "") {
          setErrorState((prev) => ({
            ...prev,
            buildingErr: true,
          }));
        }
        if (address.floor === "") {
          setErrorState((prev) => ({
            ...prev,
            floorErr: true,
          }));
        }
        if (address.apartment_no === "") {
          setErrorState((prev) => ({
            ...prev,
            apartmentNoerr: true,
          }));
        }
        if (address.block !== "") {
          setErrorState((prev) => ({
            ...prev,
            blockErr: false,
          }));
        }
        if (address.street !== "") {
          setErrorState((prev) => ({
            ...prev,
            streetErr: false,
          }));
        }
        if (address.building !== "") {
          setErrorState((prev) => ({
            ...prev,
            buildingErr: false,
          }));
        }
        if (address.floor !== "") {
          setErrorState((prev) => ({
            ...prev,
            floorErr: false,
          }));
        }
        if (address.apartment_no !== "") {
          setErrorState((prev) => ({
            ...prev,
            apartmentNoerr: false,
          }));
        }
      } else if (addressType === "office") {
        if (address.block === "") {
          setErrorState((prev) => ({
            ...prev,
            blockErr: true,
          }));
        }
        if (address.street === "") {
          setErrorState((prev) => ({
            ...prev,
            streetErr: true,
          }));
        }
        if (address.building === "") {
          setErrorState((prev) => ({
            ...prev,
            buildingErr: true,
          }));
        }
        if (address.floor === "") {
          setErrorState((prev) => ({
            ...prev,
            floorErr: true,
          }));
        }
        if (address.company_name === "") {
          setErrorState((prev) => ({
            ...prev,
            companyNameErr: true,
          }));
        }
        if (address.block !== "") {
          setErrorState((prev) => ({
            ...prev,
            blockErr: false,
          }));
        }
        if (address.street !== "") {
          setErrorState((prev) => ({
            ...prev,
            streetErr: false,
          }));
        }
        if (address.building !== "") {
          setErrorState((prev) => ({
            ...prev,
            buildingErr: false,
          }));
        }
        if (address.floor !== "") {
          setErrorState((prev) => ({
            ...prev,
            floorErr: false,
          }));
        }
        if (address.company_name !== "") {
          setErrorState((prev) => ({
            ...prev,
            companyNameErr: false,
          }));
        }
      }
    }
  }, [addressType, address, clickEv]);

  const truncateString = (str) => {
    if (str) {
      if (str.length <= 12) {
        return str;
      } else {
        return str.slice(0, 12) + "...";
      }
    }
  };

  return (
    <>
     <MyAddresses
        title={`${location?.state?.edit ? "Edit" : "Save New"} Address`}
        path={location?.state?.path}
        fromAllAddresses={false}
      />
    <div className="button-style">
      <AddressTypeSelector
        addressType={addressType}
        handleAddressTypeChange={
          !location?.state?.edit && handleAddressTypeChange
        }
        edit={location?.state?.edit}
      />

      {location?.state?.edit ? null : (
        <div className="edit-container px-3">
          <p className="address-name">
            {truncateString(location?.state?.name)}
          </p>
          <button
            className="edit-button"
            onClick={() =>
              navigate(paths.location, {
                state: {
                  name: location?.state?.name,
                  latlng: location?.state?.latlng,
                  editLocation: true,
                },
              })
            }
          >
            <span className="edit-text">Edit Location</span>
          </button>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        {/* Add the form element and onSubmit handler */}
        {addressType === "house" && (
          <HomeAdress
            handleChange={handleChange}
            address={address}
            blockErr={errorState.blockErr}
            streetErr={errorState.streetErr}
            houseNoErr={errorState.houseNoErr}
          />
        )}
        {addressType === "apartment" && (
          <AppartmentAdress
            handleChange={handleChange}
            address={address}
            blockErr={errorState.blockErr}
            streetErr={errorState.streetErr}
            buildingErr={errorState.buildingErr}
            floorErr={errorState.floorErr}
            apartmentNoerr={errorState.apartmentNoerr}
          />
        )}
        {addressType === "office" && (
          <OfficeAdress
            handleChange={handleChange}
            address={address}
            blockErr={errorState.blockErr}
            streetErr={errorState.streetErr}
            buildingErr={errorState.buildingErr}
            floorErr={errorState.floorErr}
            companyNameErr={errorState.companyNameErr}
          />
        )}
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
              value={address.country_code}
              onChange={(e) => handleChange("country_code", e.target.value)}
            />

            <input
              className="phone-number-input"
              type="text"
              name="PhoneNumber"
              placeholder="Alternative Phone Number"
              value={address.mobile_number}
              onChange={(e) => handleChange("mobile_number", e.target.value)}
            />
          </div>
        </div>
        <button type="submit" className="address-button">
          {/* Use type='submit' to make it a submit button */}
          <span className="address-text">
            {location?.state?.edit ? "Save Changes" : "Save"}
          </span>
        </button>
      </form>
    </div>
    </>
  );
};

export default AddressForm;
