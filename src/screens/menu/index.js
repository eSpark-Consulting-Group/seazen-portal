import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";

import { useQuery } from "@tanstack/react-query";

import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
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

const Menu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const country = useSelector((state) => state.auth.country);
  const nearbyRestaurants = useSelector(
    (state) => state.resturants.nearbyRestaurants
  );

  const [openModal, setOpenModal] = useState(false);
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

  useEffect(() => {
    const filterRestaurant = nearbyRestaurants?.filter((nearBy) =>
      nearBy.branch_name_en?.includes(restaurantDetail?.name_en)
    );
    let itemsIsCalled = 0;

    filterRestaurant?.forEach((restaurant, _, filterArr) => {
      itemsIsCalled++;

      if (restaurant.openingStatus === "Open") {
        setRestaurantOpen(false);
        return;

        //
      } else if (restaurant.openingStatus === "Close") {
        setRestaurantOpen(true);
        return;
        //
      }
    });
  }, [nearbyRestaurants, restaurantDetail]);

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
  }, []);

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
  }, [userCurrentAddress]);

  const { data: branchesAndHoursResponse, isSuccess } = useQuery({
    queryKey: [GET_BRANCHES_AND_HOURS_QUERY_KEY, restaurant_id],
    queryFn: () => {
      return getBranchesAndHours(restaurant_id);
    },
  });

  const timeByDate = branchesAndHoursResponse?.data[0]?.branch_hours?.find(
    (val) => {
      return val.week_day == pickDate.split("-")[1];
    }
  );

  const onDateSelected = () => {
    if (pickDate) {
      setOpenSchedulePopup(false);
      setShowTimePicker(true);
    }
  };

  const scheduleForLater = {
    isAsap,
    pickTime,
    pickDate,
  };

  return (
    <div>
      <Navbar restaurantDetail={restaurantDetail} />
      <RestaurantOptionsServicesContainer
        restaurantDetail={restaurantDetail}
        restaurantBranchHours={restaurantBranchHours}
        resturantId={id}
        setOpenModal={setOpenModal}
        setSelectedItemToDeliver={setSelectedItemToDeliver}
        scheduleForLater={scheduleForLater}
        fromDetail={fromDetail}
        setFromDetail={setFromDetail}
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
            onDateSelected(false);
          }}
          sx={{
            display: "none",
          }}
        />
        {timeByDate && (
          <MobileTimePicker
            minTime={dayjs(
              new Date().setHours(parseInt(timeByDate.from_time.split(":")[0]))
            )}
            maxTime={dayjs(
              new Date().setHours(
                parseInt(timeByDate.to_time.split(":")[0]) + 12
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
            sx={{
              display: "none",
            }}
          />
        )}
      </LocalizationProvider>
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{
          bgcolor: (theme) => theme.palette.themeColor.main,
          color: "common.white",
          p: 1,
          borderRadius: "8px",
          position: "relative",
          width: "33px",
          height: "32px",
          left: "-7px",
          top: "8px",
        }}
        spacing={0}
      >
        <Typography
          variant="h4"
          fontWeight={600}
          sx={{
            lineHeight: 1,
            fontSize: "19px",
          }}
        >
          30
        </Typography>
        <Typography
          variant="caption"
          fontWeight={300}
          sx={{
            lineHeight: 1,
            fontSize: "6px",
          }}
        >
          minutes
        </Typography>
      </Stack>

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
              width: "100%",
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
          Restaurant is closed. Do you want to continue?
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
    </div>
  );
};

export default Menu;
