import React from "react";
import Carousel from "better-react-carousel";
import MyDot from "../sliderDots";
import './style.css';

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
      loop
      showDots={true}
      hideArrow={true}
    >
      <Carousel.Item>
        <div className="carousel-item">
          <img width="100%" src="/assets/img/1.png" alt="Slide 1" />
          <div className="order-now">Order Now</div>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="carousel-item">
          <img width="100%" src="/assets/img/2.png" alt="Slide 2" />
          <div className="order-now2">Order Now</div>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="carousel-item">
          <img width="100%" src="/assets/img/1.png" alt="Slide 3" />
          <div className="order-now3">Order Now</div>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="carousel-item">
          <img width="100%" src="/assets/img/2.png" alt="Slide 4" />
          <div className="order-now4">Order Now</div>
        </div>
      </Carousel.Item>
    </Carousel>
    </div>
  );
};

export default Slider;
