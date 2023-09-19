import React from "react";
import styles from "./style.module.css";

export const Content = () => {
  return (
    <div className={styles.informationStyle}>
      <h4 className={styles.contentHeading}>
        Burrito Vegetarian in a Bowl (450g)
      </h4>
      <p className={styles.contentSmall}>483 Kcal</p>
      <p className={styles.contentParagraph}>
        rice, plate peppers, onion, red beans, mushrooms, corn with spices,
        tomatoes, iceberg, olives, yellow cheese, cream sauce, mayonnaise sauce
        or hot salad
      </p>
    </div>
  );
};
