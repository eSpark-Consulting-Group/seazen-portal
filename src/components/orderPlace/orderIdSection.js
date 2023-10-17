import React from "react";
import "../../screens/order/style.css";
import { useNavigate } from "react-router-dom";
import { paths } from "../../routes/paths";

const OrderIdSection = ({ orderID }) => {
  const navigate = useNavigate();

  const handleReceipt = () => {
    navigate(paths.receipt + orderID);
  };

  return (
    <div className="order-id-section">
      <p id="order-id-text">Order ID</p>
      <div className="orderid-with-tag">
        <p>{orderID}</p>
        <div id="order-id-tag">
          <a href="" onClick={handleReceipt}>
            View Receipt
          </a>
        </div>
      </div>
    </div>
  );
};

export default OrderIdSection;
