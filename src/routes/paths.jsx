import React from "react";
import Home from "../screens/home";
import AddressForm from "../screens/adress";

export const paths = {
  home: "/",
  error: "*",
  address: '/address'
};

export const routes = {
  home: "/",
  error: "*",
  address: '/address'
};

export const publicRoutes = {};

export const privateRoutes = {
  [paths.home]: {
    name: "Home",
    path: routes.home,
    component: <Home />,
  },
  [paths.address]: {
    name: "Address",
    path: routes.address,
    component: <AddressForm />,
  },
};

export const onlyPublicRoutes = {
};
