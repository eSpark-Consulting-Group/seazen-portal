import React, { useState, useEffect } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";

const RestaurantInfo = ({ restaurants, branchesData }) => {
  return (
    <div>
      {restaurants.map((restaurant, index) => (
        <RestaurantCard
          key={restaurant.id}
          branchesData={branchesData[index]}
          branchId={branchesData[index].id}
          {...restaurant}
        />
      ))}
    </div>
  );
};

const RestaurantCard = ({
  branchId,
  name,
  weekdayHours,
  weekendHours,
  branchesData,
}) => {
  // const [status, setStatus] = useState("");
  const [openStatus, setOpenStatus] = useState("");
  // const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    const branchHours = branchesData;

    if (branchHours?.id === branchId) {
      const date = new Date();
      const options = { weekday: "long" };
      const dayName = date.toLocaleDateString("en-US", options);

      const findStatus = branchesData?.branch_hours?.filter(
        (branch) => branch.week_day === dayName
      );

      setOpenStatus(findStatus[0].openingStatus);
    }
  }, [branchesData, branchId]);

  // useEffect(() => {
  //   const updateStatus = () => {
  //     const currentHour = currentTime.getHours();
  //     const currentMinute = currentTime.getMinutes();
  //     const [openHour, closeHour] = weekdayHours
  //       .split(" - ")
  //       .map((time) => parseInt(time.split(":")[0]));

  //     if (currentHour < openHour) {
  //       setStatus("Closed");
  //     } else if (currentHour === openHour && currentMinute < 30) {
  //       setStatus("Closed");
  //     } else if (currentHour < closeHour) {
  //       setStatus("Open Now");
  //     } else if (currentHour === closeHour && currentMinute < 30) {
  //       setStatus("Closing Soon");
  //     } else {
  //       setStatus("Closed");
  //     }
  //   };

  //   const interval = setInterval(() => {
  //     setCurrentTime(new Date());
  //     updateStatus();
  //   }, 60000); // Update every minute

  //   updateStatus();

  //   return () => clearInterval(interval);
  // }, [weekdayHours, currentTime]);

  const redirectLocation = () => {
    const latlng = { lat: branchesData.latitude, lng: branchesData.longitude };
    navigate("/location", { state: { latlng, fromBranch: true } });
  };

  return (
    <div className="branches-container">
      <div className="branch-info mx-4 ">
        <div className="branches-heading">
          <h1>{name}</h1>
          <div className="branch-status-section">
            <div className="branch-status-container">
              <div
                className={`branch-status-tag ${openStatus.toLowerCase()} ${
                  openStatus === "Close"
                    ? "branch-closed"
                    : openStatus === "Closing Soon"
                    ? "branch-closing-soon"
                    : openStatus === "Open"
                    ? "branch-open-now"
                    : ""
                }`}
              >
                {openStatus.toUpperCase()}
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="branch-hours d-flex justify-content-center align-items-center">
            <div className="branch-timings d-flex justify-content-center align-items-center">
              <strong className="branch-weekdays">Weekdays:</strong>
              <span className="branch-weekdaysHours"> {weekdayHours}</span>
              <div>
                <strong className="branch-weekends">Weekends:</strong>
                <span className="branch-weekendsHours"> {weekendHours}</span>
              </div>
            </div>
          </div>
        </div>
        <div onClick={redirectLocation} className="branch-icon">
          <img src="/assets/img/location-arrow.svg" alt={`${name} Location`} />
        </div>
      </div>
    </div>
  );
};

export default RestaurantInfo;
