import React from "react";
import Home from "../screens/home";
import CartPage from "../screens/cart";
import PhoneNumberVerificationIndex from "../screens/phone-verfication/PhoneNumberVerificationIndex";
import PhoneNumberVerificationOTP from "../screens/phone-verfication/PhoneNumberVerificationOTP";
import Addresses from "../screens/adresses";

export const paths = {
  home: "/",
  error: "*",
  cart: "cart",
  phone_verification_index: "phone-verification",
  phone_verification_otp: "/phone-verification/otp",
  addresses: "/addresses",

};

export const routes = {
  home: "/",
  error: "*",
  cart: "/cart",
  phone_verification_index: "/phone-verification/",
  phone_verification_otp: "/phone-verification/otp",
  addresses: "/addresses",
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
  [paths.addresses]: {
    name: "addresses",
    path: routes.addresses,
    component: <Addresses />,
  },
};

export const privateRoutes = {};

export const onlyPublicRoutes = {};
