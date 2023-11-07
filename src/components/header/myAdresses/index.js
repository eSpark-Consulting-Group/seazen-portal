import React from "react";

import Navbar from "../../../components/header";

import { paths } from "../../../routes/paths";

import "./style.css";

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
    backToCart,
    backCart,
    notSelected,
  } = props;

  const pathToCart = () => {
    return (
      (fromAllAddresses && path === "/cart") ||
      (fromCart !== undefined && path === "/cart") ||
      (fromAllAddresses && backToCart !== undefined && path !== "/profile") ||
      (fromAllAddresses &&
        backCart !== undefined &&
        (path === "/home" || path === "menu/restaurant"))
    );
  };

  const pathToAddresses = () => {
    return (
      (fromHome !== undefined ||
        fromMenu !== undefined ||
        fromDetail !== undefined) &&
      backToCart === undefined &&
      backCart === undefined
    );
  };

  const pathToAddressWithEdit = () => {
    return (
      edit !== undefined ||
      ((fromHome !== undefined ||
        fromMenu !== undefined ||
        fromDetail !== undefined) &&
        backToCart !== undefined)
    );
  };

  return (
    <div style={{ padding: "20px 29px 20px 24px" }}>
      <Navbar
        backIcon
        languageIcon
        backIconURLState={{
          state: {
            path: !fromAllAddresses && path === "/profile" ? "/profile" : "",
            back:
              fromAllAddresses &&
              path === "/cart" &&
              fromMenu === undefined &&
              fromDetail === undefined
                ? paths.home
                : null,
            fromHome: fromHome,
            fromMenu: fromMenu,
            fromDetail: fromDetail,
            backToCart: backToCart,
          },
        }}
        title={title}
        backIconURL={
          fromAllAddresses && path === "/profile"
            ? paths.profile
            : !fromAllAddresses && path === "/profile"
            ? paths.addresses
            : pathToAddresses()
            ? paths.addresses
            : pathToCart()
            ? paths.cart
            : pathToAddressWithEdit()
            ? paths.addresses
            : noAddress !== undefined ||
              (backCart !== undefined && path !== "/home")
            ? -1
            : addNew !== undefined || notSelected !== undefined
            ? `${paths.menu}/restaurant/${restaurant_id}/delivery`
            : paths.home
        }
      />
    </div>
  );
};

export default MyAddresses;
