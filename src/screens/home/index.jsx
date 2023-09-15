import React from "react";
import Navbar from "../../components/header/index";
import Slider from "../../components/carousel/slider/index";
import DraggableSlider from "../../components/draggableSlider";
import { Footer } from "../../components/footer/footerContent";
import RestaurantsOrderTypeButton from "../../components/category/button";
import "../../components/carousel/slider/style.css";
import "./style.css";

const Home = () => {
  return (
    <div className="home-styling">
      <Navbar />
      <div className="card-spacing">
        <Slider />
      </div>
      <RestaurantsOrderTypeButton />
      {/* <BasicCard /> */}
      <DraggableSlider />
      <Footer showFooterSection={true}/>
    </div>
  );
};

export default Home;
