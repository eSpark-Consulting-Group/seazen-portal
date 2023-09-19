import React from "react";
import { useState } from "react";
import { side } from "../../../utils/side";
import styles from "./style.module.css";
import PricingBox from "../total/index";
import SpecialInstructions from "../instructionsText";
import CountContainer from "../quantityCount";

export const getFormattedPrice = (price) => `+KWD ${price.toFixed(3)}`;

export default function SideSelection() {
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

  return (
    <div>
      <div className={styles.side}>
        <p className={styles.sideTitle}>Extra Sides</p>
        <p className={styles.sideSmallTitle}>(Choose up to 2)</p>
        <p className={styles.sideTitleOptional}>(optional)</p>
      </div>
      <div className={styles.sideCheck}>
        <ul className={styles.sideList}>
          {side.map(({ name, price }, index) => {
            return (
              <li key={index}>
                <div className={styles.sideListItem}>
                  <div className={styles.sideLeftSection}>
                    <input
                      type="checkbox"
                      id={`custom-checkbox-${index}`} // Use the adjusted index here
                      name={name}
                      value={name}
                      checked={checkedState[index]}
                      onChange={() => handleOnChange(index)} // Use the adjusted index here
                      className={styles.largeCheckbox}
                    />
                    <span className="custom-checkbox"></span>
                    <label
                      htmlFor={`custom-checkbox-${index}`} // Use the adjusted index here
                      className={styles.largeCheckbox}
                    >
                      {name}
                    </label>
                  </div>
                  <div className={styles.sideRightSection}>
                    {getFormattedPrice(price)}
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
