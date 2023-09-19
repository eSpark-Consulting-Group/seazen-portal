import React from "react";
import { IoCall } from "react-icons/io5";
import { FaWhatsapp } from "react-icons/fa";
import styles from "./style.module.css";
const ContactUs = () => {
  const phoneNumber = "18185555";
  let url = `https://web.whatsapp.com/send?phone=${phoneNumber}`;

  const handleMesssage = () => {
    window.open(url);
  };

  return (
    <div className={styles.ordercontactSection}>
      <div className={styles.callTag}>
        <IoCall />
        <a href="tel:18185555">18185555</a>
      </div>
      <div className={styles.whatsappTag}>
        <FaWhatsapp />
        <a href="" onClick={handleMesssage}>
          Send Message
        </a>
      </div>
    </div>
  );
};

export default ContactUs;
