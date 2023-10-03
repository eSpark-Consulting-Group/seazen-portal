import React from "react";
import "./style.css";
import FooterSection from "../footerTextBox/footerSection";
import { useNavigate } from "react-router";
import { paths } from "../../../routes/paths";
export const Footer = (props) => {
  const { showFooterSection } = props;
  const navigate = useNavigate();
  return (
    <div className="footer-container">
      <div className="footer-text">
      <p>5% VAT is included in all prices</p>
      <h2 className="footer-style">© 2023 Seazen Group Co.</h2>
      </div>
      <p className="terms-style"><span onClick={() => {navigate(paths.terms)}}>Terms & Conditions</span> | <span onClick={() => {navigate(paths.privacy_policy)}}>Privacy Policy</span></p>
      {/* {showFooterSection && (
        <div className="text-box">
          <FooterSection />
        </div>
      )} */}
    </div>
  );
};