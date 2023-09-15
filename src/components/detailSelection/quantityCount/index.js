import React, { useState } from 'react';
import './style.css'

function CountContainer() {
  const [count, setCount] = useState(0);

  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  return (
    <div className="count-container">
      <span className="quantity-label">Quantity</span>
      <div className="count">
        <button className="minus-button" onClick={decrementCount}><span className="minus-style">-</span></button>
        <span>{count}</span>
        <button className="pluss-button" onClick={incrementCount}><span className="pluss-style">+</span></button>
      </div>
    </div>
  );
}

export default CountContainer;
