import React from "react";
import "../../profileDetails/profileStructure/style.css";
import DetailsButton from "../../socialButtonTabs/detailsButtons";
import { Footer } from "../../footer/footerContent";
import { useNavigate } from "react-router";
import { paths } from "../../../routes/paths";

const Structure = ({ name, register, imageUrl }) => {
  const navigate = useNavigate();
  return (
    // <div style={{ height: "500px" }}>
    <div className="profile-section">
      <div className="left-section">
        <img src={imageUrl} alt="Profile" className="image-style" />
        <div className="profile-name">{name}</div>
        <div className="profile-register">{register}</div>
        <div>
          <button
            className="guest-register-button"
            onClick={() =>
              navigate(paths.phone_verification_index, {
                state: { register: true },
              })
            }
          >
            <span className="guest-register-text">Register</span>
          </button>
        </div>
      </div>
      <DetailsButton />
      <div className="profile-footer">
        <Footer showCommentOption={false} />
      </div>
    </div>
    // </div>
  );
};

export default Structure;
