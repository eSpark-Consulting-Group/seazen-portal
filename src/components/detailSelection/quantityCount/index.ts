import React, { useState } from "react";
import "./style.css";
import { styled } from "@mui/material/styles"; // Import styled from MUI
import PricingBox from "../total";
import { useDispatch, useSelector } from "react-redux";
import { changeItemQuantity } from "../../../store/reducers/resturantsSlice";

const StyledOuterContainer = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.themeColor.main, // Apply the background color
  // Add any other styles you need for the outer container here
}));

const StyledOuterButton = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.themeColor.light, // Apply the background color
  // Add any other styles you need for the outer container here
}));
function CountContainer() {
  const quantity = useSelector(
    (state) => state.resturants.details.itemQuantity
  );
  const [count, setCount] = useState(quantity ? quantity : 0);
  const dispatch = useDispatch();

  const incrementCount = () => {
    setCount(count + 1);
    dispatch(changeItemQuantity(count + 1));
  };

  const decrementCount = () => {
    if (count > 0) {
      setCount(count - 1);
      dispatch(changeItemQuantity(count - 1));
    }
  };

  return (
    <StyledOuterContainer className="count-container">
      <span className="quantity-label">Quantity</span>
      <div className="count">
        <StyledOuterButton className="minus-button" onClick={decrementCount}>
          <span className="minus-style">-</span>
        </StyledOuterButton>
        <span className="quantitycount-style">{count}</span>
        <StyledOuterButton className="pluss-button" onClick={incrementCount}>
          <span className="pluss-style">+</span>
        </StyledOuterButton>
      </div>
    </StyledOuterContainer>
  );
}

export default CountContainer;
