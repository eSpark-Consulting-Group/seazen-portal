import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import "./style.css";

import deliveryIcon from "./delivery-icon.svg";
import pickupIcon from "./pickup-icon.svg";
import cateringIcon from "./catering-icon.svg";
import dineInIcon from "./dinein-icon.svg";
import { useNavigate } from "react-router";
import { paths } from "../../routes/paths";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

const icons = [
  {
    id: 2,
    orderType: "delivery",
    image: deliveryIcon,
  },
  {
    id: 3,
    orderType: "pickUp",
    image: pickupIcon,
  },
  {
    id: 1,
    orderType: "catering",
    image: cateringIcon,
  },
  {
    id: 0,
    orderType: "dineIn",
    image: dineInIcon,
  },
];

const BasicCard = ({ clickedButtonIndex, orderTypeFilter }) => {
  const navigate = useNavigate();
  const captions = [
    icons,
    icons.slice(0, 3),
    icons,
    icons,
    icons.slice(0, 2),
    icons.slice(1),
  ];

  // const handleRestaurantClick = () => {
  //   navigate(paths.menu)
  // };

  const getCardClassName = () => {
    if (orderTypeFilter) {
      return orderTypeFilter === "delivery"
        ? "restaurantCard-border-delivery"
        : "restaurantCard-border-near";
    } else {
      return "restaurantCard-no-border";
    }
  };

  const getClassNameAccordingToFilter = (orderTypeId) => {
    if (
      orderTypeId === clickedButtonIndex &&
      orderTypeFilter &&
      orderTypeId !== 1
    ) {
      return orderTypeFilter === "delivery"
        ? "button-icons-styles-delivery"
        : "button-icons-styles-near";
    }
  };

  // Define the width and height for the SVG icons
  const iconWidth = "7px";
  const iconHeight = "9px";

  return (
    <div className="restaurantCard-container">
      {[0, 1, 2, 3, 4, 5].map((index) => (
        <div key={index} className={`restaurantCards ${getCardClassName()}`}>
          <Card
            sx={{ width: 164, borderRadius: 1 }}
            className="restaurantCards"
            onClick={() => navigate(paths.menu)}
          >
            <img
              className="restaurantCard-img"
              src={`/assets/img/${15 + index * 2}.png`}
              alt={`Card ${index + 1}`}
            />
            <div
              className={`svg-container ${
                clickedButtonIndex !== null ? "expanded" : "collapsed"
              }`}
            >
              <div className="inner-svg-container">
                {captions[index].map((icon, i) => {
                  return (
                    <div key={i} className="icon-row">
                      <img
                        className={getClassNameAccordingToFilter(icon.id)}
                        src={icon.image}
                        alt={`Icon ${i + 1}`}
                        style={{ width: iconWidth, height: iconHeight }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default BasicCard;
