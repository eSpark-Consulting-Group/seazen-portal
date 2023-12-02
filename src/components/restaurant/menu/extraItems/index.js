import React from "react";
import "./style.css";
import { useDispatch } from "react-redux";
import { updateCartItemQuantity } from "../../../../store/reducers/cartSlice";
import { useNavigate } from "react-router";
import { paths } from "../../../../routes/paths";

const ExtraItems = ({ extraItemName, extraItemCount, item, item_code, id }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  function handleClickAddCount() {
    dispatch(
      updateCartItemQuantity({
        itemCode: item.item_code,
        quantity: extraItemCount + 1,
      })
    );
  }

  function handleClickSubtractCount() {
    if (extraItemCount > 0) {
      dispatch(
        updateCartItemQuantity({
          itemCode: item.item_code,
          quantity: extraItemCount - 1,
        })
      );
    }
  }
  return (
    <div className="extra_item_outer_container">
      <div
        className="extra_item_text_container"
        style={{ cursor: "pointer", width: "100%" }}
        onClick={() => {
          navigate(paths.details + "/" + id, {
            state: {
              item_code,
            },
          });
        }}
      >
        {extraItemName?.replace(/^,/, "")}
      </div>
      <div className="extra_item_input_stepper my-1">
        <button style={{ color: "black" }} onClick={handleClickSubtractCount}>
          -
        </button>
        <div className="extra_item_input_stepper_count mx-1">
          {extraItemCount}
        </div>
        <button style={{ color: "black" }} onClick={handleClickAddCount}>
          +
        </button>
      </div>
    </div>
  );
};

export default ExtraItems;
