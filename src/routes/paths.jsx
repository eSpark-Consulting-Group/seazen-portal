import React from "react";
import Home from "../screens/home";
import CartPage from "../screens/cart";
import OrderScreen from "../screens/order";
import Receipt from "../screens/receipt";

export const paths = {
  home: "/",
  error: "*",
  cart: "cart",
  order: "order",
  receipt: "order/receipt"

};

export const routes = {
  home: "/",
  error: "*",
  cart: "cart",
  order: "order",
  receipt: "order/receipt"

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
  [paths.order]: {
    name: "Order",
    path: routes.order,
    component: <OrderScreen />,
  },
  [paths.receipt]: {
    name: "Receipt",
    path: routes.receipt,
    component: <Receipt />,
  },
};

export const privateRoutes = {};

export const onlyPublicRoutes = {};
