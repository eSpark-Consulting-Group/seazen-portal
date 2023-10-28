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

import Navbar from "../../components/header/generalHeader/index.js";
import RestaurantOptionsServicesContainer from "../../components/restaurant/restaurant_options_services/index.js";
import { DialogComponent } from "../../components/dialog/index.js";

import getRestaurantDetails, {
  GET_RESTAURANT_DETAILS_QUERY_KEY,
} from "../../api/restaurant/getRestaurantDetails";
import getRestaurantBranchHours, {
  GET_RESTAURANT_BRANCH_HOUR_QUERY_KEY,
} from "../../api/restaurant/getRestaurantBranchHours.js";
import getNearByRestaurants from "../../api/restaurant/getNearByRestaurant.js";

import {
  getNearByRest,
  getResturantsDetails,
} from "../../store/reducers/resturantsSlice.js";
import { setThemeColor } from "../../store/reducers/themeSlice.js";

import { paths } from "../../routes/paths.jsx";

import "./style.css";
import getBranchesAndHours, {
  GET_BRANCHES_AND_HOURS_QUERY_KEY,
} from "../../api/restaurant/branches/getBranchesAndHours.js";
import {
  getDistanceFromLatLonInKm,
  getFullAddress,
} from "../../utils/getAddress.js";
import SelectLocation from "../../components/dialog/selectLocation.js";

const Menu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const country = useSelector((state) => state.auth.country);
  const nearbyRestaurants = useSelector(
    (state) => state.resturants.nearbyRestaurants
  );

  const [openModal, setOpenModal] = useState(false);
  const [notDeliver, setNotDeliver] = useState(false);
  const [selectedItemToDeliver, setSelectedItemToDeliver] = useState({});
  const [restaurantOpen, setRestaurantOpen] = useState(false);
  const [pickDate, setPickDate] = useState(
    dayjs(new Date()).format("MMM DD, YYYY")
  );
  const [openSchedulePopup, setOpenSchedulePopup] = useState(false);
  const asapTime = new Date().setMinutes(new Date().getMinutes() + 30);
  const [isAsap, setIsAsap] = useState(true);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [pickTime, setPickTime] = useState(dayjs(asapTime).format("hh:mm a"));
  const { id: restaurant_id } = useParams();
  const [fromDetail, setFromDetail] = useState(false);
  const [openAddressPopup, setOpenAddressPopup] = useState(false);
  const [restaurantIsOpen, setRestaurantIsOpen] = useState(false);
  const [fullAddress, setFullAddress] = useState(null);
  const [restaurantName, setRestaurantName] = useState("");
  const [distanceIsFar, setDistanceIsFar] = useState(false);

  const {
    data: restaurantDetailResponse,
    isLoading,
    error,
    isError,
    refetch,
  } = useQuery({
    queryKey: [GET_RESTAURANT_DETAILS_QUERY_KEY],
    queryFn: () => getRestaurantDetails(id, country?.id),
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
    queryFn: () => getRestaurantBranchHours(id),
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

  const { data: branchesAndHoursResponse, isSuccess } = useQuery({
    queryKey: [GET_BRANCHES_AND_HOURS_QUERY_KEY, restaurant_id],
    queryFn: () => {
      return getBranchesAndHours(restaurant_id);
    },
  });

  const timeByDate = branchesAndHoursResponse?.data[0]?.branch_hours?.find(
    (val) => {
      return val.week_day == localStorage.getItem("pickDate").split("-")[1];
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

    getFullAddress(lat, lng, setFullAddress);
  };

  useEffect(() => {
    const filterBranch = branchesAndHoursResponse?.data?.filter(
      (rest) => rest.restaurant_id === restaurantDetail?.id
    );

    if (fullAddress !== null) {
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
            const address = {
              latitude: fullAddress.lat,
              longitude: fullAddress.lng,
              service_type: "dinein",
            };

            fetchNearbyRestaurant(address);

            setDistanceIsFar(false);
            setOpenAddressPopup(false);

            break;
          }
        }
      }
    }
  }, [fullAddress, branchesAndHoursResponse?.data]);

  const fetchNearbyRestaurant = (address) => {
    if (nearbyRestaurants.length === 0) {
      getNearByRestaurants(address).then((res) => {
        if (res.status === "ok") {
          localStorage.setItem("selected", JSON.stringify(fullAddress));

          dispatch(getNearByRest(res?.data));
          setOpenAddressPopup(false);
          checkNearByRest(res?.data);
        }
      });
    } else {
      localStorage.setItem("selected", JSON.stringify(fullAddress));

      setOpenAddressPopup(false);
      checkNearByRest(nearbyRestaurants);
    }
  };
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

  const checkNearByRest = (nearby) => {
    const filterRestaurant = nearby?.filter((nearBy) => {
      const splitLogo = nearBy?.logo?.split("/");
      const splitName = splitLogo[splitLogo.length - 1];

      const name = splitName.split("-")[0];

      return name === restaurantDetail?.name_en?.toLowerCase();
    });

    if (filterRestaurant?.length === 0) {
      setRestaurantName(restaurantDetail?.name_en);
      setDistanceIsFar(true);
      setOpenAddressPopup(false);
    } else {
      if (localStorage.getItem("isAsap") === "true") {
        for (let i = 0; i < filterRestaurant?.length; i++) {
          if (filterRestaurant[i]?.openingStatus === "Open") {
            setRestaurantIsOpen(false);
            navigate(paths?.cart);
            break;
          } else {
            setRestaurantIsOpen(true);
          }
        }
      } else {
        setRestaurantIsOpen(false);
        navigate(paths?.cart);
      }
    }
  };

  return (
    <div>
      <Navbar
        restaurantDetail={restaurantDetail}
        setOpenAddressPopup={setOpenAddressPopup}
      />
      <RestaurantOptionsServicesContainer
        restaurantDetail={restaurantDetail}
        restaurantBranchHours={restaurantBranchHours}
        resturantId={id}
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
        </DialogTitle>
        <DialogContent className="dialog-content-cart">
          Restaurant is closed. Do you want to schedule for later?
        </DialogContent>

        <div className="btn-navigate">
          <Button
            className="common-st add-btn"
            onClick={() => navigate(paths.home)}
          >
            Home Page
          </Button>

          <Button
            className="common-st go-to-btn"
            onClick={() => {
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
        resturantId={id}
        location={location}
        home={true}
        menuCard={true}
      />
    </div>
  );
};

export default Menu;
