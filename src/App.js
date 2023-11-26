import React, { useEffect, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";

import { setKey, geocode, RequestType } from "react-geocode";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import RouteProvider from "./routes/routes";

import { addCountry, allCountries } from "./store/reducers/authSlice";

import countryList from "./api/common/getAllCountries";

import "./App.css";

const LazyChatScript = React.lazy(() =>
  import("./components/chat/LazyChatScript")
);

function App() {
  const currentURL = useLocation();
  const userLocation = localStorage.getItem("location");

  // const getChatURLs = (URL) => {
  //   return URL.includes("/delivery");
  // };

  const countryCode = useSelector(
    (state) => state.auth.user.mobile_country_code
  );
  const restaurantData = useSelector(
    (state) => state.resturants.resturantsData
  );

  const dispatch = useDispatch();

  const fetchAllCountries = () => {
    countryList()
      .then((res) => {
        const countryByCode = res.data.find((val) => {
          if (countryCode) {
            return val.country_code == countryCode;
          }
          return val.is_default == "Yes";
        });
        localStorage.setItem("country", JSON.stringify(countryByCode));
        dispatch(addCountry(countryByCode));
        dispatch(allCountries(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const restaurantId = localStorage.getItem("restaurantID");
  useEffect(() => {
    fetchAllCountries();
  }, []);

  const setPageTitle = () => {
    let title = "The Delivery Service for your favorite Restaurant";
    if (currentURL.pathname.includes("restaurant") && restaurantData?.length) {
      title =
        restaurantData?.find((val) => val.id == restaurantId)?.name_en +
        " " +
        "Menu";
    }
    document.title = title;
  };

  useEffect(() => {
    setPageTitle();
    // Additional logic for page-specific CSS
    if (
      currentURL.pathname === "/menu/restaurant/1/delivery" ||
      currentURL.pathname === "/menu-item-details"
    ) {
      // Apply additional styles for the specific page
      // For example, you can add a class to the body or any specific element
      document.body.classList.add("specific-page-body-style");
    } else {
      // Remove the class for other pages
      document.body.classList.remove("chat-icon");
    }
  }, [currentURL]);

  useEffect(() => {
    navigator.permissions &&
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (PermissionStatus) {
          localStorage.setItem("locatPermission", PermissionStatus.state);
        });
  }, []);

  useEffect(() => {
    if (JSON.parse(userLocation) === null) {
      // eslint-disable-next-line no-undef
      setKey(process.env.REACT_APP_GOOGLE_API_KEY);
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            let addToStorage = {
              lat: "",
              lng: "",
              address: "",
            };
            geocode(
              RequestType.LATLNG,
              `${position.coords.latitude},${position.coords.longitude}`,
              {
                enable_address_descriptor: true,
              }
            )
              .then(({ results }) => {
                const address = results[0].formatted_address;
                const lat = results[0].geometry.location.lat;
                const lng = results[0].geometry.location.lng;

                addToStorage = {
                  lat: lat,
                  lng: lng,
                  address: address,
                };

                localStorage.setItem("location", JSON.stringify(addToStorage));
              })
              .catch((err) => {
                console.log(err);
              });
          },
          () => {}
        );
      }
    }
  }, []);

  return (
    <div className="container_main">
      <div className="design-section">
        <RouteProvider />
        <Suspense fallback={<div>Loading...</div>}>
          <LazyChatScript />
        </Suspense>
      </div>
      <div className="content-section"></div>

      <ToastContainer
        position="top-left"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
