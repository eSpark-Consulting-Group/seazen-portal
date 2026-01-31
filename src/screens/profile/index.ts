import React from "react";

import ProfileInformation from "../../components/profileDetails/profileInformation";
import Navbar from "../../components/header";

import { paths } from "../../routes/paths";

export const Profile = () => {
  return (
    <div className="profileSectionContainer">
      <div className="header-wrapper">
        <Navbar
          profile
          logo
          languageIcon
          showFlagOption
          borderedIcon
          profileIconUrl={paths.home}
        />
      </div>
      <div className="px-3">
        <ProfileInformation />
      </div>
    </div>
  );
};
