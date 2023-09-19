import React from "react";
import { useState } from "react";
import { toppings } from "../../../utils/toppings";
import styles from "./style.module.css";

export const getFormattedPrice = (price) => `KWD ${price.toFixed(2)}`;

export default function ToppingSelection() {
  const [checkedState, setCheckedState] = useState(
    new Array(toppings.length).fill(false)
  );

  // Initialize the counterState as an object
  const [counterState, setCounterState] = useState({});

  const [total, setTotal] = useState(0);

  const handleIncrement = (name) => {
    const updatedCounterState = { ...counterState };
    updatedCounterState[name] = (updatedCounterState[name] || 0) + 1;
    setCounterState(updatedCounterState);
    updateTotal(updatedCounterState);
  };

  const handleDecrement = (name) => {
    if (counterState[name] > 0) {
      const updatedCounterState = { ...counterState };
      updatedCounterState[name] -= 1;
      setCounterState(updatedCounterState);
      updateTotal(updatedCounterState);
    }
  };

  const updateTotal = (updatedCounterState) => {
    const totalPrice = Object.keys(updatedCounterState).reduce((sum, name) => {
      if (
        checkedState[toppings.findIndex((topping) => topping.name === name)]
      ) {
        return (
          sum +
          updatedCounterState[name] *
            toppings.find((topping) => topping.name === name).price
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

  return (
    <div>
      <div className={styles.toppingSelection}>
        <p className={styles.toppingSelectionTitle}>Extra Topping</p>
        <p className={styles.toppingSmallTitle}>(Choose up to 7)</p>
        <p className={styles.toppingTitleOptional}>(Optional)</p>
      </div>
      <div className={styles.toppingSelectioncheckboxCounter}>
        <ul className={styles.toppingsList}>
          {toppings.map(({ name, price }, index) => {
            const adjustedIndex = index + 2000;
            const isLastItem = index === toppings.length - 1;

            return (
              <li key={adjustedIndex}>
                <div className={styles.toppingsListItem}>
                  <div className={styles.rightSectionCounter}>
                    <input
                      type="checkbox"
                      id={`custom-checkbox-${adjustedIndex}`} // Use the adjusted index here
                      name={name}
                      value={name}
                      checked={checkedState[adjustedIndex]} // Use the adjusted index here
                      onChange={() => handleOnChange(adjustedIndex)} // Use the adjusted index here
                      className={styles.largeCheckbox}
                      disabled={isLastItem}
                    />
                    <span
                      className={`custom-checkbox ${
                        isLastItem ? styles.disabled : ""
                      }`}
                    ></span>
                    <label
                      htmlFor={`custom-checkbox-${adjustedIndex}`} // Use the adjusted index here
                      className={`large-checkbox ${
                        isLastItem ? styles.disabledText : ""
                      }`}
                    >
                      {name}
                    </label>
                  </div>
                  {!isLastItem && (
                    <div className={styles.leftSectionCounter}>
                      <button
                        onClick={() => handleDecrement(name)} // Use the topping name here
                        className={styles.counterButtonRight}
                      >
                        <span className={styles.counterIconLeft}>-</span>
                      </button>
                      <span className={styles.counterValue}>
                        {counterState[name] || 0}
                      </span>
                      <button
                        onClick={() => handleIncrement(name)} // Use the topping name here
                        className={styles.counterButtonLeft}
                      >
                        <span className={styles.counterIconRight}>+</span>
                      </button>
                    </div>
                  )}
                </div>
                <hr className={styles.hr} />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
