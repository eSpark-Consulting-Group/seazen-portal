import React from "react";
import ProfileStructure from "../profileStructure";
import { useNavigate } from "react-router-dom";
import { paths } from "../../../routes/paths";

function ProfileInformation() {
  const navigate = useNavigate();

  const user = {
    name: "John Doe",
    phoneNumber: "+965 1234 5678",
    email: "john@doe.com",
    imageUrl: "/assets/img/profile image.svg",
  };

  const handleEditClick = () => {
    navigate(paths.update_profile)
  };

  return (
    <div>
      <ProfileStructure
        name={user.name}
        phoneNumber={user.phoneNumber}
        email={user.email}
        imageUrl={user.imageUrl}
        onEditClick={handleEditClick}
      />
    </div>
  );
}

export default ProfileInformation;
