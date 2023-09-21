import React, { useState } from "react";
import styles from "../../screens/order/style.module.css";

const OrderIdSection = () => {
  const [orderId, setOrderId] = useState("KSE23-070400");

  const handleViewReceipt = () => {
    alert("Recept");
  };

  return (
    <div className={styles.orderIdSection}>
      <p id="order-id-text" className={styles.orderIdText}>
        Order ID
      </p>
      <div className={styles.orderidWithTag}>
        <p>{orderId}</p>
        <div id="order-id-tag" className={styles.orderIdTag}>
          <a href="" onClick={handleViewReceipt}>
            View Receipt
          </a>
        </div>
      </div>
    </div>
  );
};

export default OrderIdSection;
