import React, { useEffect, useState } from "react";

const LazyChatScript = () => {
  const [isChatVisible, setIsChatVisible] = useState(false);

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
    }
  }, [isChatVisible]);

  return null;
};

export default LazyChatScript;