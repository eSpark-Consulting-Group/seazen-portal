import React from "react";
import ContactButton from "../../contact_button/index";
import "./style.css";
import { useSelector } from "react-redux";

const DetailsButton = () => {
  const contactInfo = useSelector((state) => state.auth.country);
  const { customer_care, whatsapp_country_code, whatsapp_no } = contactInfo;

  console.log("Customer Care:", customer_care);
  console.log("WhatsApp Country Code:", whatsapp_country_code);
  console.log("WhatsApp Number:", whatsapp_no);

  const handleButtonClick = (buttonType) => {
    let actionUrl;

    if (buttonType === "call") {
      actionUrl = `tel:${customer_care}`;
    } else if (buttonType === "whatsapp") {
      actionUrl = `https://web.whatsapp.com/send?phone=${whatsapp_country_code}${whatsapp_no}`;
    }

    window.open(actionUrl);
  };
  

  return (
    <div className="button-section">
      <div className="catering_inner_container">
        <div className="catering_button_container">
          <ContactButton
            text={1818555}
            color={"#98694E"}
            icon_image="/assets/img/Icon - Call.svg"
            handleButtonClick={() => handleButtonClick("call")}
            />
          {/* <ContactButton text={"Live Chat"} color={"#1B6483"} icon_image="/assets/img/Icon - Chat.svg" onClick={handleButtonClick} /> */}
          <ContactButton
            text={"Send Message"}
            color={"#2FA124"}
            icon_image="/assets/img/Icon - Message.svg"
            handleButtonClick={() => handleButtonClick("whatsapp")}
            />
        </div>
      </div>
    </div>
  );
};

export default DetailsButton;
