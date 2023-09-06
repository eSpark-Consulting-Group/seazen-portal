import React from "react";
import Home from "../screens/home";
import Menu from "../screens/menu"

export const paths = {
  home: "/",
  error: "*",
  menu: "/menu"
};

export const routes = {
  home: "/",
  error: "*",
  menu: "/menu"
};


export const publicRoutes = {};

export const privateRoutes = {
  [paths.home]: {
    name: "Home",
    path: routes.home,
    component: <Home />,
  },
  [paths.menu]: {
    name: "Menu",
    path: routes.menu,
    component: <Menu />,
  }
};

export const onlyPublicRoutes = {
};
