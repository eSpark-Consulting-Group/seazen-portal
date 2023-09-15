import React from "react";
import { useNavigate } from "react-router";
import "./style.css";
import { paths } from "../../../routes/paths";

export const DetailsHeader = () => {
  const navigate = useNavigate();
  return (
    <header className="detailsheaderheader">
      <img className="detailsHeaderBackground" src="/assets/img/image.png" />
      <div
        className="detailsheaderarrowicons-style pointer"
        onClick={() => navigate(-1)}
      >
        <img
          className="detailsheaderleft-icons"
          src="/assets/img/Icon - Arrow.svg"
        ></img>
      </div>
      <div className="detailsheadercaption-container">
        <p className="detailsheadercaption-text">KWD</p>
        <div className="detailsheadercaption-price">6.990</div>
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
