import React from "react";
import Home from "../screens/home";
import Menu from "../screens/menu";
import CartPage from "../screens/cart";

export const paths = {
  home: "/",
  error: "*",
  menu: "/menu",
  cart: "cart",
};

export const routes = {
  home: "/",
  error: "*",
  menu: "menu",
  cart: "cart",
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
  [paths.menu]: {
    name: "Menu",
    path: routes.menu,
    component: <Menu />,
  },
};

export const privateRoutes = {};

export const onlyPublicRoutes = {};
