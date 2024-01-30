import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { paths } from "../../../routes/paths";

import "./style.css";

const Navbar = (props) => {
  const { restaurantDetail, setOpenAddressPopup, fromMenu } = props;

  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart.cart);
  const addressData = useSelector((state) => state.address.addressData);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  const token = localStorage.getItem("token");
  const currentLocation = JSON.parse(localStorage.getItem("location"));
  const isAfterNewLocation = JSON.parse(
    sessionStorage?.getItem("storeAddress")
  );

  const defaultImagePath = "/assets/img/menu_background_image.png";

  useEffect(() => {
    const contentDiv = document.querySelector(".content-section");

    if (contentDiv && restaurantDetail?.main_big_image) {
      const oldBackground = window.getComputedStyle(contentDiv).backgroundImage;
      contentDiv.style.backgroundImage = `url('${restaurantDetail?.main_big_image}'), ${oldBackground}`;
    } else {
      contentDiv.style.backgroundImage = "";
    }

    return () => {
      contentDiv.style.backgroundImage = "";
    };
  }, [restaurantDetail]);

  return (
    <div
      className="Nav_Image_Container"
      style={{
        backgroundImage: `url(${
          restaurantDetail?.cover_page_image || defaultImagePath
        })`,
      }}
    >
      {/* {restaurantDetail?.cover_page_image ? (
        <img alt="background_image" src={restaurantDetail?.cover_page_image} />
      ) : (
        <img
          alt="background_image"
          src="\assets\img\menu_background_image.png"
        />
      )} */}
      <nav className="upper_navigation">
        <div className="back_button" onClick={() => navigate(paths.home)}>
          <div className="back_button-icon">
            <img alt="Arrow_Icon" src="/assets/img/Icon - Arrow.svg" />
          </div>
        </div>
        <div
          className="shopping_container pointer"
          onClick={() => {
            token === null
              ? navigate(paths.cart)
              : isAfterNewLocation !== null &&
                isAfterNewLocation?.addNewAddress === true
              ? navigate(paths.address, {
                  state: {
                    latlng: {
                      lat: currentLocation?.lat,
                      lng: currentLocation?.lng,
                    },
                    name: currentLocation?.address,
                    path: "menu/restaurant",
                    restaurant_id: cart[0]?.restaurant_id,
                  },
                })
              : addressData?.length === 0 && cart.length
              ? navigate(paths.location, {
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
                  state: {
                    fromMenu,
                    path: "menu/restaurant",
                    restaurant_id: cart[0]?.restaurant_id,
                  },
                });
          }}
        >
          <div className="shopping_icon">
            <img alt="Bag_Icon" src="/assets/img/Icon - Bag.svg" />
            {totalQuantity > 0 && (
              <div className="items-count">{totalQuantity}</div>
            )}
          </div>
        </div>
      </nav>
      {/* <MenuNavbar backIcon cartIcon /> */}
    </div>
  );
};

export default Navbar;
