import React from "react";
import Home from "../screens/home";
import CartPage from "../screens/cart";
import OrderScreen from "../screens/order";
import PhoneNumberVerificationIndex from "../screens/phone-verfication/PhoneNumberVerificationIndex";
import PhoneNumberVerificationOTP from "../screens/phone-verfication/PhoneNumberVerificationOTP";

export const paths = {
  home: "/",
  error: "*",
  cart: "cart",
  orderplace: "orderplace",
  phone_verification_index: "phone-verification",
  phone_verification_otp: "/phone-verification/otp",
};

export const routes = {
  home: "/",
  error: "*",
  cart: "/cart",
  orderplace: "orderplace",
  phone_verification_index: "/phone-verification/",
  phone_verification_otp: "/phone-verification/otp",
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
  [paths.orderplace]: {
    name: "Orderplace",
    path: routes.orderplace,
    component: <OrderScreen />,
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
};

export const privateRoutes = {};

export const onlyPublicRoutes = {};
