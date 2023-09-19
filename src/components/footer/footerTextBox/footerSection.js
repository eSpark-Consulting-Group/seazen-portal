import React from "react";
import styles from "./style.module.css";

const FooterSection = () => {
  const handleMessage = () => {
    prompt("Enter message");
  };

  return (
    <div className={styles.footerSection}>
      <a href="" onClick={handleMessage}>
        <img src="/assets/img/message.png" alt="" />
      </a>
    </div>
  );
};

export default FooterSection;
