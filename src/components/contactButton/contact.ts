import React from "react";
import { IoCall } from "react-icons/io5";
import { FaWhatsapp } from "react-icons/fa";
import { useSelector } from "react-redux";

const ContactUs = () => {
  // const phoneNumber = "18185555";
  // let url = `https://web.whatsapp.com/send?phone=${phoneNumber}`;

  // const handleMesssage = () => {
  //   window.open(url);
  // }
  const contactInfo = useSelector((state) => state.auth.country);
  const { customer_care, whatsapp_country_code, whatsapp_no } = contactInfo;

  let url = `https://web.whatsapp.com/send?phone=${whatsapp_country_code}${whatsapp_no}`;

  const handleButtonClick = () => {
    window.open(url);
  };

  return (
    <div className="ordercontact-section">
      <div id="call-tag">
        <IoCall />
        <a href={`tel:${customer_care}`}>{customer_care}</a>
      </div>
      <div id="whatsapp-tag">
        <FaWhatsapp />
        <a href="" onClick={() => handleButtonClick("whatsapp")}>
          Send Message
        </a>
      </div>
    </div>
  );
};

export default ContactUs;
