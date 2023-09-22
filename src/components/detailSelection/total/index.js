import React from "react";
import { getFormattedPrice } from "../sideSelection/index";
import { styled } from "@mui/material/styles"; // Import styled from MUI
import styles from "./style.module.css";
const StyledOuterContainer = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.themeColor.main, // Apply the background color
  // Add any other styles you need for the outer container here
}));

export default function PricingBox({ total }) {
  return (
    <li>
      <StyledOuterContainer className={styles.pricingBox}>
        <img
          className={styled.pricingIcon}
          src="/assets/img/Icon - Buy.svg"
          alt="Logo"
        />
        <div className={styles.pricingSection}>Add to cart</div>
        <div className={styles.calculationSection}>
          {getFormattedPrice(total)}
        </div>
      </StyledOuterContainer>
    </li>
  );
}
