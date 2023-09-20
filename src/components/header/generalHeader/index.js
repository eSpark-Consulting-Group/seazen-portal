// src/Navbar.js
import React from "react";
import { useNavigate } from "react-router";
import styles from "./style.module.css";
import { paths } from "../../../routes/paths";

const Navbar = ({ restaurantDetail }) => {
  const navigate = useNavigate();
  return (
    <div className={styles.navImageContainer}>
      <img alt="background_image" src="\assets\img\menu_background_image.png" />
      <nav className={styles.upperNavigation}>
        <div className={styles.backButton} onClick={() => navigate(paths.home)}>
          <div className={styles.backButtonIcon}>
            <img alt="Arrow_Icon" src="/assets/img/Icon - Arrow.svg" />
          </div>
        </div>
        <div
          className={`${styles.shoppingContainer} ${styles.pointer}`}
          onClick={() => navigate(paths.cart)}
        >
          <div className={styles.shoppingIcon}>
            <img alt="Bag_Icon" src="/assets/img/Icon - Bag.svg" />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
