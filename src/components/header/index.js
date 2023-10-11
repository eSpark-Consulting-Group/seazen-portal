import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { paths } from "../../routes/paths";
import "./style.css";

export const NavbarVariants = {
  backWithProfile: "backWithProfile",
};

const Navbar = (props) => {
  const { variant, previousRoute } = props;
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchContainerRef = useRef(null);
  const token = localStorage.getItem("token");

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
            className="icon-btn"
            onClick={() => {
              navigate(previousRoute || -1);
            }}
          >
            <img src="/assets/img/Icon - Arrow.svg" alt="go back" />
          </div>
        )}
      </div>
      <div className="d-flex align-items-center logo">
        <img src="/assets/img/Logo.png" alt="Logo" />
      </div>

      {variant === NavbarVariants.backWithProfile && (
        <div
          className="icon-btn"
          onClick={() => {
            navigate(paths.cart);
          }}
        >
          <img src="/assets/img/Group 256.svg" alt="Option Icon" />
        </div>
      )}
      {variant !== NavbarVariants.backWithProfile && (
        <div
          className="d-flex align-items-center"
          style={{
            columnGap: "10px",
          }}
        >
          <div
            className="icon-btn"
            onClick={() => {
              navigate(paths.cart);
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
