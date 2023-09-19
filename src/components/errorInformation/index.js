import React from "react";
import styles from "./style.module.css";

const ErrorInformation = ({ errorMessage }) => {
  return (
    <div
      className={`${styles.errorInformationOuterContainer} p-2 px-3 px-sm-4`}
    >
      <div className={styles.errorInformationInnerContainer}>
        <div className={styles.errorInformationIconContainer}>
          <img src="/assets/img/Icon - Error.svg" alt="error_icon" />
        </div>
        <div className={styles.errorInformationTextContainer}>
          {errorMessage}
        </div>
      </div>
    </div>
  );
};

export default ErrorInformation;
