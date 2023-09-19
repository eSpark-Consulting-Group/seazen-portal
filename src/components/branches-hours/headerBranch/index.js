import React from "react";
import styles from "./style.module.css";
import { useNavigate } from "react-router";

const BranchHeader = () => {
  const navigate = useNavigate();

  return (
    <header className={styles.branchHeader}>
      <div className={styles.brancLeftIcons} onClick={() => navigate(-1)}>
        <img src="/assets/img/Icon - Arrow.svg"></img>
      </div>
      <div className={styles.branchLogo}>
        <h3>Branches & Hours</h3>
      </div>
      <div className={styles.rightIcons}>
        <img src="/assets/img/Group 259.svg"></img>
      </div>
    </header>
  );
};

export default BranchHeader;
