import React from "react";
import Carousel from "better-react-carousel";
import MyDot from "../sliderDots";
import './style.css';
import { useEffect } from "react";
import getAllRestaurantsBanner from "../../../api/home/getAllRestaurantsBanner";
import { useState } from "react";
import { useSelector } from "react-redux";

const slides = [
  { src: "/assets/img/slider1.png", alt: "Slide 1" },
  { src: "/assets/img/2.png", alt: "Slide 2" },
  { src: "/assets/img/slider1.png", alt: "Slide 3" },
  { src: "/assets/img/2.png", alt: "Slide 4" },
];


const Slider = () => {

  const [restaurantBanner, setRestaurantBanner] = useState([]);
  const country = useSelector((state) => state.auth.country);
  useEffect(() => {
    if(country){
      getAllRestaurantsBanner(country?.id)
      .then((res) => {
        setRestaurantBanner(res.data);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, [country]);
  return (
    <div className="hover-slider">
      <Carousel
        dot={MyDot}
        responsiveLayout={[
          {
            breakpoint: 800,
            cols: 1,
            rows: 1,
            gap: 10,
            loop: true,
            
          },
        ]}
        cols={1}
        rows={1}
        gap={10}
        showDots={true}
        hideArrow={true}
        loop={true}
        autoplay={false}
        
      >
        {restaurantBanner.map((slide, index) => (
          <Carousel.Item key={index}>
          <div className="carouselBanner">
            <img width="100%" src={slide.banner} alt="restaurant banner" />
            <div className="caption"><span className="caption-style">Order Now</span></div>
          </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default Slider;
