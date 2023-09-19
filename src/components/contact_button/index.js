import React from "react";
import styles from "./style.module.css";

const ContactButton = ({ color, text, icon_image, handleclick }) => {
  return (
    <button
      className={styles.contactButton}
      onClick={handleclick}
      style={{ backgroundColor: color }}
    >
      <span className={styles.contactButtonSpan}>
        <img src={icon_image} alt="iconimage" />
      </span>
      {text}
    </button>
  );
};

export default ContactButton;
