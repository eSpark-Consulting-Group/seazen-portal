import React from "react";
import ContactButton from "../../contact_button/index.js";
import styles from "./style.module.css"; //

const CateringDetails = () => {
  return (
    <div className={styles.cateringOuterContainer}>
      <div className={styles.cateringInnerContainer}>
        <div className={styles.cateringTextButtonCombinedContainer}>
          <div className={styles.cateringTextContainer}>
            Please contact us to arrange your catering.
          </div>
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
        {/* <div className={styles.commentButtonContainer}>
            <button>
                <img src="/assets/img/comment_icon.svg" alt="comment_icon" />
            </button>
        </div> */}
      </div>
    </div>
  );
};

export default CateringDetails;
