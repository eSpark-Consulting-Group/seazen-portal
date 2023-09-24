import React from "react";
import Navbar from "../../components/header/index";
import Slider from "../../components/carousel/slider/index";
import DraggableSlider from "../../components/draggableSlider";
import { Footer } from "../../components/footer/footerContent";
import RestaurantsOrderTypeButton from "../../components/category/button";
import "../../components/carousel/slider/style.module.css";
import styles from "./style.module.css";

const Home = () => {
  return (
    <div className={`${styles.homeStyling} container-fluid`}>
      <Navbar />
      <div className={styles.cardSpacing}>
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
