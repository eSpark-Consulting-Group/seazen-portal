import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// import { AddressesButton } from "./addressesButton";
// import { useSelector } from "react-redux";

import { paths } from "../../routes/paths";

import "./style.css";

const Card = (props) => {
  const {
    iconUrl,
    data,
    open,
    selectCurrentAddress,
    deselectCurrentAddress,
    isSelected,
    setIsSelected,
    address,
    handleClickOpen,
    home,
    chooseAddress,
  } = props;

  // useEffect(() => {

  //   if (address !== undefined) {
  //     if (
  //       parseFloat(address?.lat) === parseFloat(+data.latitude) &&
  //       parseFloat(address?.lng) === parseFloat(+data.longitude)
  //     ) {
  //       setIsSelected(true);
  //     }
  //   }
  // }, [address, data]);

  const navigate = useNavigate();
  const latlng = { lat: data.latitude, lng: data.longitute };

  return (
    <div
      className={[
        "addresses-container",
        !home && isSelected ? "dark-bg" : home ? "no-cursor" : "",
      ].join(" ")}
    >
      <div className="addresses-header">
        <div className="addresses-title">
          <div className="addresses-card-div">
            <img className="addresses-card-icon" src={iconUrl} alt="Icon" />
          </div>

          <div className="addresses-titles">
            <p className="addresses-home-title">{data?.address_type}</p>
            <p className="addresses-home-title2">{data?.address_type}</p>
            {/* data.address */}
          </div>
        </div>
        <div className={["addresses-button-container", open ? "zIndex" : ""]}>
          {!home ? (
            <button
              className="addresses-delete-button"
              onClick={() => {
                !home && handleClickOpen(data);
              }}
            >
              <span className="addresses-delete-text">Delete</span>
            </button>
          ) : null}

          <button
            className="addresses-edit-button"
            onClick={() =>
              home
                ? chooseAddress()
                : navigate(paths.address, {
                    state: { data: data, latlng, edit: true },
                  })
            }
          >
            <span className="addresses-edit-text">
              {!home ? "Edit" : "Choose"}
            </span>
          </button>
        </div>
      </div>
      <hr />

      <div
        className="addresses-content"
        onClick={() => {
          !home && !isSelected
            ? selectCurrentAddress(data)
            : !home && deselectCurrentAddress();
        }}
      >
        <div className="addresses-details-and-map">
          <div className="addresses-details">
            <p className="addresses-name">
              Block: {data.block}, Street:{data.street}
            </p>

            {data.address_type === "house" ? (
              <p className="addresses-name">House No: {data.house_no}</p>
            ) : (
              <p className="addresses-name">Building No: {data.building}</p>
            )}

            <p className="addresses-name">{data.avenue}</p>

            {data.address_type.toLowerCase() === "apartment" ? (
              <p className="addresses-name">{`Floor: ${data.floor}, Apartment: ${data.apartment_no}`}</p>
            ) : data.address_type.toLowerCase() === "office" ? (
              <p className="addresses-name">{`Floor: ${data.floor}, ${data.company_name}`}</p>
            ) : null}

            <p className="addresses-name">{data.address_label}</p>

            {data.additional_direction !== "" ? (
              <p className="additional-addresses">
                Additional Directions: <br /> {data.additional_direction}
              </p>
            ) : null}
          </div>
        </div>
        <div className="addresses-map-section">
          <img src="/assets/img/map-image.svg" alt="Small Image" />
        </div>
      </div>
    </div>
  );
};

export default Card;
