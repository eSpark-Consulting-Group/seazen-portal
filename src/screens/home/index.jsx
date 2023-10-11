import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { setKey, geocode, RequestType } from "react-geocode";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

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
// import getAllAddress from "../../api/address/getAddress";
// import {
//   addAddressDetail,
//   getAddress,
// } from "../../store/reducers/addressSlice";
import getNearByRestaurants from "../../api/restaurant/getNearByRestaurant";

import "./style.css";
import Card from "../../components/adressList";
import {
  getDistanceFromLatLonInKm,
  getFullAddress,
} from "../../utils/getAddress";
import { paths } from "../../routes/paths";
import getRestaurantBranchHours from "../../api/restaurant/getRestaurantBranchHours";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // const isToken = localStorage.getItem("token");
  const addressData = useSelector((state) => state.address.addressData);
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
    if (JSON.parse(localStorage.getItem("location") !== null)) {
      const addressDetail = JSON.parse(localStorage.getItem("location"));

      setUserCurrentAddress({
        latitude: addressDetail.lat,
        longitude: addressDetail.lng,
        service_type: "dinein",
      });
    }
  }, [localStorage]);

  const { data: restaurants, refetch: recall } = useQuery({
    queryFn: () => getNearByRestaurants(userCurrentAddress),
    onSuccess: (data) => {},
    enabled: false,
  });

  useEffect(() => {
    if (
      userCurrentAddress.latitude !== 0 &&
      userCurrentAddress.longitude !== 0
    ) {
      recall();
    }
  }, [userCurrentAddress]);

  useEffect(() => {
    navigator.permissions &&
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (PermissionStatus) {
          if (PermissionStatus.state == "granted") {
            //allowed
            console.log(PermissionStatus);
          } else if (PermissionStatus.state == "prompt") {
            // prompt - not yet grated or denied
            console.log(PermissionStatus);
          } else {
            //denied
            console.log(PermissionStatus);
          }
        });
  }, []);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("location")) === null) {
      // eslint-disable-next-line no-undef
      setKey(process.env.REACT_APP_GOOGLE_API_KEY);
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
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
        }, showError);
      } else {
        console.log("Location is off");
      }
    }
  }, []);

  function showError(error) {
    console.log(error);
    switch (error.code) {
      case error.PERMISSION_DENIED:
        // x.innerHTML = "User denied the request for Geolocation."
        console.log(error);
        break;
      case error.POSITION_UNAVAILABLE:
        // x.innerHTML = "Location information is unavailable."
        console.log(error);
        break;
      case error.TIMEOUT:
        // x.innerHTML = "The request to get user location timed out."
        console.log(error);
        break;
      case error.UNKNOWN_ERROR:
        // x.innerHTML = "An unknown error occurred."
        console.log(error);
        break;
    }
  }

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

  const [openAddressPopup, setOpenAddressPopup] = useState(false);
  const [filterClassNear, setToggleFilterClassNear] = useState(false);
  const [filterSelectedNow, setFilterSelectedNow] = useState();
  const [fullAddress, setFullAddress] = useState(null);
  const [restaurantId, setRestaurantId] = useState(null);
  const [restaurantName, setRestaurantName] = useState("");
  const [distanceIsFar, setDistanceIsFar] = useState(false);
  const [restBranch, setRestBranch] = useState([]);

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

  useEffect(() => {
    if (restaurantId !== null) {
      fetchBranchHours();
    }
  }, [restaurantId]);

  const fetchBranchHours = () => {
    getRestaurantBranchHours(restaurantId).then((res) => {
      if (res.status === "ok") {
        setRestBranch(res.data);
      }
    });
  };

  const chooseAddress = (item) => {
    const lat = +item.latitude;
    const lng = +item.longitude;

    getFullAddress(lat, lng, setFullAddress);
  };

  useEffect(() => {
    if (fullAddress !== null) {
      localStorage.setItem("selected", JSON.stringify(fullAddress));

      if (restaurantId === null) {
        handleClose();
      }
    }
  }, [fullAddress]);

  useEffect(() => {
    let selected = JSON.parse(localStorage.getItem("selected"));

    if (restBranch.length && selected) {
      restBranch?.forEach((res) => {
        const resLat = +res.latitude;
        const resLng = +res.longitude;

        if (selected) {
          const distance = getDistanceFromLatLonInKm(
            resLat,
            resLng,
            +selected.lat,
            +selected.lng
          );

          if (distance > 50) {
            setDistanceIsFar(true);
            setOpenAddressPopup(false);
            localStorage.removeItem("selected");
          } else {
            setDistanceIsFar(false);
          }
        }
      });
    }
  }, [localStorage, restBranch, fullAddress]);

  const navigateUser = () => {
    navigate(paths.location, { state: { path: "/home" } });
  };

  const handleClose = () => {
    setOpenAddressPopup(false);
    setToggleFilterClassNear(false);
    setDistanceIsFar(false);
  };

  const goToRestaurantMenuPage = (id) => {
    localStorage.setItem("restaurantID", id);
    navigate(paths.menu + `/restaurant/${id}`);
  };

  return (
    <div className="home-styling container-fluid">
      <Navbar />
      <div className="card-spacing">
        <Slider />
      </div>
      <RestaurantsOrderTypeButton
        setOpenAddressPopup={
          localStorage.getItem("selected") === null ? setOpenAddressPopup : null
        }
        setToggleFilterClassNear={setToggleFilterClassNear}
        filterClassNear={filterClassNear}
        filterSelectedNow={filterSelectedNow}
        setFilterSelectedNow={setFilterSelectedNow}
        goToRestaurantMenuPage={goToRestaurantMenuPage}
        setRestaurantId={setRestaurantId}
        setRestaurantName={setRestaurantName}
      />
      {/* <BasicCard /> */}
      <DraggableSlider />
      <Footer showFooterSection={true} />

      <Dialog
        open={openAddressPopup}
        onClose={() => handleClose()}
        sx={{
          margin: "0",
          textAlign: "center",
        }}
        PaperProps={{
          sx: {
            overflow: "visible",
            margin: "0",
            height: "310px",
            bottom: "0",
            position: "fixed",
            width: "375px",
            left: "0",
            borderBottomLeftRadius: "0px",
            borderBottomRightRadius: "0px",
            "@media (max-width: 600px)": {
              width: "100%",
            },
          },
        }}
      >
        <DialogTitle className="dialog-title">Choose your location</DialogTitle>
        <DialogContent
          sx={{
            fontFamily: "Titillium Web, sans-serif", // Set the font family
            fontWeight: 600, // Set the font weight
          }}
        >
          {addressData.map((data) => (
            <div key={data.id} className="parent-div">
              <Card
                iconUrl={
                  data.address_type === "house"
                    ? "/assets/img/salmiya home.svg"
                    : data.address_type === "appartment"
                    ? "/assets/img/salmiya appart.svg"
                    : "/assets/img/salmiya office.svg"
                }
                data={data}
                home={true}
                chooseAddress={() => chooseAddress(data)}
              />
            </div>
          ))}
        </DialogContent>
        <div className="button-div">
          <Button className="location-button" onClick={navigateUser}>
            {addressData?.length === 0
              ? "Add New Address"
              : "Choose New Location"}
          </Button>
        </div>
      </Dialog>
    </div>
  );
};

export default Home;
