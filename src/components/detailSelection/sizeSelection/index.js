import React, { useState } from "react";
import { size } from "../../../utils/size";
import "./style.css";
import { styled } from "@mui/material/styles";
import { lighten } from "@mui/material/styles";
import { Checkbox } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const StyledOuterContainer = styled("div")(({ theme }) => ({
  backgroundColor: lighten(theme.palette.themeColor.light, 0.92),
}));

const StyledTextColor = styled("div")(({ theme }) => ({
  color: theme.palette.themeColor.main,
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
          return sum + (index === 0 ? 0 : size[index - 1].price); 
        }
        return sum;
      },
      0
    );

    setTotal(totalPrice);
  };

  const [isCheckedArray, setIsCheckedArray] = useState(
    new Array(size.length).fill(false)
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
      <StyledOuterContainer className="size container-fluid">
        <p className="size-title">Choose the size</p>
        <p className="size-small-title">(Choose 1)</p>
        <StyledTextColor className="size-title-required">
          (Required)
        </StyledTextColor>
      </StyledOuterContainer>
      <div className="checkbox-size">
        <ul className="size-list">
          {size.map(({ name, price }, index) => {
            const adjustedIndex = index + 3000;

            return (
              <li key={adjustedIndex}>
                <div
                  className="size-list-item"
                  onChange={() => handleOnChange(adjustedIndex)}
                >
                  <div className="size-left-section">
                    <Checkbox
                      id={`custom-checkbox-${adjustedIndex}`}
                      name={name}
                      checked={isCheckedArray[index]}
                      className="large-checkbox"
                      onChange={() => handleCheckboxChange(index)}
                      style={checkboxStyle(index)}
                    />
                    <span className="custom-checkbox"></span>
                    <label
                      htmlFor={`custom-checkbox-${adjustedIndex}`}
                      className="large-checkbox"
                    >
                      {name}
                    </label>
                  </div>
                  {index !== 0 && ( // Only display price if it's not the first item
                    <div className="size-right-section">
                      <StyledTextColor>
                        {getFormattedPrice(price)}
                      </StyledTextColor>
                    </div>
                  )}
                </div>
                {index < size.length - 1 && <hr />}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
