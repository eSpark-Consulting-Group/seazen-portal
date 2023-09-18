import React from "react";
import { AddressesButton } from "./addressesButton";
import styles from "./adressList.module.css";
// import "./style.css"

const Card = ({ title, title2, iconUrl, name, block, home, floor }) => {
  return (
    <div className={styles.addressesContainer}>
      <div className="addresses-header">
        <img className={styles.addressesCardIcon} src={iconUrl} alt="Icon" />
        <p className={styles.addressesHomeTitle}>{title}</p>
        <p className={styles.addressesHomeTitle2}>{title2}</p>
      </div>
      <div className={styles.addressesButtonSection}>
        <div className={styles.addressesButtonContainer}>
          <button className={styles.addressesDeleteButton}>
            <span className={styles.addressesDeleteText}>Delete</span>
          </button>
          <button className={styles.addressesEditButton}>
            <span className={styles.addressesEditText}>Edit</span>
          </button>
        </div>
        <hr />
      </div>
      <div className={styles.addressesContent}>
        <div className={styles.addressesDetailsAndMap}>
          <div className={styles.addressesDetails}>
            <p className={styles.addressesName}>{name}</p>
            <p className={styles.addressesName}>{block}</p>
            <p className={styles.addressesName}>{home}</p>
            <p className={styles.addressesName}>{floor}</p>
          </div>
        </div>
        <div className={styles.addressesMapSection}>
          <img src="/assets/img/map-image.svg" alt="Small Image" />
        </div>
      </div>
      <AddressesButton />
    </div>
  );
};

export default Card;
