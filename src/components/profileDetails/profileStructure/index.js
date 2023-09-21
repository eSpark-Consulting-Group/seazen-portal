import React from "react";
import styles from "./style.module.css";
import DetailsButton from "../../socialButtonTabs/detailsButtons";
import { Footer } from "../../footer/footerContent";
import { useNavigate } from "react-router";
import { paths } from "../../../routes/paths";

const ProfileStructure = ({
  name,
  phoneNumber,
  email,
  imageUrl,
  onEditClick,
}) => {
  const navigate = useNavigate();

  return (
    <div className={styles.profileSection}>
      <div className={styles.leftSection}>
        <img src={imageUrl} alt="Profile" className={styles.imageStyle} />
        <div className={styles.profileName}>{name}</div>
        <div className={styles.profileNumber}>{phoneNumber}</div>
        <div className={styles.profileEmail}>{email}</div>
      </div>
      <div className={styles.rightSection}>
        <button onClick={onEditClick} className={styles.profileEditButton}>
          <img src="/assets/img/Group 106.svg"></img>
        </button>
      </div>
      <div
        className={styles.inlineContainer}
        onClick={() => {
          navigate(paths.addresses);
        }}
      >
        <img className={styles.mapStyle} src="/assets/img/map.svg"></img>
        <p>My Addresses</p>
      </div>
      <div
        className={styles.inlineContainer2}
        onClick={() => {
          navigate(paths.myorder);
        }}
      >
        <img className={styles.boxStyle} src="/assets/img/box.svg"></img>
        <p>My Orders</p>
      </div>
      <DetailsButton />
      <Footer showCommentOption={false} />
    </div>
  );
};

export default ProfileStructure;
