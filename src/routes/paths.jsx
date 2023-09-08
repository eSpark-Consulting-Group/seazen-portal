import React from "react";
import Home from "../screens/home";
import CartPage from "../screens/cart";
import OrderScreen from "../screens/order";

export const paths = {
  home: "/",
  error: "*",
  cart: "cart",
  orderplace: "orderplace"
};

export const routes = {
  home: "/",
  error: "*",
  cart: "cart",
  orderplace: "orderplace"
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
};

export const privateRoutes = {};

export const onlyPublicRoutes = {};
