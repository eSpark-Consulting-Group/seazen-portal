import React from "react";
import { useNavigate } from "react-router";

import FooterSection from "../footerTextBox/footerSection";

import { paths } from "../../../routes/paths";

import "./style.css";

export const Footer = (props) => {
  const { showFooterSection, path } = props;
  const navigate = useNavigate();

  return (
    <div style={{ marginTop: "45px" }}>
      <div className="footer-container">
        <div className="footer-text">
          {/* <p>5% VAT is included in all prices</p> */}
          <h2 className="footer-style">© 2024 Seazen Group Co.</h2>
        </div>
        <p className="terms-style">
          <span
            onClick={() => {
              navigate(paths.terms, {
                replace: (path === "terms" || path === "privacy") && true,
              });
            }}
          >
            Terms & Conditions
          </span>{" "}
          |{" "}
          <span
            onClick={() => {
              navigate(paths.privacy_policy, {
                replace: (path === "terms" || path === "privacy") && true,
              });
            }}
          >
            Privacy Policy
          </span>
        </p>
      </div>
    </div>
  );
};
