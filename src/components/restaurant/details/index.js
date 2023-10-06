import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./style.module.css";
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
    <div className={`${styles.detailsOuterContainer} px-3 px-sm-4`}>
      <div className={`${styles.detailsInnerDiv} w-100`}>
        <div className={styles.logoInfoContainer}>
          <img src="/assets/img/Trapani_logo.svg" alt="restaurant_logo" />
          <StyledItemPrice
            className={styles.informationContainer}
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
        <StyledItemPrice className={styles.tagLine}>
          A modern take on the Babylonian experience
        </StyledItemPrice>
      </div>
    </div>
  );
};

export default RestaurantDetails;
