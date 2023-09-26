import React from "react";
import "./style.css";
import { styled } from "@mui/material/styles"; // Import styled from MUI
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const StyledText = styled("div")(({ theme }) => ({
  color: theme.palette.themeColor.main, // Apply the background color
  // Add any other styles you need for the outer container here
}));

export const Content = () => {
  const location = useLocation();

  const id = location.state.id;
  const item = useSelector(
    (state) => state?.resturants?.listItemByCategory
  ).find((item) => item.id === id);
  return (
    <div className="information-style container-fluid">
      <div className="styled-section">
        <h4 className="content-heading">{item?.name_en}</h4>
        <StyledText className="content-small">483 Kcal</StyledText>
      </div>
      <p className="content-paragraph">{item?.description_en}</p>
    </div>
  );
};
