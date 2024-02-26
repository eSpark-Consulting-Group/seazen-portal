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
  CircularProgress,
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

import getRestaurantDetails from "../../api/restaurant/getRestaurantDetails"; // GET_RESTAURANT_DETAILS_QUERY_KEY,
import getRestaurantBranchHours, {
  GET_RESTAURANT_BRANCH_HOUR_QUERY_KEY,
} from "../../api/restaurant/getRestaurantBranchHours.js";
// import getBranchesAndHours from "../../api/restaurant/branches/getBranchesAndHours.js";
// import getBranchByArea from "../../api/restaurant/branches/getBranchByArea.js";
import cartList from "../../api/cart/cartList.js";
import getAllArea from "../../api/address/areas.js";
import getAllAddress from "../../api/address/getAddress.js";
import getBranchByAreaId from "../../api/restaurant/branches/getBranchIdBasedOnAreaId.js";

import {
  getBranchHours,
  getResturantsDetails,
  setBranchID,
  // removeBranchID,
  // setBranchID,
} from "../../store/reducers/resturantsSlice.js";
import { setThemeColor } from "../../store/reducers/themeSlice.js";
import { closeReorderModal } from "../../store/reducers/orderSlice.js";
import { addToCart } from "../../store/reducers/cartSlice.js";
import { addSelectedAddress } from "../../store/reducers/userLocationSlice.js";
import { getAddress, getAreas } from "../../store/reducers/addressSlice.js";
import { setToLoad } from "../../store/reducers/loaderSlice.js";

import {
  flattenArray,
  getDistanceFromLatLonInKm,
  getFullAddress,
  selectChooseAddress,
} from "../../utils/getAddress.js";
import { cartListWithQuery } from "../../utils/carlistApiCall.js";

import { paths } from "../../routes/paths.jsx";

import "./style.css";

const Menu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { id: restaurant_id } = useParams();

  const country = useSelector((state) => state.auth.country);
  const reorder = useSelector((state) => state.order.reorder);
  const cart = useSelector((state) => state.cart.cart);
  // const allAreas = useSelector((state) => state.address.allAreas);
  // const addressData = useSelector((state) => state.address.addressData);
  const branchHours = useSelector((state) => state.resturants.branchHours);
  const restaurantDetail = useSelector(
    (state) => state.resturants.restaurantDetail
  );
  const resturantsData = useSelector(
    (state) => state.resturants.resturantsData
  );

  if (restaurant_id) {
    localStorage.setItem("restaurantID", restaurant_id);
  }

  const asapTime = new Date().setMinutes(new Date().getMinutes() + 30);
  const [pickDate, setPickDate] = useState(
    dayjs(new Date()).format("MMM DD, YYYY")
  );
  const [pickTime, setPickTime] = useState(dayjs(asapTime).format("hh:mm a"));
  const [isAsap, setIsAsap] = useState(true);

  const token = localStorage?.getItem("token");
  const restaurantID = localStorage?.getItem("restaurantID");
  const branchId = localStorage?.getItem("branchId");
  const matchingArea = JSON.parse(localStorage?.getItem("matchingArea"));

  const [openModal, setOpenModal] = useState(false);
  const [notDeliver, setNotDeliver] = useState(false);
  const [distanceIsFar, setDistanceIsFar] = useState(false);
  const [selectedItemToDeliver, setSelectedItemToDeliver] = useState({});
  const [restaurantOpen, setRestaurantOpen] = useState(false);
  const [openSchedulePopup, setOpenSchedulePopup] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [fromDetail, setFromDetail] = useState(false);
  const [openAddressPopup, setOpenAddressPopup] = useState(false);
  const [fullAddress, setFullAddress] = useState(null);
  const [restaurantName, setRestaurantName] = useState("");
  const [addressID, setAddressID] = useState();
  const [branchesAndHoursResponse, setBranchesAndHoursResponse] = useState();
  const [delivery_charges, setDeliveryCharge] = useState();
  const [delivery_time, setDeliveryTime] = useState();
  // const [minOrderAmount, setMinOrderAmount] = useState();
  const [name_en, setNameEn] = useState();
  const [restName, setRestName] = useState();
  const [orderAmFromDelivery, setOrderAmFromDelivery] = useState();
  // const [distancesLessThan50, setDistancesLessThan50] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAllAreas = () => {
    getAllArea()
      .then((res) => {
        const flattenedArray = flattenArray(res.data);

        dispatch(getAreas(flattenedArray));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchFunctionAddresses = async () => {
    getAllAddress(token).then((res) => {
      if (res.success === "ok") {
        const filterAddress = res.data.filter(
          (address) => !Array.isArray(address.delivery_charge_area_info)
        );

        dispatch(getAddress(filterAddress));
      }
    });
  };

  useEffect(() => {
    fetchFunctionAddresses();
  }, []);

  useEffect(() => {
    if (restaurantID !== null && branchId !== null) fetchAllAreas();
  }, [restaurantID, branchId]);

  const restaurantDetails = () => {
    setIsLoading(true);
    getRestaurantDetails(restaurant_id, country?.id)
      .then((data) => {
        dispatch(getResturantsDetails(data.data));
        if (matchingArea?.area_name_en !== undefined) {
          setBranchIdByAreaSpecific(data.data.id);
        } else {
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const setBranchIdByAreaSpecific = (restaurantId) => {
    getBranchByAreaId(
      restaurantId,
      country?.id,
      matchingArea?.area_name_en,
      dispatch
    )
      .then((res) => {
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const {
  //   data: restaurantDetailResponse,
  //   isLoading,
  //   error,
  //   isError,
  //   refetch: restaurantDetails,
  // } = useQuery({
  //   queryKey: [GET_RESTAURANT_DETAILS_QUERY_KEY],
  //   queryFn: () => getRestaurantDetails(restaurant_id, country?.id),
  //   onSuccess: (data) => {
  //     dispatch(getResturantsDetails(data.data));
  //   },
  // });
  // const { data: restaurantDetail } = restaurantDetailResponse || {};

  useEffect(() => {
    dispatch(setToLoad(isLoading));
  }, [isLoading]);

  dispatch(
    setThemeColor({
      main: restaurantDetail?.primary_color,
      secondary: restaurantDetail?.secondary_color,
    })
  );

  useEffect(() => {
    const restId = localStorage?.getItem("restaurantID");

    if (restId === null) {
      localStorage.setItem("restaurantID", restaurant_id);
    }

    if (restaurantDetail?.name_en) {
      localStorage.setItem("restaurantName", restaurantDetail?.name_en);
    }

    const country_id = JSON.parse(localStorage.getItem("country"))?.id;
    // const area_id = localStorage.getItem("area_id");

    if (
      country_id !== null &&
      restaurant_id &&
      matchingArea?.area_name_en !== undefined
    ) {
      // const object = {
      //   country_id,
      //   delivery_charge_area_id: area_id,
      // };

      getBranchByAreaId(
        restaurant_id,
        country_id,
        matchingArea?.area_name_en,
        dispatch
      ).then((res) => {
        if (Array.isArray(res.data)) {
          localStorage.setItem(
            "branchId",
            branchesAndHoursResponse?.data[0]?.id
          );
          dispatch(setBranchID(branchesAndHoursResponse?.data[0]?.id));
        }
      });
      // getBranchByArea(restaurant_id, object, dispatch).then((res) => {
      //   if (res.data?.length === 0) {
      //     if (branchesAndHoursResponse?.data?.length && restaurantDetail) {
      //       getBranchIdNearToLocation();
      //     }
      //   }
      // });
    } else {
      if (branchesAndHoursResponse?.data?.length > 0) {
        localStorage.setItem("branchId", branchesAndHoursResponse?.data[0]?.id);
        dispatch(setBranchID(branchesAndHoursResponse?.data[0]?.id));
      }
      //   if (branchesAndHoursResponse?.data?.length && restaurantDetail) {
      //     getBranchIdNearToLocation();
      //   }
    }
  }, [restaurant_id, localStorage, branchesAndHoursResponse?.data]);

  const {
    data: restaurantBranchHours,
    isLoading: restaurantBranchHoursLoading,
    error: restaurantBranchHoursError,
    isError: restaurantBranchHoursIsError,
  } = useQuery({
    queryKey: [GET_RESTAURANT_BRANCH_HOUR_QUERY_KEY],
    queryFn: () => getRestaurantBranchHours(restaurant_id),
    onSuccess: (res) => {
      setBranchesAndHoursResponse(res);
      dispatch(getBranchHours(res?.data));
    },
  });

  useEffect(() => {
    if (restaurant_id !== null) {
      restaurantDetails();
    }
  }, [country, restaurant_id]);

  // useEffect(() => {
  //   if (location?.state?.addFromDetail === undefined) {
  //     if (sessionStorage.getItem("cartEmpty") === null) {
  //       if (token !== null) {
  //         if (cart?.length === 0 && branchHours?.length) {
  //           fetchFunction();
  //         }
  //       }
  //     }
  //   }
  // }, [cart, token, branchHours]);

  // const { refetch: fetchFunction } = useQuery({
  //   queryKey: [
  //     token,
  //     sessionStorage.getItem("cartEmpty") === null,
  //     location?.state?.addFromDetail === undefined,
  //   ],
  //   queryFn: () => cartList(token),
  //   onSuccess: (res) => {
  //     if (res.status === "Error") {
  //       sessionStorage.setItem("cartEmpty", true);
  //     } else {
  //       cartListWithQuery(branchHours, dispatch, addToCart, res, cart);
  //     }
  //   },
  //   enabled:
  //     !!token &&
  //     sessionStorage.getItem("cartEmpty") === null &&
  //     location?.state?.addFromDetail === undefined,
  // });

  // const fetchBranches = () => {
  //   getBranchesAndHours(restaurant_id)
  //     .then((res) => {
  //       setBranchesAndHoursResponse(res);
  //     })
  //     .catch((e) => console.log(e));
  // };

  // useEffect(() => {
  //   fetchBranches();
  // }, [restaurant_id]);

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

  const addRestauantName = (id) => {
    const restName = resturantsData?.find((rest) => rest.id === id);

    return restName?.name_en;
  };

  const chooseAddress = (item) => {
    // const object = {
    //   country_id: JSON.parse(localStorage.getItem("country"))?.id,
    //   delivery_charge_area_id: item?.delivery_charge_area_info.id,
    // };

    getBranchByAreaId(
      restaurant_id,
      JSON.parse(localStorage.getItem("country"))?.id,
      item.delivery_charge_area_name_en,
      dispatch
    );

    // getBranchByArea(restaurant_id, object, dispatch)
    //   .then((res) => {
    //     if (res?.data?.length === 0) {
    //       getBranchIdNearToLocation();
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    selectChooseAddress(
      item,
      setAddressID,
      setDeliveryCharge,
      setDeliveryTime,
      // setMinOrderAmount,
      setNameEn,
      setRestName,
      getFullAddress,
      setFullAddress,
      addRestauantName
    );
  };

  useEffect(() => {
    const filterBranch = branchesAndHoursResponse?.data?.filter(
      (rest) => rest.restaurant_id === restaurantDetail?.id
    );

    if (fullAddress !== null) {
      let pushedWithDistance = [];

      if (cart?.length === 0) {
        const addToStore = {
          ...fullAddress,
          addressId: addressID,
          delivery_charges,
          delivery_time,
          // minOrderAmount,
          name_en,
          restaurantName: restName,
        };

        localStorage.setItem("selected", JSON.stringify(addToStore));
        dispatch(addSelectedAddress(addToStore));

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
            pushedWithDistance.push({
              ...filterBranch[i],
              distance,
            });

            checkNearestFull(pushedWithDistance, filterBranch);
          }
        }
      }
    }
  }, [fullAddress, branchesAndHoursResponse?.data]);

  const checkNearestFull = (allDistancesLessThan50, filterBranch) => {
    // Find the smallest distance and associated location
    const smallestDistance = Math.min(
      ...allDistancesLessThan50.map((item) => item.distance)
    );
    const smallestDistanceLocation = allDistancesLessThan50.find(
      (item) => item.distance === smallestDistance
    );

    if (smallestDistanceLocation) {
      setDistanceIsFar(false);
      setOpenAddressPopup(false);

      checkNearByRest(smallestDistanceLocation);
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

  const checkNearByRest = (branch) => {
    const addToStore = {
      ...fullAddress,
      addressId: addressID,
      delivery_charges,
      delivery_time,
      // minOrderAmount,
      name_en,
      restaurantName: restName,
    };

    localStorage.setItem("selected", JSON.stringify(addToStore));
    dispatch(addSelectedAddress(addToStore));

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

  // const getBranchIdNearToLocation = () => {
  //   const pushedDistanceWithDetail = [];

  //   const currentLocation = JSON.parse(localStorage.getItem("location"));
  //   const selectedLoc = JSON.parse(localStorage.getItem("selected"));
  //   if (restaurantDetail?.name_en) {
  //     localStorage.setItem("restaurantName", restaurantDetail?.name_en);
  //   }

  //   const filterBranch = branchesAndHoursResponse?.data?.filter(
  //     (rest) => rest.restaurant_id === restaurantDetail?.id
  //   );

  //   let fromLocation;
  //   if (selectedLoc === null && currentLocation !== null) {
  //     fromLocation = currentLocation;
  //   } else if (selectedLoc !== null && currentLocation !== null) {
  //     fromLocation = selectedLoc;
  //   }

  //   if (branchesAndHoursResponse?.data.length && filterBranch?.length) {
  //     for (const filtBranch of filterBranch) {
  //       const resLat = +filtBranch?.latitude;
  //       const resLng = +filtBranch?.longitude;

  //       const distance = getDistanceFromLatLonInKm(
  //         resLat,
  //         resLng,
  //         fromLocation?.lat || 29.3140728,
  //         fromLocation?.lng || 47.68022
  //       );

  //       // Check if any distance is less than 50
  //       if (distance < 50) {
  //         pushedDistanceWithDetail.push({
  //           ...filtBranch,
  //           distance: distance,
  //         });

  //         setDistancesLessThan50(pushedDistanceWithDetail);
  //       }
  //     }
  //   }
  // };

  // useEffect(() => {
  //   // Find the smallest distance and associated location
  //   const smallestDistance = Math.min(
  //     ...distancesLessThan50.map((item) => item.distance)
  //   );
  //   const smallestDistanceLocation = distancesLessThan50.find(
  //     (item) => item.distance === smallestDistance
  //   );

  //   if (smallestDistanceLocation) {
  //     localStorage.setItem("branchId", smallestDistanceLocation.id);
  //     dispatch(setBranchID(smallestDistanceLocation.id));
  //   } else {
  //     localStorage.removeItem("branchId");
  //     dispatch(removeBranchID());
  //   }
  // }, [localStorage, distancesLessThan50]);

  return (
    <div className={isLoading ? "with-progress" : ""}>
      {isLoading ? (
        <div className="progress-div">
          <CircularProgress className="circular-bar" />
        </div>
      ) : (
        <>
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
            setOrderAmFromDelivery={setOrderAmFromDelivery}
            orderAmFromDelivery={orderAmFromDelivery}
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
        </>
      )}
    </div>
  );
};

export default Menu;
