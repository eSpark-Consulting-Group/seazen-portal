import React from "react";
import "./style.css";
import { useNavigate } from "react-router";
import { paths } from "../../../routes/paths";

export const AddressesButton = ({ restaurantName, restaurant_id, path }) => {
  const navigate = useNavigate();

  const sendToLocation = () => {
    if (restaurantName !== undefined && restaurant_id !== undefined) {
      navigate(paths.location, {
        state: {
          restaurantName: restaurantName,
          restaurant_id: restaurant_id,
          path,
        },
      });
    } else {
      navigate(paths.location, { state: path });
    }
  };

  return (
    <div className="addressButton">
      <button
        className="addresses-add-button container"
        onClick={() => sendToLocation()}
      >
        <span className="addresses-add-button-text">Add New Address</span>
      </button>
    </div>
  );
};
