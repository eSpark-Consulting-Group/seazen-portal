import React from "react";
import ProfileHeader from "../../components/header/profileHeader";
import Structure from "../../components/guestProfileDetails/structure";
import Information from "../../components/guestProfileDetails/information";
import styles from "./style.module.css"

export const GuestProfile = () => {
  return (
    <div>
      <ProfileHeader showFlagOption={false} />
      <Information />
    </div>
  );
};
