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
import countryList from "../../api/common/getAllCountries";

import { addCountry } from "../../store/reducers/authSlice";
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
  const [newText, setNewText] = useState("");
  const [selectedText, setSelectedText] = useState("");

  const parentDiv = document?.getElementById("parent-of-all");
  const parentIcon = document?.getElementsByClassName("inner-svg-container");
  const divs = parentDiv?.getElementsByClassName("restaurantCards");

  useEffect(() => {
    if (resturantsData?.length) {
      removeBrownClasses();
      let promises = [];

      resturantsData?.forEach((restaurant, index) => {
        if (index === 0 || index === 1) {
          const idToCheck = restaurant.id;
          promises.push(getRestaurantBranchHours(idToCheck));
        }
      });

      Promise.all(promises)
        .then((responses) => {
          let allItems = [];

          responses.forEach((res) => {
            if (res.status === "ok") {
              res?.data?.forEach((item) => {
                if (!allItems.includes(item)) {
                  allItems.push(item);
                }
              });
            }
          });
          dispatch(getBranchHours(allItems));
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [resturantsData]);

  const chooseAddress = (item) => {
    const lat = +item.latitude;
    const lng = +item.longitude;

    getFullAddress(lat, lng, setFullAddress);
  };

  useEffect(() => {
    if (fullAddress !== null) {
      if (filterSelectedNow === "") {
        if (branchHours.length) {
          branchHours?.forEach((res) => {
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
  }, [fullAddress, branchHours]);

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

  // Removing border and background color from icon if Delivers to me is not selected
  const removeClasses = () => {
    // Add border to restaurant image
    for (let i = 0; i < divs?.length; i++) {
      divs[i].classList.remove("delivery-true");
    }

    // Add background color to icon on restaurant image
    for (let i = 0; i < parentIcon?.length; i++) {
      const icons = parentIcon[i].querySelectorAll(".icon-row");
      icons.forEach((icon) => {
        if (icon.id === "icon-row") {
          icon.classList.remove("delivers-image");
        }
      });
    }
  };

  // Removing border and background color from icon if Available to deliver is not selected
  const removeBrownClasses = () => {
    // Add border to restaurant image
    for (let i = 0; i < divs?.length; i++) {
      divs[i].classList.remove("add-brown-border");
    }

    // Add background color to icon on restaurant image
    for (let i = 0; i < parentIcon?.length; i++) {
      const icons = parentIcon[i].querySelectorAll(".icon-row");
      icons.forEach((icon) => {
        if (icon.id === "icon-row") {
          icon.classList.remove("bg-brown");
        }
      });
    }
  };

  // Add border and background color from icon if Available to deliver is selected
  const addBrownClasses = () => {
    // Add border to restaurant image
    for (let i = 0; i < divs?.length; i++) {
      divs[i].classList.add("add-brown-border");
    }

    // Add background color to icon on restaurant image
    for (let i = 0; i < parentIcon?.length; i++) {
      const icons = parentIcon[i].querySelectorAll(".icon-row");
      icons.forEach((icon) => {
        if (icon.id === "icon-row") {
          icon.classList.add("bg-brown");
        }
      });
    }
  };

  // Add border and background color from icon if Delivers to me is selected
  const addClasses = () => {
    // Add border to restaurant image
    for (let i = 0; i < divs?.length; i++) {
      divs[i].classList.add("delivery-true");
    }

    // Add background color to icon on restaurant image
    for (let i = 0; i < parentIcon?.length; i++) {
      const icons = parentIcon[i].querySelectorAll(".icon-row");
      icons.forEach((icon) => {
        if (icon.id === "icon-row") {
          icon.classList.add("delivers-image");
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

  const distanceCheck = (resLat, resLng, location) => {
    const distance = getDistanceFromLatLonInKm(
      resLat,
      resLng,
      location.lat,
      location.lng
    );

    if (distance > 50) {
      removeClasses();
    } else {
      addClasses();
    }
  };

  useEffect(() => {
    if (
      branchHours?.length &&
      filterClassNear &&
      selectedText === "Delivery" &&
      filterSelectedNow !== "Available for Delivery"
    ) {
      removeBrownClasses();

      if (branchHours.length) {
        branchHours?.forEach((res) => {
          const resLat = +res.latitude;
          const resLng = +res.longitude;

          if (
            fullAddress !== null &&
            localStorage.getItem("selected") === null
          ) {
            distanceCheck(resLat, resLng, fullAddress);

            //
          } else if (
            (fullAddress !== null || fullAddress === null) &&
            localStorage.getItem("selected") !== null
          ) {
            const selected = JSON.parse(localStorage.getItem("selected"));

            distanceCheck(resLat, resLng, selected);
            //
          } else if (
            (fullAddress !== null || fullAddress === null) &&
            localStorage.getItem("selected") === null &&
            localStorage.getItem("location") !== null &&
            isToken === null
          ) {
            const location = JSON.parse(localStorage.getItem("location"));

            distanceCheck(resLat, resLng, location);
            //
          } else if (
            (fullAddress !== null || fullAddress === null) &&
            localStorage.getItem("selected") === null &&
            localStorage.getItem("location") === null &&
            isToken === null &&
            selectedText === "Delivery" &&
            filterSelectedNow === "Delivers to Me"
          ) {
            navigate(paths.location, { state: { guestUser: true } });
          }
        });
      }
    }

    if (
      selectedText === "Delivery" &&
      filterClassDelivery &&
      !filterClassNear
    ) {
      addBrownClasses();
    }

    if (
      selectedText === "Delivery" &&
      !filterClassDelivery &&
      !filterClassNear
    ) {
      removeClasses();
      removeBrownClasses();
    }
  }, [
    branchHours,
    filterClassNear,
    fullAddress,
    filterClassDelivery,
    selectedText,
    filterSelectedNow,
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
            "@media (max-width: 425px)": {
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
