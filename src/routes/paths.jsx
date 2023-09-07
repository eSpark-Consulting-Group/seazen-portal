import React from "react";
import Home from "../screens/home";
import { Details } from "../screens/details";

export const paths = {
  home: "/",
  error: "*",
  details: "/details",
};

export const routes = {
  home: "/",
  error: "*",
  details: "/details",
};

export const publicRoutes = {};

export const privateRoutes = {
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
};

export const onlyPublicRoutes = {
};
