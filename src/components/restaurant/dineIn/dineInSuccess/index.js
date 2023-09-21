import React from "react";
import ContactButton from "../../../contact_button";
import styles from "./style.module.css";
import { Style } from "@mui/icons-material";

const DineInSuccess = ({
  firstName,
  lastName,
  countryCode,
  phoneNumber,
  selectBranch,
  seatingArea,
  numberOfPersons,
  specialRequirements,
  handleSpecialRequirementsChange,
}) => {
  return (
    <div className={styles.dineInSuccessOuterContainer}>
      <div className={styles.dineInSuccessInnerContainer}>
        <div className={styles.dineInSuccessMessageContainer}>
          <div className={styles.dineInSuccessIconContainer}>
            <img src="/assets/img/Icon - Succes.svg" alt="success_icon" />
          </div>
          <div className={styles.dineInSuccessTextContainer}>
            Thank you!
            <br />
            We will contact you soon
          </div>
        </div>
        <div className={styles.dineInGuestInformationCardContainer}>
          <div className={styles.dineInGuestInformationCardInnerContainer}>
            <div className={styles.dineInGuestInformationCardHeading}>
              Guest Information
            </div>
            <div
              className={styles.dineInGuestInformationCardLineSaperator}
            ></div>
            <div
              className={
                styles.dineInGuestInformationGuestnameBranchTextContainer
              }
            >
              <div className={styles.dineInGuestNameContainer}>
                <div className={styles.dineInGuestNameHeading}>Guest name</div>
                <div className={styles.dineInGuestName}>{`${firstName}`}</div>
              </div>
              <div className={styles.dineInGuestBranchContainer}>
                <div className={styles.dineInBranchHeading}>Branch</div>
                <div className={styles.dineInBranchName}>{selectBranch}</div>
              </div>
            </div>
            <div
              className={
                styles.dine_in_guest_information_seatingarea_numberofpersons_text_container
              }
            >
              <div className={styles.dineInSeatingAreaContainer}>
                <div className={styles.dineInSeatingAreaHeading}>
                  Seating area
                </div>
                <div className={styles.dineInSeatingArea}>{seatingArea}</div>
              </div>
              <div className={styles.dineInGuestNumberOfPersonsContainer}>
                <div className={styles.dineInNumberOfPersonsHeading}>
                  Number of Persons
                </div>
                <div className={styles.dineInNumberOfPersons}>
                  {numberOfPersons}
                </div>
              </div>
            </div>
            <div
              className={
                styles.dine_in_guest_information_phone_number_text_container
              }
            >
              <div className={styles.dineInPhoneNumberContainer}>
                <div className={styles.dineInPhoneNumberHeading}>
                  Phone Number
                </div>
                <div
                  className={styles.dineInPhoneNumber}
                >{`${countryCode} ${phoneNumber}`}</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.dineInContactUsContainer}>
          <div className={styles.dineInContactUsHeading}>Contact Us</div>
          <div className={styles.dineInContactUsButtons}>
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
    </div>
  );
};

export default DineInSuccess;
