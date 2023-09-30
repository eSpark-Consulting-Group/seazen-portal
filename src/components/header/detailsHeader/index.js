import React from "react";
import { useNavigate } from "react-router";
import "./style.css";
import { paths } from "../../../routes/paths";
import { styled } from "@mui/material/styles"; // Import styled from MUI

export const DetailsHeader = (props) => {
  const { image } = props;
  const navigate = useNavigate();

  return (
    <header className="container-fluid detailsheaderheader">
      <img className="detailsHeaderBackground container-fluid" src={image} />
      <div
        className="detailsheaderarrowicons-style pointer"
        onClick={() => navigate(-1)}
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
