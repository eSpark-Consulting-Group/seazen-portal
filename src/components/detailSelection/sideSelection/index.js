import React from "react";
import { useState } from "react";
import { side } from "../../../utils/side";
import "./style.css";
import PricingBox from "../total/index";
import SpecialInstructions from "../instructionsText";
import CountContainer from "../quantityCount";
import { styled } from "@mui/material/styles";
import { lighten } from "@mui/material/styles";
import { Checkbox } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const StyledTextColor = styled("div")(({ theme }) => ({
  color: theme.palette.themeColor.main,
}));

const StyledOuterContainer = styled("div")(({ theme }) => ({
  backgroundColor: lighten(theme.palette.themeColor.light, 0.92),
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

  const [isCheckedArray, setIsCheckedArray] = useState(
    new Array(side.length).fill(false)
  );

  const handleCheckboxChange = (index) => {
    const updatedCheckedArray = [...isCheckedArray];
    updatedCheckedArray[index] = !updatedCheckedArray[index];
    setIsCheckedArray(updatedCheckedArray);
  };

  const checkboxStyle = (index) => ({
    color: isCheckedArray[index] ? theme.palette.themeColor.main : "",
  });

  return (
    <div>
      <StyledOuterContainer className="side ">
        <p className="side-title">Extra Sides</p>
        <p className="side-small-title">(Choose up to 2)</p>
        <p className="side-title-optional">(Optional)</p>
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
                      checked={isCheckedArray[index]}
                      className="large-checkbox"
                      onChange={() => handleCheckboxChange(index)} // Pass the index
                      style={checkboxStyle(index)} // Pass the index
                    />
                    <span className="custom-checkbox"></span>
                    <label
                      htmlFor={`custom-checkbox-${index}`}
                      className="large-checkbox"
                    >
                      {name}
                    </label>
                  </div>
                  <div className="side-right-section">
                    <StyledTextColor>
                      {getFormattedPrice(price)}
                    </StyledTextColor>
                  </div>
                </div>
                {index !== side.length - 1 && <hr />}{" "}
                {/* Conditionally render <hr> */}
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
