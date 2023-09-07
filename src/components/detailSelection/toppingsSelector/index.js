import { useState } from "react";
import { toppings } from "../../../utils/toppings";
import "./style.css";

export const getFormattedPrice = (price) => `KWD ${price.toFixed(2)}`;

export default function ToppingSelection() {
  const [checkedState, setCheckedState] = useState(
    new Array(toppings.length).fill(false)
  );

  const [counterState, setCounterState] = useState(
    new Array(toppings.length).fill(0)
  );

  const [total, setTotal] = useState(0);

  const handleIncrement = (position) => {
    const updatedCounterState = [...counterState];
    updatedCounterState[position] += 1;
    setCounterState(updatedCounterState);
    updateTotal(updatedCounterState);
  };

  const handleDecrement = (position) => {
    const updatedCounterState = [...counterState];
    if (updatedCounterState[position] > 0) {
      updatedCounterState[position] -= 1;
      setCounterState(updatedCounterState);
      updateTotal(updatedCounterState);
    }
  };

  const updateTotal = (updatedCounterState) => {
    const totalPrice = updatedCounterState.reduce((sum, count, index) => {
      if (checkedState[index]) {
        return sum + count * toppings[index].price;
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
      <div className="checkbox-counter">
        <ul className="toppings-list">
          {toppings.map(({ name, price }, index) => {
            const isLastItem = index === toppings.length - 1;

            return (
              <li key={index}>
                <div className="toppings-list-item">
                  <div className="right-section-counter">
                    <input
                      type="checkbox"
                      id={`custom-checkbox-${index}`}
                      name={name}
                      value={name}
                      checked={checkedState[index]}
                      onChange={() => handleOnChange(index)}
                      className="large-checkbox"
                      disabled={isLastItem}
                    />
                    <span className={`custom-checkbox ${isLastItem ? "disabled" : ""}`}></span>
                    <label
                      htmlFor={`custom-checkbox-${index}`}
                      className={`large-checkbox ${isLastItem ? "disabled-text" : ""}`}
                    >
                      {name}
                    </label>
                  </div>
                  {!isLastItem && (
                    <div className="left-section-counter">
                      <button
                        onClick={() => handleDecrement(index)}
                        className="counter-button-right"
                      >
                        <span className="counter-icon-left">-</span>
                      </button>
                      <span className="counter-value">{counterState[index]}</span>
                      <button
                        onClick={() => handleIncrement(index)}
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
