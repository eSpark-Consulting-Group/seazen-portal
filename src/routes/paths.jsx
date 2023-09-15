import React from "react";
import Home from "../screens/home";
import Menu from "../screens/menu";
import CartPage from "../screens/cart";
import LocationPage from "../screens/location";
import OrderScreen from "../screens/order";
import PhoneNumberVerificationIndex from "../screens/phone-verfication/PhoneNumberVerificationIndex";
import PhoneNumberVerificationOTP from "../screens/phone-verfication/PhoneNumberVerificationOTP";
import { Profile } from "../screens/profile";
import { GuestProfile } from "../screens/guestProfile";
import { PrivacyPolicy } from "../screens/privacyPolicy";
import { Terms } from "../screens/terms";
import CustomerRegistration from "../screens/customer/registration";
import { EditForm } from "../screens/editForm";
import AddressForm from "../screens/adress";
import { Details } from "../screens/details";

export const paths = {
  home: "/",
  error: "*",
  menu: "/menu",
  cart: "/cart",
  location: "/location",
  orderplace: "orderplace",
  customer_registration: "/customer_registration",
  phone_verification_index: "phone-verification",
  phone_verification_otp: "/phone-verification/otp",
  profile: "/profile",
  update_profile: "/update_profile",
  guest_profile: "guest-profile",
  privacy_policy: "privacy-policy",
  terms: "terms",
  address: '/address',
  details: "/details",
};

export const routes = {
  home: "/",
  error: "*",
  menu: "/menu",
  details: "/details",
  address: '/address',
  cart: "/cart",
  location: "/location",
  orderplace: "orderplace",
  customer_registration: "/customer_registration",
  phone_verification_index: "/phone-verification/",
  phone_verification_otp: "/phone-verification/otp",
  profile: "/profile",
  update_profile: "/update_profile",
  guest_profile: "/guest-profile",
  privacy_policy: "/privacy-policy",
  terms: "/terms",
};

export const publicRoutes = {
  [paths.home]: {
    name: "Home",
    path: routes.home,
    component: <Home />,
  },
  [paths.details]: {
    name: "Details",
    path: routes.details,
    component: <Details />,
  },
  [paths.address]: {
    name: "Address",
    path: routes.address,
    component: <AddressForm />,
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
  [paths.orderplace]: {
    name: "Orderplace",
    path: routes.orderplace,
    component: <OrderScreen />,
  },
  [paths.update_profile]: {
    name: "Update Profile",
    path: routes.update_profile,
    component: <EditForm />,
  },
  [paths.customer_registration]: {
    name: "Customer Registration",
    path: routes.customer_registration,
    component: <CustomerRegistration />,
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
  [paths.guest_profile]: {
    name: "Guest Profile",
    path: routes.guest_profile,
    component: <GuestProfile />,
  },
  [paths.privacy_policy]: {
    name: "Privacy Policy",
    path: routes.privacy_policy,
    component: <PrivacyPolicy />,
  },
  [paths.terms]: {
    name: "Terms",
    path: routes.terms,
    component: <Terms />,
  },
};

export const privateRoutes = {};

export const onlyPublicRoutes = {};
