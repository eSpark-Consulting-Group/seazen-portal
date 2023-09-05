import React from "react";
import Home from "../screens/home";

export const paths = {
  home: "/",
  error: "*",
};

export const routes = {
  home: "/",
  error: "*",
};

export const publicRoutes = {};

export const privateRoutes = {
  [paths.home]: {
    name: "Home",
    path: routes.home,
    component: <Home />,
  },
};

export const onlyPublicRoutes = {
};
