import React from "react";
import styles from "./adressHeader.module.css";
import { useNavigate } from "react-router";

const AddressHeader = () => {
  const navigate = useNavigate();

  return (
    <header className={styles.addressheader}>
      <div
        className={styles.addressHeaderleftIcons}
        onClick={() => navigate(-1)}
      >
        <img src="/assets/img/Icon - Arrow.svg"></img>
      </div>
      <div className={styles.addressHeaderlogo}>
        <h3>Add New Address</h3>
      </div>
      <div className={styles.addressHeaderrightIcons}>
        <img src="/assets/img/Group 256.svg"></img>
      </div>
    </header>
  );
};

export default AddressHeader;
