import React from "react";
import styles from "./style.module.css"

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
    <div className={styles.extraItemOuterContainer}>
      <div className={styles.extraItemTextContainer}>{extraItemName}</div>
      <div className={`${styles.extraItemInputStepper} my-1`}>
        <button onClick={handleClickSubtractCount}>-</button>
        <div className={`${styles.extraItemInputStepperCount} mx-1`}>{extraItemCount}</div>
        <button onClick={handleClickAddCount}>+</button>
      </div>
    </div>
  );
};

export default ExtraItems;
