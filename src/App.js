import React, { useEffect } from "react";
import RouteProvider from "./routes/routes";
import "./App.css";
import { useLocation } from "react-router";


function App() {
  const currentURL = useLocation();
  const getChatURLs = (URL) => {
    const validURLs = ["/", "/profile/order", "/orderplace", "/branches"];
    return validURLs.includes(URL);
  } 

  useEffect(() => {
    const element = document.getElementById('fc_frame');
    if(!element){
      const script = document.createElement('script');
      script.src = '//fw-cdn.com/2159361/2855124.js';
      script.setAttribute('chat', 'true');
      document.body.appendChild(script);
    }

    if (getChatURLs(currentURL.pathname)) {
      element?.classList.remove("hide-chat-icon");
    } else {
      element?.classList.add("hide-chat-icon");
    }

  }, [currentURL])

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
