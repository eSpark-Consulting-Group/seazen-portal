import React, { useEffect } from "react";
import { setKey, geocode, RequestType } from "react-geocode";
import Navbar from "../../components/header/index";
import Slider from "../../components/carousel/slider/index";
import DraggableSlider from "../../components/draggableSlider";
import { Footer } from "../../components/footer/footerContent";
import RestaurantsOrderTypeButton from "../../components/category/button";
import "../../components/carousel/slider/style.css";
import "./style.css";
import { useQuery } from "@tanstack/react-query";
import emailLogin from "../../api/home/userLogin";
import { useDispatch, useSelector } from "react-redux";
import { addCountry, addToken } from "../../store/reducers/authSlice";
import countryList from "../../api/common/getAllCountries";
import getAllAddress from "../../api/address/getAddress";
import {
  addAddressDetail,
  getAddress,
} from "../../store/reducers/addressSlice";

const Home = () => {
  const isToken = useSelector((state) => state.auth.token);
  useEffect(() => {
    // eslint-disable-next-line no-undef
    setKey(process.env.REACT_APP_GOOGLE_API_KEY);
  }, []);

  useEffect(() => {
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
            dispatch(addAddressDetail(addToRedux));
          })
          .catch((err) => {
            console.log(err);
          });
      },
      () => {}
    );
  }, []);

  const dispatch = useDispatch();
  const defaultUser = {
    email: "ikram2001@gmail.com",
    password: "12345678",
  };
  const { data, refetch } = useQuery({
    queryFn: () => emailLogin(defaultUser),
    onSuccess: (data) => {
      dispatch(addToken(data.data.token));
    },
  });

  const fetchFunction = async () => {
    getAllAddress(isToken).then((res) => {
      if (res.success === "ok") {
        dispatch(getAddress(res.data));
      }
    });
  };

  useEffect(() => {
    fetchFunction();
  }, []);

  useEffect(() => {
    if (!isToken) {
      refetch();
    }
  }, [isToken]);

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
