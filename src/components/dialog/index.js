import React, { useEffect, useState } from "react";
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
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";

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
    restaurantName,
    resturantId,
    newText,
    home,
    updateText,
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
              {location?.state?.restaurantDetail !== undefined
                ? location?.state?.restaurantDetail?.page_title_en
                : `${restaurantName} Restaurant`}{" "}
              does not
              <br /> deliver to your {newText ? "new " : "current"}location.
            </div>
          ) : (
            <div className="text-detail">
              Below items cannot be delivered
              <br /> to your {updateText ? updateText : "current"} location.
            </div>
          )}

          {fromDetail ? (
            <>
              <div className="disp-flex">
                <Button
                  onClick={() => {
                    !home ? navigate(paths.home) : handleClose();
                  }}
                  className="btn change-button"
                >
                  <span>Change Restaurant</span>
                </Button>

                <Button
                  onClick={() =>
                    navigate(paths.location, {
                      state: {
                        path: home ? "/home" : location.pathname,
                        restaurantName: home
                          ? restaurantName
                          : localStorage.getItem("restaurantName") !== null
                          ? localStorage.getItem("restaurantName")
                          : location?.state?.restaurantDetail?.page_title_en,
                        restaurant_id: home
                          ? resturantId
                          : location?.state?.restaurant_id !== undefined
                          ? location?.state?.restaurant_id
                          : +location?.state?.resturantId,
                      },
                    })
                  }
                  className={!home ? "btn change-button" : "btn back-button"}
                >
                  <span>Change Location</span>
                </Button>
              </div>

              {!home ? (
                <Button
                  color="primary"
                  autoFocus
                  className="btn back-button"
                  onClick={() =>
                    navigate(
                      `${paths.menu}/restaurant/${
                        location?.state?.resturantId === undefined
                          ? localStorage.getItem("restaurantID")
                          : +location.state.resturantId
                      }`
                    )
                  }
                >
                  <span>Back to Menu</span>
                </Button>
              ) : null}
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
      <Box className="to-scroll">
        {cartItems?.map((item) => {
          const checkIfImageExists = () => {
            const img = new Image();
            img.src = item?.itemImage;

            if (img.complete) {
              return true;
            } else {
              img.onload = () => {
                return true;
              };

              img.onerror = () => {
                return false;
              };
            }
          };

          return (
            <Box key={item.id} className="items-not-delvered">
              {checkIfImageExists() === true ? (
                <div className="items-image">
                  <img src={item?.itemImage} alt={item.itemName} />
                </div>
              ) : (
                <Box
                  sx={{
                    width: 100,
                    height: 100,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "common.white",
                    borderRadius: "8px",
                  }}
                >
                  <ImageNotSupportedIcon fontSize="large"></ImageNotSupportedIcon>

                  <Typography variant="caption">No Image Found</Typography>
                </Box>
              )}

              <div>
                <Typography className="item-heading" variant="h5">
                  {item.itemName}
                </Typography>
              </div>
            </Box>
          );
        })}
      </Box>

      <div className="btn-navigate">
        <Button
          className="common-st add-btn"
          onClick={() =>
            navigate(
              `${paths.menu}/restaurant/${localStorage.getItem("restaurantID")}`
            )
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
  const [imageExist, setImageExist] = useState(false);

  const checkIfImageExists = (url, callback) => {
    const img = new Image();
    img.src = url;

    if (img.complete) {
      callback(true);
    } else {
      img.onload = () => {
        callback(true);
      };

      img.onerror = () => {
        callback(false);
      };
    }
  };

  useEffect(() => {
    checkIfImageExists(selectedItemToDeliver?.image, (exists) => {
      if (exists) {
        setImageExist(false);
      } else {
        setImageExist(true);
      }
    });
  }, [selectedItemToDeliver]);

  return (
    <Box>
      <Box className="items-not-delvered">
        {!imageExist ? (
          <div className="items-image">
            <img
              src={selectedItemToDeliver?.image}
              alt={selectedItemToDeliver.name_en}
            />
          </div>
        ) : (
          <Box
            sx={{
              width: 100,
              height: 100,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "common.white",
              borderRadius: "8px",
            }}
          >
            <ImageNotSupportedIcon fontSize="large"></ImageNotSupportedIcon>

            <Typography variant="caption">No Image Found</Typography>
          </Box>
        )}

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
