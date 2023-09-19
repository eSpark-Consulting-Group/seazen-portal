import React from "react";
import Navbar from "../../components/header/index";
import Slider from "../../components/carousel/slider/index";
import DraggableSlider from "../../components/draggableSlider";
import { Footer } from "../../components/footer/footerContent";
import RestaurantsOrderTypeButton from "../../components/category/button";
import "../../components/carousel/slider//style.module.css";
import "./style.css";
import AddressHeader from "../../components/address/adressHeader";
import { AppartmentAdress } from "../../components/address/forms/appartmentForm";
import { HomeAdress } from "../../components/address/forms/homeForm";
import { OfficeAdress } from "../../components/address/forms/officeForm";
import Card from "../../components/adressList";
import SideSelection from "../../components/detailSelection/sideSelection";
import CheckboxGroup from "../../components/detailSelection/sizeSelection";
import ToppingSelection from "../../components/detailSelection/toppingsSelector";

const Home = () => {
  return (
    <div className="home-styling">
      {/* <Navbar />
      <div className="card-spacing">
        <Slider />
      </div> */}
      {/* <SideSelection /> */}
      {/* <CheckboxGroup /> */}
      <ToppingSelection />
      {/* <ContactUs /> */}
      {/* <CountContainer /> */}

      {/* <BranchHeader /> */}
      {/* <RestaurantsOrderTypeButton /> */}
      {/* <BasicCard /> */}
      {/* <DraggableSlider /> */}
      {/* <Footer showFooterSection={true} /> */}
    </div>
  );
};

export default Home;
