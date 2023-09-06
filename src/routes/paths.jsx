import React from "react";
import Home from "../screens/home";
import CartPage from "../screens/cart";

export const paths = {
  home: "/",
  error: "*",
  cart: "cart"
};

export const routes = {
  home: "/",
  error: "*",
  cart: "cart"
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
};

export const privateRoutes = {};

export const onlyPublicRoutes = {};
