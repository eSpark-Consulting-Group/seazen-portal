import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

import getAllPopularItems, {
  GET_ALL_POPULAR_ITEMS_QUERY_KEY,
} from "../../api/home/getAllPopularItems";
import getRestaurantBranchHours from "../../api/restaurant/getRestaurantBranchHours";

import { paths } from "../../routes/paths";

import { getBranchHours } from "../../store/reducers/resturantsSlice";

import "./style.css";

export default function App(props) {
  const {
    selectedLocation,
    setOpenAddressPopup,
    setFromPopular,
    setPopularId,
    setBranchId,
    setRestaurantId,
    setDistanceIsFar,
    setRestaurantOpen,
  } = props;

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
      caption: "Masgouf \nFish",
      additionalText: "KWD",
      inlineText: "6.450",
    },
  ];
  const country = useSelector((state) => state.auth.country);

  const {
    data: popularDishesResponse,
    isLoading,
    error,
    isError,
    refetch,
  } = useQuery({
    queryKey: [GET_ALL_POPULAR_ITEMS_QUERY_KEY],
    queryFn: () => getAllPopularItems(country?.id),
    onSuccess: (data) => {
      console.log("data", data);
    },
  });

  useEffect(() => {
    refetch();
  }, [country]);

  const { data: popularDishes } = popularDishesResponse || {};

  return (
    <div className="App">
      <div className="slider-tile">
        {popularDishes?.length > 0 && <h3>Popular Dishes</h3>}
      </div>
      <CustomCarousel imageInfo={popularDishes}>
        {popularDishes?.map((info, index) => {
          return (
            <Box
              id={info.id}
              key={index}
              index={index}
              imageUrl={info.item_image}
              caption={info.name_en}
              captionImage={info.logo}
              additionalText={info.currency_code}
              inlineText={info.price.toFixed(3)}
              isFirstCard={index === 0}
              setOpenAddressPopup={setOpenAddressPopup}
              selectedLocation={selectedLocation}
              setFromPopular={setFromPopular}
              setPopularId={setPopularId}
              setBranchId={setBranchId}
              restaurant_id={info.restaurant_id}
              setRestaurantId={setRestaurantId}
              setDistanceIsFar={setDistanceIsFar}
              setRestaurantOpen={setRestaurantOpen}
              branchId={info.branch_id}
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

function Box({
  id,
  index,
  imageUrl,
  caption,
  captionImage,
  additionalText,
  inlineText,
  isFirstCard,
  setOpenAddressPopup,
  selectedLocation,
  setFromPopular,
  setPopularId,
  setBranchId,
  restaurant_id,
  setRestaurantId,
  setDistanceIsFar,
  branchId,
  setRestaurantOpen,
}) {
  const captionLines = caption.split("\n");
  const captionImageClass = isFirstCard
    ? "first-card-caption-image"
    : index === 2
    ? "third-card-caption-image"
    : "";
  const additionalTextClass = isFirstCard ? "first-card-additional-text" : "";
  const navigate = useNavigate();
  const isToken = localStorage.getItem("token");
  const dispatch = useDispatch();

  const resturantsData = useSelector(
    (state) => state.resturants.resturantsData
  );
  const nearbyRestaurants = useSelector(
    (state) => state.resturants.nearbyRestaurants
  );

  const fetchBranchHours = (restaurantId) => {
    getRestaurantBranchHours(restaurantId).then((res) => {
      if (res.status === "ok") {
        dispatch(getBranchHours(res?.data));
      }
    });
  };

  return (
    <div
      className="box"
      onClick={() => {
        localStorage.setItem("restaurantIdForRedirect", restaurant_id);
        localStorage.setItem("restaurantID", restaurant_id);
        localStorage.setItem("menuDetailId", id);

        const restName = resturantsData?.find(
          (res) => res.id === restaurant_id
        );
        fetchBranchHours(restaurant_id);

        localStorage.setItem("restaurantName", restName.name_en);

        setPopularId(id);
        setBranchId(branchId);
        setRestaurantId(restaurant_id);
        navigate(paths.details + "/" + id, {
          state: {
            id: id,
            loc: "popular",
            restaurant_id: restaurant_id,
            branch_id: branchId,
          },
        });
      }}
    >
      <img className="box-image" src={imageUrl} alt="Image" />
      <div className="box-caption">
        <img
          src={captionImage}
          alt="Caption Image"
          className={`caption-image ${captionImageClass}`}
        />
        <div className="box-text">
          {captionLines.map((line, index) => (
            <React.Fragment key={index}>
              {line}
              {index !== captionLines.length - 1 && <br />}
            </React.Fragment>
          ))}
        </div>
        <div className="price-wrapper">
          <div className="text-style">
            <p className={additionalTextClass}>{additionalText}</p>
          </div>
          <div className="inline-text">{inlineText}</div>
        </div>
      </div>
    </div>
  );
}
