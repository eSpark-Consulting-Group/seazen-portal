import React, { useEffect, useState } from "react";
import { size } from "../../../utils/size";
import "./style.css";
import { styled } from "@mui/material/styles";
import { lighten } from "@mui/material/styles";
import { Checkbox } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setVariantSize } from "../../../store/reducers/resturantsSlice";

const StyledOuterContainer = styled("div")(({ theme }) => ({
  backgroundColor: lighten(theme.palette.themeColor.light, 0.92),
}));

const StyledTextColor = styled("div")(({ theme }) => ({
  color: theme.palette.themeColor.main,
}));

export const getFormattedPrice = (price) => `+KWD ${price.toFixed(3)}`;

export default function CheckboxGroup() {
  const theme = useTheme();
  const location = useLocation();
  const dispatch = useDispatch();
  const id = location.state.id;

  const item = useSelector(
    (state) => state?.resturants?.listItemByCategory
  ).find((item) => item.id === id);

  const toppingsArr = useSelector(
    (state) => state?.resturants?.details?.variantSize
  );

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
    toppingsArr?.length
      ? toppingsArr
      : item?.variants
          ?.map((item) => {
            return item?.options?.map((item) => ({
              label: item?.name_en,
              isChecked: false,
            }));
          })
          .flat()
  );

  useEffect(() => {
    dispatch(setVariantSize({ isCheckedArray, id }));
  }, []);
  const handleCheckboxChange = (index) => {
    const updatedCheckedArray = JSON.parse(JSON.stringify(isCheckedArray));

    updatedCheckedArray[index][index].isChecked =
      !updatedCheckedArray[index][index].isChecked;
    setIsCheckedArray(updatedCheckedArray);
  };

  const checkboxStyle = (index) => ({
    color: item?.variants[index] ? theme.palette.themeColor.main : "",
  });

  return (
    <>
      <div style={{ position: "relative" }}>
        {item?.variants && (
          <StyledOuterContainer className="size">
            <p className="size-title">Choose the size</p>
            <p className="size-small-title">(Choose 1)</p>
            <StyledTextColor className="size-title-required">
              (Required)
            </StyledTextColor>
          </StyledOuterContainer>
        )}
        {item?.variants && (
          <div className="checkbox-size">
            <ul className="size-list">
              {item?.variants?.length &&
                item?.variants?.map((item, index) => {
                  const adjustedIndex = index + 3000;
                  return (
                    item?.options &&
                    item?.options?.map((item) => {
                      return (
                        <li key={adjustedIndex}>
                          <div
                            className="size-list-item"
                            onChange={() => handleOnChange(adjustedIndex)}
                          >
                            <div className="size-left-section">
                              <Checkbox
                                id={`custom-checkbox-${adjustedIndex}`}
                                name={item?.name_en}
                                checked={
                                  isCheckedArray[index][index]?.isChecked
                                }
                                className="large-checkbox"
                                onChange={() => handleCheckboxChange(index)}
                                style={checkboxStyle(index)}
                              />
                              <span className="custom-checkbox"></span>
                              <label
                                htmlFor={`custom-checkbox-${adjustedIndex}`}
                                className="large-checkbox"
                              >
                                {item?.name_en}
                              </label>
                            </div>
                            {index !== 0 && ( // Only display price if it's not the first item
                              <div className="size-right-section">
                                <StyledTextColor>
                                  {getFormattedPrice(0)}
                                </StyledTextColor>
                              </div>
                            )}
                          </div>
                          {index < size.length - 1 && <hr />}
                        </li>
                      );
                    })
                  );
                })}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
