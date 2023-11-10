import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import { Box, Typography } from "@mui/material";
import ImageNotSupportedRounded from "@mui/icons-material/ImageNotSupportedRounded";

import { paths } from "../../../routes/paths";

import "./style.css";

export const DetailsHeader = (props) => {
  const { image, setOpenAddressPopup, fromDetail, editItem } = props;

  const navigate = useNavigate();
  const currentURL = useLocation();

  const token = localStorage.getItem("token");
  const currentLocation = JSON.parse(localStorage.getItem("location"));

  const cart = useSelector((state) => state.cart.cart);
  const addressData = useSelector((state) => state.address.addressData);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  const [imageNotFound, setImageNotFound] = useState(false);

  const onImageError = () => {
    setImageNotFound(true);
  };

  const backHandler = () => {
    // if (currentURL.search.includes("item_code")) {
    //   return navigate(`/menu/restaurant/${cart[0]?.restaurant_id}/delivery?`);
    // }
    navigate(-1);
  };

  return (
    <header className="container-fluid detailsheaderheader">
      {imageNotFound ? (
        <Box
          className="detailsHeaderBackground container-fluid"
          sx={{
            width: 100,
            height: 300,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "common.white",
            borderRadius: "8px",
            color: "common.black",
          }}
        >
          <ImageNotSupportedRounded fontSize="large"></ImageNotSupportedRounded>

          <Typography variant="subtitle2">No Image Found</Typography>
        </Box>
      ) : (
        <img
          className="detailsHeaderBackground container-fluid"
          src={image}
          onError={onImageError}
        />
      )}
      <div
        className="detailsheaderarrowicons-style pointer"
        onClick={() => backHandler()}
      >
        <img
          className="detailsheaderleft-icons"
          src="/assets/img/Icon - Arrow.svg"
        ></img>
      </div>

      <div
        className="detailsheadericon-style pointer"
        onClick={() => {
          token === null
            ? navigate(paths.cart)
            : addressData?.length === 0
            ? navigate(paths.address, {
                state: {
                  noAddress: true,
                  latlng: {
                    lat: currentLocation?.lat,
                    lng: currentLocation?.lng,
                  },
                  name: currentLocation?.address,
                  path: "menu/restaurant",
                  restaurant_id: cart[0]?.restaurant_id,
                },
              })
            : addressData?.length > 0 &&
              localStorage.getItem("selected") === null
            ? setOpenAddressPopup(true)
            : navigate(paths.cart, {
                state: {
                  fromDetail,
                  path: "menu/restaurant",
                  restaurant_id: cart[0]?.restaurant_id,
                },
              });
        }}
      >
        <img
          className="detailsheaderright-icons"
          src="/assets/img/Icon - Bag.svg"
        ></img>
        {totalQuantity > 0 && (
          <div className="items-count">{totalQuantity}</div>
        )}
      </div>
    </header>
  );
};
