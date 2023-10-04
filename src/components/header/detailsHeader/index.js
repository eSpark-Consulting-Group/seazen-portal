import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ImageNotSupportedRounded from "@mui/icons-material/ImageNotSupportedRounded";
import { paths } from "../../../routes/paths";
import "./style.css";

export const DetailsHeader = (props) => {
  const { image } = props;
  const navigate = useNavigate();
  const currentURL = useLocation();

  const [imageNotFound, setImageNotFound] = useState(true);

  const onImageError = () => {
    setImageNotFound(true);
  };

  const cart = useSelector((state) => state.cart.cart);

  const backHandler = () => {
    if (currentURL.search.includes("item_code")) {
      return navigate(`/menu/restaurant/${cart[0]?.restaurant_id}/delivery?`);
    }
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
        onClick={() => navigate(paths.cart)}
      >
        <img
          className="detailsheaderright-icons"
          src="/assets/img/Icon - Bag.svg"
        ></img>
      </div>
    </header>
  );
};
