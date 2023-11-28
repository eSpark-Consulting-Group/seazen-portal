import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const LazyChatScript = () => {
  const [isChatVisible, setIsChatVisible] = useState(false);
  const currentURL = useLocation();
  useEffect(() => {
    // Set isChatVisible to true after the initial render
    setIsChatVisible(true);
  }, []);

  useEffect(() => {
    if (isChatVisible) {
      const script = document.createElement("script");
      script.src = "//fw-cdn.com/2159361/2855124.js";
      script.setAttribute("chat", "true");
      document.body.appendChild(script);
      script.onload = () => {
        setTimeout(() => {
          const element = document.getElementById("fc_frame");
          if (
            element &&
            (currentURL.pathname.includes("order/receipt/") ||
              currentURL.pathname.includes("menu/restaurant/") ||
              currentURL.pathname.includes("menu-item-details/") || currentURL.pathname.includes("/cart"))
          ) {
            element?.classList.add("remove-chat-icon");
          } else {
            element?.classList.remove("remove-chat-icon");
          }
        }, 3000);
      };
    }
  }, [isChatVisible, currentURL]);

  return null;
};

export default LazyChatScript;
