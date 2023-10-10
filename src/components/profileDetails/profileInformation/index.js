import React, { useEffect, useState } from "react";
import ProfileStructure from "../profileStructure";
import { useNavigate } from "react-router-dom";
import { paths } from "../../../routes/paths";
import { useDispatch, useSelector } from "react-redux";
import getUserInfo from "../../../api/customer/getUserInfo";
import { addUserInfo } from "../../../store/reducers/authSlice";

function ProfileInformation() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = localStorage.getItem("token");
  const localUserInfo = useSelector((state)=> state.auth.user);

  const [user, setUser] = useState({
    name: localUserInfo.name,
    phoneNumber:
    localUserInfo.mobile_country_code + " " + localUserInfo.mobile,
    email: localUserInfo.email,
    imageUrl: "/assets/img/profile image.svg",
  });

  useEffect(() => {
    localUserInfo.id === null && getUserInfo(token).then((res) => {
      if (res.statusCode === 200) {
        const { first_name, last_name, email, mobile_country_code, mobile_no } =
          res.data;
        const userInfoFromApi = {
          name: first_name + " " + last_name,
          phoneNumber: mobile_country_code + " " + mobile_no,
          email: email,
        };

        dispatch(addUserInfo(res.data));
        setUser({ ...user, ...userInfoFromApi });
      }
    });
  }, []);

  const handleEditClick = () => {
    navigate(paths.update_profile);
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
