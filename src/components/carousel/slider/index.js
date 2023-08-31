import React from "react";
import Carousel from "better-react-carousel";
import MyDot from "../sliderDots";

const Slider = () => {
    return (
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
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="carousel-item">
            <img width="100%" src="/assets/img/1.png" alt="Slide 2" />
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="carousel-item">
            <img width="100%" src="/assets/img/1.png" alt="Slide 3" />
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="carousel-item">
            <img width="100%" src="/assets/img/1.png" alt="Slide 4" />
          </div>
        </Carousel.Item>
      </Carousel>
    );
  };


export default Slider;
