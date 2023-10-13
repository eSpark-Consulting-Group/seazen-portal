import React, { useEffect } from "react";
import RouteProvider from "./routes/routes";
import "./App.css";
import { useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import countryList from "./api/common/getAllCountries";
import { addCountry } from "./store/reducers/authSlice";

function App() {
  const currentURL = useLocation();
  const getChatURLs = (URL) => {
    return URL.includes("/delivery");
  };
  const element = document.getElementById("fc_frame");
  const countryCode = useSelector(
    (state) => state.auth.user.mobile_country_code
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

  useEffect(() => {
    fetchAllCountries();
  }, []);

  useEffect(() => {
    if (!element) {
      const script = document.createElement("script");
      script.src = "//fw-cdn.com/2159361/2855124.js";
      script.setAttribute("chat", "true");
      document.body.appendChild(script);
    }

    //   if (getChatURLs(currentURL.pathname)) {
    //     element?.classList.remove("hide-chat-icon");
    //   } else {
    //     element?.classList.add("hide-chat-icon");
    //   }

    // }, [currentURL])

    // Check if the chat should be visible on the current page
    const isChatVisible = getChatURLs(currentURL.pathname);

    if (element) {
      if (isChatVisible) {
        element.classList.remove("hide-chat-icon");
      } else {
        element.classList.add("hide-chat-icon");
      }
    }

    // Additional logic for page-specific CSS
    if (currentURL.pathname === "/menu/restaurant/1/delivery","/menu-item-details") {
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
      </div>
      <div className="content-section"></div>
    </div>
  );
}

export default App;
