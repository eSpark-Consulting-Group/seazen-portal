import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { paths } from "../../../routes/paths";

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
          <div
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
          </div>
        </div>
        <div className="tag_line">
          A modern take on the Babylonian experience
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetails;
