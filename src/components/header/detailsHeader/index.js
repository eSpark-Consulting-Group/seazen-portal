import React from "react";
import { useNavigate } from "react-router";
import "./style.css";
import { paths } from "../../../routes/paths";
import { styled } from "@mui/material/styles"; // Import styled from MUI


const StyledOuterContainer = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.themeColor.main, // Apply the background color
  // Add any other styles you need for the outer container here
}));

export const DetailsHeader = () => {
  const navigate = useNavigate();
  return (
    <header className="container-fluid">
      <img className="detailsHeaderBackground container-fluid" src="/assets/img/image.png" />
      <div
        className="detailsheaderarrowicons-style pointer"
        onClick={() => navigate(-1)}
      >
        <img
          className="detailsheaderleft-icons"
          src="/assets/img/Icon - Arrow.svg"
        ></img>
      </div>
      <StyledOuterContainer className="detailsheadercaption-container">
        <p className="detailsheadercaption-text">KWD</p>
        <div className="detailsheadercaption-price">6.990</div>
      </StyledOuterContainer>
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
