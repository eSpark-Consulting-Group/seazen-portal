import React from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";

import { paths } from "../../routes/paths";

import "./style.css";

export const DialogComponent = (props) => {
  const {
    notDeliver,
    setNotDeliver,
    location,
    fromDetail,
    selectedItemToDeliver,
    hasItems,
    cartItems,
  } = props;

  const navigate = useNavigate();

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
          borderBottomLeftRadius: "0px",
          borderBottomRightRadius: "0px",

          "@media (min-width: 600px)": {
            left: "0",
            position: "fixed",
            margin: "20px",
          },
        },
      }}
    >
      <DialogTitle id="alert-dialog-title" className="dialog-title">
        <img src="/assets/img/exclaim.svg"></img>
      </DialogTitle>
      <DialogContent className="content">
        <DialogContentText id="alert-dialog-description">
          {fromDetail ? (
            <div className="text-detail">
              {location?.state?.restaurantDetail?.page_title_en} does not
              <br /> deliver to your location.
            </div>
          ) : (
            <div className="text-detail">
              Below items cannot be delivered
              <br /> to your location.
            </div>
          )}

          {fromDetail ? (
            <>
              <div className="disp-flex">
                <Button
                  onClick={() => navigate(paths.home)}
                  className="btn change-button"
                >
                  <span>Change Restaurant</span>
                </Button>

                <Button
                  onClick={() =>
                    navigate(paths.location, {
                      state: {
                        path: location.pathname,
                        restaurantName:
                          location?.state?.restaurantDetail?.page_title_en,
                        restaurant_id: +location.state.resturantId,
                      },
                    })
                  }
                  className="btn change-button"
                >
                  <span>Change Location</span>
                </Button>
              </div>

              <Button
                color="primary"
                autoFocus
                className="btn back-button"
                onClick={() =>
                  navigate(
                    `${paths.menu}/restaurant/${+location.state.resturantId}`
                  )
                }
              >
                <span>Back to Menu</span>
              </Button>
            </>
          ) : !hasItems ? (
            <SingleItemNotDelivered
              selectedItemToDeliver={selectedItemToDeliver}
              handleClose={handleClose}
            />
          ) : (
            <ListItemsNotDelivered
              handleClose={handleClose}
              cartItems={cartItems}
              navigate={navigate}
            />
          )}
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

const ListItemsNotDelivered = (props) => {
  const { cartItems, handleClose, navigate } = props;
  return (
    <Box>
      {cartItems?.map((item) => (
        <Box key={item.id} className="to-scroll">
          <Box className="items-not-delvered">
            <div className="items-image">
              <img src={item?.itemImage} alt={item.itemName} />
            </div>

            <div>
              <Typography className="item-heading" variant="h5">
                {item.itemName}
              </Typography>
            </div>
          </Box>

          <Box key={item.id} className="items-not-delvered">
            <div className="items-image">
              <img src={item?.itemImage} alt={item.itemName} />
            </div>

            <div>
              <Typography className="item-heading" variant="h5">
                {item.itemName}
              </Typography>
            </div>
          </Box>

          <Box key={item.id} className="items-not-delvered">
            <div className="items-image">
              <img src={item?.itemImage} alt={item.itemName} />
            </div>

            <div>
              <Typography className="item-heading" variant="h5">
                {item.itemName}
              </Typography>
            </div>
          </Box>
        </Box>
      ))}

      <div className="btn-navigate">
        <Button
          className="common-st add-btn"
          onClick={() =>
            navigate(`${paths.menu}/${localStorage.getItem("restaurantID")}`)
          }
        >
          Add More
        </Button>

        <Button className="common-st go-to-btn" onClick={() => handleClose()}>
          Go To Cart
        </Button>
      </div>
    </Box>
  );
};

const SingleItemNotDelivered = ({ selectedItemToDeliver, handleClose }) => {
  return (
    <Box>
      <Box className="items-not-delvered">
        <div className="items-image">
          <img
            src={selectedItemToDeliver?.image}
            alt={selectedItemToDeliver.name_en}
          />
        </div>

        <div>
          <Typography className="item-heading" variant="h5">
            {selectedItemToDeliver.name_en}
          </Typography>
        </div>
      </Box>

      <Button className="continue-btn" onClick={() => handleClose()}>
        Continue
      </Button>
    </Box>
  );
};
