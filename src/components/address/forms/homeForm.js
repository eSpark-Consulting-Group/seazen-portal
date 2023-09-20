import React, { useState } from "react";
import styles from "./style.module.css";
export const HomeAdress = () => {
  return (
    <form className={styles.containerStyle}>
      <input
        className={styles.formStyle}
        id="required"
        type="text"
        name="Block"
        placeholder="Block&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(Required)"
      />
      <input
        className={styles.formStyle}
        type="text"
        name="Street"
        placeholder="Street"
      />
      <input
        className={styles.formStyle}
        type="text"
        name="Avenue"
        placeholder="Avenue (Optional)"
      />
      <input
        className={styles.formStyle}
        type="text"
        name="House Number"
        placeholder="House Number"
      />
      <input
        className={styles.formStyle}
        type="text"
        name="Address Label"
        placeholder="Address Label (Optional)"
      />
      <textarea
        className={styles.formStyle}
        name="AdditionalDirection"
        id="AdditionalDirection"
        placeholder="Additional Direction"
      ></textarea>
    </form>
  );
};
