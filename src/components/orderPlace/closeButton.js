import React from "react";
import styles from "../../screens/order/style.module.css";

import { GrClose } from "react-icons/gr";

const CloseButton = () => {
  return (
    <div className={styles.closeButton}>
      <div className={styles.closeBtnTag}>
        <p style={{ color: "#1F2933" }}>
          <strong>᙭</strong>
        </p>
      </div>
    </div>
  );
};

export default CloseButton;
