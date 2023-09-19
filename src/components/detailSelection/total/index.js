import React from "react";
import { getFormattedPrice } from "../sideSelection/index";
import styles from "./style.module.css";

export default function PricingBox({ total }) {
  return (
    <li>
      <div className={styles.pricingBox}>
        <img
          className={styles.pricingIcon}
          src="/assets/img/Icon - Buy.svg"
          alt="Logo"
        />
        <div className={styles.pricingSection}>Add to cart</div>
        <div className={styles.calculationSection}>
          {getFormattedPrice(total)}
        </div>
      </div>
    </li>
  );
}
