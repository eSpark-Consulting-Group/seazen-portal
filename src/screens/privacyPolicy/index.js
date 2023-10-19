import React from "react";
import ProfileHeader from "../../components/header/profileHeader";
import { Footer } from "../../components/footer/footerContent";
import "./style.css";

export const PrivacyPolicy = () => {
  return (
    <div>
      <div  className="privacy-policy-section px-4">
      <ProfileHeader showFlagOption={false} />
        <h1>Privacy Policy</h1>
        <p className="privacy-paragraph-title">1. Lorem ipsum </p>
        <p className="privacy-paragraphOne">
          dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh
          euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut
          wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper
          suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem
          vel eum iriure dolor in hendrerit in vulputate velit esse molestie
          consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et
          accumsan et iusto odio dignissim qui blandit praesent luptatum zzril
          delenit augue duis dolore te feugait nulla facilisi.{" "}
        </p>
        <p className="privacy-paragraphTwo">
          Lorem ipsum dolor sit amet, cons ectetuer adipiscing elit, sed diam
          nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
          volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
          ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.{" "}
        </p>
        <p className="privacy-paragraph-title-two">2. Lorem ipsum </p>
        <p className="privacy-paragraphThree">
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
          nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
          volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
          ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
          Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse
          molestie consequat, vel illum dolore eu feugiat nulla facilisis at
          vero eros et accumsan et iusto odio dignissim qui blandit praesent
          luptatum zzril delenit augue duis dolore te feugait nulla facilisi.
          facilisis at vero eros et accumsan et iusto odio dignissim qui blandit
          praesent luptatum zzril delenit augue duis dolore te feugait nulla
          facilisi.
        </p>
      </div>
      <div className="privacy-policy-footer px-3">
          <Footer showCommentOption={false} />
        </div>
    </div>
  );
};
