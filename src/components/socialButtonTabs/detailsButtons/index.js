import React from "react";
import ContactButton from "../../contact_button/index";
import styles from "./style.module.css";

const DetailsButton = () => {
  return (
    <div className={styles.buttonSection}>
      <div className={styles.cateringInnerContainer}>
        <div className={styles.cateringButtonContainer}>
          <ContactButton
            text={1818555}
            color={"#98694E"}
            icon_image="/assets/img/Icon - Call.svg"
          />
          <ContactButton
            text={"Live Chat"}
            color={"#1B6483"}
            icon_image="/assets/img/Icon - Chat.svg"
          />
          <ContactButton
            text={"Send Message"}
            color={"#2FA124"}
            icon_image="/assets/img/Icon - Message.svg"
          />
        </div>
      </div>
    </div>
  );
};

export default DetailsButton;
