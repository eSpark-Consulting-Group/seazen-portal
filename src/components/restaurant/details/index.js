import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { styled } from "@mui/material/styles";

import { paths } from "../../../routes/paths";

import "./style.css";

const StyledItemPrice = styled("div")(({ theme }) => ({
  color: theme.palette.themeColor.main,
  // Add any other styles you need for the item price here
}));

const RestaurantDetails = ({ restaurantDetail, orderAmFromDelivery }) => {
  const navigate = useNavigate();

  const selected = JSON.parse(localStorage?.getItem("selected"));

  const [orderAmount, setOrderAmount] = useState("");

  const handleBranchHoursClick = () => {
    navigate(
      paths.branches + localStorage?.getItem("restaurantID") + "/branches"
    );
  };

  const getLogoSrc = () => {
    if (restaurantDetail?.name_en === "Grove") {
      return "/assets/img/Grove.svg";
    } else if (restaurantDetail?.name_en === "Masgouf") {
      // Add the path for the Masgouf logo
      return "/assets/img/Maskof.svg";
    }
  };

  useEffect(() => {
    if (selected === null && orderAmFromDelivery === undefined) {
      setOrderAmount("KWD 7.000");
    } else if (selected === null && orderAmFromDelivery !== undefined) {
      setOrderAmount(`${orderAmFromDelivery}`);
    } else {
      setOrderAmount(`${selected?.minOrderAmount}`);
    }
  }, [selected, orderAmFromDelivery]);

  return (
    <div className="details_outer_container px-3 px-sm-4">
      <div className="details_inner_div w-100">
        <div className="logo_info_container">
          {restaurantDetail?.name_en === "Trapani" && (
            <img src="/assets/img/Trapani_logo.svg" alt="restaurant_logo" />
          )}
          {/* {restaurantDetail?.name_en === "Masgouf" && (
            <img src={restaurantDetail?.logo} alt="restaurant_logo" />
          )} */}
          {getLogoSrc() && <img src={getLogoSrc()} alt="restaurant_logo" />}
          {/* {restaurantDetail?.name_en === "Grove" && (
            <img src={restaurantDetail?.logo} alt="restaurant_logo" />
          )} */}
          <StyledItemPrice className="information_container">
            <span
              style={{
                cursor: "pointer",
                marginRight: "5px",
                marginTop: "15px",
                font: "normal normal 12px/20px Titillium Web",
              }}
              onClick={() => {
                handleBranchHoursClick();
              }}
            >
              Branches & Hours
            </span>

            <span
              style={{ marginLeft: "5px", position: "relative", top: "2px" }}
            >
              <img
                src="/assets/img/information_icon.svg"
                alt="information_icon"
              />
            </span>
            <span
              style={{
                display: "block",
                textAlign: "right",
                font: "normal normal 10px/20px Titillium Web",
              }}
            >
              Min. order: {orderAmount?.split(" ")[1]?.split(".")[0]} KWD
            </span>
          </StyledItemPrice>
        </div>
        <StyledItemPrice className="tag_line">
          {restaurantDetail?.slogan_en}
        </StyledItemPrice>
      </div>
    </div>
  );
};

export default RestaurantDetails;
