import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

// * UTILS
import { onlyPublicRoutes, privateRoutes, publicRoutes } from "./paths";
import PrivateRoutes from "./privateRoutes";
import PublicRoutes from "./publicRoutes";
import OnlyPublicRoutes from "./onlyPublicRoutes";

import {
  addAddressDetail,
  getAddress,
  isLoaded,
} from "../store/reducers/addressSlice";
import getAllAddress from "../api/address/getAddress";

const RouteProvider = () => {
  const dispatch = useDispatch();
  const isToken = localStorage.getItem("token");

  const _publicRoutes = Object.values(publicRoutes);
  const _onlyPublicRoutes = Object.values(onlyPublicRoutes);
  const _privateRoutes = Object.values(privateRoutes);

  const fetchFunction = async () => {
    if (isToken !== null) {
      dispatch(isLoaded());
      getAllAddress(isToken).then((res) => {
        if (res.success === "ok") {
          dispatch(getAddress(res.data));
        }
      });
    }
  };

  useEffect(() => {
    if (location.pathname !== "/my-addresses" || location.pathname === "/") {
      fetchFunction();
    }
  }, [location, isToken]);

  // useEffect(() => {
  //   navigator.permissions &&
  //     navigator.permissions
  //       .query({ name: "geolocation" })
  //       .then(function (PermissionStatus) {
  //           if (PermissionStatus.state == "prompt") {
  //           localStorage.removeItem("location");
  //         } else {
  //           localStorage.removeItem("location");
  //         }
  //       });
  // }, []);

  // useEffect(() => {
  //   if (addressData.length === 0) {
  //     localStorage.removeItem("selected");
  //   }
  // }, []);

  return (
    <Routes>
      <Route element={<OnlyPublicRoutes />}>
        {_onlyPublicRoutes.map((route) => (
          <Route path={route.path} element={route.component} key={uuidv4()} />
        ))}
      </Route>
      <Route element={<PublicRoutes />}>
        {_publicRoutes.map((route) => (
          <Route path={route.path} element={route.component} key={uuidv4()} />
        ))}
      </Route>
      <Route element={<PrivateRoutes />}>
        {_privateRoutes.map((route) => (
          <Route path={route.path} element={route.component} key={uuidv4()} />
        ))}
      </Route>
      {/* //* ADD NOT FOUND PAGE */}
      <Route path="*" element={<h1>NOT FOUND</h1>} />
    </Routes>
  );
};

export default RouteProvider;
