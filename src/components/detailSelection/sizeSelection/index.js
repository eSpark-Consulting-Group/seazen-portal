import { useState } from "react";
import { size } from "../../../utils/size";
import "./style.css";

export const getFormattedPrice = (price) => `+KWD ${price.toFixed(3)}`;

export default function CheckboxGroup() {
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
          return sum + (index === 0 ? 0 : size[index].price); // Display prices for all except the first one
        }
        return sum;
      },
      0
    );

    setTotal(totalPrice);
  };

  return (
    <div>
      <div className="size">
        <p className="size-title">Choose the size</p>
        <p className="size-small-title">(Choose 1)</p>
        <p className="size-title-required">(Required)</p>
      </div>
      <div className="checkbox-size">
        <ul className="size-list">
          {size.map(({ name, price }, index) => {
            // Add an offset to the index to make it unique
            const adjustedIndex = index + 3000;

            return (
              <li key={adjustedIndex}>
                <div className="size-list-item">
                  <div className="size-left-section">
                    <input
                      type="checkbox"
                      id={`custom-checkbox-${adjustedIndex}`} // Use the adjusted index here
                      name={name}
                      value={name}
                      checked={checkedState[adjustedIndex]}
                      onChange={() => handleOnChange(adjustedIndex)} // Use the adjusted index here
                      className="large-checkbox"
                    />
                    <span className="custom-checkbox"></span>
                    <label
                      htmlFor={`custom-checkbox-${adjustedIndex}`} // Use the adjusted index here
                      className="large-checkbox"
                    >
                      {name}
                    </label>
                  </div>
                  {index > 0 && (
                    <div className="size-right-section">
                      {getFormattedPrice(price)}
                    </div>
                  )}
                </div>
                <hr />
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <p>Total: {getFormattedPrice(total)}</p>
      </div>
    </div>
  );
}
