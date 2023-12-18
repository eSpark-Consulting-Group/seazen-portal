import React from "react";
import { useLocation } from "react-router-dom";

import Navbar from "../../../components/header";

import { paths } from "../../../routes/paths";

import "./style.css";

const MyAddresses = (props) => {
  const {
    title,
    path,
    fromAllAddresses,
    // edit,
    // noAddress,
    // addNew,
    // restaurant_id,
    fromCart,
    fromHome,
    fromMenu,
    fromDetail,
    backToCart,
    backCart,
    // notSelected,
    editLocation,
    // addFromDropdown,
    detailPath,
  } = props;

  const location = useLocation();

  const pathToCart = () => {
    return (
      (fromAllAddresses && path === "/cart") ||
      (fromCart !== undefined && path === "/cart") ||
      (editLocation !== undefined &&
        (fromHome !== undefined ||
          fromDetail !== undefined ||
          fromMenu !== undefined)) ||
      (fromAllAddresses && backToCart !== undefined && path !== "/profile") ||
      (fromAllAddresses &&
        backCart !== undefined &&
        (path === "/home" || path === "menu/restaurant"))
    );
  };

  // const pathToAddresses = () => {
  //   return (
  //     (fromHome !== undefined ||
  //       fromMenu !== undefined ||
  //       fromDetail !== undefined) &&
  //     backToCart === undefined &&
  //     backCart === undefined &&
  //     editLocation === undefined
  //   );
  // };

  // const pathToAddressWithEdit = () => {
  //   return (
  //     edit !== undefined ||
  //     ((fromHome !== undefined ||
  //       fromMenu !== undefined ||
  //       fromDetail !== undefined) &&
  //       backToCart !== undefined)
  //   );
  // };

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
            detailPath: detailPath,
            backToCart: backToCart,
          },
        }}
        title={title}
        backIconURL={
          location?.state?.path === "/profile" && fromAllAddresses
            ? paths.profile
            : pathToCart()
            ? paths.cart
            : -1
        }
      />
    </div>
  );
};

export default MyAddresses;
