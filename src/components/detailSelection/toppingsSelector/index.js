import React from "react";
import { useState } from "react";
import { toppings } from "../../../utils/toppings";
import "./style.css";

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
      if (checkedState[toppings.findIndex((topping) => topping.name === name)]) {
        return sum + updatedCounterState[name] * toppings.find((topping) => topping.name === name).price;
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
      <div className="topping-selection">
        <p className="topping-selection-title">Extra Topping</p>
        <p className="topping-small-title">(Choose up to 7)</p>
        <p className="topping-title-optional">(Optional)</p>
      </div>
      <div className="toppingSelectioncheckbox-counter">
        <ul className="toppings-list">
          {toppings.map(({ name, price }, index) => {
            const adjustedIndex = index + 2000;
            const isLastItem = index === toppings.length - 1;

            return (
              <li key={adjustedIndex}>
                <div className="toppings-list-item">
                  <div className="right-section-counter">
                    <input
                      type="checkbox"
                      id={`custom-checkbox-${adjustedIndex}`} // Use the adjusted index here
                      name={name}
                      value={name}
                      checked={checkedState[adjustedIndex]} // Use the adjusted index here
                      onChange={() => handleOnChange(adjustedIndex)} // Use the adjusted index here
                      className="large-checkbox"
                      disabled={isLastItem}
                    />
                    <span
                      className={`custom-checkbox ${isLastItem ? "disabled" : ""}`}
                    ></span>
                    <label
                      htmlFor={`custom-checkbox-${adjustedIndex}`} // Use the adjusted index here
                      className={`large-checkbox ${
                        isLastItem ? "disabled-text" : ""
                      }`}
                    >
                      {name}
                    </label>
                  </div>
                  {!isLastItem && (
                    <div className="left-section-counter">
                      <button
                        onClick={() => handleDecrement(name)} // Use the topping name here
                        className="counter-button-right"
                      >
                        <span className="counter-icon-left">-</span>
                      </button>
                      <span className="counter-value">
                        {counterState[name] || 0}
                      </span>
                      <button
                        onClick={() => handleIncrement(name)} // Use the topping name here
                        className="counter-button-left"
                      >
                        <span className="counter-icon-right">+</span>
                      </button>
                    </div>
                  )}
                </div>
                <hr />
              </li>
            );
          })}
        </ul>
        
      </div>
    </div>
  );
}
