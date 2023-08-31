import "./App.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Home from "./screens/home/index";

function App() {
  return (
    <div className="container">
      <div className="design-section">
        <Home />
      </div>
      <div className="content-section"></div>
    </div>
  );
}

export default App;
