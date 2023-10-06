import React, { useEffect } from "react";
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
import { addToken } from "../../store/reducers/authSlice";
import countryList from "../../api/common/getAllCountries";

const Home = () => {
  const isToken = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const defaultUser = { 
    email : "ikram2001@gmail.com",
    password : "12345678"
  } 
    const { data, refetch } = useQuery({
      queryFn: () => emailLogin(defaultUser),
      onSuccess: (data) => {
        dispatch(addToken(data.data.token));
      }
    });

    useEffect(() => {
      if (!isToken) {
        refetch()
      }
    }, [isToken])
    
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
      <Footer showFooterSection={true}/>
    </div>
  );
};

export default Home;
