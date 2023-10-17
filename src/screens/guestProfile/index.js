import React from "react";
import ProfileHeader from "../../components/header/profileHeader";
import Structure from "../../components/guestProfileDetails/structure";
import Information from "../../components/guestProfileDetails/information";

export const GuestProfile = () => {
  return (
    <div>
      <ProfileHeader showFlagOption={false} />
      <div className="px-3">
      <Information />
      </div>
    </div>
  );
};
