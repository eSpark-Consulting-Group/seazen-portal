import React, { useState } from "react";
import "../../screens/order/style.css";

const OrderIdSection = ({ orderID }) => {
  const handleViewReceipt = () => {
    alert("Recept");
  };

  return (
    <div className="order-id-section">
      <p id="order-id-text">Order ID</p>
      <div className="orderid-with-tag">
        <p>{orderID}</p>
        <div id="order-id-tag">
          <a href="" onClick={handleViewReceipt}>
            View Receipt
          </a>
        </div>
      </div>
    </div>
  );
};

export default OrderIdSection;
