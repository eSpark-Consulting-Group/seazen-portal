import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import "./style.css";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

const BasicCard = ({ clickedButtonIndex }) => {
  const getCardClassName = (index) => {
    if (index >= 0 && index <= 5) {
      return clickedButtonIndex !== null ? "card-with-border" : "card-no-border";
    } else {
      return "card-no-border";
    }
  };

  return (
    <div className="card-container">
      {[0, 1, 2, 3, 4, 5].map((index) => (
        <div key={index} className={`card ${getCardClassName(index)}`}>
          <Card sx={{ width: 164, height: 76, borderRadius: 1 }} className="card">
            <img src={`/assets/img/${15 + index * 2}.png`} alt={`Card ${index + 1}`} />
          </Card>
        </div>
      ))}
    </div>
  );
};

export default BasicCard;