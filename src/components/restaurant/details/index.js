import React from "react";
import "./style.css";

const RestaurantDetails = ({restaurantDetail, restaurantBranchHours}) => {
  const handleBranchHoursClick = () =>{
    
  }
  return (
    <div className="details_outer_container">
      <div className="details_inner_div">
        <div className="logo_info_container">
          <img src=".\assets\img\Trapani_logo.svg" alt="restaurant_logo" />
          <div className="information_container" onClick={()=>{handleBranchHoursClick}} style={{cursor:"pointer"}}>
            {"Branches & Hours "}
            <span>
              <img
                src=".\assets\img\information_icon.svg"
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
