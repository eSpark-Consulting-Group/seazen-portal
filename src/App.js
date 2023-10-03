import React, { useEffect } from "react";
import RouteProvider from "./routes/routes";
import "./App.css";

function App() {

  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//fw-cdn.com/2159361/2855124.js';
    script.setAttribute('chat', 'true');
    document.body.appendChild(script);
  }, [])

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
