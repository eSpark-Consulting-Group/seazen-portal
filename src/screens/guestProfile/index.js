import React from "react";
import ProfileHeader from "../../components/header/profileHeader";
import Structure from "../../components/guestProfileDetails/structure";
import Information from "../../components/guestProfileDetails/information";
import { BsHouseDoor } from "react-icons/bs"; 

export const GuestProfile = () => {
  return (
    <div>
      <ProfileHeader
        showFlagOption={false}
        customIcon={
          <BsHouseDoor
            size={22}
            color="black"
            style={{
              position:"absolute",
              top:"8px",
              left:"9.5px",
            }}
          />
        }
      />{" "}
      <div className="px-3">
        <Information />
      </div>
    </div>
  );
};
