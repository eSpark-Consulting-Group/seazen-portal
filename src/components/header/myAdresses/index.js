import React from "react";
import "./style.css";
import { useNavigate } from "react-router";
import { paths } from "../../../routes/paths";

const MyAddresses = (props) => {
  const { title, path, fromAllAddresses } = props;
  const navigate = useNavigate();

  return (
    <header className="header container-fluid">
      <div
        className="left-icons"
        onClick={() => {
          navigate(
            fromAllAddresses && path === "/profile"
              ? paths.profile
              : !fromAllAddresses && path === "/profile"
              ? paths.addresses
              : paths.home,
            {
              state: {
                path:
                  !fromAllAddresses && path === "/profile" ? "/profile" : "",
              },
            }
          );
        }}
      >
        <img src="/assets/img/Icon - Arrow.svg" alt="Back"></img>
      </div>
      <div className="logo">
        <h3>{title}</h3>
      </div>
      <div className="right-icons">
        <img src="/assets/img/options icon.svg" alt="Options"></img>
      </div>
    </header>
  );
};

export default MyAddresses;
