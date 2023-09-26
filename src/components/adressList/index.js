import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import "./style.css";
import { AddressesButton } from "./addressesButton";

const Card = ({ title, title2, iconUrl, name, block, home, floor, AdditionalDirections }) => {
  const [open, setOpen] = useState(false); // State to control the dialog visibility

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className=" container-fluid">
      <div className="addresses-container  container-fluid">
      <div className="addresses-header">
        <img className="addresses-card-icon" src={iconUrl} alt="Icon" />
        <p className="addresses-home-title">{title}</p>
        <p className="addresses-home-title2">{title2}</p>
      </div>
      <div className="addresses-button-section">
        <div className="addresses-button-container">
          <button className="addresses-delete-button" onClick={handleClickOpen}>
            <span className="addresses-delete-text">Delete</span>
          </button>
          <button className="addresses-edit-button">
            <span className="addresses-edit-text">Edit</span>
          </button>
        </div>
        <hr />
      </div>
      <div className="addresses-content">
      <div className="addresses-details-and-map">
      <div className="addresses-details">
          <p className="addresses-name">{name}</p>
          <p className="addresses-name">{block}</p>
          <p className="addresses-name">{home}</p>
          <p className="addresses-name">{floor}</p>
          <p className="additional-addresses">Additional Directions; <br/> {AdditionalDirections}</p>
        </div>
        
        
      </div>
      <div className="addresses-map-section">
          <img src="/assets/img/map-image.svg" alt="Small Image" />
        </div>
      </div>
      <AddressesButton />

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          "& .MuiDialog-paper": {
            height: "204px",
            width: "327px",
            textAlign: "center",
            overflowY:"hidden",
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
            Are you sure you want to
            <br /> delete {title}?
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
            sx={{
              background: "#98694E 0% 0% no-repeat padding-box",
              border: "1px solid #707070",
              borderRadius: "12px",
              opacity: "1",
              width: "116px",
              height: "29px",
            }}
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
</div>
  );
};

export default Card;
