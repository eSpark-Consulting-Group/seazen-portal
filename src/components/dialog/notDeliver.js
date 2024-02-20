import React from "react";

import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import "./style.css";

export const DialogComponent = (props) => {
  const { notDeliver, setNotDeliver, restaurantDetail } = props;

  const handleClose = () => {
    setNotDeliver(false);
  };

  return (
    <Dialog
      open={notDeliver}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className="not-delivered"
      sx={{
        overflow: "hidden",
        "& .MuiDialog-paper": {
          width: "327px",
          textAlign: "center",
          overflow: "visible",
          margin: "27px",
          scrollbarWidth: "none",

          "@media (max-width: 500px)": {
            width: "375px",
            margin: "30px",
          },

          "@media (max-width: 400px)": {
            width: "90%",
            margin: "25px",
          },
        },
      }}
    >
      <DialogTitle id="alert-dialog-title" className="dialog-title">
        <img src="/assets/img/exclaim.svg"></img>
      </DialogTitle>
      <DialogContent
        className="content"
        sx={{
          scrollbarWidth: "none",
        }}
      >
        <DialogContentText id="alert-dialog-description">
          <div className="text-detail">
            {restaurantDetail?.page_title_en} does not
            <br /> deliver to your selected location.
          </div>

          <SingleItemNotDelivered handleClose={handleClose} />
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

const SingleItemNotDelivered = ({ handleClose }) => {
  return (
    <Box>
      <Button className="continue-btn" onClick={() => handleClose()}>
        Continue
      </Button>
    </Box>
  );
};
