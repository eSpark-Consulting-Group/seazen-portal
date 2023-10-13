import React from "react";
import "./style.css";
import FooterSection from "../footerTextBox/footerSection";
import { useNavigate } from "react-router";
import { paths } from "../../../routes/paths";

export const Footer = (props) => {
  const { showFooterSection } = props;
  const navigate = useNavigate();

  return (
    <div style={{marginTop:"45px"}}>
    <div className="footer-container">
      <div className="footer-text">
        <p>5% VAT is included in all prices</p>
        <h2 className="footer-style">© 2023 Seazen Group Co.</h2>
      </div>
      <p className="terms-style">
        <span
          onClick={() => {
            navigate(paths.terms, { replace: true });
          }}
        >
          Terms & Conditions
        </span>{" "}
        |{" "}
        <span
          onClick={() => {
            navigate(paths.privacy_policy, { replace: true });
          }}
        >
          Privacy Policy
        </span>
      </p>
    </div>
    </div>
  );
};
