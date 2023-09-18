import React, { useState } from "react";
import styles from "./forms.module.css";

export const OfficeAdress = () => {
  return (
    <form className={styles.containerStyle}>
      <input
        className={styles.formStyle}
        type="text"
        name="Block"
        placeholder="Block"
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
        name="Building"
        placeholder="Building"
      />
      <input
        className={styles.formStyle}
        type="text"
        name="Floor"
        id="required"
        placeholder="Floor&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(Required)"
      />
      <input
        className={styles.formStyle}
        type="text"
        name="Company Name"
        id="required"
        placeholder="Company Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(Required)"
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
