import React from "react";
import styles from "./style.module.css";

const BranchContent = () => {
  return (
    <div>
      <div className={styles.branchContent}>
        <img className={styles.branchImg} src="/assets/img/Group 13.svg" />
        <p>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
          nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
          volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
        </p>
      </div>
    </div>
  );
};

export default BranchContent;
