import React from 'react'
import './style.css'
import { styled } from "@mui/material/styles"; // Import styled from MUI


const StyledText = styled("div")(({ theme }) => ({
  color: theme.palette.themeColor.main, // Apply the background color
  // Add any other styles you need for the outer container here
}));

export const Content = () => {
  return (
    <div className="information-style container-fluid">
      <div className="styled-section">
        <h4 className="content-heading">Burrito Vegetarian in a Bowl (450g)</h4>
        <StyledText className="content-small">483 Kcal</StyledText>
        </div>
        <p className="content-paragraph">rice, plate peppers, onion, red beans, mushrooms, corn with spices, tomatoes, iceberg, olives, yellow cheese, cream sauce, mayonnaise sauce or hot salad</p>
    </div>
  )
}
