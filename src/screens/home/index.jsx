import React, { useEffect, useState } from "react";

import { setKey, geocode, RequestType } from "react-geocode";

import Navbar from "../../components/header/index";
import Slider from "../../components/carousel/slider/index";
import DraggableSlider from "../../components/draggableSlider";
import { Footer } from "../../components/footer/footerContent";
import RestaurantsOrderTypeButton from "../../components/category/button";
import "../../components/carousel/slider/style.css";

import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { addCountry, addToken } from "../../store/reducers/authSlice";
import countryList from "../../api/common/getAllCountries";
import getAllAddress from "../../api/address/getAddress";
import {
  addAddressDetail,
  getAddress,
} from "../../store/reducers/addressSlice";
import getNearByRestaurants from "../../api/restaurant/getNearByRestaurant";

import "./style.css";

const Home = () => {
  // const isToken = localStorage.getItem("token");
  const addressDetail = useSelector((state) => state.address.addressDetail);
  const dispatch = useDispatch();

  // const defaultUser = {
  //   email: "ikram2001@gmail.com",
  //   password: "12345678",
  // };
  const [userCurrentAddress, setUserCurrentAddress] = useState({
    latitude: 0,
    longitude: 0,
    service_type: "dinein",
  });

  // const { data, refetch } = useQuery({
  //   queryFn: () => emailLogin(defaultUser),
  //   onSuccess: (data) => {
  //     dispatch(addToken(data.data.token));
  //   },
  // });

  useEffect(() => {
    if (addressDetail) {
      setUserCurrentAddress({
        latitude: addressDetail.lat,
        longitude: addressDetail.lng,
        service_type: "dinein",
      });
    }
  }, []);

  const { data: restaurants, refetch: recall } = useQuery({
    queryFn: () => getNearByRestaurants(userCurrentAddress),
    onSuccess: (data) => {},
  });

  useEffect(() => {
    recall();
  }, []);

  // console.log(restaurants);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("location")) === null) {
      // eslint-disable-next-line no-undef
      setKey(process.env.REACT_APP_GOOGLE_API_KEY);

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          let addToRedux = {
            lat: "",
            lng: "",
            address: "",
          };
          geocode(
            RequestType.LATLNG,
            `${position.coords.latitude},${position.coords.longitude}`,
            {
              enable_address_descriptor: true,
            }
          )
            .then(({ results }) => {
              const address = results[0].formatted_address;
              const lat = results[0].geometry.location.lat;
              const lng = results[0].geometry.location.lng;

              addToRedux = {
                lat: lat,
                lng: lng,
                address: address,
              };
              localStorage.setItem("location", JSON.stringify(addToRedux));
              // dispatch(addAddressDetail({ currentAdd: addToRedux }));
            })
            .catch((err) => {
              console.log(err);
            });
        },
        () => {}
      );
    }
  }, []);

  // const fetchFunction = async () => {
  //   getAllAddress(isToken).then((res) => {
  //     if (res.success === "ok") {
  //       dispatch(getAddress(res.data));
  //     }
  //   });
  // };

  // useEffect(() => {
  //   if(addressData.length === 0){
  //     fetchFunction()
  //   }
  // }, [addressData]);

    // useEffect(() => {
    //   if (!isToken) {
    //     refetch()
    //   }
    // }, [isToken])
    
    const isCountry = localStorage.getItem("country");
    useEffect(() => {
      if (!isCountry) {
        fetchAllCountries();
      }
    }, []);
  
    const fetchAllCountries = () => {
      countryList()
        .then((res) => {
          const defaultCountry = res.data.find((val) => val.is_default == "Yes");
          localStorage.setItem("country", JSON.stringify(defaultCountry));
          dispatch(addCountry(defaultCountry));
        })
        .catch((err) => {
          console.log(err);
        });
    };
  
  return (
    <div className="home-styling container-fluid">
      <Navbar />
      <div className="card-spacing">
        <Slider />
      </div>
      <RestaurantsOrderTypeButton />
      {/* <BasicCard /> */}
      <DraggableSlider />
      <Footer showFooterSection={true} />
    </div>
  );
};

export default Home;
