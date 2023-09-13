import React, { useEffect, useRef } from "react";
import "./style.css";

export default function App() {
  const imageInfo = [
    {
      imageUrl: "/assets/img/7.png",
      captionImage: "/assets/img/Group 15.svg",
      caption: "T Burger",
      additionalText: "KWD",
      inlineText: "6.450",
    },
    {
      imageUrl: "/assets/img/10.png",
      captionImage: "/assets/img/Group 13.svg",
      caption: "Penne \nFettucine",
      additionalText: "KWD",
      inlineText: "6.450",
    },
    {
      imageUrl: "/assets/img/13.png",
      captionImage: "/assets/img/Group 327.svg",
      caption: "Masgouf Fish",
      additionalText: "KWD",
      inlineText: "6.450",
    },
    
  ];
  

  return (
    <div className="App">
      <div className="slider-tile">
        <h3>Popular Dishes</h3>
      </div>
      <CustomCarousel imageInfo={imageInfo}>
  {imageInfo.map((info, index) => {
    return (
      <Box
        key={index}
        index={index} // Pass the index prop here
        imageUrl={info.imageUrl}
        caption={info.caption}
        captionImage={info.captionImage}
        additionalText={info.additionalText}
        inlineText={info.inlineText}
        isFirstCard={index === 0}
      />
    );
  })}
</CustomCarousel>
    </div>
  );
  }

function CustomCarousel(props) {
  const slider = useRef(null);
  let isDown = useRef(false);
  let startX = useRef(null);
  let scrollLeft = useRef(null);

  useEffect(() => {
    if (slider && slider.current) {
      let sliderRef = slider.current;
      sliderRef.addEventListener("mousedown", one);
      sliderRef.addEventListener("mousedown", two);
      sliderRef.addEventListener("mouseleave", three);
      sliderRef.addEventListener("mouseup", four);
      sliderRef.addEventListener("mousemove", five);

      return () => {
        sliderRef.removeEventListener("mousedown", one);
        sliderRef.removeEventListener("mousedown", two);
        sliderRef.removeEventListener("mouseleave", three);
        sliderRef.removeEventListener("mouseup", four);
        sliderRef.removeEventListener("mousemove", five);
      };
    }
  }, []);

  function one(e) {
    isDown.current = true;
    startX.current = e.pageX - slider.current.offsetLeft;
    scrollLeft.current = slider.current.scrollLeft;
  }

  function two(e) {
    isDown.current = true;
    startX.current = e.pageX - slider.current.offsetLeft;
    scrollLeft.current = slider.current.scrollLeft;
  }

  function three() {
    isDown.current = false;
  }

  function four() {
    isDown.current = false;
  }

  function five(e) {
    if (!isDown.current) return;
    e.preventDefault();
    const x = e.pageX - slider.current.offsetLeft;
    const walk = x - startX.current;
    slider.current.scrollLeft = scrollLeft.current - walk;
  }

  return (
    <div className="items" ref={slider}>
      {props.children}
    </div>
  );
}

function Box({ index, imageUrl, caption, captionImage, additionalText, inlineText, isFirstCard }) {
  const captionLines = caption.split('\n');
  const captionImageClass = isFirstCard ? 'first-card-caption-image' : (index === 2 ? 'third-card-caption-image' : '');
  const additionalTextClass = isFirstCard ? 'first-card-additional-text' : '';


  return (
    <div className="box">
      <img className="box-image" src={imageUrl} alt="Image"  />
      <div className="box-caption">
        <img src={captionImage} alt="Caption Image" className={`caption-image ${captionImageClass}`} />
        <div className="box-text">
          {captionLines.map((line, index) => (
            <React.Fragment key={index}>
              {line}
              {index !== captionLines.length - 1 && <br />}
            </React.Fragment>
          ))}
        </div>
        <div className="text-style">
          <p className={additionalTextClass}>
            {additionalText}
          </p>
        </div>
        <div className="inline-text">{inlineText}</div>
      </div>
    </div>
  );
}





