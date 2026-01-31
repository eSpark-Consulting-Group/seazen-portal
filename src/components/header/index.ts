import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Typography from "@mui/material/Typography";

import { paths } from "../../routes/paths";

import CountryPicker from "../countryPicker";

import "./style.css";

export const NavbarVariants = {
  backWithProfile: "backWithProfile",
};

const Navbar = (props) => {
  const {
    profile,
    logo,
    languageIcon,
    profileIconUrl,
    showFlagOption,
    cartIcon,
    searchIcon,
    backIcon,
    borderedIcon,
    path,
    guestUser,
    backIconURL,
    setOpenAddressPopup,
    title,
    backIconURLState,
    fromHome,
    location,
    autoRedirect,
    register,
  } = props;

  const navigate = useNavigate();

  const searchContainerRef = useRef(null);

  const token = localStorage.getItem("token");
  const currentLocation = JSON.parse(localStorage.getItem("location"));

  const cart = useSelector((state) => state.cart.cart);
  const addressData = useSelector((state) => state.address.addressData);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const closeSearch = (e) => {
    if (
      searchContainerRef.current &&
      !searchContainerRef.current.contains(e.target)
    ) {
      setIsSearchOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", closeSearch);

    return () => {
      document.removeEventListener("click", closeSearch);
    };
  }, []);

  const passState = {
    fromMenu: location?.fromMenu,
    fromBranch: location?.fromBranch,
    fromDetail: location?.fromDetail,
    fromHome: location?.fromHome,
    backCart: location?.backCart,
    path: path,
    editLocation: location?.editLocation,
  };

  const stateNoAddress = {
    noAddress: true,
    latlng: {
      lat: currentLocation?.lat,
      lng: currentLocation?.lng,
    },
    name: currentLocation?.address,
    path: "menu/restaurant",
    restaurant_id: cart[0]?.restaurant_id,
  };

  return (
    <nav className={"d-flex align-items-center justify-content-between"}>
      {/* Profile Icon */}
      {profile && (
        <div
          className="iconaccount-btn"
          style={{ border: `${borderedIcon ? "1px solid #c0cdd7" : ""}` }}
          onClick={() => navigate(profileIconUrl || paths.home)}
        >
          {borderedIcon ? (
            <img
              src="/assets/img/Group 506.png"
              alt="Account Icon"
              style={{ width: "21.47px", height: "20px" }}
            />
          ) : (
            <img src="/assets/img/account.svg" alt="Account Icon" />
          )}
        </div>
      )}

      {/* back icon */}
      {backIcon && (
        <div className="d-flex align-items-center">
          <div
            className="arrowicon-btn"
            onClick={() => {
              if (location?.fromBranch !== undefined) {
                navigate(-1);
              }
              if (token === null) {
                if (guestUser || location?.guest !== undefined) {
                  if (
                    path === "menu/restaurant" ||
                    path?.includes("menu-item-details")
                  ) {
                    navigate(-1);
                  } else {
                    navigate(paths.home);
                  }
                } else if (register !== undefined) {
                  navigate(-1);
                } else if (
                  autoRedirect !== undefined &&
                  path.includes("/menu/restaurant")
                ) {
                  navigate(-1);
                } else if (autoRedirect !== undefined) {
                  navigate(
                    `${
                      paths.menu
                    }/restaurant/${+location?.restaurant_id}/delivery`
                  );
                }
              } else {
                if (path === "/profile") {
                  navigate(paths.addresses, { state: { path: "/profile" } });
                  //
                } else if (location?.addNew !== undefined) {
                  navigate(paths?.home);
                  //
                } else if (
                  (path === "menu/restaurant" ||
                    path?.includes("menu-item-details")) &&
                  location?.backCart === undefined &&
                  location?.editLocation === undefined
                ) {
                  if (location?.noAddress !== undefined) {
                    navigate(-1);
                  } else {
                    navigate(
                      `${
                        paths.menu
                      }/restaurant/${+location?.restaurant_id}/delivery`
                    );
                  }
                } else if (
                  (location?.fromMenu !== undefined &&
                    location?.notSelected === undefined) ||
                  location?.fromDetail !== undefined ||
                  location?.fromHome !== undefined
                ) {
                  navigate(paths.addresses, {
                    state: passState,
                  });
                } else if (location?.notSelected !== undefined) {
                  navigate(-1);
                } else {
                  navigate(backIconURL || paths.profile, backIconURLState);
                }
              }
            }}
          >
            <img src="/assets/img/Icon - Arrow.svg" alt="go back" />
          </div>
        </div>
      )}

      {/* Logo  */}
      {logo && (
        <div
          className={`${
            (showFlagOption && languageIcon) || (cartIcon && searchIcon)
              ? "logo-home"
              : ""
          }`}
        >
          <img
            style={{ width: "90px" }}
            src="/assets/img/order seazen logo.svg"
            alt="Logo"
          />
        </div>
      )}
      {title && (
        <Typography
          variant="h5"
          component="h2"
          fontWeight={700}
          sx={{
            mb: 0,
            // ml: "-20px",
            ml: `${!languageIcon ? "-40px" : "0px"}`,
            color: "#1f2933",
          }}
        >
          {title}
        </Typography>
      )}

      {/* search and cart icons  */}
      <div
        className="d-flex align-items-center"
        style={{
          columnGap: "10px",
          marginRight: "-4px",
        }}
      >
        {/* half profile icon */}
        {showFlagOption && (
          <div className="icon-btn-country">
            <CountryPicker />
          </div>
        )}
        {languageIcon && (
          <div
            className="arabicicon-btn"
            style={{ border: `${borderedIcon ? "1px solid #c0cdd7" : ""}` }}
            // onClick={() => {
            //   navigate(paths.cart);
            // }}
          >
            <img src="/assets/img/Group 256.svg" alt="Option Icon" />
          </div>
        )}
        {cartIcon && (
          <div
            className="icon-btn"
            onClick={() => {
              token === null
                ? navigate(paths.cart)
                : addressData?.length === 0 && cart.length
                ? navigate(paths.location, {
                    state: stateNoAddress,
                  })
                : addressData?.length > 0 &&
                  localStorage.getItem("selected") === null
                ? setOpenAddressPopup(true)
                : navigate(paths.cart, {
                    state: { fromHome: fromHome, path: "/home" },
                  });
            }}
          >
            <img src="/assets/img/cart.svg" alt="Shopping Icon" />
            {totalQuantity > 0 && (
              <div className="items-count">{totalQuantity}</div>
            )}
          </div>
        )}

        {searchIcon && (
          <div className="icon-btn">
            <img
              src="/assets/img/Icon - Search.svg"
              alt="search icon"
              onClick={() => {
                navigate(paths.search);
              }}
            />
          </div>
        )}
      </div>
    </nav>
  );
};

Navbar.defaultProps = {
  variant: null,
};

export default Navbar;
