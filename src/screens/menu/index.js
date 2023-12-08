import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useParams } from "react-router";

import { useQuery } from "@tanstack/react-query";

import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Stack,
  Typography,
} from "@mui/material";

import dayjs from "dayjs";

import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileTimePicker } from "@mui/x-date-pickers";

import CloseIcon from "@mui/icons-material/Close";

import Navbar from "../../components/header/generalHeader/index.js";
import RestaurantOptionsServicesContainer from "../../components/restaurant/restaurant_options_services/index.js";
import { DialogComponent } from "../../components/dialog/index.js";
import SelectLocation from "../../components/dialog/selectLocation.js";
import ReOrderCard from "../../components/ReOrderCard/index.jsx";

import getRestaurantDetails, {
  GET_RESTAURANT_DETAILS_QUERY_KEY,
} from "../../api/restaurant/getRestaurantDetails";
import getRestaurantBranchHours, {
  GET_RESTAURANT_BRANCH_HOUR_QUERY_KEY,
} from "../../api/restaurant/getRestaurantBranchHours.js";
import getNearByRestaurants from "../../api/restaurant/getNearByRestaurant.js";
import getBranchesAndHours, {
  GET_BRANCHES_AND_HOURS_QUERY_KEY,
} from "../../api/restaurant/branches/getBranchesAndHours.js";
import cartList from "../../api/cart/cartList.js";

import {
  getNearByRest,
  getResturantsDetails,
  setBranchID,
} from "../../store/reducers/resturantsSlice.js";
import { setThemeColor } from "../../store/reducers/themeSlice.js";
import { closeReorderModal } from "../../store/reducers/orderSlice.js";
import { addToCart } from "../../store/reducers/cartSlice.js";

import {
  getDistanceFromLatLonInKm,
  getFullAddress,
} from "../../utils/getAddress.js";
import { cartListApiHit } from "../../utils/carlistApiCall.js";

import { paths } from "../../routes/paths.jsx";

import "./style.css";

const Menu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { id: restaurant_id } = useParams();

  const country = useSelector((state) => state.auth.country);
  const nearbyRestaurants = useSelector(
    (state) => state.resturants.nearbyRestaurants
  );
  const currentRestaurantDetail = useSelector(
    (state) => state.resturants.restaurantDetail
  );
  const reorder = useSelector((state) => state.order.reorder);
  const cart = useSelector((state) => state.cart.cart);

  const asapTime = new Date().setMinutes(new Date().getMinutes() + 30);
  const [pickDate, setPickDate] = useState(
    dayjs(new Date()).format("MMM DD, YYYY")
  );
  const [pickTime, setPickTime] = useState(dayjs(asapTime).format("hh:mm a"));
  const [isAsap, setIsAsap] = useState(true);

  const [openModal, setOpenModal] = useState(false);
  const [notDeliver, setNotDeliver] = useState(false);
  const [distanceIsFar, setDistanceIsFar] = useState(false);
  const [selectedItemToDeliver, setSelectedItemToDeliver] = useState({});
  const [restaurantOpen, setRestaurantOpen] = useState(false);
  const [openSchedulePopup, setOpenSchedulePopup] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [fromDetail, setFromDetail] = useState(false);
  const [openAddressPopup, setOpenAddressPopup] = useState(false);
  const [restaurantIsOpen, setRestaurantIsOpen] = useState(false);
  const [fullAddress, setFullAddress] = useState(null);
  const [restaurantName, setRestaurantName] = useState("");
  const [addressID, setAddressID] = useState();
  const [branchesAndHoursResponse, setBranchesAndHoursResponse] = useState();
  const [delivery_charges, setDeliveryCharge] = useState();
  const [delivery_time, setDeliveryTime] = useState();
  const [minOrderAmount, setMinOrderAmount] = useState();

  const token = localStorage.getItem("token");

  const {
    data: restaurantDetailResponse,
    isLoading,
    error,
    isError,
    refetch,
  } = useQuery({
    queryKey: [GET_RESTAURANT_DETAILS_QUERY_KEY],
    queryFn: () => getRestaurantDetails(restaurant_id, country?.id),
    onSuccess: (data) => {
      dispatch(getResturantsDetails(data.data));
    },
  });
  const { data: restaurantDetail } = restaurantDetailResponse || {};

  dispatch(
    setThemeColor({
      main: restaurantDetail?.primary_color,
      secondary: restaurantDetail?.secondary_color,
    })
  );

  const {
    data: restaurantBranchHours,
    isLoading: restaurantBranchHoursLoading,
    error: restaurantBranchHoursError,
    isError: restaurantBranchHoursIsError,
  } = useQuery({
    queryKey: [GET_RESTAURANT_BRANCH_HOUR_QUERY_KEY],
    queryFn: () => getRestaurantBranchHours(restaurant_id),
    onSuccess: (data) => {},
  });

  useEffect(() => {
    refetch();
  }, [country]);

  const [userCurrentAddress, setUserCurrentAddress] = useState({
    latitude: 0,
    longitude: 0,
    service_type: "dinein",
  });

  // useEffect(() => {
  //   if (sessionStorage.getItem("cartEmpty") === null) {
  //     if (token !== null) {
  //       if (restaurantBranchHours?.data?.length) {
  //         cartListApiHit(
  //           cartList,
  //           restaurantBranchHours?.data,
  //           dispatch,
  //           addToCart,
  //           token
  //         );
  //       }
  //     }
  //   }
  // }, [cart, token, restaurantBranchHours?.data?.length]);

  useEffect(() => {
    const userSelected = localStorage.getItem("selected");
    const userLocation = localStorage.getItem("location");
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
      userCurrentAddress.longitude !== 0 &&
      nearbyRestaurants?.length === 0
    ) {
      recall();
    }
  }, [userCurrentAddress, nearbyRestaurants]);

  const fetchBranches = () => {
    getBranchesAndHours(restaurant_id)
      .then((res) => {
        setBranchesAndHoursResponse(res);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  const timeByDate = branchesAndHoursResponse?.data[0]?.branch_hours?.find(
    (val) => {
      return val.week_day == localStorage.getItem("pickDate")?.split("-")[1];
    }
  );

  const onDateSelected = () => {
    if (localStorage.getItem("pickDate") !== null) {
      setOpenSchedulePopup(false);
    }
  };

  const scheduleForLater = {
    isAsap,
    pickTime,
    pickDate,
  };

  const handleClose = () => {
    setNotDeliver(false);
  };

  const chooseAddress = (item) => {
    const lat = +item.latitude;
    const lng = +item.longitude;

    setAddressID(item.id);
    setDeliveryCharge(
      item?.delivery_charge_area_info?.delivery_charges?.split(" ")[1]
    );
    setDeliveryTime(item?.delivery_charge_area_info?.delivery_time);
    setMinOrderAmount(item?.delivery_zone_info?.minimum_order_amount);
    getFullAddress(lat, lng, setFullAddress);
  };

  useEffect(() => {
    const filterBranch = branchesAndHoursResponse?.data?.filter(
      (rest) => rest.restaurant_id === restaurantDetail?.id
    );

    if (fullAddress !== null) {
      if (cart?.length === 0) {
        localStorage.setItem(
          "selected",
          JSON.stringify({
            ...fullAddress,
            addressId: addressID,
            delivery_charges,
            delivery_time,
            minOrderAmount,
          })
        );

        navigate(paths.cart);
        return;
      }

      if (branchesAndHoursResponse?.data.length && filterBranch?.length) {
        for (let i = 0; i < filterBranch?.length; i++) {
          const resLat = +filterBranch[i]?.latitude;
          const resLng = +filterBranch[i]?.longitude;

          const distance = getDistanceFromLatLonInKm(
            resLat,
            resLng,
            fullAddress.lat,
            fullAddress.lng
          );

          if (distance > 50) {
            setRestaurantName(restaurantDetail?.name_en);
            setDistanceIsFar(true);
            setOpenAddressPopup(false);
          } else {
            setDistanceIsFar(false);
            setOpenAddressPopup(false);

            checkNearByRest(filterBranch);

            break;
          }
        }
      }
    }
  }, [fullAddress, branchesAndHoursResponse?.data]);

  const navigateUser = () => {
    navigate(paths.location, {
      state: {
        path: "menu/restaurant",
        restaurant_id: restaurantDetail?.id,
        restaurantName: restaurantDetail?.name_en,
        addNew: true,
      },
    });
  };

  const checkNearByRest = (branch) => {
    localStorage.setItem(
      "selected",
      JSON.stringify({
        ...fullAddress,
        addressId: addressID,
        delivery_charges,
        delivery_time,
        minOrderAmount,
      })
    );

    if (branch?.length === 0) {
      setRestaurantName(restaurantDetail?.name_en);
      setDistanceIsFar(true);
      setOpenAddressPopup(false);
    } else {
      if (localStorage.getItem("isAsap") === "true") {
        for (let i = 0; i < branch?.length; i++) {
          const date = new Date();
          const options = { weekday: "long" };
          const dayName = date.toLocaleDateString("en-US", options);

          const findStatus = branch[i]?.branch_hours?.filter(
            (branch) => branch.week_day === dayName
          );

          if (findStatus[0].openingStatus === "Open") {
            setRestaurantOpen(false);
            navigate(paths?.cart, {
              state: { fromMenu: true, path: "/home" },
            });

            break;
          } else if (findStatus[0].openingStatus === "Close") {
            setRestaurantOpen(true);
          }
        }
      } else {
        setRestaurantOpen(false);
        navigate(paths?.cart, {
          state: { fromMenu: true, path: "/home" },
        });
      }
    }
  };

  useEffect(() => {
    getBranchIdNearToLocation();
  }, [branchesAndHoursResponse, restaurantDetail]);

  const getBranchIdNearToLocation = () => {
    const filterBranch = branchesAndHoursResponse?.data?.filter(
      (rest) => rest.restaurant_id === restaurantDetail?.id
    );

    if (branchesAndHoursResponse?.data.length && filterBranch?.length) {
      for (let i = 0; i < filterBranch?.length; i++) {
        // const resLat = +filterBranch[i]?.latitude;
        // const resLng = +filterBranch[i]?.longitude;

        // const selected = JSON.parse(localStorage.getItem("selected"));
        // const currentLocation = JSON.parse(localStorage.getItem("location"));

        // let fromLocation;
        // if (selected === null && currentLocation !== null) {
        //   fromLocation = currentLocation;
        // } else if (selected !== null && currentLocation !== null) {
        //   fromLocation = selected;
        // }

        // const distance = getDistanceFromLatLonInKm(
        //   resLat,
        //   resLng,
        //   fromLocation?.lat || 29.3140728,
        //   fromLocation?.lng || 47.68022
        // );

        localStorage.setItem("branchId", branchesAndHoursResponse.data[i].id);
        dispatch(setBranchID(branchesAndHoursResponse.data[i].id));

        break;

        // if (distance > 50) {

        // } else {
        //   localStorage.setItem("branchId", branchesAndHoursResponse.data[i].id);

        //   break;
        // }
      }
    }
  };

  return (
    <div>
      <Navbar
        restaurantDetail={restaurantDetail}
        setOpenAddressPopup={setOpenAddressPopup}
        fromMenu={true}
      />
      <RestaurantOptionsServicesContainer
        restaurantDetail={restaurantDetail}
        restaurantBranchHours={restaurantBranchHours}
        resturantId={restaurant_id}
        setOpenModal={setOpenModal}
        setSelectedItemToDeliver={setSelectedItemToDeliver}
        scheduleForLater={scheduleForLater}
        fromDetail={fromDetail}
        setFromDetail={setFromDetail}
        setNotDeliver={setNotDeliver}
        setRestaurantOpen={setRestaurantOpen}
      />

      <DialogComponent
        notDeliver={openModal}
        setNotDeliver={setOpenModal}
        selectedItemToDeliver={selectedItemToDeliver}
        // location={location}
        fromDetail={false}
      />

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MobileDatePicker
          onChange={(date) => {
            setPickDate(date.format("MMM DD, YYYY-dddd"));

            setFromDetail(true);
          }}
          minDate={dayjs(new Date())}
          open={openSchedulePopup}
          defaultValue={dayjs(new Date().toString())}
          onClose={() => {
            onDateSelected();
          }}
          onAccept={(date) => {
            if (date) {
              localStorage.setItem(
                "pickDate",
                date.format("MMM DD, YYYY-dddd")
              );
              setShowTimePicker(true);
            }
          }}
          sx={{
            display: "none",
          }}
        />
        {showTimePicker && (
          <MobileTimePicker
            minTime={dayjs(
              new Date().setHours(
                parseInt(timeByDate?.from_time?.split(":")[0])
              )
            )}
            maxTime={dayjs(
              new Date().setHours(
                parseInt(timeByDate?.to_time?.split(":")[0]) + 12
              )
            )}
            defaultValue={dayjs(new Date())}
            open={showTimePicker}
            onChange={(time) => {
              setPickTime(time.format("hh:mm a"));

              setIsAsap(false);
              setFromDetail(true);
              setRestaurantOpen(false);
            }}
            onClose={() => {
              setShowTimePicker(false);
            }}
            onAccept={(time) => {
              localStorage.setItem("isAsap", false);
              localStorage.setItem("pickTime", time.format("hh:mm a"));
            }}
            sx={{
              display: "none",
            }}
          />
        )}
      </LocalizationProvider>

      <Dialog
        open={restaurantOpen}
        onClose={() => {
          setFromDetail(false);
          setRestaurantOpen(false);
        }}
        sx={{
          margin: "0",
          textAlign: "center",
        }}
        className="cart-dialog"
        PaperProps={{
          sx: {
            overflow: "visible",
            margin: "0px 0px 0px 27px",
            width: "327px",

            "@media (max-width: 500px)": {
              width: "375px",
              margin: "0px 0px 0px 0px",
            },

            "@media (max-width: 400px)": {
              width: "90%",
            },
          },
        }}
      >
        <DialogTitle
          id="alert-dialog-title"
          className="dialog-title title-cart"
        >
          <img src="/assets/img/exclaim.svg"></img>

          <div
            style={{
              position: "absolute",
              top: "8px",
              right: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={() => {
              setFromDetail(false);
              setRestaurantOpen(false);
              sessionStorage.setItem("popupOpened", true);
            }}
          >
            <CloseIcon
              sx={{
                width: "24px",
                fontSize: "24px",
                cursor: "pointer",
                color: "#707070 !important",
              }}
            />
          </div>
        </DialogTitle>
        <DialogContent className="dialog-content-cart">
          Restaurant is closed. Do you want to schedule for later?
        </DialogContent>

        <div className="btn-navigate">
          <Button
            className="common-st add-btn"
            onClick={() => {
              sessionStorage.setItem("popupOpened", true);
              navigate(paths.home);
            }}
          >
            Home Page
          </Button>

          <Button
            className="common-st go-to-btn"
            onClick={() => {
              sessionStorage.setItem("popupOpened", true);
              setFromDetail(true);
              setOpenSchedulePopup(true);
            }}
          >
            Schedule for later
          </Button>
        </div>
      </Dialog>

      <Dialog
        open={notDeliver}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="not-delivered"
        sx={{
          overflow: "hidden",
          "& .MuiDialog-paper": {
            width: "327px",
            textAlign: "center",
            overflow: "visible",
            margin: "27px",

            "@media (max-width: 500px)": {
              width: "375px",
              margin: "30px",
            },

            "@media (max-width: 400px)": {
              width: "90%",
              margin: "25px",
            },
          },
        }}
      >
        <DialogTitle id="alert-dialog-title" className="dialog-title">
          <img src="/assets/img/exclaim.svg"></img>
        </DialogTitle>
        <DialogContent className="content">
          <DialogContentText id="alert-dialog-description">
            <div className="text-detail">
              {`${restaurantDetail?.name_en} Restaurant`} does not
              <br /> deliver to your current location.
            </div>

            <>
              <div className="disp-flex">
                <Button
                  onClick={() => {
                    navigate(paths.home);
                  }}
                  className="btn change-button"
                >
                  <span>Change Restaurant</span>
                </Button>

                <Button
                  onClick={() => {
                    navigate(paths.location, {
                      state: {
                        path: "menu/restaurant",
                        restaurantName: restaurantDetail?.name_en,
                        restaurant_id: restaurantDetail?.id,
                      },
                    });
                  }}
                  className="btn change-button"
                >
                  <span>Change Location</span>
                </Button>
              </div>

              <Button
                color="primary"
                autoFocus
                className="btn back-button"
                onClick={() => handleClose()}
              >
                <span>Go to menu</span>
              </Button>
            </>
          </DialogContentText>
        </DialogContent>
      </Dialog>

      <SelectLocation
        openAddressPopup={openAddressPopup}
        handleClose={() => setOpenAddressPopup(false)}
        chooseAddress={chooseAddress}
        navigateUser={navigateUser}
      />

      <DialogComponent
        notDeliver={distanceIsFar}
        setNotDeliver={setDistanceIsFar}
        restaurantName={restaurantName}
        fromDetail={true}
        resturantId={restaurant_id}
        location={location}
        home={true}
        menuCard={true}
      />

      {location?.state?.order_item !== undefined ? (
        <ReOrderCard
          isVisible={reorder}
          handleClose={() => dispatch(closeReorderModal())}
          items={location?.state?.order_item}
          restaurant_id={restaurant_id}
          setDistanceIsFar={setNotDeliver}
          branchesAndHours={branchesAndHoursResponse?.data}
          setRestaurantName={setRestaurantName}
          restaurantDetail={restaurantDetail}
        />
      ) : null}
    </div>
  );
};

export default Menu;
