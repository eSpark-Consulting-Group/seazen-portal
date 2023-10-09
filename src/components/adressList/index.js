import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

// import { AddressesButton } from "./addressesButton";
// import { useSelector } from "react-redux";

import { paths } from "../../routes/paths";

import "./style.css";

const Card = (props) => {
  const {
    iconUrl,
    data,
    deleteAddress,
    setOpen,
    open,
    selectCurrentAddress,
    deselectCurrentAddress,
    isSelected,
    setIsSelected,
    address,
  } = props;

  useEffect(() => {
    if (address !== undefined) {
      if (
        parseFloat(address.lat) === parseFloat(+data.latitude) &&
        parseFloat(address.lng) === parseFloat(+data.longitude)
      ) {
        setIsSelected(true);
      }
    }
  }, [address, data]);

  const navigate = useNavigate();
  const latlng = { lat: data.latitude, lng: data.longitute };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div
      className={[
        "addresses-container  container-fluid",
        isSelected ? "dark-bg" : "",
      ].join(" ")}
      onClick={() => {
        !isSelected ? selectCurrentAddress(data) : deselectCurrentAddress();
      }}
    >
      <div className="addresses-header">
        <div className="addresses-title">
          <div className="addresses-card-div">
            <img className="addresses-card-icon" src={iconUrl} alt="Icon" />
          </div>

          <div className="addresses-titles">
            <p className="addresses-home-title">{data.address_type}</p>
            <p className="addresses-home-title2">{data?.address_type}</p>
            {/* data.address */}
          </div>
        </div>
        <div className="addresses-button-container">
          <button className="addresses-delete-button" onClick={handleClickOpen}>
            <span className="addresses-delete-text">Delete</span>
          </button>
          <button
            className="addresses-edit-button"
            onClick={() =>
              navigate(paths.address, {
                state: { data: data, latlng, edit: true },
              })
            }
          >
            <span className="addresses-edit-text">Edit</span>
          </button>
        </div>
      </div>
      <hr />

      <div className="addresses-content">
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

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          overflow: "hidden",
          "& .MuiDialog-paper": {
            height: "204px",
            width: "327px",
            textAlign: "center",
            overflow: "hidden",
            overflowY: "hidden",
            "@media (min-width: 600px)": {
              left: "0",
              position: "fixed",
              margin: "20px",
            },
          },
        }}
      >
        <DialogTitle id="alert-dialog-title">
          <img src="/assets/img/exclaim.svg"></img>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div
              style={{
                font: "normal normal bold 16px/18px Titillium Web",
                color: "#959FA8",
              }}
            >
              Are you sure you want to
              <br /> delete {data.address_type}?{" "}
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{
            marginRight: "35px",
            marginBottom: "20px",
          }}
        >
          <Button
            onClick={handleClose}
            sx={{
              background: "#FFFFFF 0% 0% no-repeat padding-box",
              border: "1px solid #98694E",
              borderRadius: "12px",
              opacity: "1",
              width: "116px",
              height: "29px",
            }}
          >
            <span
              style={{
                font: "normal normal 600 16px/24px Titillium Web",
                color: "#98694E",
              }}
            >
              Back
            </span>
          </Button>
          <Button
            color="primary"
            autoFocus
            className="delete-button"
            sx={{
              background: "#98694E 0% 0% no-repeat padding-box",
              border: "1px solid #707070",
              borderRadius: "12px",
              opacity: "1",
              width: "116px",
              height: "29px",
            }}
            onClick={() => deleteAddress(data.id)}
          >
            <span
              style={{
                font: "normal normal 600 16px/24px Titillium Web",
                color: "#ffffff",
              }}
            >
              Delete
            </span>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Card;
