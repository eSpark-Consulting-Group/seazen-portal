import React from "react";
import BranchHeader from "../../components/branches-hours/headerBranch";
import BranchContent from "../../components/branches-hours/content";
import RestaurantInfo from "../../components/branches-hours/branch";
import "./style.css";
import { Footer } from "../../components/footer/footerContent";

export const Branches = () => {
  const restaurantData = [
    {
      id: 1,
      name: "Avenues Mall",
      weekdayHours: "10:00 AM - 8:00 PM",
      weekendHours: "11:00 AM - 9:00 PM",
    },
    {
      id: 2,
      name: "Argan Al-Bidaa",
      weekdayHours: "9:00 AM - 7:00 PM",
      weekendHours: "10:00 AM - 8:00 PM",
    },
    {
      id: 3,
      name: "Al-Kout Mall",
      weekdayHours: "9:00 AM - 22:00 PM",
      weekendHours: "10:00 AM - 8:00 PM",
    },
    {
      id: 4,
      name: "Khiran Mall",
      weekdayHours: "9:00 AM - 22:00 PM",
      weekendHours: "10:00 AM - 8:00 PM",
    },
    // Add more restaurant objects as needed
  ];
  return (
    <div className="branches-screen-container">
      <BranchHeader />
      <BranchContent />
      <RestaurantInfo restaurants={restaurantData} />;
      <div className="branches-footer">
      <div className="profile-footer">
        <Footer showFooterSection />
        </div>
        </div>
      </div>
  );
};
