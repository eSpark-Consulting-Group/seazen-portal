import React from "react";
import { useState } from "react";
import { side } from "../../../utils/side";
import "./style.css";
import PricingBox from "../total/index";
import SpecialInstructions from "../instructionsText";
import CountContainer from "../quantityCount";
import { styled } from "@mui/material/styles"; // Import styled from MUI
import { lighten } from "@mui/material/styles";
import { Checkbox } from "@mui/material";
import { useTheme } from "@mui/material/styles"; // Import useTheme from MUI

const StyledTextColor = styled("div")(({ theme }) => ({
  color: theme.palette.themeColor.main, // Apply the background color
  // Add any other styles you need for the outer container here
}));


const StyledOuterContainer = styled("div")(({ theme }) => ({
  backgroundColor: lighten(theme.palette.themeColor.light, 0.92), // Apply the background color
  // Add any other styles you need for the outer container here
}));

export const getFormattedPrice = (price) => `+KWD ${price.toFixed(3)}`;

export default function SideSelection() {
  const theme = useTheme();

  const [checkedState, setCheckedState] = useState(
    new Array(side.length).fill(false)
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
          return sum + side[index].price;
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
    color: isChecked ? theme.palette.themeColor.main : '',
  };

  return (
    <div>
      <StyledOuterContainer className="side">
        <p className="side-title">Extra Sides</p>
        <p className="side-small-title">(Choose up to 2)</p>
        <p className="side-title-optional">(optional)</p>
      </StyledOuterContainer>
      <div className="side-check">
        <ul className="side-list">
          {side.map(({ name, price }, index) => {
            return (
              <li key={index}>
                <div
                  className="side-list-item"
                  onChange={() => handleOnChange(index)}
                >
                  <div className="side-left-section">
                    <Checkbox
                      id={`custom-checkbox-${index}`}
                      name={name}
                      checked={isChecked[index]}
                      className="large-checkbox"
                      onChange={handleCheckboxChange}
                      style={checkboxStyle}
                    />
                    <span className="custom-checkbox"></span>
                    <label
                      htmlFor={`custom-checkbox-${index}`} // Use the adjusted index here
                      className="large-checkbox"
                    >
                      {name}
                    </label>
                  </div>
                  <div className="side-right-section">
                    <StyledTextColor>{getFormattedPrice(price)}</StyledTextColor>
                  </div>
                </div>
                <hr />
              </li>
            );
          })}

          <SpecialInstructions />
          <CountContainer />
          <PricingBox total={total} />
        </ul>
      </div>
    </div>
  );
}
