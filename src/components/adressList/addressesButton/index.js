import React from "react";
import { useNavigate } from "react-router";
import { paths } from "../../../routes/paths";
import styles from "./style.module.css";
console.log(styles, "sty");
export const AddressesButton = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button
        className={styles.addressesAddButton}
        onClick={() => {
          navigate(paths.location);
        }}
      >
        <span className={styles.addressesAddButtonText}>Add New Address</span>
      </button>
      <div className={styles.addressButton}>
        <button
          className={`${styles.addressesAddButton} container`}
          onClick={() => {
            navigate(paths.location);
          }}
        >
          <span className={styles.addressesAddButtonText}>Add New Address</span>
        </button>
      </div>
    </div>
  );
};
