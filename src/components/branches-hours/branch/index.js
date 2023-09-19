import React, { useState, useEffect } from "react";
import styles from "./style.module.css";

const RestaurantInfo = ({ restaurants }) => {
  return (
    <div>
      {restaurants.map((restaurant) => (
        <RestaurantCard key={restaurant.id} {...restaurant} />
      ))}
    </div>
  );
};

const RestaurantCard = ({ name, weekdayHours, weekendHours }) => {
  const [status, setStatus] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const updateStatus = () => {
      const currentHour = currentTime.getHours();
      const currentMinute = currentTime.getMinutes();
      const [openHour, closeHour] = weekdayHours
        .split(" - ")
        .map((time) => parseInt(time.split(":")[0]));

      if (currentHour < openHour) {
        setStatus("Closed");
      } else if (currentHour === openHour && currentMinute < 30) {
        setStatus("Closed");
      } else if (currentHour < closeHour) {
        setStatus("Open Now");
      } else if (currentHour === closeHour && currentMinute < 30) {
        setStatus("Closing Soon");
      } else {
        setStatus("Closed");
      }
    };

    const interval = setInterval(() => {
      setCurrentTime(new Date());
      updateStatus();
    }, 60000); // Update every minute

    updateStatus();

    return () => clearInterval(interval);
  }, [weekdayHours, currentTime]);

  return (
    <div className={styles.branchesContainer}>
      <div className={styles.branchInfo}>
        <div className={styles.branchesHeading}>
          <h1>{name}</h1>
        </div>
        <div className={styles.branchStatusSection}>
          <div className={styles.branchStatusContainer}>
            <div
              className={`branch-status-tag ${status.toLowerCase()} ${
                status === "Closed"
                  ? styles.branchClosed
                  : status === "Closing Soon"
                  ? styles.branchClosingSoon
                  : status === "Open Now"
                  ? styles.branchOpenNow
                  : ""
              }`}
            >
              {status.toUpperCase()}
            </div>
          </div>
        </div>
        <div>
          <div className={styles.branchHours}>
            <div className={styles.branchTimings}>
              <strong className={styles.branchWeekdays}>Weekdays:</strong>
              <span className={styles.branchWeekdaysHours}>
                {" "}
                {weekdayHours}
              </span>
              <div>
                <strong className={styles.branchWeekends}>Weekends:</strong>
                <span className={styles.branchWeekendsHours}>
                  {" "}
                  {weekendHours}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.branchIcon}>
          <img src="/assets/img/location-arrow.svg" alt={`${name} Location`} />
        </div>
      </div>
    </div>
  );
};

export default RestaurantInfo;
