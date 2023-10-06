import React from "react";
import styles from "./style.module.css";

const Card = ({
  title,
  title2,
  iconUrl,
  name,
  block,
  home,
  floor,
  AdditionalDirections,
}) => {
  return (
    <div className="container-fluid">
      <div className={`${styles.addressesContainer} container-fluid`}>
        <div className={`${styles.addressesHeader}`}>
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
              <p className={styles.additionalAddresses}>
                Additional Directions; <br /> {AdditionalDirections}
              </p>
            </div>
          </div>
          <div className={styles.addressesMapSection}>
            <img src="/assets/img/map-image.svg" alt="Small Image" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
