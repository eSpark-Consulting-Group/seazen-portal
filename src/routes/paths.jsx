import React from "react";
import Home from "../screens/home";
import Menu from "../screens/menu";
import CartPage from "../screens/cart";
import LocationPage from "../screens/location";
import PhoneNumberVerificationIndex from "../screens/phone-verfication/PhoneNumberVerificationIndex";
import PhoneNumberVerificationOTP from "../screens/phone-verfication/PhoneNumberVerificationOTP";
import { Profile } from "../screens/profile";

export const paths = {
  home: "/",
  error: "*",
  menu: "/menu",
  cart: "cart",
  location: "/location",
  phone_verification_index: "phone-verification",
  phone_verification_otp: "/phone-verification/otp",
  profile: "profile",
};

export const routes = {
  home: "/",
  error: "*",
  menu: "menu",
  cart: "/cart",
  location: "/location",
  phone_verification_index: "/phone-verification/",
  phone_verification_otp: "/phone-verification/otp",
  profile: "profile",
};

export const publicRoutes = {
  [paths.home]: {
    name: "Home",
    path: routes.home,
    component: <Home />,
  },
  [paths.cart]: {
    name: "Cart",
    path: routes.cart,
    component: <CartPage />,
  },
  [paths.location]: {
    name: "location",
    path: routes.location,
    component: <LocationPage />,
  },
  [paths.menu]: {
    name: "Menu",
    path: routes.menu,
    component: <Menu />,
  },
  [paths.phone_verification_index]: {
    name: "Phone Verification Index",
    path: routes.phone_verification_index,
    component: <PhoneNumberVerificationIndex />,
  },
  [paths.phone_verification_otp]: {
    name: "Phone Verification OTP",
    path: routes.phone_verification_otp,
    component: <PhoneNumberVerificationOTP />,
  },
  [paths.profile]: {
    name: "Profile",
    path: routes.profile,
    component: <Profile />,
  },
};

export const privateRoutes = {};

export const onlyPublicRoutes = {};
