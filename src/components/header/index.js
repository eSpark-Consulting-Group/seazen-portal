import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { paths } from "../../routes/paths";

import "./style.css";

export const NavbarVariants = {
  backWithProfile: "backWithProfile",
};

const Navbar = (props) => {
  const { variant, previousRoute, guestUser, path, setOpenAddressPopup } =
    props;

  const navigate = useNavigate();
  const searchContainerRef = useRef(null);

  const token = localStorage.getItem("token");
  const currentLocation = JSON.parse(localStorage.getItem("location"));

  const cart = useSelector((state) => state.cart.cart);
  const addressData = useSelector((state) => state.address.addressData);

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

  return (
    <nav className={"d-flex align-items-center justify-content-between p-2"}>
      {variant !== NavbarVariants.backWithProfile && (
        <div
          className="iconaccount-btn"
          onClick={() => {
            token ? navigate(paths.profile) : navigate(paths.guest_profile);
          }}
        >
          <img src="/assets/img/account.svg" alt="Account Icon" />
        </div>
      )}
      <div className="d-flex align-items-center">
        {variant === NavbarVariants.backWithProfile && (
          <div
            className="arrowicon-btn"
            onClick={() => {
              if (guestUser) {
                if (path === "menu/restaurant") {
                  navigate(-1);
                } else {
                  navigate(paths.home);
                }
              } else {
                navigate(previousRoute || -1);
              }
            }}
          >
            <img src="/assets/img/Icon - Arrow.svg" alt="go back" />
          </div>
        )}
      </div>
      <div className="logo-home">
        <img
          style={{ width: "90px" }}
          src="/assets/img/order seazen logo.svg"
          alt="Logo"
        />
      </div>

      {variant === NavbarVariants.backWithProfile && (
        <div className="arabicicon-btn" onClick={() => navigate(paths.cart)}>
          <img src="/assets/img/Group 256.svg" alt="Option Icon" />
        </div>
      )}
      {variant !== NavbarVariants.backWithProfile && (
        <div
          className="d-flex align-items-center"
          style={{
            columnGap: "10px",
            marginRight: "-4px",
          }}
        >
          <div
            className="icon-btn"
            onClick={() => {
              token === null
                ? navigate(paths.cart)
                : addressData?.length === 0
                ? navigate(paths.address, {
                    state: {
                      noAddress: true,
                      latlng: {
                        lat: currentLocation?.lat,
                        lng: currentLocation?.lng,
                      },
                      name: currentLocation?.address,
                      path: "menu/restaurant",
                      restaurant_id: cart[0]?.restaurant_id,
                    },
                  })
                : addressData?.length > 0 &&
                  localStorage.getItem("selected") === null
                ? setOpenAddressPopup(true)
                : navigate(paths.cart, {
                    state: { fromHome: true, path: "/home" },
                  });
            }}
          >
            <img src="/assets/img/cart.svg" alt="Shopping Icon" />
          </div>

          <div className="icon-btn">
            <img
              src="/assets/img/Icon - Search.svg"
              alt="search icon"
              onClick={() => {
                navigate(paths.search);
              }}
            />
          </div>
        </div>
      )}
    </nav>
  );
};

Navbar.defaultProps = {
  variant: null,
};

export default Navbar;
