import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { setKey, geocode, RequestType } from "react-geocode";

import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";

// import { useQuery } from "@tanstack/react-query";

import Navbar from "../../components/header/index";
import Slider from "../../components/carousel/slider/index";
import DraggableSlider from "../../components/draggableSlider";
import { Footer } from "../../components/footer/footerContent";
import RestaurantsOrderTypeButton from "../../components/category/button";
import "../../components/carousel/slider/style.css";
import Card from "../../components/adressList";
import { DialogComponent } from "../../components/dialog";

// import getNearByRestaurants from "../../api/restaurant/getNearByRestaurant";
import getRestaurantBranchHours from "../../api/restaurant/getRestaurantBranchHours";
import getAllAddress from "../../api/address/getAddress";
import countryList from "../../api/common/getAllCountries";

import { addCountry } from "../../store/reducers/authSlice";
import { getAddress, isLoaded } from "../../store/reducers/addressSlice";
import { getBranchHours } from "../../store/reducers/resturantsSlice";

import {
  getDistanceFromLatLonInKm,
  getFullAddress,
} from "../../utils/getAddress";

import { paths } from "../../routes/paths";

import "./style.css";

const Home = () => {
  const isToken = localStorage.getItem("token");

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const addressData = useSelector((state) => state.address.addressData);
  const branchHours = useSelector((state) => state.resturants.branchHours);
  const resturantsData = useSelector(
    (state) => state.resturants.resturantsData
  );

  const fetchFunction = async () => {
    dispatch(isLoaded());
    getAllAddress(isToken).then((res) => {
      if (res.success === "ok") {
        dispatch(getAddress(res.data));
      }
    });
  };

  useEffect(() => {
    if (isToken !== null) {
      fetchFunction();
    }
  }, [location, isToken]);

  // const [userCurrentAddress, setUserCurrentAddress] = useState({
  //   latitude: 0,
  //   longitude: 0,
  //   service_type: "dinein",
  // });

  // useEffect(() => {
  //   if (JSON.parse(localStorage.getItem("location") !== null)) {
  //     const addressDetail = JSON.parse(localStorage.getItem("location"));

  //     setUserCurrentAddress({
  //       latitude: addressDetail.lat,
  //       longitude: addressDetail.lng,
  //       service_type: "dinein",
  //     });
  //   }
  // }, [localStorage]);

  // const { data: restaurants, refetch: recall } = useQuery({
  //   queryFn: () => getNearByRestaurants(userCurrentAddress),
  //   onSuccess: (data) => {},
  //   enabled: false,
  // });

  // useEffect(() => {
  //   if (
  //     userCurrentAddress.latitude !== 0 &&
  //     userCurrentAddress.longitude !== 0
  //   ) {
  //     recall();
  //   }
  // }, [userCurrentAddress]);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("location")) === null) {
      // eslint-disable-next-line no-undef
      setKey(process.env.REACT_APP_GOOGLE_API_KEY);
      if (navigator.geolocation) {
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
              })
              .catch((err) => {
                console.log(err);
              });
          },
          () => {}
        );
      }
    }
  }, []);

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

  const [openAddressPopup, setOpenAddressPopup] = useState(false);
  const [filterClassNear, setToggleFilterClassNear] = useState(false);
  const [filterSelectedNow, setFilterSelectedNow] = useState("");
  const [filterClassDelivery, setToggleFilterClassDelivery] = useState(false);
  const [fullAddress, setFullAddress] = useState(null);
  const [restaurantId, setRestaurantId] = useState(null);
  const [restaurantName, setRestaurantName] = useState("");
  const [distanceIsFar, setDistanceIsFar] = useState(false);
  const [fromPopular, setFromPopular] = useState(false);
  const [popularId, setPopularId] = useState(null);
  const [restBranch, setRestBranch] = useState([]);
  const [newText, setNewText] = useState("");
  const [selectedText, setSelectedText] = useState("");

  const parentDiv = document?.getElementById("parent-of-all");
  const parentIcon = document?.getElementsByClassName("inner-svg-container");
  const divs = parentDiv?.getElementsByClassName("restaurantCards");

  useEffect(() => {
    if (restaurantId !== null) {
      fetchBranchHours();
    }
  }, [restaurantId]);

  const fetchBranchHours = () => {
    getRestaurantBranchHours(restaurantId).then((res) => {
      if (res.status === "ok") {
        setRestBranch(res.data);
        dispatch(getBranchHours(res.data));
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
      if (filterSelectedNow === "") {
        if (restBranch.length) {
          restBranch?.forEach((res) => {
            const resLat = +res.latitude;
            const resLng = +res.longitude;

            const distance = getDistanceFromLatLonInKm(
              resLat,
              resLng,
              fullAddress.lat,
              fullAddress.lng
            );

            if (distance > 50) {
              const restaurant = resturantsData.find(
                (res) => res.id === restaurantId
              );

              setNewText("New Location");
              setRestaurantName(restaurant.name_en);
              setDistanceIsFar(true);
              setOpenAddressPopup(false);
            } else {
              setNewText("");
              setDistanceIsFar(false);
              setOpenAddressPopup(false);
              localStorage.setItem("selected", JSON.stringify(fullAddress));

              if (restaurantId === null) {
                setOpenAddressPopup(false);
              }

              if (restaurantId !== null && !fromPopular) {
                goToRestaurantMenuPage(restaurantId);
              }

              if (fromPopular && popularId !== null) {
                navigate(paths.details + "/" + popularId, {
                  state: {
                    id: popularId,
                    loc: "popular",
                    restaurant_id: restaurantId,
                  },
                });
              }
            }
          });
        }
      } else {
        localStorage.setItem("selected", JSON.stringify(fullAddress));
        setOpenAddressPopup(false);
      }
    }
  }, [fullAddress]);

  const navigateUser = () => {
    const restaurant = resturantsData.find((res) => res.id === restaurantId);

    navigate(paths.location, {
      state: {
        path: "/home",
        restaurant_id: restaurantId,
        restaurantName: restaurant.name_en,
      },
    });
  };

  const removeClasses = () => {
    for (let i = 0; i < divs.length; i++) {
      divs[i].classList.remove("delivery-true");
    }
    for (let j = 0; j < parentIcon.length; j++) {
      const icons = parentIcon[j].querySelectorAll(".icon-row");
      icons.forEach((icon) => {
        if (icon.id === "icon-row") {
          icon.classList.remove("bg-dark");
        }
      });
    }
  };

  const removeBrownClasses = () => {
    for (let i = 0; i < divs?.length; i++) {
      divs[i].classList.remove("add-brown-border");
    }
    for (let j = 0; j < parentIcon?.length; j++) {
      const icons = parentIcon[j].querySelectorAll(".icon-row");
      icons.forEach((icon) => {
        if (icon.id === "icon-row") {
          icon.classList.remove("bg-brown");
        }
      });
    }
  };

  const addBrownClasses = () => {
    for (let i = 0; i < divs?.length; i++) {
      divs[i].classList.add("add-brown-border");
    }
    for (let j = 0; j < parentIcon?.length; j++) {
      const icons = parentIcon[j].querySelectorAll(".icon-row");
      icons.forEach((icon) => {
        if (icon.id === "icon-row") {
          icon.classList.add("bg-brown");
        }
      });
    }
  };

  const addClasses = () => {
    for (let i = 0; i < divs.length; i++) {
      divs[i].classList.add("delivery-true");
    }
    for (let j = 0; j < parentIcon.length; j++) {
      const icons = parentIcon[j].querySelectorAll(".icon-row");
      icons.forEach((icon) => {
        if (icon.id === "icon-row") {
          icon.classList.add("bg-dark");
        }
      });
    }
  };

  const handleClose = () => {
    setOpenAddressPopup(false);
    setToggleFilterClassNear(false);
    setFilterSelectedNow("");
    setDistanceIsFar(false);
    setFromPopular(false);
    setNewText("");
    removeClasses();
  };

  const goToRestaurantMenuPage = (id) => {
    localStorage.setItem("restaurantID", id);
    navigate(paths.menu + `/restaurant/${id}`);
  };

  useEffect(() => {
    if (
      resturantsData?.length &&
      filterClassNear &&
      selectedText === "Delivery"
    ) {
      removeBrownClasses();

      for (let i = 0; i < resturantsData.length - 2; i++) {
        const idToCheck = resturantsData[i].id;

        getRestaurantBranchHours(idToCheck).then((res) => {
          if (res.status === "ok") {
            for (let j = 0; j < res.data.length; j++) {
              const currentItem = res.data[j];

              if (
                fullAddress !== null &&
                localStorage.getItem("selected") === null
              ) {
                const resLat = +currentItem.latitude;
                const resLng = +currentItem.longitude;

                const distance = getDistanceFromLatLonInKm(
                  resLat,
                  resLng,
                  fullAddress.lat,
                  fullAddress.lng
                );
                if (distance > 50) {
                  if (res.data[j].restaurant_id === idToCheck) {
                    removeClasses();
                  }
                } else {
                  if (res.data[j].restaurant_id === idToCheck) {
                    addClasses();
                  }
                }
                //
              } else if (
                (fullAddress !== null || fullAddress === null) &&
                localStorage.getItem("selected") !== null
              ) {
                const selected = JSON.parse(localStorage.getItem("selected"));
                const resLat = +currentItem.latitude;
                const resLng = +currentItem.longitude;

                const distance = getDistanceFromLatLonInKm(
                  resLat,
                  resLng,
                  selected.lat,
                  selected.lng
                );
                if (distance > 50) {
                  if (res.data[j].restaurant_id === idToCheck) {
                    removeClasses();
                  }
                } else {
                  if (res.data[j].restaurant_id === idToCheck) {
                    addClasses();
                  }
                }
              }
            }
          }
        });
      }
    }

    if (!filterClassNear && selectedText === "Delivery") {
      removeClasses();
    }

    if (
      filterClassDelivery &&
      !filterClassNear &&
      selectedText === "Delivery"
    ) {
      addBrownClasses();
      removeClasses();
    }

    if (!filterClassDelivery && selectedText === "Delivery") {
      removeBrownClasses();
      removeClasses();
    }
  }, [
    resturantsData,
    filterClassNear,
    fullAddress,
    filterClassDelivery,
    selectedText,
  ]);

  return (
    <div className="home-styling container-fluid">
      <Navbar />
      <div className="card-spacing">
        <Slider />
      </div>
      <RestaurantsOrderTypeButton
        setOpenAddressPopup={
          localStorage.getItem("selected") === null && isToken !== null
            ? setOpenAddressPopup
            : null
        }
        setToggleFilterClassNear={setToggleFilterClassNear}
        filterClassNear={filterClassNear}
        filterSelectedNow={filterSelectedNow}
        setFilterSelectedNow={setFilterSelectedNow}
        goToRestaurantMenuPage={goToRestaurantMenuPage}
        setRestaurantId={setRestaurantId}
        setRestaurantName={setRestaurantName}
        filterClassDelivery={filterClassDelivery}
        setToggleFilterClassDelivery={setToggleFilterClassDelivery}
        selectedText={selectedText}
        setSelectedText={setSelectedText}
      />
      {/* <BasicCard /> */}
      <DraggableSlider
        selectedLocation={localStorage.getItem("selected") === null}
        setOpenAddressPopup={setOpenAddressPopup}
        setFromPopular={setFromPopular}
        setPopularId={setPopularId}
        setRestaurantId={setRestaurantId}
        distanceIsFar={distanceIsFar}
      />
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
            fontFamily: "Titillium Web, sans-serif",
            fontWeight: 600,
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

      <DialogComponent
        notDeliver={distanceIsFar}
        setNotDeliver={setDistanceIsFar}
        restaurantName={restaurantName}
        fromDetail={true}
        resturantId={restaurantId}
        location={location}
        newText={newText}
        home={true}
      />
    </div>
  );
};

export default Home;
