import React from "react";
import { useEffect } from "react";
import getAllRestaurantsBanner from "../../../api/home/getAllRestaurantsBanner";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import { getRestaurantsBanner } from "../../../store/reducers/resturantsSlice";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Skeleton } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const slides = [
  { src: "/assets/img/slider1.png", alt: "Slide 1" },
  { src: "/assets/img/2.png", alt: "Slide 2" },
  { src: "/assets/img/slider1.png", alt: "Slide 3" },
  { src: "/assets/img/2.png", alt: "Slide 4" },
];

const settings = {
  dots: true,
  infinite: true,
  speed: 200,
  slidesToShow: 1,
  autoplay: true,
  fade: true,
};

const HomeBannerSlider = () => {
  const country = useSelector((state) => state.auth.country);
  const restaurantBanner = useSelector(
    (state) => state.resturants.resturantsBanner
  );
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      if (country) {
        getAllRestaurantsBanner(country?.id)
          .then((res) => {
            dispatch(getRestaurantsBanner(res.data));
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }, 1000);
  }, [country]);

  return (
    <div className="slick-slider-wrapper">
      <Slider {...settings}>
        {restaurantBanner.map((slide, index) => (
          <a
            key={index}
            rel="noreferrer"
            href={slide.redirect_url}
            target="_blank"
          >
            <div className="home-banner-images" tabIndex={"0"}>
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
              {/* <div className={index === 0 ? "reserve" : "caption"}>
                <span
                  className={index === 0 ? "reserve-style" : "caption-style"}
                >
                  {index == 0 ? "Reserve" : "Order Now"}
                </span>
              </div> */}
            </div>
          </a>
        ))}
      </Slider>
    </div>
  );
};

export default HomeBannerSlider;
