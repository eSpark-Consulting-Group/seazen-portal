import React from "react";
import "./style.css"

const ExtraItems = ({ extraItemName, extraItemCount, setExtraItemCount }) => {

    function handleClickAddCount(){
        setExtraItemCount(extraItemCount+1);
    }

    function handleClickSubtractCount(){
        if (extraItemCount>0){
            setExtraItemCount(extraItemCount-1);
        }
    }
  return (
    <div className="extra_item_outer_container">
      <div className="extra_item_text_container">{extraItemName}</div>
      <div className="extra_item_input_stepper my-1">
        <button onClick={handleClickSubtractCount}>-</button>
        <div className="extra_item_input_stepper_count mx-1">{extraItemCount}</div>
        <button onClick={handleClickAddCount}>+</button>
      </div>
    </div>
  );
};

export default ExtraItems;
