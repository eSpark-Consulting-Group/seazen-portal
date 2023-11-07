import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { setKey, geocode, RequestType } from "react-geocode";

import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";

import { useQuery } from "@tanstack/react-query";

import Navbar from "../../components/header/index";
import Slider from "../../components/carousel/slider/index";
import DraggableSlider from "../../components/draggableSlider";
import { Footer } from "../../components/footer/footerContent";
import RestaurantsOrderTypeButton from "../../components/category/button";
import "../../components/carousel/slider/style.css";
import Card from "../../components/adressList";
import { DialogComponent } from "../../components/dialog";
import ScheduleDialog from "../../components/dialog/scheduleDialog";
import SchedulePicker from "../../components/shared/schedulePicker";
import SelectLocation from "../../components/dialog/selectLocation";

import getNearByRestaurants from "../../api/restaurant/getNearByRestaurant";
import getRestaurantBranchHours from "../../api/restaurant/getRestaurantBranchHours";
import countryList from "../../api/common/getAllCountries";
import cartList from "../../api/cart/cartList";

import { addCountry } from "../../store/reducers/authSlice";
import { addToCart } from "../../store/reducers/cartSlice";

import {
  getBranchHours,
  getNearByRest,
} from "../../store/reducers/resturantsSlice";

import {
  getDistanceFromLatLonInKm,
  getFullAddress,
} from "../../utils/getAddress";

import { paths } from "../../routes/paths";

import "./style.css";

const Home = () => {
  const token = localStorage.getItem("token");
  const userSelected = localStorage.getItem("selected");
  const userLocation = localStorage.getItem("location");

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const addressData = useSelector((state) => state.address.addressData);
  const branchHours = useSelector((state) => state.resturants.branchHours);
  const resturantsData = useSelector(
    (state) => state.resturants.resturantsData
  );
  const cart = useSelector((state) => state.cart.cart);
  const nearbyRestaurants = useSelector(
    (state) => state.resturants.nearbyRestaurants
  );

  useEffect(() => {
    if (sessionStorage.getItem("cartEmpty") === null) {
      if (token !== null) {
        if (cart?.length === 0) {
          cartList(token)
            .then((res) => {
              res.data.map((val) => {
                const has_variants =
                  val?.size_variant_id === "" &&
                  val.side_variant_id === "" &&
                  val.topping_variant_id === ""
                    ? false
                    : true;

                const variants =
                  val?.size_variant_id === "" &&
                  val.side_variant_id === "" &&
                  val.topping_variant_id === ""
                    ? null
                    : {
                        sizeVariant: {
                          ...val.size_variant[0],
                          variantId: val.size_variant_id,
                        },
                        toppingVariant: val.topping_variant.map((value) => ({
                          ...value,
                          variantId: val.topping_variant_id,
                        })),
                        sideVariant: val.side_variant.map((value) => ({
                          ...value,
                          variantId: val.side_variant_id,
                        })),
                      };

                const obj = {
                  id: val?.item_id,
                  cart_id: val.cart_id,
                  itemName: val?.menu_item_name_en,
                  discountedPrice: val?.discounted_price,
                  price: val?.unit_price,
                  quantity: val.quantity,
                  variants,
                  item_code: val.item_code,
                  specialInstructions: "",
                  itemImage: val?.menu_item_image,
                  restaurant_id: 1,
                  totalPrice: Number(val.quantity * val.unit_price).toFixed(3),
                  has_variants,
                };

                obj.has_variants === false && delete obj.has_variants;
                obj.variants === null && delete obj.variants;

                dispatch(addToCart(obj));
                sessionStorage.setItem("cartEmpty", true);
              });
            })
            .catch((err) => {
              console.error(err);
            });
        }
      }
    }
  }, [cart, token]);

  const [userCurrentAddress, setUserCurrentAddress] = useState({
    latitude: 0,
    longitude: 0,
    service_type: "dinein",
  });

  useEffect(() => {
    const defaultLocation = { lat: 29.3140728, lng: 47.68022 };

    if (userSelected === null && userLocation === null) {
      setUserCurrentAddress({
        latitude: defaultLocation.lat,
        longitude: defaultLocation.lng,
        service_type: "dinein",
      });
      //
    } else if (userSelected === null && userLocation !== null) {
      const parsedUserLocation = JSON.parse(userLocation);

      setUserCurrentAddress({
        latitude: parsedUserLocation.lat,
        longitude: parsedUserLocation.lng,
        service_type: "dinein",
      });
      //
    } else if (userSelected !== null && userLocation !== null) {
      const parsedUserLocation = JSON.parse(userSelected);

      setUserCurrentAddress({
        latitude: parsedUserLocation.lat,
        longitude: parsedUserLocation.lng,
        service_type: "dinein",
      });
      //
    }
  }, [localStorage]);

  const { refetch: recall } = useQuery({
    queryFn: () => getNearByRestaurants(userCurrentAddress),
    onSuccess: (data) => {
      dispatch(getNearByRest(data.data));
    },
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
    if (JSON.parse(userLocation) === null) {
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

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addressId, setAddressID] = useState();

  useEffect(() => {
    if (userLocation !== null && userSelected === null) {
      const parsedLocation = JSON.parse(userLocation);

      for (let i = 0; i < addressData?.length; i++) {
        if (
          parseFloat(+addressData[i].latitude) ===
            parseFloat(parsedLocation.lat) &&
          parseFloat(+addressData[i].longitude) ===
            parseFloat(parsedLocation.lng)
        ) {
          setAddressID(addressData[i].id);
          getFullAddress(
            +addressData[i].latitude,
            +addressData[i].longitude,
            setSelectedAddress
          );
        }
      }
    }
  }, [localStorage]);

  useEffect(() => {
    if (selectedAddress !== null) {
      const address = {
        lat: selectedAddress.lat,
        lng: selectedAddress.lng,
        address: selectedAddress.address,
        addressId,
      };

      localStorage?.setItem("selected", address);
    }
  }, [selectedAddress]);

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
  const [branchId, setBranchId] = useState(null);
  const [newText, setNewText] = useState("");
  const [selectedText, setSelectedText] = useState("");
  const [openSchedulePopup, setOpenSchedulePopup] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [restaurantOpen, setRestaurantOpen] = useState(false);
  const [chooseFullAddress, setChooseFullAddress] = useState(null);
  const [openAddressToChoose, setOpenAddressToChoose] = useState(null);

  const parentDiv = document?.getElementById("parent-of-all");
  const parentIcon = document?.getElementsByClassName("inner-svg-container");
  const divs = parentDiv?.getElementsByClassName("restaurantCards");

  useEffect(() => {
    if (resturantsData?.length) {
      removeBrownClasses();
      let promises = [];

      resturantsData?.forEach((restaurant, index) => {
        // if (index === 0 || index === 1) {
        const idToCheck = restaurant.id;
        promises.push(getRestaurantBranchHours(idToCheck));
        // }
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

    setAddressID(item.id);
    getFullAddress(lat, lng, setFullAddress);
  };

  const onChooseFullAddress = (item) => {
    const lat = +item.latitude;
    const lng = +item.longitude;

    setAddressID(item.id);
    getFullAddress(lat, lng, setChooseFullAddress);
  };

  useEffect(() => {
    const filterBranch = branchHours?.filter(
      (rest) => rest.restaurant_id === cart[0]?.restaurant_id
    );

    if (chooseFullAddress !== null) {
      if (cart?.length === 0) {
        localStorage.setItem(
          "selected",
          JSON.stringify({ ...chooseFullAddress, addressId })
        );

        navigate(paths.cart);
        return;
      }

      if (branchHours.length && filterBranch?.length) {
        for (let i = 0; i < filterBranch?.length; i++) {
          const resLat = +filterBranch[i]?.latitude;
          const resLng = +filterBranch[i]?.longitude;

          const distance = getDistanceFromLatLonInKm(
            resLat,
            resLng,
            chooseFullAddress.lat,
            chooseFullAddress.lng
          );

          const restaurant = resturantsData.find(
            (res) => res.id === cart[0]?.restaurant_id
          );

          if (distance > 50) {
            setRestaurantName(restaurant?.name_en);
            setDistanceIsFar(true);
            setOpenAddressToChoose(false);
          } else {
            const address = {
              latitude: chooseFullAddress.lat,
              longitude: chooseFullAddress.lng,
              service_type: "dinein",
            };

            fetchNearbyRestaurant(address);

            setDistanceIsFar(false);
            setOpenAddressToChoose(false);

            break;
          }
        }
      }
    }
  }, [chooseFullAddress, branchHours]);

  const fetchNearbyRestaurant = (address) => {
    if (nearbyRestaurants.length === 0) {
      getNearByRestaurants(address).then((res) => {
        if (res.status === "ok") {
          localStorage.setItem(
            "selected",
            JSON.stringify({ ...chooseFullAddress, addressId })
          );

          dispatch(getNearByRest(res?.data));
          setOpenAddressToChoose(false);
          checkNearByRest(res?.data);
        }
      });
    } else {
      localStorage.setItem(
        "selected",
        JSON.stringify({ ...chooseFullAddress, addressId })
      );

      setOpenAddressToChoose(false);
      checkNearByRest(nearbyRestaurants);
    }
  };

  const checkNearByRest = (nearby) => {
    const restaurant = resturantsData.find(
      (res) => res.id === cart[0]?.restaurant_id
    );

    const filterRestaurant = nearby?.filter((nearBy) => {
      const splitLogo = nearBy?.logo?.split("/");
      const splitName = splitLogo[splitLogo.length - 1];

      const name = splitName.split("-")[0];

      return name === restaurant?.name_en?.toLowerCase();
    });

    if (filterRestaurant?.length === 0) {
      setRestaurantName(restaurant?.name_en);
      setDistanceIsFar(true);
      setOpenAddressToChoose(false);
    } else {
      if (localStorage.getItem("isAsap") === "true") {
        for (let i = 0; i < filterRestaurant?.length; i++) {
          if (filterRestaurant[i]?.openingStatus === "Open") {
            setRestaurantOpen(false);
            navigate(paths?.cart, {
              state: { fromHome: true, path: "/home" },
            });

            break;
          } else {
            setRestaurantOpen(true);
          }
        }
      } else {
        setRestaurantOpen(false);
        navigate(paths?.cart, {
          state: { fromHome: true, path: "/home" },
        });
      }
    }
  };

  useEffect(() => {
    if (fullAddress !== null) {
      if (filterSelectedNow === "") {
        if (branchHours.length) {
          for (let i = 0; i < branchHours.length; i++) {
            const resLat = +branchHours[i]?.latitude;
            const resLng = +branchHours[i]?.longitude;

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
              localStorage.setItem(
                "selected",
                JSON.stringify({ ...fullAddress, addressId })
              );

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
                    branch_id: branchId,
                  },
                });
              }

              break;
            }
          }
        }
      } else {
        localStorage.setItem(
          "selected",
          JSON.stringify({ ...fullAddress, addressId })
        );
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

  const onNavigateUser = () => {
    const restaurant = resturantsData.find(
      (res) => res.id === cart[0]?.restaurant_id
    );

    navigate(paths.location, {
      state: {
        path: "menu/restaurant",
        restaurant_id: cart[0]?.id,
        restaurantName: restaurant?.name_en,
        addNew: true,
      },
    });
  };

  // Removing border and background color from icon if Delivers to me is not selected
  const removeClasses = () => {
    // Remove border from restaurant image
    for (let i = 0; i < divs?.length; i++) {
      divs[i].classList.remove("delivery-true");
    }

    // Remove background color from icon on restaurant image
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
    // Remove border from restaurant image
    for (let i = 0; i < divs?.length; i++) {
      divs[i].classList.remove("add-brown-border");
    }

    // Remove background color from icon on restaurant image
    for (let i = 0; i < parentIcon?.length; i++) {
      const icons = parentIcon[i].querySelectorAll(".icon-row");
      icons.forEach((icon) => {
        if (icon.id === "icon-row") {
          icon.classList.remove("bg-brown");
        }
      });
    }
  };

  // Add border and background color if Available to deliver is selected
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

  // Add border and background color if Delivers to me is selected
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

          if (fullAddress !== null && userSelected === null) {
            distanceCheck(resLat, resLng, fullAddress);

            //
          } else if (
            (fullAddress !== null || fullAddress === null) &&
            userSelected !== null
          ) {
            const selected = JSON.parse(userSelected);

            distanceCheck(resLat, resLng, selected);
            //
          } else if (
            (fullAddress !== null || fullAddress === null) &&
            userSelected === null &&
            userLocation !== null &&
            token === null
          ) {
            const location = JSON.parse(userLocation);

            distanceCheck(resLat, resLng, location);
            //
          } else if (
            (fullAddress !== null || fullAddress === null) &&
            userSelected === null &&
            userLocation === null &&
            token === null &&
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
      <div style={{ padding: "8px" }}>
        <Navbar
          profile
          searchIcon
          setOpenAddressPopup={setOpenAddressToChoose}
          logo
          cartIcon
          profileIconUrl={token ? paths.profile : paths.guest_profile}
          fromHome={true}
        />
      </div>
      <div className="card-spacing">
        <Slider />
      </div>
      <RestaurantsOrderTypeButton
        setOpenAddressPopup={
          userSelected === null && token !== null ? setOpenAddressPopup : null
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
        selectedLocation={userSelected === null}
        setOpenAddressPopup={setOpenAddressPopup}
        setFromPopular={setFromPopular}
        setPopularId={setPopularId}
        setBranchId={setBranchId}
        setRestaurantId={setRestaurantId}
        distanceIsFar={distanceIsFar}
        setDistanceIsFar={setDistanceIsFar}
        setRestaurantOpen={setRestaurantOpen}
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

            "@media (max-width: 500px)": {
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

      <SelectLocation
        openAddressPopup={openAddressToChoose}
        handleClose={() => setOpenAddressToChoose(false)}
        chooseAddress={onChooseFullAddress}
        navigateUser={onNavigateUser}
      />

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

      <SchedulePicker
        openSchedulePopup={openSchedulePopup}
        setOpenSchedulePopup={setOpenSchedulePopup}
        showTimePicker={showTimePicker}
        setShowTimePicker={setShowTimePicker}
      />

      <ScheduleDialog
        restaurantOpen={restaurantOpen}
        setRestaurantOpen={setRestaurantOpen}
        setOpenSchedulePopup={setOpenSchedulePopup}
        home={true}
      />
    </div>
  );
};

export default Home;
