import React from "react";
import Navbar from "../../components/header/index";
import Slider from "../../components/carousel/slider/index";
import "../../components/carousel/slider/style.css";
import Button from "../../components/category/button";
import DraggableSlider from "../../components/draggableSlider";
import { Footer } from "../../components/footer";
import "./style.css";

const Home = () => {
  return (
    <div className="home-styling">
      <Navbar />
      <div className="card-spacing">
        <Slider />
      </div>
      <Button />
      {/* <BasicCard /> */}
      <DraggableSlider />
      <Footer />
    </div>
  );
};

export default Home;
