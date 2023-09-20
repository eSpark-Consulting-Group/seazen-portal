import React from "react";
import { useNavigate } from "react-router";
import styles from "./style.module.css";
import { paths } from "../../../routes/paths";

export const DetailsHeader = () => {
  const navigate = useNavigate();
  return (
    <header className={styles.detailsHeaderHeader}>
      <img
        className={styles.detailsHeaderBackground}
        src="/assets/img/image.png"
      />
      <div
        className={`${styles.detailsHeaderArrowIconsStyle} ${styles.pointer} `}
        onClick={() => navigate(-1)}
      >
        <img
          className={styles.detailsHeaderLeftIcons}
          src="/assets/img/Icon - Arrow.svg"
        ></img>
      </div>
      <div className={styles.detailsHeaderCaptionContainer}>
        <p className={styles.detailsHeaderCaptionText}>KWD</p>
        <div className={styles.detailsHeaderCaptionPrice}>6.990</div>
      </div>
      <div
        className={`${styles.detailsHeaderIconStyle}  ${styles.pointer}`}
        onClick={() => navigate(paths.cart)}
      >
        <img
          className={styles.detailsHeaderRightIcons}
          src="/assets/img/Icon - Bag.svg"
        ></img>
      </div>
    </header>
  );
};
