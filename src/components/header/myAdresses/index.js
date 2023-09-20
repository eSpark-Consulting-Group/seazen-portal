import React from "react";
import styles from "./style.module.css"; // Import the module CSS file
import { useNavigate } from "react-router";

const MyAddresses = () => {
  const navigate = useNavigate();
  return (
    <header className={styles.header}>
      <div
        className={styles.leftIcons}
        onClick={() => {
          navigate(-1);
        }}
      >
        <img src="/assets/img/Icon - Arrow.svg" alt="Arrow Icon" />
      </div>
      <div className={styles.logo}>
        {" "}
        <h3>Your Addresses</h3>
      </div>
      <div className={styles.rightIcons}>
        {" "}
        <img src="/assets/img/options icon.svg" alt="Options Icon" />
      </div>
    </header>
  );
};

export default MyAddresses;
