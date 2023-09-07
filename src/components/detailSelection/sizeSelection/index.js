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
      <div className="selection">
        <p className="selection-title">Choose the size</p>
        <p className="small-title">(Choose 1)</p>
        <p className="title-required">(Required)</p>
      </div>
      <div className="checkbox">
        <ul className="size-list">
          {size.map(({ name, price }, index) => {
            return (
              <li key={index}>
                <div className="size-list-item">
                  <div className="left-section">
                    <input
                      type="checkbox"
                      id={`custom-checkbox-${index}`}
                      name={name}
                      value={name}
                      checked={checkedState[index]}
                      onChange={() => handleOnChange(index)}
                      className="large-checkbox"
                    />
                    <span className="custom-checkbox"></span>
                    <label
                      htmlFor={`custom-checkbox-${index}`}
                      className="large-checkbox"
                    >
                      {name}
                    </label>
                  </div>
                  {index > 0 && (
                    <div className="right-section">
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
    </div>
  );
}
