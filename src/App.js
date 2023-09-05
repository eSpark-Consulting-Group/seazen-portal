import "./App.css";
// import { Carousel } from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import Home from "./screens/home/index";
import Menu from "./screens/menu"

function App() {
  return (
    <div className="container_main">
      <div className="design-section">
        {/* <Home /> */}
        <Menu />
      </div>
      <div className="content-section"></div>
    </div>
  );
}

export default App;
