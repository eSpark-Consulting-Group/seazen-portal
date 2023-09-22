import React from "react";
import { useState } from "react";
import { size } from "../../../utils/size";
import styles from "./style.module.css";
import { styled } from "@mui/material/styles"; // Import styled from MUI
import { lighten } from "@mui/material/styles";
import { Checkbox } from "@mui/material";
import { useTheme } from "@mui/material/styles"; // Import useTheme from MUI

const StyledOuterContainer = styled("div")(({ theme }) => ({
  backgroundColor: lighten(theme.palette.themeColor.light, 0.92), // Apply the background color
  // Add any other styles you need for the outer container here
}));

const StyledTextColor = styled("div")(({ theme }) => ({
  color: theme.palette.themeColor.main, // Apply the background color
  // Add any other styles you need for the outer container here
}));

export const getFormattedPrice = (price) => `+KWD ${price.toFixed(3)}`;

export default function CheckboxGroup() {
  const theme = useTheme();
  const [checkedState, setCheckedState] = useState(
    new Array(size.length).fill(false)
  );

  const [total, setTotal] = useState(0);

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);

    const totalPrice = updatedCheckedState.reduce(
      (sum, currentState, index) => {
        if (currentState === true) {
          return sum + (index === 0 ? 0 : size[index].price); // Display prices for all except the first one
        }
        return sum;
      },
      0
    );

    setTotal(totalPrice);
  };
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const checkboxStyle = {
    color: isChecked ? theme.palette.themeColor.main : "",
  };

  return (
    <div>
      <StyledOuterContainer className={styles.size}>
        <p className={styles.sizeTitle}>Choose the size</p>
        <p className={styles.sizeSmallTitle}>(Choose 1)</p>
        <StyledTextColor className={styles.sizeTitleRequired}>
          (Required)
        </StyledTextColor>
      </StyledOuterContainer>
      <div className={styles.checkboxSize}>
        <ul className={styles.sizeList}>
          {size.map(({ name, price }, index) => {
            // Add an offset to the index to make it unique
            const adjustedIndex = index + 3000;

            return (
              <li key={adjustedIndex}>
                <div
                  className={styles.sizeListItem}
                  onChange={() => handleOnChange(adjustedIndex)}
                >
                  <div className={styles.sizeLeftSection}>
                    <Checkbox
                      id={`custom-checkbox-${adjustedIndex}`}
                      name={name}
                      checked={isChecked[adjustedIndex]}
                      className={styles.largeCheckbox}
                      onChange={handleCheckboxChange}
                      style={checkboxStyle}
                    />
                    <span className={styles.customCheckbox}></span>
                    <label
                      htmlFor={`custom-checkbox-${adjustedIndex}`} // Use the adjusted index here
                      className={styles.largeCheckbox}
                    >
                      {name}
                    </label>
                  </div>
                  {index > 0 && (
                    <div className={styles.sizeRightSection}>
                      <StyledTextColor>
                        {getFormattedPrice(price)}
                      </StyledTextColor>
                    </div>
                  )}
                </div>
                <hr />
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <p>Total: {getFormattedPrice(total)}</p>
      </div>
    </div>
  );
}
