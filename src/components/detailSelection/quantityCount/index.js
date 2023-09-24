import React, { useState } from "react";
import styles from "./style.module.css";
import { styled } from "@mui/material/styles"; // Import styled from MUI

const StyledOuterContainer = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.themeColor.main, // Apply the background color
  // Add any other styles you need for the outer container here
}));

const StyledOuterButton = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.themeColor.light, // Apply the background color
  // Add any other styles you need for the outer container here
}));
function CountContainer() {
  const [count, setCount] = useState(0);

  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  return (
    <StyledOuterContainer className={styles.countContainer}>
      <span className={styles.quantityLabel}>Quantity</span>
      <div className={styles.count}>
        <StyledOuterButton
          className={styles.minusButton}
          onClick={decrementCount}
        >
          <span className={styles.minusStyle}>-</span>
        </StyledOuterButton>
        <span className={styles.quantitycountStyle}>{count}</span>
        <StyledOuterButton
          className={styles.plussButton}
          onClick={incrementCount}
        >
          <span className={styles.plussStyle}>+</span>
        </StyledOuterButton>
      </div>
    </StyledOuterContainer>
  );
}

export default CountContainer;
