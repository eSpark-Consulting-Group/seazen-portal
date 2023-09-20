import React, { useState, useRef, useEffect } from "react";
import styles from "./style.module.css";

const FormHeader = () => {
  return (
    <nav>
      <div className={styles.account}>
        <div className={styles.accountIcon}>
          <img src="/assets/img/Group 330.svg" alt="Account Icon" />
        </div>
      </div>
      <div className={styles.logo}>
        <img src="/assets/img/Group 143.svg" alt="Logo" />
      </div>

      <div className={styles.option}>
        <div className={styles.optionIcon}>
          <img src="/assets/img/Group 256.svg" alt="Option Icon" />
        </div>
      </div>
    </nav>
  );
};

export default FormHeader;
