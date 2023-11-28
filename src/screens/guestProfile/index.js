import React from "react";
import ProfileHeader from "../../components/header/profileHeader";
import Structure from "../../components/guestProfileDetails/structure";
import Information from "../../components/guestProfileDetails/information";
import Navbar from "../../components/header/";
import { paths } from "../../routes/paths";

export const GuestProfile = () => {
  return (
    <div>
      <div className="header-wrapper">
        <Navbar
          profile
          languageIcon
          logo
          borderedIcon
          profileIconUrl={paths.home}
          showFlagOption={false}
        />
      </div>
      <div className="px-3">
        <Information />
      </div>
    </div>
  );
};
