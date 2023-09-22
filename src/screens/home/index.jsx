import React from "react";
import Navbar from "../../components/header/index";
import Slider from "../../components/carousel/slider/index";
import DraggableSlider from "../../components/draggableSlider";
import { Footer } from "../../components/footer/footerContent";
import RestaurantsOrderTypeButton from "../../components/category/button";
import "../../components/carousel/slider//style.module.css";
import "./style.css";
// import OrderCard from "../../components/order-cards";
import MyOrderScreen from "../myorder";
import OrderNavbar from "../../components/order-navbar";
import RestaurantOptionsServicesContainer from "../../components/restaurant/restaurant_options_services";
import PickupDetails from "../../components/restaurant/pickup";
import BasicCard from "../../components/cards";
import RestaurantDetails from "../../components/restaurant/details";
import App from "../../components/draggableSlider";
import { AddressesButton } from "../../components/adressList/addressesButton";

const Home = () => {
  return (
    <div className="home-styling container-fluid">
      <Navbar />
      <div className="card-spacing">
        <Slider />
      </div>
      {/* <OrderCard   /> */}
      {/* <MyOrderScreen /> */}
      {/* <RestaurantOptionsServicesContainer /> */}
      {/* <PickupDetails /> */}
      {/* <RestaurantsOrderTypeButton /> */}
      {/* <BasicCard /> */}
      {/* <PickupDetails /> */}
      {/* <RestaurantDetails /> */}
      {/* <App /> */}
      <AddressesButton />
      {/* <DraggableSlider /> */}
      {/* <Footer showFooterSection={true} /> */}
    </div>
  );
};

export default Home;
