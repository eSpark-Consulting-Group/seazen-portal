import React from "react";
import "./style.css";
import { useNavigate } from "react-router";
import { paths } from "../../../routes/paths";
import Navbar from "../../../components/header";

const MyAddresses = (props) => {
  const {
    title,
    path,
    fromAllAddresses,
    edit,
    noAddress,
    addNew,
    restaurant_id,
    fromCart,
    fromHome,
    fromMenu,
    fromDetail,
  } = props;

  return (
    <div style={{ padding: "20px 29px 20px 24px" }}>
      <Navbar
        backIcon
        languageIcon
        backIconURLState={{
          state: {
            path: !fromAllAddresses && path === "/profile" ? "/profile" : "",
            back: fromAllAddresses && path === "/cart" ? paths.home : null,
            fromHome: fromHome,
            fromMenu: fromMenu,
            fromDetail: fromDetail,
          },
        }}
        title={title}
        backIconURL={
          fromAllAddresses && path === "/profile"
            ? paths.profile
            : !fromAllAddresses && path === "/profile"
            ? paths.addresses
            : (fromAllAddresses && path === "/cart") ||
              (fromCart !== undefined && path === "/cart") ||
              fromHome !== undefined ||
              fromMenu !== undefined ||
              fromDetail !== undefined
            ? paths.cart
            : edit !== undefined
            ? paths.addresses
            : noAddress !== undefined
            ? -1
            : addNew !== undefined
            ? `${paths.menu}/restaurant/${restaurant_id}/delivery`
            : paths.home
        }
      />
    </div>
  );
};

export default MyAddresses;
