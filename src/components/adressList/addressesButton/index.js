import React from "react";
import { useNavigate } from "react-router";

import { paths } from "../../../routes/paths";

import "./style.css";

export const AddressesButton = ({
  restaurantName,
  restaurant_id,
  branch_id,
  path,
  location,
}) => {
  const navigate = useNavigate();

  const sendToLocation = () => {
    if (restaurantName !== undefined && restaurant_id !== undefined) {
      const initialState = {
        restaurantName: restaurantName,
        restaurant_id: restaurant_id,
        branch_id: branch_id,
      };

      if (location?.state?.fromHome !== undefined) {
        navigate(paths.location, {
          state: {
            path: "/home",
            fromHome: location?.state?.fromHome,
            backCart: location?.state?.backCart,
            ...initialState,
          },
        });
        //
      } else if (location?.state?.fromMenu !== undefined) {
        navigate(paths.location, {
          state: {
            path: "menu/restaurant",
            fromMenu: location?.state?.fromMenu,
            backCart: location?.state?.backCart,
            ...initialState,
          },
        });
        //
      } else if (location?.state?.fromDetail !== undefined) {
        navigate(paths.location, {
          state: {
            path: "menu/restaurant",
            fromDetail: location?.state?.fromDetail,
            backCart: location?.state?.backCart,
            detailPath: location?.state?.detailPath,
            ...initialState,
          },
        });
        //
      } else {
        navigate(paths.location, {
          state: {
            ...initialState,
            path,
          },
        });
      }
    } else {
      navigate(paths.location, { state: { path: path } });
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
