import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import "./style.css";

import deliveryIcon from "./delivery-icon.svg";
import pickupIcon from "./pickup-icon.svg";
import cateringIcon from "./catering-icon.svg";
import dineInIcon from "./dinein-icon.svg";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

const icons = [deliveryIcon, pickupIcon, cateringIcon, dineInIcon ];

const BasicCard = ({ clickedButtonIndex }) => {
  const captions = [
    icons,
    icons.slice(0, 3),
    icons,
    icons,
    icons.slice(0, 2),
    icons.slice(1),
  ];

  const getCardClassName = (index) => {
    if (index >= 0 && index <= 5) {
      return clickedButtonIndex !== null ? "card-with-border" : "card-no-border";
    } else {
      return "card-no-border";
    }
  };

  // Define the width and height for the SVG icons
  const iconWidth = "7px";
  const iconHeight = "9px";

  return (
    <div className="card-container">
      {[0, 1, 2, 3, 4, 5].map((index) => (
        <div key={index} className={`card ${getCardClassName(index)}`}>
          <Card sx={{ width: 164, borderRadius: 1 }} className="card">
            <img
              className="card-img"
              src={`/assets/img/${15 + index * 2}.png`}
              alt={`Card ${index + 1}`}
            />
            <div className={`svg-container ${clickedButtonIndex !== null ? 'expanded' : 'collapsed'}`}>
              <div className="inner-svg-container">
                {captions[index].map((icon, i) => (
                  <div key={i} className="icon-row">
                    <img
                      className="button-icons-styles"
                      src={icon}
                      alt={`Icon ${i + 1}`}
                      style={{ width: iconWidth, height: iconHeight }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default BasicCard;
