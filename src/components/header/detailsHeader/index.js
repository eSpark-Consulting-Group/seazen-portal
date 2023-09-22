import React from "react";
import { useNavigate } from "react-router";
import styles from "./style.module.css";
import { paths } from "../../../routes/paths";
import { styled } from "@mui/material/styles"; // Import styled from MUI

const StyledOuterContainer = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.themeColor.main, // Apply the background color
  // Add any other styles you need for the outer container here
}));

export const DetailsHeader = () => {
  const navigate = useNavigate();
  return (
    <header className={styles.detailsHeaderHeader}>
      <img
        className={styles.detailsHeaderBackground}
        src="/assets/img/image.png"
      />
      <div
        className={`${styles.detailsHeaderArrowIconsStyle} ${styles.pointer} `}
        onClick={() => navigate(-1)}
      >
        <img
          className={styles.detailsHeaderLeftIcons}
          src="/assets/img/Icon - Arrow.svg"
        ></img>
      </div>
      <StyledOuterContainer className={styles.detailsHeaderCaptionContainer}>
        <p className={styles.detailsHeaderCaptionText}>KWD</p>
        <div className={styles.detailsHeaderCaptionPrice}>6.990</div>
      </StyledOuterContainer>
      <div
        className={`${styles.detailsHeaderIconStyle}  ${styles.pointer}`}
        onClick={() => navigate(paths.cart)}
      >
        <img
          className={styles.detailsHeaderRightIcons}
          src="/assets/img/Icon - Bag.svg"
        ></img>
      </div>
    </header>
  );
};
