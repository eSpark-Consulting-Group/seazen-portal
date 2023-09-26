import React, { useState } from "react";
import { toppings } from "../../../utils/toppings";
import "./style.css";
import { styled } from "@mui/material/styles";
import { lighten } from "@mui/material/styles";
import { Checkbox } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setExtraToppings,
  setExtraToppingsCount,
} from "../../../store/reducers/resturantsSlice";

const StyledOuterContainer = styled("div")(({ theme }) => ({
  backgroundColor: lighten(theme.palette.themeColor.light, 0.92),
}));

const StyledTextColor = styled("div")(({ theme }) => ({
  color: theme.palette.themeColor.main,
}));

export const getFormattedPrice = (price) => `KWD ${price.toFixed(2)}`;

export default function ToppingSelection() {
  const theme = useTheme();
  const [checkedState, setCheckedState] = useState(
    new Array(toppings.length).fill(false)
  );
  const location = useLocation();

  const id = location.state.id;
  const item = useSelector(
    (state) => state?.resturants?.listItemByCategory
  ).find((item) => item.id === id);

  const extraToppingsArr = useSelector(
    (state) => state?.resturants?.details?.extraToppings
  );

  const [counterState, setCounterState] = useState({});

  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();

  const handleIncrement = (index) => {
    const updatedCounterState = JSON.parse(JSON.stringify(isCheckedArray));
    updatedCounterState[index].quantity =
      (updatedCounterState[index].quantity || 0) + 1;

    setIsCheckedArray(updatedCounterState);
    updateTotal(updatedCounterState);
    dispatch(
      setExtraToppingsCount({
        index: index,
        updateQuantityBy: updatedCounterState[index].quantity,
      })
    );
  };

  const handleDecrement = (index) => {
    const updatedCounterState = JSON.parse(JSON.stringify(isCheckedArray));
    if (updatedCounterState[index].quantity > 0) {
      updatedCounterState[index].quantity =
        updatedCounterState[index].quantity - 1;
      setIsCheckedArray(updatedCounterState);
      updateTotal(updatedCounterState);
      dispatch(
        setExtraToppingsCount({
          index: index,
          updateQuantityBy: updatedCounterState[index].quantity,
        })
      );
    }
  };

  const updateTotal = (updatedCounterState) => {
    const totalPrice = Object.keys(updatedCounterState).reduce((sum, name) => {
      if (
        checkedState[
          item?.extras?.findIndex((topping) => topping.name_en === name)
        ]
      ) {
        return (
          sum +
          updatedCounterState[name] *
            item?.extras?.find((topping) => topping.name === name).price
        );
      }
      return sum;
    }, 0);

    setTotal(totalPrice);
  };

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);
    updateTotal(counterState);
  };

  const [isCheckedArray, setIsCheckedArray] = useState(
    extraToppingsArr?.length
      ? extraToppingsArr
      : item?.extras?.map((item) => ({
          label: item?.name_en,
          price: item?.price,
          isChecked: false,
          quantity: 0,
        }))
  );

  const handleCheckboxChange = (index) => {
    const updatedCheckedArray = JSON.parse(JSON.stringify(isCheckedArray));

    updatedCheckedArray[index].isChecked =
      !updatedCheckedArray[index].isChecked;
    setIsCheckedArray(updatedCheckedArray);
    dispatch(setExtraToppings(updatedCheckedArray));
  };

  const checkboxStyle = (index) => ({
    color: isCheckedArray[index] ? theme.palette.themeColor.main : "",
  });
  return (
    <div>
      {item && item?.has_extras && (
        <StyledOuterContainer className="topping-selection me-2">
          <p className="topping-selection-title">Extra Topping</p>
          <p className="topping-small-title">(Choose up to 7)</p>
          <p className="topping-title-optional">(Optional)</p>
        </StyledOuterContainer>
      )}
      <div className="toppingSelectioncheckbox-counter">
        <ul className="toppings-list">
          {item &&
            item?.has_extras &&
            isCheckedArray?.map(({ label, price, quantity }, index) => {
              const adjustedIndex = index + 2000;
              const isLastItem = index === item?.extras?.length - 1;
              return (
                <li key={adjustedIndex}>
                  <div
                    className="toppings-list-item"
                    onChange={() => handleOnChange(adjustedIndex)}
                  >
                    <div className="right-section-counter">
                      <Checkbox
                        id={`custom-checkbox-${adjustedIndex}`}
                        name={label}
                        value={label}
                        checked={isCheckedArray[index]?.isChecked}
                        className="large-checkbox"
                        disabled={!isLastItem}
                        onChange={() => handleCheckboxChange(index)} // Pass the index
                        style={checkboxStyle(index)} // Pass the index
                      />
                      <span
                        className={`custom-checkbox ${
                          isLastItem ? "disabled" : ""
                        }`}
                      ></span>
                      <label
                        htmlFor={`custom-checkbox-${adjustedIndex}`}
                        className={`large-checkbox ${
                          isLastItem ? "disabled-text" : ""
                        }`}
                      >
                        {label}{" "}
                        <span className="extra-topping-instruction">
                          ({price})
                        </span>
                      </label>
                    </div>
                    {isLastItem && (
                      <div className="left-section-counter">
                        <button
                          onClick={() => handleDecrement(index)}
                          className="counter-button-right"
                        >
                          <span className="counter-icon-left">-</span>
                        </button>
                        <StyledTextColor className="counter-value">
                          {quantity || 0}
                        </StyledTextColor>
                        <button
                          onClick={() => handleIncrement(index)}
                          className="counter-button-left"
                        >
                          <span className="counter-icon-right">+</span>
                        </button>
                      </div>
                    )}
                  </div>
                  {index < item?.extras?.length - 1 && <hr />}{" "}
                  {/* Conditionally render <hr> */}
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}
