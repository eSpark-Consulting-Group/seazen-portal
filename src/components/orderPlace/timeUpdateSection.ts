import React from "react";
import "../../screens/order/style.css";

const UpdateSection = ({ arrivalDate, arrivalTime }) => {
  return (
    <div className="update-sec">
      <p id="text-for-arrival">Estimated Arrival;</p>
      <p className="ordercurrent-time">
        {arrivalDate} {arrivalTime}
      </p>
      {/* <CurrentTime/> */}
    </div>
  );
};

export default UpdateSection;
