import React from "react";
import { useNavigate, useLocation } from "react-router";
import "./style.css";
import { paths } from "../../../routes/paths";
import { styled } from "@mui/material/styles"; // Import styled from MUI
import { useSelector } from "react-redux";

const StyledOuterContainer = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.themeColor.main, // Apply the background color
  // Add any other styles you need for the outer container here
}));

export const DetailsHeader = () => {
  const location = useLocation();

  const id = location.state.id;
  const item = useSelector(
    (state) => state?.resturants?.listItemByCategory
  ).find((item) => item.id === id);
  const navigate = useNavigate();

  return (
    <header className="container-fluid">
      <img
        className="detailsHeaderBackground container-fluid"
        src={item?.image}
      />
      <div
        className="detailsheaderarrowicons-style pointer"
        onClick={() => navigate(-1)}
      >
        <img
          className="detailsheaderleft-icons"
          src="/assets/img/Icon - Arrow.svg"
        ></img>
      </div>
      {/* <StyledOuterContainer className="detailsheadercaption-container">
        <div className="detailsheadercaption-price">{item.price}</div>
      </StyledOuterContainer> */}
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
