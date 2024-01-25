import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useQuery } from "@tanstack/react-query";

import { Box, Button, Dialog, DialogContent, DialogTitle } from "@mui/material";

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

import getRestaurantBranchHours from "../../api/restaurant/getRestaurantBranchHours";
import countryList from "../../api/common/getAllCountries";
import cartList from "../../api/cart/cartList";
import getAllArea from "../../api/address/areas";
import getBranchByArea from "../../api/restaurant/branches/getBranchByArea";

import { addCountry } from "../../store/reducers/authSlice";
import { addToCart } from "../../store/reducers/cartSlice";
import {
  getBranchHours,
  setBranchID,
} from "../../store/reducers/resturantsSlice";
import { getAreas } from "../../store/reducers/addressSlice";
import { addSelectedAddress } from "../../store/reducers/userLocationSlice";

import {
  getDistanceFromLatLonInKm,
  getFullAddress,
  selectChooseAddress,
} from "../../utils/getAddress";
import { cartListWithQuery } from "../../utils/carlistApiCall";

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

  useEffect(() => {
    localStorage.removeItem("restaurantIdForRedirect");
    localStorage.removeItem("area_id");

    if (cart?.length === 0) {
      localStorage.removeItem("restaurantID");
      localStorage.removeItem("branchId");
      localStorage.removeItem("restaurantName");
    } else {
      localStorage.setItem("restaurantID", cart[0]?.restaurant_id);
      localStorage.setItem("branchId", cart[0]?.branch_id);

      const restName = resturantsData?.find(
        (rest) => rest.id === cart[0]?.restaurant_id
      );

      localStorage.setItem("restaurantName", restName?.name_en);
    }
  }, [cart, resturantsData]);

  const { refetch } = useQuery({
    queryKey: [token],
    queryFn: () => cartList(token),
    onSuccess: (res) => {
      if (res?.status === "Error") {
        sessionStorage.setItem("cartEmpty", true);
      } else {
        cartListWithQuery(branchHours, dispatch, addToCart, res);
      }
    },
    enabled:
      !!token &&
      sessionStorage.getItem("cartEmpty") === null &&
      branchHours?.length > 0,
  });

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addressId, setAddressID] = useState();
  const [delivery_charges, setDeliveryCharge] = useState();
  const [delivery_time, setDeliveryTime] = useState();
  const [minOrderAmount, setMinOrderAmount] = useState();
  const [name_en, setNameEn] = useState();

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

          if (!Array.isArray(addressData[i]?.delivery_charge_area_info)) {
            setDeliveryCharge(
              addressData[
                i
              ]?.delivery_charge_area_info?.delivery_charges?.split(" ")[1]
            );
            setDeliveryTime(
              addressData[i]?.delivery_charge_area_info?.delivery_time
            );
            setMinOrderAmount(
              addressData[i]?.delivery_charge_area_info?.minimum_order_amount
            );
            setNameEn(addressData[i]?.delivery_charge_area_info?.name_en);
          }

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
      const addToStore = {
        lat: selectedAddress.lat,
        lng: selectedAddress.lng,
        address: selectedAddress.address,
        addressId,
        delivery_charges,
        delivery_time,
        minOrderAmount,
        name_en,
      };

      localStorage?.setItem("selected", JSON.stringify(addToStore));
      dispatch(addSelectedAddress(addToStore));
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

        const restaurant_id = localStorage.getItem("restaurantID");
        const branch_id = localStorage.getItem("branchId");

        if (restaurant_id !== null || branch_id !== null) {
          fetchAllAreas(restaurant_id, branch_id);
        }
        dispatch(addCountry(defaultCountry));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchAllAreas = (restaurant_id, branch_id) => {
    getAllArea(restaurant_id, branch_id)
      .then((res) => {
        dispatch(getAreas(res.data));
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

      resturantsData?.forEach((restaurant) => {
        const idToCheck = restaurant.id;
        promises.push(getRestaurantBranchHours(idToCheck));
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
    selectChooseAddress(
      item,
      setAddressID,
      setDeliveryCharge,
      setDeliveryTime,
      setMinOrderAmount,
      setNameEn,
      getFullAddress,
      setFullAddress
    );
  };

  const onChooseFullAddress = (item) => {
    if (item?.delivery_charge_area_info.id) {
      const object = {
        country_id: JSON.parse(localStorage.getItem("country"))?.id,
        delivery_charge_area_id: item?.delivery_charge_area_info.id,
      };

      getBranchByArea(cart[0]?.restaurant_id, object, dispatch)
        .then((res) => {
          if (res?.data?.length === 0) {
            getBranchIdNearToLocation();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

    selectChooseAddress(
      item,
      setAddressID,
      setDeliveryCharge,
      setDeliveryTime,
      setMinOrderAmount,
      setNameEn,
      getFullAddress,
      setChooseFullAddress
    );
  };

  const getBranchIdNearToLocation = () => {
    const filterBranch = branchHours?.data?.find(
      (rest) => rest.restaurant_id === cart[0]?.restaurant_id
    );

    localStorage.setItem("branchId", filterBranch?.id);
    dispatch(setBranchID(filterBranch?.id));
  };

  useEffect(() => {
    const filterBranch = branchHours?.filter(
      (rest) => rest.restaurant_id === cart[0]?.restaurant_id
    );

    if (chooseFullAddress !== null) {
      if (cart?.length === 0) {
        const addToStore = {
          ...chooseFullAddress,
          addressId,
          delivery_charges,
          delivery_time,
          minOrderAmount,
          name_en,
        };

        localStorage.setItem("selected", JSON.stringify(addToStore));
        dispatch(addSelectedAddress(addToStore));

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
            setDistanceIsFar(false);
            setOpenAddressToChoose(false);

            checkNearByRest();

            break;
          }
        }
      }
    }
  }, [chooseFullAddress, branchHours]);

  const checkNearByRest = () => {
    let addToStore = {
      ...chooseFullAddress,
      addressId,
    };

    if (name_en) {
      addToStore = {
        ...addToStore,
        delivery_charges,
        delivery_time,
        minOrderAmount,
        name_en,
      };
    }

    localStorage.setItem("selected", JSON.stringify(addToStore));
    dispatch(addSelectedAddress(addToStore));

    const restaurant = resturantsData.find(
      (res) => res.id === cart[0]?.restaurant_id
    );

    const filterRestaurant = branchHours.filter(
      (branch) => branch.restaurant_id === restaurant.id
    );

    if (filterRestaurant?.length === 0) {
      setRestaurantName(restaurant?.name_en);
      setDistanceIsFar(true);
      setOpenAddressToChoose(false);
    } else {
      if (localStorage.getItem("isAsap") === "true") {
        for (let i = 0; i < filterRestaurant?.length; i++) {
          const date = new Date();
          const options = { weekday: "long" };
          const dayName = date.toLocaleDateString("en-US", options);

          const findStatus = filterRestaurant[i]?.branch_hours?.filter(
            (branch) => branch.week_day === dayName
          );

          if (findStatus[0].openingStatus === "Open") {
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

              let addToStore = {
                ...fullAddress,
                addressId,
              };

              if (name_en) {
                addToStore = {
                  ...addToStore,
                  delivery_charges,
                  delivery_time,
                  minOrderAmount,
                  name_en,
                };
              }

              localStorage.setItem("selected", JSON.stringify(addToStore));
              dispatch(addSelectedAddress(addToStore));

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
        let addToStore = {
          ...fullAddress,
          addressId,
        };

        if (name_en) {
          addToStore = {
            ...addToStore,
            delivery_charges,
            delivery_time,
            minOrderAmount,
            name_en,
          };
        }

        localStorage.setItem("selected", JSON.stringify(addToStore));
        dispatch(addSelectedAddress(addToStore));
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

  useEffect(() => {
    if (
      branchHours?.length &&
      filterClassNear &&
      selectedText === "Delivery" &&
      filterSelectedNow !== "Available for Delivery"
    ) {
      removeBrownClasses();

      if (branchHours.length) {
        for (let i = 0; i < branchHours.length; i++) {
          const resLat = +branchHours[i].latitude;
          const resLng = +branchHours[i].longitude;

          if (fullAddress !== null && userSelected === null) {
            const distance = getDistanceFromLatLonInKm(
              resLat,
              resLng,
              fullAddress.lat,
              fullAddress.lng
            );

            if (distance > 50) {
              removeClasses();
            } else {
              addClasses();
              break;
            }

            //
          } else if (
            (fullAddress !== null || fullAddress === null) &&
            userSelected !== null
          ) {
            const selected = JSON.parse(userSelected);

            const distance = getDistanceFromLatLonInKm(
              resLat,
              resLng,
              selected.lat,
              selected.lng
            );

            if (distance > 50) {
              removeClasses();
            } else {
              addClasses();
              break;
            }

            //
          } else if (
            (fullAddress !== null || fullAddress === null) &&
            userSelected === null &&
            userLocation !== null &&
            token === null
          ) {
            const location = JSON.parse(userLocation);

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
              break;
            }

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
        }
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
      <Box
        sx={{
          marginTop: "60px",
        }}
      >
        <Footer showFooterSection={true} />
      </Box>

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
            scrollbarWidth: "thin",
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
