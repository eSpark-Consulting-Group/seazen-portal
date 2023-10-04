import React from "react";
import { useNavigate, useLocation } from "react-router";
import "./style.css";
import { paths } from "../../../routes/paths";
import { styled } from "@mui/material/styles"; // Import styled from MUI
import { useSelector } from "react-redux";

export const DetailsHeader = (props) => {
  const { image } = props;
  const navigate = useNavigate();
  const currentURL = useLocation();

  const cart = useSelector((state) => state.cart.cart);

  const backHandler = () => {
    if(currentURL.search.includes("item_code")){
      return  navigate(`/menu/restaurant/${cart[0]?.restaurant_id}/delivery?`)
    }
    navigate(-1)
  }

  return (
    <header className="container-fluid detailsheaderheader">
      <img className="detailsHeaderBackground container-fluid" src={image} />
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
