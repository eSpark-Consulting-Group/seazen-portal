import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { paths } from "../../../routes/paths";
import { styled } from "@mui/material/styles";


const StyledItemPrice = styled("div")(({ theme }) => ({
  color: theme.palette.themeColor.main,
   // Add any other styles you need for the item price here
 }));

const RestaurantDetails = ({ restaurantDetail, restaurantBranchHours }) => {
  const navigate = useNavigate();
  const handleBranchHoursClick = () => {
    navigate(paths.branches);
  };
  return (
    <div className="details_outer_container px-3 px-sm-4">
      <div className="details_inner_div w-100">
        <div className="logo_info_container">
          <img src="/assets/img/Trapani_logo.svg" alt="restaurant_logo" />
          <StyledItemPrice
            className="information_container"
            onClick={() => {
              handleBranchHoursClick();
            }}
            style={{ cursor: "pointer" }}
          >
            {"Branches & Hours "}
            <span>
              <img
                src="/assets/img/information_icon.svg"
                alt="information_icon"
              />
            </span>
          </StyledItemPrice>
        </div>
        <StyledItemPrice className="tag_line">
          A modern take on the Babylonian experience
        </StyledItemPrice>
      </div>
    </div>
  );
};

export default RestaurantDetails;
