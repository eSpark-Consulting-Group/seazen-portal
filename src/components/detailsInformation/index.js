import React from "react";
import { styled } from "@mui/material/styles"; // Import styled from MUI
import styles from "./style.module.css";

const StyledText = styled("div")(({ theme }) => ({
  color: theme.palette.themeColor.main, // Apply the background color
  // Add any other styles you need for the outer container here
}));

export const Content = () => {
  return (
    <div className={styles.informationStyle}>
      <h4 className={styles.contentHeading}>
        Burrito Vegetarian in a Bowl (450g)
      </h4>
      <StyledText className={styles.contentSmall}>483 Kcal</StyledText>
      <p className={styles.contentParagraph}>
        rice, plate peppers, onion, red beans, mushrooms, corn with spices,
        tomatoes, iceberg, olives, yellow cheese, cream sauce, mayonnaise sauce
        or hot salad
      </p>
    </div>
  );
};
