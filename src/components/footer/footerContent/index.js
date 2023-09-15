import React from "react";
import "./style.css";
import FooterSection from "../footerTextBox/footerSection";

export const Footer = (props) => {
  const { showFooterSection } = props;

  return (
    <div className="footer-container">
      <h2 className="footer-style">© 2023 Seazen Group Co.</h2>
      <p className="terms-style">Terms & Conditions | Privacy Policy</p>
      {showFooterSection && (
        <div className="text-box">
          <FooterSection />
        </div>
      )}
    </div>
  );
};

