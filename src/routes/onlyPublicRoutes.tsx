import React from 'react';
import { Outlet } from "react-router-dom";

const OnlyPublicRoutes = () => {
  return <Outlet />;
};

export default OnlyPublicRoutes;
