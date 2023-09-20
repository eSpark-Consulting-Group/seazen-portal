import React from "react";
import "../../screens/receipt/style.css";

const ReceiptItem = () => {
  const randomFloat = (Math.random() * 10 + 10).toFixed(3);

  return (
    <div className="receipt-items">
      <img src="/assets/img/13.png" alt="" />
      <div className="receipt-items-name">
        Burrito Vegetarian in a Bowl (450 g)
      </div>
      <div className="receipt-items-price">KWD {randomFloat}</div>
    </div>
  );
};

export default ReceiptItem;
