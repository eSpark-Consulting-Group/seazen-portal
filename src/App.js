import "./App.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Home from "./screens/home/index";
import AddressForm from "./screens/adress";

function App() {
  return (
    <div className="container_main">
      <div className="design-section">
        <Home />
        {/* <AddressForm/> */}
      </div>
      <div className="content-section"></div>
      
    </div>
  );
}

export default App;
