import React from "react";
import Carousel from "better-react-carousel";
import MyDot from "../sliderDots";
import './style.css';

const slides = [
  { src: "/assets/img/slider1.png", alt: "Slide 1" },
  { src: "/assets/img/2.png", alt: "Slide 2" },
  { src: "/assets/img/slider1.png", alt: "Slide 3" },
  { src: "/assets/img/2.png", alt: "Slide 4" },
];

const Slider = () => {
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
            autoplay: 1000,
          },
        ]}
        cols={1}
        rows={1}
        gap={10}
        showDots={true}
        hideArrow={true}
        loop={true}
        autoplay={3000}
      >
        {slides.map((slide, index) => (
          <Carousel.Item key={index}>
          <div className="carouselBanner">
            <img width="100%" src={slide.src} alt={slide.alt} />
            <div className="caption"><span className="caption-style">Order Now</span></div>
          </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default Slider;
