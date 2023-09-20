import React from "react";
import styles from "../../screens/receipt/style.module.css"; // Import the CSS module

const ReceiptItem = () => {
  const randomFloat = (Math.random() * 10 + 10).toFixed(3);

  return (
    <div className={styles.receiptItems}>
      {" "}
      <img src="/assets/img/13.png" alt="" />
      <div className={styles.receiptItemsName}>
        Burrito Vegetarian in a Bowl (450 g)
      </div>
      <div className={styles.receiptItemsPrice}>KWD {randomFloat}</div>
    </div>
  );
};

export default ReceiptItem;
