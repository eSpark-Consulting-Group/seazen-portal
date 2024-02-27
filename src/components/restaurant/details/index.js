import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { styled } from "@mui/material/styles";

import { paths } from "../../../routes/paths";

import "./style.css";

const StyledItemPrice = styled("div")(({ theme }) => ({
  color: theme.palette.themeColor.main,
  // Add any other styles you need for the item price here
}));

const RestaurantDetails = ({ restaurantDetail, orderAmFromDelivery }) => {
  const navigate = useNavigate();

  const userSelected = useSelector((state) => state.location.selectedAddress);

  // const selected = JSON.parse(localStorage?.getItem("selected"));
  const location = JSON.parse(localStorage?.getItem("location"));

  const [orderAmount, setOrderAmount] = useState("KWD 7.000");

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

  // useEffect(() => {
  //   if (
  //     (userSelected === null || userSelected?.minOrderAmount === undefined) &&
  //     location?.minOrderAmount === undefined
  //   ) {
  //     setOrderAmount("KWD 7.000");
  //   } else if (
  //     (userSelected === null || userSelected?.minOrderAmount === undefined) &&
  //     location?.minOrderAmount !== undefined
  //   ) {
  //     setOrderAmount(`${location.minOrderAmount}`);
  //   } else {
  //     setOrderAmount(`${userSelected?.minOrderAmount}`);
  //   }
  // }, [userSelected, location]);

  return (
    <div className="details_outer_container px-3 px-sm-4">
      <div className="details_inner_div w-100">
        <div className="logo_info_container">
          {restaurantDetail?.name_en === "Trapani" ? (
            <div className="restaurant_logo_div">
              <img src="/assets/img/trapani-logo.svg" alt="restaurant_logo" />
            </div>
          ) : (
            <div className="restaurant_logo_div">
              <img src={restaurantDetail?.logo} alt="restaurant_logo" />
            </div>
          )}
          {/* {restaurantDetail?.name_en === "Masgouf" && (
            <img src={restaurantDetail?.logo} alt="restaurant_logo" />
          )} */}
          {/* // {restaurantDetail?.logo && (
          //   <div className="restaurant_logo_div">
          //     <img src={restaurantDetail?.logo} alt="restaurant_logo" />
          //   </div>
          // )} */}
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
            {/* <span
              style={{
                display: "block",
                textAlign: "right",
                font: "normal normal 10px/20px Titillium Web",
              }}
            >
              Min. order: {orderAmount?.split(" ")[1]?.split(".")[0]} KWD
            </span> */}
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
