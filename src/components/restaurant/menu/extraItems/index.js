import React from "react";
import "./style.css";
import { useDispatch } from "react-redux";
import { updateCartItemQuantity } from "../../../../store/reducers/cartSlice";

const ExtraItems = ({ extraItemName, extraItemCount, item }) => {
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
      <div className="extra_item_text_container">{extraItemName}</div>
      <div className="extra_item_input_stepper my-1">
        <button style={{color:"black"}} onClick={handleClickSubtractCount}>-</button>
        <div className="extra_item_input_stepper_count mx-1">
          {extraItemCount}
        </div>
        <button style={{color:"black"}} onClick={handleClickAddCount}>+</button>
      </div>
    </div>
  );
};

export default ExtraItems;
