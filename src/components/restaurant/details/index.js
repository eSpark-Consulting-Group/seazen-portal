import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./style.module.css";
import { paths } from "../../../routes/paths";

const RestaurantDetails = ({ restaurantDetail, restaurantBranchHours }) => {
  const navigate = useNavigate();
  const handleBranchHoursClick = () => {
    navigate(paths.branches);
  };

  return (
    <div className={styles.detailsOuterContainer}>
      <div className={styles.detailsInnerDiv}>
        <div className={styles.logoInfoContainer}>
          <img src="/assets/img/Trapani_logo.svg" alt="restaurant_logo" />
          <div
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
          </div>
        </div>
        <div className={styles.tagLine}>
          A modern take on the Babylonian experience
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetails;
