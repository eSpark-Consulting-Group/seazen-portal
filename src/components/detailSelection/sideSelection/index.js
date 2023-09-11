import { useState } from "react";
import { side } from "../../../utils/side";
import "./style.css";
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
          return sum + side[index ].price;
        }
        return sum;
      },
      0
    );

    setTotal(totalPrice);
  };

  return (
    <div>
      <div className="side">
        <p className="side-title">Extra Sides</p>
        <p className="side-small-title">(Choose up to 2)</p>
        <p className="side-title-optional">(optional)</p>
      </div>
      <div className="side-check">
        <ul className="side-list">
          {side.map(({ name, price }, index) => {
            return (
              <li key={index}>
                <div className="side-list-item">
                  <div className="side-left-section">
                    <input
                      type="checkbox"
                      id={`custom-checkbox-${index}`} // Use the adjusted index here
                      name={name}
                      value={name}
                      checked={checkedState[index]}
                      onChange={() => handleOnChange(index)} // Use the adjusted index here
                      className="large-checkbox"
                    />
                    <span className="custom-checkbox"></span>
                    <label
                      htmlFor={`custom-checkbox-${index}`} // Use the adjusted index here
                      className="large-checkbox"
                    >
                      {name}
                    </label>
                  </div>
                  <div className="side-right-section">
                    {getFormattedPrice(price)}
                  </div>
                </div>
                <hr />
              </li>
            );
          })}
         
         <SpecialInstructions/>
         <CountContainer/>
         <PricingBox total={total} />
        </ul>
      </div>
      
    </div>
  );
}
