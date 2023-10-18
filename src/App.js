import React, { useEffect, Suspense } from "react";
import RouteProvider from "./routes/routes";
import "./App.css";
import { useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import countryList from "./api/common/getAllCountries";
import { addCountry } from "./store/reducers/authSlice";
const LazyChatScript = React.lazy(() =>
  import("./components/chat/LazyChatScript")
);

function App() {
  const currentURL = useLocation();
  const getChatURLs = (URL) => {
    return URL.includes("/delivery");
  };
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
    if (currentURL.pathname.includes("restaurant")) {
      title =
        restaurantData.find((val) => val.id == restaurantId)?.name_en +
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

  return (
    <div className="container_main">
      <div className="design-section">
        <RouteProvider />
        <Suspense fallback={<div>Loading...</div>}>
          <LazyChatScript />
        </Suspense>
      </div>
      <div className="content-section"></div>
    </div>
  );
}

export default App;
