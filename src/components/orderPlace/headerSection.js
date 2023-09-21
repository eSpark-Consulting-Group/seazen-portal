import React from "react";
import styles from "../../screens/order/style.module.css";

const HeaderSection = () => {
  return (
    <div className={styles.orderheaderSection}>
      <img src="/assets/img/tick.png" alt="" />
      <p id="thanksnote" className={styles.thanksnote}>
        Thank you for placing<br></br>your order.
      </p>
    </div>
  );
};

export default HeaderSection;
