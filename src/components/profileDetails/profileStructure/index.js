import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import DetailsButton from "../../socialButtonTabs/detailsButtons";
import { Footer } from "../../footer/footerContent";

import { paths } from "../../../routes/paths";

import "./style.css";
import logout from "../../../api/customer/logout";
import { useDispatch } from "react-redux";
import { resetCart } from "../../../store/reducers/cartSlice";
import clearCart from "../../../api/cart/clearCart";

const ProfileStructure = ({
  name,
  phoneNumber,
  email,
  imageUrl,
  onEditClick,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);

  const handleLogoutClick = () => {
    setOpenLogoutDialog(true);
  };

  const handleLogoutConfirm = () => {
    const token = localStorage.getItem("token");

    clearCart(token)
      .then((res) => {
        logout(token)
          .then(() => {
            localStorage.removeItem("token");
            sessionStorage.removeItem("cartEmpty");
            dispatch(resetCart());
            navigate("/");
          })
          .catch((e) => {
            console.error(e);
          });
      })
      .catch((err) => {
        console.log(err);
      });

    setOpenLogoutDialog(false);
  };

  const handleLogoutCancel = () => {
    setOpenLogoutDialog(false);
  };

  return (
    <div className="profile-section">
      <div style={{ height: "100%" }}>
        <div className="left-section">
          <img src={imageUrl} alt="Profile" className="image-style" />
          <div className="profile-name">{name}</div>
          <div className="profile-number">{phoneNumber}</div>
          <div className="profile-email">{email}</div>
        </div>
        <div className="right-section">
          <button onClick={onEditClick} className="profile-edit-button">
            <img src="/assets/img/Group 106.svg" alt="Edit" />
          </button>
        </div>
        <div
          className="inline-container"
          onClick={() => {
            navigate(paths.addresses, { state: { path: location.pathname } });
          }}
        >
          <img
            className="map-style"
            src="/assets/img/map.svg"
            alt="My Addresses"
          />
          <p>My Addresses</p>
        </div>
        <div
          className="inline-container2"
          onClick={() => {
            navigate(paths.myorder);
          }}
        >
          <img
            className="box-style"
            src="/assets/img/box.svg"
            alt="My Orders"
          />
          <p>My Orders</p>
        </div>
        <div className="inline-container3" onClick={handleLogoutClick}>
          <img className="box-style" src="assets/img/Logout.svg" alt="Logout" />
          <p>Logout</p>
        </div>
      </div>
      <DetailsButton />
      <div className="profile-footer">
        <Footer showCommentOption={false} />
      </div>
      <Dialog
        open={openLogoutDialog}
        onClose={handleLogoutCancel}
        aria-labelledby="logout-dialog-title"
        aria-describedby="logout-dialog-description"
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
          <img src="/assets/img/exclaim.svg" alt="Exclaim" />
        </DialogTitle>{" "}
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div
              style={{
                font: "normal normal bold 16px/18px Titillium Web",
                color: "#959FA8",
              }}
              className="delete-para"
            >
              Are you sure <br /> you want to logout
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
            onClick={handleLogoutCancel}
            sx={{
              background: "#FFFFFF 0% 0% no-repeat padding-box",
              border: "1px solid #98694E",
              borderRadius: "12px",
              opacity: "1",
              width: "116px",
              height: "29px",
              "&:hover": {
                background: "#FFFFFF 0% 0% no-repeat padding-box",
              },
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
            onClick={handleLogoutConfirm}
            sx={{
              background: "#98694E 0% 0% no-repeat padding-box",
              border: "1px solid #707070",
              borderRadius: "12px",
              opacity: "1",
              width: "116px",
              height: "29px",
              "&:hover": {
                background: "#98694E 0% 0% no-repeat padding-box",
              },
            }}
          >
            <span
              style={{
                font: "normal normal 600 16px/24px Titillium Web",
                color: "#ffffff",
              }}
            >
              Confirm
            </span>{" "}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProfileStructure;
