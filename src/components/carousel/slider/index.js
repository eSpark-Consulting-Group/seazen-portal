import React from "react";
import Carousel from "better-react-carousel";
import MyDot from "../sliderDots";
import { useEffect } from "react";
import getAllRestaurantsBanner from "../../../api/home/getAllRestaurantsBanner";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import { getRestaurantsBanner } from "../../../store/reducers/resturantsSlice";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Skeleton } from "@mui/material";

const slides = [
  { src: "/assets/img/slider1.png", alt: "Slide 1" },
  { src: "/assets/img/2.png", alt: "Slide 2" },
  { src: "/assets/img/slider1.png", alt: "Slide 3" },
  { src: "/assets/img/2.png", alt: "Slide 4" },
];

const Slider = () => {
  const country = useSelector((state) => state.auth.country);
  const restaurantBanner = useSelector(
    (state) => state.resturants.resturantsBanner
  );
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      if (country && restaurantBanner.length == 0) {
        getAllRestaurantsBanner(country?.id)
          .then((res) => {
            dispatch(getRestaurantsBanner(res.data));
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }, 1000);
  }, [country]);
  return (
    <div className="hover-slider">
      <Carousel
        dot={MyDot}
        cols={1}
        rows={1}
        gap={10}
        showDots={true}
        hideArrow={true}
        loop={true}
        autoplay={2000}
      >
        {restaurantBanner.map((slide, index) => (
          <Carousel.Item key={index}>
            <div className="carouselBanner">
              <LazyLoadImage
                src={slide.banner}
                alt="restaurant banner"
                placeholder={
                  <Skeleton
                    variant="rectangular"
                    width={"100%"}
                    height={"100%"}
                  />
                }
              />
              <div className={index === 0 ? "reserve-style" : "caption"}>
                <span className="caption-style">
                  {index == 0 ? "Reserve" : "Order Now"}
                </span>
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default Slider;
