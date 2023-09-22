import React from "react";
import styles from "./style.module.css";
import FooterSection from "../footerTextBox/footerSection";
import { useNavigate } from "react-router";
import { paths } from "../../../routes/paths";
export const Footer = (props) => {
  const { showFooterSection } = props;
  const navigate = useNavigate();
  return (
    <div className={styles.footerContainer}>
      <div className={styles.footerText}>
        <h2 className={styles.footerStyle}>© 2023 Seazen Group Co.</h2>
      </div>
      <p className={styles.termsStyle}>
        <span
          onClick={() => {
            navigate(paths.terms);
          }}
        >
          Terms & Conditions
        </span>{" "}
        |{" "}
        <span
          onClick={() => {
            navigate(paths.privacy_policy);
          }}
        >
          Privacy Policy
        </span>
      </p>
      {showFooterSection && (
        <div className={styles.textBox}>
          <FooterSection />
        </div>
      )}
    </div>
  );
};
