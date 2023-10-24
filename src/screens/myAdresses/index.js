import React, { useState, useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

import {
  Skeleton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
} from "@mui/material";

import Card from "../../components/adressList";
import MyAddresses from "../../components/header/myAdresses";
import { AddressesButton } from "../../components/adressList/addressesButton";

import getAllAddress from "../../api/address/getAddress";

import { getAddress } from "../../store/reducers/addressSlice";

import deleteAddressApiCall from "../../api/address/deleteAddress";

import "./style.css";
import { paths } from "../../routes/paths";
import { getFullAddress } from "../../utils/getAddress";

const App = () => {
  const isToken = localStorage.getItem("token");
  const addressData = useSelector((state) => state.address.addressData);
  // const isLoading = useSelector((state) => state.address.isLoading);

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [cardData, setCardData] = useState([]);
  const [open, setOpen] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState({});
  const [selectedId, setSelectedId] = useState(null);
  const [addressType, setAddressType] = useState("");
  const [addressId, setAddressId] = useState(null);
  const [fullAddress, setFullAddress] = useState(null);
  const [deleteAdd, setDeleteAdd] = useState(false);
  // const [isLoading, setIsloading] = useState(false);

  // useLayoutEffect(() => {
  //   if (addressData.length === 2) {
  //     const filterAddress = addressData.filter(
  //       (item) =>
  //         parseFloat(location?.state?.latlng?.lat) !==
  //           parseFloat(+item.latitude) &&
  //         parseFloat(location?.state?.latlng?.lng) !==
  //           parseFloat(+item.longitude)
  //     );

  //     setCardData(filterAddress);
  //   }
  // }, [addressData]);

  const fetchFunction = async () => {
    // setIsloading(true);
    getAllAddress(isToken).then((res) => {
      if (res.success === "ok") {
        dispatch(getAddress(res.data));
        // setIsloading(false);
        setDeleteAdd(false);
        setOpen(false);
      }
    });
  };

  // useEffect(() => {
  //   fetchFunction();
  // }, []);

  const { isLoading, refetch } = useQuery({
    queryFn: () => getAllAddress(isToken),
    onSuccess: (data) => {
      dispatch(getAddress(data.data));
    },
  });

  const selectCurrentAddress = (item) => {
    setSelectedId(item.id);
    setSelectedAddress(item);

    const selectedAddress = {
      lat: +item.latitude,
      lng: +item.longitude,
    };

    getFullAddress(selectedAddress.lat, selectedAddress.lng, setFullAddress);
  };

  useEffect(() => {
    if (fullAddress !== null) {
      localStorage.setItem("selected", JSON.stringify(fullAddress));

      if (location?.state?.path === "/cart") {
        navigate(paths.cart, { state: { back: "back-to-cart" } });
      }

      if (
        location?.state?.path === "/profile" ||
        location?.state?.path === "/address"
      ) {
        navigate(paths.home);
      }
    }
  }, [fullAddress, location]);

  const deselectCurrentAddress = () => {
    setIsSelected(false);
    setSelectedAddress({});
  };

  const deleteAddress = (id) => {
    setDeleteAdd(true);
    deleteAddressApiCall(id, isToken).then((res) => {
      if (res.statusCode === 200) {
        fetchFunction();
      }
    });
  };

  const handleClose = () => {
    setOpen(false);
    setAddressType("");
    setAddressId(null);
  };

  const handleClickOpen = (item) => {
    setAddressType(item.address_type);
    setAddressId(item.id);
    setOpen(true);
  };

  return (
    <div className="app ">
      <MyAddresses
        title="Your Addresses"
        path={location?.state?.path}
        fromAllAddresses={true}
      />
      {isLoading
        ? Array.from({ length: 3 }).map((_) => (
            <>
              <div className="skeleton-container container-fluid">
                <div className="skeleton-header">
                  <div>
                    <Skeleton
                      className="skeleton-title"
                      variant="text"
                      width={50}
                      height={20}
                    />
                    <Skeleton
                      className="skeleton-title2  "
                      variant="text"
                      width={50}
                      height={20}
                    />
                  </div>
                  <div className="skeleton-button">
                    <Skeleton
                      className="skeleton-btn"
                      variant="text"
                      width={"30%"}
                      height={45}
                    />
                    <Skeleton variant="text" width={"30%"} height={45} />
                  </div>
                </div>
                <Skeleton
                  className="skeleton-dots"
                  variant="text"
                  width={"90%"}
                  height={2}
                />

                <div className="skeleton-detail">
                  <div>
                    <Skeleton
                      className="skeleton-title"
                      variant="text"
                      width={50}
                      height={20}
                    />
                    <Skeleton
                      className="skeleton-title2  "
                      variant="text"
                      width={70}
                      height={20}
                    />
                    <Skeleton
                      className="skeleton-title"
                      variant="text"
                      width={60}
                      height={20}
                    />
                    <Skeleton
                      className="skeleton-title2"
                      variant="text"
                      width={60}
                      height={20}
                    />
                  </div>

                  <div>
                    <Skeleton
                      className="skeleton-rectangular"
                      variant="rectangular"
                    />
                  </div>
                </div>
              </div>
            </>
          ))
        : addressData.length && (
            <div className="parent-address">
              {addressData.map((data) => (
                <div key={data.id}>
                  <Card
                    iconUrl={
                      data.address_type === "house"
                        ? "/assets/img/salmiya home.svg"
                        : data.address_type === "appartment"
                        ? "/assets/img/salmiya appart.svg"
                        : "/assets/img/salmiya office.svg"
                    }
                    data={data}
                    setOpen={setOpen}
                    open={open}
                    deleteAddress={deleteAddress}
                    selectCurrentAddress={selectCurrentAddress}
                    deselectCurrentAddress={deselectCurrentAddress}
                    isSelected={isSelected}
                    setIsSelected={setIsSelected}
                    address={location?.state?.latlng}
                    handleClickOpen={handleClickOpen}
                  />
                </div>
              ))}
            </div>
          )}
      <AddressesButton
        restaurantName={location?.state?.restaurantName}
        restaurant_id={location?.state?.restaurant_id}
        path={location?.state?.path}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="delete-modal"
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
              className="delete-para"
            >
              Are you sure you want to
              <br /> delete {addressType}?{" "}
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
            className={deleteAdd ? "loader-button" : "delete-button"}
            sx={{
              background: "#98694E 0% 0% no-repeat padding-box",
              border: "1px solid #707070",
              borderRadius: "12px",
              opacity: "1",
              width: "116px",
              height: "29px",
            }}
            onClick={() => deleteAddress(addressId)}
            disabled={deleteAdd}
          >
            {deleteAdd ? (
              <CircularProgress className="loader" />
            ) : (
              <span
                style={{
                  font: "normal normal 600 16px/24px Titillium Web",
                  color: "#ffffff",
                }}
              >
                Delete
              </span>
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default App;
