import React from "react";
import { getFormattedPrice } from "../sideSelection/index";
import { styled } from "@mui/material/styles"; // Import styled from MUI


const StyledOuterContainer = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.themeColor.main, // Apply the background color
  // Add any other styles you need for the outer container here
}));

export default function PricingBox({ total }) {
  return (
    <li>
      <StyledOuterContainer className="pricing-box">
        <img className="pricing-icon" src="/assets/img/Icon - Buy.svg" alt="Logo" />
        <div className="pricing-section">Add to cart</div>
        <div className="calculation-section">{getFormattedPrice(total)}</div>
      </StyledOuterContainer>
    </li>
  );
}
