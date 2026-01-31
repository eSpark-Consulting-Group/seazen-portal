import React from "react";
import { useNavigate } from "react-router-dom";

import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { paths } from "../../routes/paths";

const scheduleDialog = (props) => {
  const {
    restaurantOpen,
    setRestaurantOpen,
    setOpenSchedulePopup,
    home,
    menuCard,
  } = props;

  const navigate = useNavigate();

  return (
    <Dialog
      open={restaurantOpen}
      onClose={() => setRestaurantOpen(false)}
      sx={{
        margin: "0",
        textAlign: "center",
      }}
      className="cart-dialog"
      PaperProps={{
        sx: {
          overflow: "visible",
          margin: "0px 0px 0px 27px",
          width: "327px",

          "@media (max-width: 500px)": {
            width: "375px",
            margin: "0px 0px 0px 0px",
          },

          "@media (max-width: 400px)": {
            width: "90%",
          },
        },
      }}
    >
      <DialogTitle id="alert-dialog-title" className="dialog-title title-cart">
        <img src="/assets/img/exclaim.svg"></img>

        <div
          style={{
            position: "absolute",
            top: "8px",
            right: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => {
            setRestaurantOpen(false);
          }}
        >
          <CloseIcon
            sx={{
              width: "24px",
              fontSize: "24px",
              cursor: "pointer",
              color: "#707070 !important",
            }}
          />
        </div>
      </DialogTitle>
      <DialogContent className="dialog-content-cart">
        Restaurant is closed. Do you want to schedule for later?
      </DialogContent>

      <div className="btn-navigate">
        <Button
          className="common-st add-btn"
          onClick={() =>
            menuCard ? navigate(paths?.home) : setRestaurantOpen(false)
          }
        >
          {!home ? "Home Page" : "Cancel"}
        </Button>

        <Button
          className="common-st go-to-btn"
          onClick={() => {
            setRestaurantOpen(false);
            setOpenSchedulePopup(true);
          }}
        >
          Schedule for later
        </Button>
      </div>
    </Dialog>
  );
};

export default scheduleDialog;
