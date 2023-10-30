import React, { useEffect, useLayoutEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useQuery } from "@tanstack/react-query";

import { toast } from "react-toastify";
import { useTheme } from "@mui/material";
import {
  Box,
  Stack,
  Button,
  SvgIcon,
  TextField,
  Typography,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  CloseIcon,
  CircularProgress,
} from "@mui/material";

import dayjs from "dayjs";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileTimePicker } from "@mui/x-date-pickers";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

import { isEmpty } from "lodash";

import { ReactComponent as DollarIcon } from "../../assets/icons/dollar.svg";
import { ReactComponent as KNETIcon } from "../../assets/icons/knet.svg";

import CartItem from "../../components/shared/cart/CartItem";
import { DialogComponent } from "../../components/dialog";

import cartList from "../../api/cart/cartList";
import checkout from "../../api/cart/checkout";
import getRestaurantDetails from "../../api/restaurant/getRestaurantDetails";
import applyPromoCode from "../../api/cart/promocode";
import getBranchesAndHours, {
  GET_BRANCHES_AND_HOURS_QUERY_KEY,
} from "../../api/restaurant/branches/getBranchesAndHours";
import getRestaurantBranchHours from "../../api/restaurant/getRestaurantBranchHours";
import getNearByRestaurants from "../../api/restaurant/getNearByRestaurant";

import { addToCart } from "../../store/reducers/cartSlice";
import { setThemeColor } from "../../store/reducers/themeSlice";
import {
  getBranchHours,
  getNearByRest,
} from "../../store/reducers/resturantsSlice";

import {
  getDistanceFromLatLonInKm,
  truncateString,
} from "../../utils/getAddress";

import { paths } from "../../routes/paths";

import "./style.css";

const toastList = new Set();
const MAX_TOAST = 1;

function CartPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const branchHours = useSelector((state) => state.resturants.branchHours);
  const nearbyRestaurants = useSelector(
    (state) => state.resturants.nearbyRestaurants
  );
  const cart = useSelector((state) => state.cart.cart);
  const totalPrice = useSelector((state) => state.cart.total);
  const country = useSelector((state) => state.auth.country);

  const pickDate = localStorage.getItem("pickDate");
  const isAsap = localStorage.getItem("isAsap");
  const pickTime = localStorage.getItem("pickTime");
  const selectedAdd = JSON.parse(localStorage.getItem("selected"));
  const currentLocation = JSON.parse(localStorage.getItem("location"));

  const [tipValue, setTipValue] = React.useState(0.25);
  const [isLoading, setIsLoading] = React.useState(false);
  const [cartItems, setCartItems] = React.useState();
  const [specialIns, setSpecialIns] = React.useState("");
  const [restaurantLogo, setRestaurantLogo] = React.useState("");
  const [restaurantName, setRestaurantName] = React.useState("");
  const [promoCode, setPromoCode] = React.useState("");
  const [promoDiscount, setPromoDiscount] = React.useState({});
  const [paymentMethod, setPaymentMethod] = React.useState("CASH");
  const [discount, setDiscount] = React.useState(0);
  const DISCOUNT_AMOUNT = Number(0).toFixed(3);
  const DELIVERY_CHARGE = Number(0).toFixed(3);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const [showTimePicker, setShowTimePicker] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [notDeliver, setNotDeliver] = useState(false);
  const [restaurantOpen, setRestaurantOpen] = useState(false);
  const [updateText, setUpdateText] = useState("");
  const [openSchedulePopup, setOpenSchedulePopup] = useState(false);
  const [userTrusted, setUserTrusted] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(
    "14 August 2023, ASAP"
  );

  const token = localStorage.getItem("token");
  // const restaurantId = localStorage.getItem("restaurantID");

  // Function to handle closing the dialog
  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  useEffect(() => {
    // Check if the user has already trusted the site
    const redirectPreference = localStorage.getItem("redirectPermission");
    if (redirectPreference === "allowed") {
      setUserTrusted(true);
    }

    // Add a beforeunload event listener to prevent the prompt
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      // Clean up the event listener when the component unmounts
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const handleBeforeUnload = (event) => {
    if (!userTrusted) {
      // Show a confirmation prompt to prevent accidental navigation
      event.returnValue = "Are you sure you want to leave this page?";
    }
  };

  useLayoutEffect(() => {
    if (location?.state?.back === "back-to-cart") {
      setUpdateText("new");
    } else {
      setUpdateText("");
    }
  }, [location?.state?.back]);

  useLayoutEffect(() => {
    if (location?.state?.back === "back-to-cart") {
      setTimeout(() => {
        navigate(location.pathname, { replace: true });
      }, 5000);
    }
  }, [location?.state?.back]);

  useLayoutEffect(() => {
    if (cartItems !== undefined && cartItems?.length > 0) {
      if (branchHours?.length === 0) {
        getBranchHoursApiCall();
      } else {
        const forCurrent = branchHours?.filter(
          (rest) => rest.restaurant_id === cart[0]?.restaurant_id
        );
        checkBranchHours(forCurrent);
      }
    }
  }, [cartItems?.length, branchHours]);

  const getBranchHoursApiCall = () => {
    getRestaurantBranchHours(cart[0]?.restaurant_id).then((res) => {
      checkBranchHours(res.data);
      dispatch(getBranchHours(res.data));
    });
  };

  const checkBranchHours = (array) => {
    if (array?.length) {
      for (let i = 0; i < array?.length; i++) {
        const selectedAddress = selectedAdd;

        if (selectedAddress !== null) {
          const resLat = +array[i]?.latitude;
          const resLng = +array[i]?.longitude;

          const selectedLat = selectedAddress?.lat;
          const selectedLng = selectedAddress?.lng;

          const distance = getDistanceFromLatLonInKm(
            resLat,
            resLng,
            selectedLat,
            selectedLng
          );

          if (distance > 50) {
            setNotDeliver(true);
          } else {
            setNotDeliver(false);
            break;
          }
        }
      }
    }
  };

  // Function to handle opening the dialog
  const handleDialogOpen = () => {
    applyPromoCode(
      {
        restaurant_id: cart[0]?.restaurant_id,
        promo_code: promoCode,
      },
      token
    )
      .then((res) => {
        if (res.message == "Invalid promo code") {
          setDialogOpen(true);
          return;
        }
        setPromoDiscount(res.data);
      })
      .catch((err) => {
        setDialogOpen(true);
      });
  };

  const { data: branchesAndHoursResponse, isSuccess } = useQuery({
    queryKey: [GET_BRANCHES_AND_HOURS_QUERY_KEY, cart[0]?.restaurant_id],
    queryFn: () => {
      return getBranchesAndHours(cart[0]?.restaurant_id);
    },
  });

  const timeByDate = branchesAndHoursResponse?.data[0]?.branch_hours?.find(
    (val) => {
      return val.week_day == pickDate?.split("-")[1];
    }
  );

  useEffect(() => {
    setCartItems(cart);
  }, [cart]);

  const checkoutHandler = (event) => {
    event.preventDefault();

    setUserTrusted(true);
    localStorage.setItem("redirectPermission", "allowed");

    const selectedAddress = selectedAdd;

    if (selectedAddress !== null) {
      const selectedLat = selectedAddress?.lat;
      const selectedLng = selectedAddress?.lng;

      const forCurrent = branchHours?.filter(
        (rest) => rest.restaurant_id === +cart[0]?.restaurant_id
      );

      for (let i = 0; i < forCurrent?.length; i++) {
        const resLat = +forCurrent[i]?.latitude;
        const resLng = +forCurrent[i]?.longitude;

        const distance = getDistanceFromLatLonInKm(
          resLat,
          resLng,
          selectedLat,
          selectedLng
        );

        if (distance > 50) {
          setNotDeliver(true);
        } else {
          if (paymentMethod === "KNET") {
            const firstWord = restaurantName?.split(" ")[0];

            const filterRestaurant = nearbyRestaurants?.filter((nearBy) => {
              const splitLogo = nearBy?.logo?.split("/");
              const splitName = splitLogo[splitLogo.length - 1];

              const name = splitName?.split("-")[0];

              return name === firstWord?.toLowerCase();
            });

            if (filterRestaurant?.length === 0) {
              setNotDeliver(true);
            } else {
              setNotDeliver(false);
              if (isAsap === "true") {
                for (let j = 0; j < filterRestaurant?.length; j++) {
                  if (filterRestaurant[j]?.openingStatus === "Open") {
                    setRestaurantOpen(false);

                    const data = {
                      ...checkoutData,
                      discount_price: getDiscountAmount(),
                    };

                    checkout(data, token)
                      .then((res) => {
                        if (res?.success === "error") {
                          const parsedError = res?.message
                            ?.split(":")[1]
                            ?.trim();

                          if (toastList.size < MAX_TOAST) {
                            const id = toast.error(parsedError, {
                              onClose: () => toastList.delete(id),
                            });
                            toastList.add(id);
                          }
                        } else {
                          const checkoutRedirectUrl =
                            res.data?.payment_methods[0].redirect_url;
                          window.location.href = checkoutRedirectUrl; // '_blank' opens the URL in a new tab
                        }
                      })
                      .catch((err) => {
                        console.log(err);
                      });

                    break;
                  } else if (filterRestaurant[j]?.openingStatus === "Close") {
                    setRestaurantOpen(true);
                  }
                }
              } else {
                const data = {
                  ...checkoutData,
                  discount_price: getDiscountAmount(),
                };

                checkout(data, token)
                  .then((res) => {
                    if (res?.success === "error") {
                      const parsedError = res?.message?.split(":")[1]?.trim();

                      if (toastList.size < MAX_TOAST) {
                        const id = toast.error(parsedError, {
                          onClose: () => toastList.delete(id),
                        });
                        toastList.add(id);
                      }
                    } else {
                      const checkoutRedirectUrl =
                        res.data?.payment_methods[0].redirect_url;
                      window.open(checkoutRedirectUrl, "_blank"); // '_blank' opens the URL in a new tab
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }

              break;
            }
          }
        }
      }
    }
  };

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
  }, [userCurrentAddress, nearbyRestaurants]);

  useEffect(() => {
    let isCartEmpty = searchParams.get("empty");

    if (cart.length > 0) {
      setCartItems(cart);
    }

    if (isCartEmpty === "true") {
      setCartItems((prevState) => {
        prevState = [];
        return prevState;
      });
    }
  }, []);

  const asapHandler = () => {
    const firstWord = restaurantName.split(" ")[0];

    const filterRestaurant = nearbyRestaurants?.filter((nearBy) => {
      const splitLogo = nearBy?.logo?.split("/");
      const splitName = splitLogo[splitLogo.length - 1];

      const name = splitName.split("-")[0];

      return name === firstWord?.toLowerCase();
    });

    for (let i = 0; i < filterRestaurant?.length; i++) {
      if (filterRestaurant[i]?.openingStatus === "Open") {
        const currentTime = new Date();
        currentTime.setMinutes(currentTime.getMinutes() + 30);

        localStorage.setItem("pickTime", dayjs(currentTime).format("hh:mm a"));
        localStorage.setItem(
          "pickDate",
          dayjs(currentTime).format("MMM DD, YYYY-dddd")
        );
        localStorage.setItem("isAsap", true);

        setOpenPopup(false);
        setRestaurantOpen(false);

        break;
      } else if (filterRestaurant[i]?.openingStatus === "Close") {
        setRestaurantOpen(true);
        setOpenPopup(false);
      }
    }
  };

  useEffect(() => {
    cartRefetch();
    getRestaurantLogo(cart[0]?.restaurant_id);
  }, [country]);

  const getRestaurantLogo = (restaurantId) => {
    setTimeout(() => {
      if (restaurantId) {
        getRestaurantDetails(restaurantId, country?.id)
          .then((res) => {
            setRestaurantLogo(res.data.logo);
            setRestaurantName(res.data.page_title_en);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }, 500);
  };

  const cartRefetch = () => {
    if (cart.length == 0) {
      setTimeout(() => {
        setIsLoading(true);
        cartList(token)
          .then((res) => {
            const resData = res.data.map((val) => {
              return {
                id: val?.item_id,
                cart_id: val.cart_id,
                itemName: val?.menu_item_name_en,
                discountedPrice: val?.discounted_price,
                price: val?.unit_price,
                quantity: val.quantity,
                variants: {
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
                },
                item_code: val.item_code,
                specialInstructions: "",
                itemImage: val?.menu_item_image,
                restaurant_id: 1,
                totalPrice: Number(val.quantity * val.unit_price).toFixed(3),
              };
            });
            setCartItems(resData);
            // dispatch(addToCart(resData));
            setIsLoading(false);
          })
          .catch((err) => {
            setCartItems([]);
            setIsLoading(false);
          });
      }, 500);
    }
  };

  const getItemTotal = () => {
    return cartItems
      .reduce((acc, cartItem) => {
        return acc + Number(cartItem.totalPrice);
      }, 0)
      .toFixed(3);
  };

  const getTipAmount = () => {
    return tipValue.toFixed(3);
  };

  const getDeliveryCharge = () => {
    return DELIVERY_CHARGE;
  };

  const getPromoDiscount = () => {
    let discount = 0;
    if (promoDiscount.discount_type == "percentage") {
      discount = (getItemTotal() / 100) * promoDiscount.discount_value;
      promoDiscount.message = `${promoDiscount.discount_value}% Discount Applied`;
    }
    return discount;
  };

  const getDiscountAmount = () => {
    return Number(getPromoDiscount()).toFixed(3);
  };

  const getGrandTotal = () => {
    return (
      Number(getItemTotal()) +
      Number(getTipAmount()) -
      Number(getDiscountAmount()) +
      Number(getDeliveryCharge())
    ).toFixed(3);
  };
  const checkoutData = {
    payment_method_id: "1",
    order_total_price:
      totalPrice + tipValue - (!isEmpty(promoDiscount) && getDiscountAmount()),
    currency_id: "3",
    country_id: "3",
    restaurant_id: "2",
    branch_id: "1",
    driver_id: "1",
    address_id: "1",
    service_type: "pickup",
    tip_id: "1",
    pick_from_store: "",
    pickup_from_car: "",
    delivery_charges: "0",
    promo_code: "Test1",
    comments: specialIns,
    schedule: {
      date: pickDate.split("-")[0],
      time: pickTime,
    },
  };

  const onDateSelected = () => {
    if (pickDate !== null) {
      setOpenSchedulePopup(false);
    }
  };

  const trunct = (str) => {
    return truncateString(str, 100);
  };

  const tipHandler = (tip) => {
    if (tip == tipValue) {
      setTipValue(0);
      return;
    }
    setTipValue(tip);
  };

  return (
    <Stack
      sx={{
        p: 3,
        minHeight: "100vh",
        color: "text.primary",
      }}
      spacing={2}
    >
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{
          position: "relative",
          paddingTop: "3px",
          paddingBottom: "8px",
        }}
      >
        <IconButton
          size="medium"
          sx={{
            position: "absolute",
            left: 0,
            boxShadow: (theme) => theme.shadows[16],
            marginLeft: "0",
            width: "42px",
            height: "42px",
          }}
          edge="start"
          onClick={() =>
            navigate(
              location?.state?.back
                ? location?.state?.back
                : location?.state?.noAddress && cart?.length
                ? `${paths.menu}/restaurant/${cart[0]?.restaurant_id}/delivery`
                : location?.state?.fromHome !== undefined
                ? paths.home
                : (location?.state?.fromMenu !== undefined ||
                    location?.state?.fromDetail !== undefined) &&
                  cart?.length
                ? `${paths.menu}/restaurant/${cart[0].restaurant_id}/delivery`
                : -1
            )
          }
        >
          <ArrowBackRoundedIcon
            fontSize="medium"
            sx={{
              width: "24px",
              height: "24px",
              color: "#1F2933",
            }}
          />
        </IconButton>
        <Typography
          variant="h5"
          component="h2"
          fontWeight={700}
          sx={{
            mb: 0,
            // marginTop: "-18px",
          }}
        >
          Your Cart
        </Typography>
        <div className="cartHeaderoption">
          <div className="cartHeaderoption-icon">
            <img src="/assets/img/Group 256.svg" alt="Option Icon" />
          </div>
        </div>
      </Stack>

      {cartItems && cartItems.length > 0 ? (
        <React.Fragment>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{
              p: 2,
              bgcolor: "#F0F6F5",
              borderRadius: "12px",
            }}
            spacing={1}
          >
            <Typography variant="h6" fontWeight={400}>
              Your order from
            </Typography>

            <Box
              sx={{
                width: "132px",
                display: "flex",
                alignItems: "center",
                justifyContent: "end",
                "& img": {
                  // width: "100%",
                  height: "auto",
                },
              }}
            >
              {restaurantLogo && (
                <img src={restaurantLogo} alt="Restaurant Logo" />
              )}
            </Box>
          </Stack>

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            sx={{
              p: 2,
              borderRadius: "12px",
              bgcolor: "#FAFAFA",
            }}
          >
            <Stack spacing={1}>
              <Typography variant="h6">Delivering To</Typography>

              <Typography
                variant="body1"
                color="textSecondary"
                sx={{
                  display: "flex",
                  maxWidth: "200px",
                }}
              >
                <LocationOnIcon fontSize="small" sx={{ mr: 0.5 }} />
                {currentLocation !== null && selectedAdd === null
                  ? trunct(currentLocation?.address)
                  : trunct(selectedAdd?.address)}
              </Typography>
            </Stack>

            <Button
              variant="text"
              color="inherit"
              size="medium"
              disableRipple
              disableElevation
              sx={{
                p: 0,
                minHeight: "auto",
                minWidth: "auto",
                textTransform: "none",
                textDecoration: "underline",
                "&:hover": {
                  backgroundColor: "inherit",
                  textDecoration: "underline",
                },
                "& .MuiButton-endIcon > *:nth-of-type(1)": {
                  fontSize: "16px",
                },
              }}
              onClick={() => {
                const initialState = {
                  restaurant_id: cart[0].restaurant_id,
                  restaurantName,
                  path: location.pathname,
                };
                if (location?.state?.fromHome !== undefined) {
                  navigate(paths.addresses, {
                    state: {
                      ...initialState,
                      fromHome: location?.state?.fromHome,
                    },
                  });
                } else if (location?.state?.fromMenu !== undefined) {
                  navigate(paths.addresses, {
                    state: {
                      ...initialState,
                      fromMenu: location?.state?.fromMenu,
                    },
                  });
                } else if (location?.state?.fromDetail !== undefined) {
                  navigate(paths.addresses, {
                    state: {
                      ...initialState,
                      fromDetail: location?.state?.fromDetail,
                    },
                  });
                } else {
                  navigate(paths.addresses, {
                    state: {
                      ...initialState,
                      fromCart: true,
                    },
                  });
                }
              }}
            >
              Change
            </Button>
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            sx={{
              p: 2,
              borderRadius: "12px",
              bgcolor: "#FAFAFA",
              border: (theme) => `1px solid ${theme.palette.divider}`,
            }}
          >
            <Stack spacing={1}>
              <Typography>Estimated Delivery Time:</Typography>

              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography
                  variant="body1"
                  color="textSecondary"
                  sx={{
                    display: "flex",
                    maxWidth: "200px",
                  }}
                >
                  <Stack
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                      bgcolor: (theme) => theme.palette.themeColor.main,
                      color: "common.white",
                      p: 1,
                      borderRadius: "8px",
                    }}
                    spacing={0}
                  >
                    <Typography
                      variant="h4"
                      fontWeight={600}
                      sx={{
                        lineHeight: 1,
                      }}
                    >
                      30
                    </Typography>
                    <Typography
                      variant="caption"
                      fontWeight={300}
                      sx={{
                        lineHeight: 1,
                      }}
                    >
                      minutes
                    </Typography>
                  </Stack>
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    color: "#026754",
                    fontFamily: "Titillium Web, sans-serif", // Set the font family
                    fontWeight: 600, // Set the font weight
                    fontSize: "14px", // Set the font size
                    lineHeight: "24px", // Set the line height
                  }}
                >
                  {pickDate?.split("-")[0]}{" "}
                  {isAsap === "true" ? "ASAP" : pickTime}
                </Typography>
              </Stack>
            </Stack>

            <Button
              variant="text"
              color="inherit"
              size="medium"
              disableRipple
              disableElevation
              sx={{
                p: 0,
                minHeight: "auto",
                minWidth: "auto",
                textTransform: "none",
                textDecoration: "underline",
                "&:hover": {
                  backgroundColor: "inherit",
                  textDecoration: "underline",
                },
                "& .MuiButton-endIcon > *:nth-of-type(1)": {
                  fontSize: "16px",
                },
              }}
              onClick={() => setOpenPopup(true)}
            >
              Schedule
            </Button>
          </Stack>

          <Dialog
            open={openPopup}
            onClose={() => setOpenPopup(false)}
            sx={{
              margin: "0",
              textAlign: "center",
            }}
            PaperProps={{
              sx: {
                overflow: "visible",
                margin: "0",
                height: "175px",
                position: "fixed",
                width: "375px",
                left: "0px !important",
                paddingTop: "20px",

                "@media (max-width: 500px)": {
                  width: "100%",
                },
              },
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontFamily: "Titillium Web, sans-serif", // Set the font family
                fontWeight: 600, // Set the font weight
                fontSize: "24px", // Set the font size
                lineHeight: "24px", // Set the line height
              }}
            >
              Order Time
            </Typography>
            <Box
              justifyContent={"center"}
              sx={{ marginTop: "30px", display: "flex" }}
            >
              <Button
                variant="contained"
                onClick={() => {
                  setOpenSchedulePopup(true);
                  setOpenPopup(false);
                }}
                sx={{ marginRight: "15px" }}
              >
                Schedule for later
              </Button>
              <Button variant="contained" onClick={asapHandler}>
                ASAP
              </Button>
            </Box>
          </Dialog>

          {/* <IconButton
            edge="end"
            color="inherit"
            onClick={() => setOpenSchedulePopup(false)}
            sx={{
              position: "absolute",
              top: "-16px",
              right: "18px",
            }}
          >
            <CloseIcon />
          </IconButton> */}

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MobileDatePicker
              // onChange={(date) =>
              //   localStorage.setItem(
              //     "pickDate",
              //     date.format("MMM DD, YYYY-dddd")
              //   )
              // }
              minDate={dayjs(new Date())}
              open={openSchedulePopup}
              defaultValue={dayjs(new Date().toString())}
              onClose={() => onDateSelected()}
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
                // onChange={(time) => {
                //   localStorage.setItem("isAsap", false);
                //   localStorage.setItem("pickTime", time.format("hh:mm a"));
                // }}
                onClose={() => setShowTimePicker(false)}
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
          <div className="scrollableContainerWrapper">
            <div className="scrollableContainer" id="scrollableContainer">
              <Stack spacing={2}>
                <Typography variant="h5">
                  Your Items
                  {cartItems.length > 0 ? ` (s)` : ""}
                </Typography>

                {cartItems.length > 0 ? (
                  cartItems.map((cartItem) => {
                    return (
                      <CartItem
                        key={cartItem?.item_code}
                        {...cartItem}
                        cartRefetch={cartRefetch}
                      />
                    );
                  })
                ) : (
                  <Typography variant="body1">No items in your cart</Typography>
                )}
              </Stack>
            </div>
          </div>
          <TextField
            id="special-instructions"
            placeholder="Special Instructions (Optional)"
            InputProps={{ disableUnderline: true }}
            multiline
            onChange={(text) => setSpecialIns(text.target.value)}
            value={specialIns}
            rows={2}
            sx={{
              "& .MuiOutlinedInput-root": {
                background: "#FAFAFA",
                border: "none",
              },
            }}
            variant="outlined"
          />

          <TextField
            id="promo-code"
            value={promoCode}
            placeholder="Promo Code"
            variant="outlined"
            onChange={(e) => setPromoCode(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                background: "#FAFAFA",
                "& input": {
                  "&::placeholder": {
                    fontWeight: 700,
                  },
                },
              },
            }}
            InputProps={{
              endAdornment: (
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: "#44D7B6",
                    "&:hover": {
                      bgcolor: "#44D7B6",
                    },
                  }}
                  disableElevation
                  disableRipple
                  onClick={handleDialogOpen} // Open the dialog on button click
                >
                  Apply
                </Button>
              ),
            }}
          />
          {promoDiscount.message && (
            <div className="promo-message-wrapper">
              <p>{promoDiscount.message}</p>
              <span onClick={() => setPromoDiscount({})}>
                <CancelIcon
                  className="promo-cancel-icon"
                  fontSize="small"
                  color="grey"
                />
              </span>
            </div>
          )}
          {/* Dialog */}
          <Dialog
            open={isDialogOpen}
            onClose={handleDialogClose}
            sx={{
              "& .MuiDialog-paper": {
                height: "178px",
                width: "327px",
                textAlign: "center",
                overflowY: "hidden",

                "@media (min-width: 600px)": {
                  left: "0",
                  position: "fixed",
                  margin: "20px",
                },

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
            <DialogTitle>
              <img src="/assets/img/exclaim.svg"></img>
            </DialogTitle>
            <DialogContent sx={{ padding: "0" }}>
              <div
                style={{
                  font: "normal normal bold 16px/18px Titillium Web",
                  color: "#959FA8",
                }}
              >
                You&apos;ve entered an invalid <br /> Promo Code!
              </div>
              <Button
                onClick={handleDialogClose}
                sx={{
                  background: "#98694E 0% 0% no-repeat padding-box",
                  border: "1px solid #707070",
                  borderRadius: "12px",
                  opacity: "1",
                  width: "116px",
                  height: "29px",
                  marginTop: "20px",
                  "&:hover": {
                    background: "#98694E 0% 0% no-repeat padding-box",
                  },
                }}
              >
                <span
                  style={{
                    font: "normal normal 600 16px/24px Titillium Web",
                    color: "#ffffff",
                  }}
                >
                  Go Back
                </span>
              </Button>
            </DialogContent>
          </Dialog>

          <Stack spacing={2}>
            <Typography variant="h5" fontWeight={500}>
              Tip the Driver
            </Typography>

            <Stack direction="row" justifyContent="space-between" spacing={1}>
              {[0.25, 0.5, 1.0].map((tip) => (
                <Box
                  key={tip + "tip"}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    borderRadius: "8px",
                    height: "88px",
                    width: "88px",
                    bgcolor: "primary.main",
                    color: "common.white",
                    cursor: "pointer",
                    border: (theme) =>
                      `1px solid ${theme.palette.primary.main}`,
                    ...(tipValue !== tip && {
                      bgcolor: "common.white",
                      color: "text.secondary",
                      border: (theme) => `1px solid ${theme.palette.divider}`,
                    }),
                    boxShadow: (theme) => theme.shadows[7],
                  }}
                  onClick={() => tipHandler(tip)}
                >
                  <SvgIcon
                    fontSize="large"
                    inheritViewBox
                    component={DollarIcon}
                    sx={{
                      mb: 1,
                    }}
                  />

                  <Typography variant="body1" fontWeight={600}>
                    {`KWD ${Number(tip).toFixed(3)}`}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Stack>
          <Stack spacing={2}>
            <Typography variant="h5" fontWeight={500}>
              Order summary
            </Typography>

            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body1">
                Item
                {cartItems.length > 1 ? `(s)` : ""} Total
              </Typography>
              <Typography variant="body1">{`KWD ${getItemTotal()}`}</Typography>
            </Stack>

            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body1">Tip</Typography>
              <Typography variant="body1">{`KWD ${getTipAmount()}`}</Typography>
            </Stack>

            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body1">Discount</Typography>
              <Typography variant="body1">{`KWD -${getDiscountAmount()}`}</Typography>
            </Stack>

            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body1">Delivery Cost</Typography>
              <Typography variant="body1">{`KWD ${getDeliveryCharge()}`}</Typography>
            </Stack>

            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body1">Total Payment</Typography>
              <Typography variant="body1">{`KWD ${getGrandTotal()}`}</Typography>
            </Stack>

            <Stack direction="row" justifyContent="space-between" spacing={1}>
              {[
                {
                  icon: (
                    <SvgIcon
                      fontSize="large"
                      inheritViewBox
                      component={DollarIcon}
                      sx={{
                        mb: 1,
                      }}
                    />
                  ),
                  name: "CASH",
                },
                {
                  icon: (
                    <SvgIcon
                      fontSize="large"
                      inheritViewBox
                      component={KNETIcon}
                      sx={{
                        mb: 1,
                      }}
                    />
                  ),
                  name: "KNET",
                },
                {
                  icon: <img src="/assets/img/credit card.png"></img>,
                  name: "Credit Card",
                },
              ].map((method) => (
                <Box
                  key={method.name + "method"}
                  sx={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    borderRadius: "8px",
                    height: "88px",
                    width: "88px",
                    cursor: "pointer",
                    bgcolor: "common.white",
                    color: "text.secondary",
                    border: (theme) => `1px solid ${theme.palette.divider}`,
                    boxShadow: (theme) => theme.shadows[7],
                  }}
                  onClick={() => setPaymentMethod(method.name)}
                >
                  {method.icon}

                  {paymentMethod === method.name && (
                    <CheckCircleIcon
                      sx={{
                        position: "absolute",
                        right: "-5px",
                        top: "-5px",
                        color: "#32C5FF",
                      }}
                      fontSize="small"
                    />
                  )}

                  <Typography variant="body1" fontWeight={600}>
                    {method.name}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Stack>

          <Button
            onClick={(e) => checkoutHandler(e)}
            variant="contained"
            size="large"
          >
            Pay Now
          </Button>
        </React.Fragment>
      ) : (
        <>
          {" "}
          {!isLoading ? (
            <Stack justifyContent="center" alignItems="center" sx={{ pt: 15 }}>
              <Typography variant="h5" fontWeight={500}>
                Your cart is empty
              </Typography>

              <Box sx={{ pt: 5 }}>
                <img src="/assets/img/cart.svg" alt="Empty Cart" />
              </Box>

              <Typography
                variant="body1"
                align="center"
                fontWeight={400}
                gutterBottom
                gap={1}
                sx={{
                  whiteSpace: "pre-line",
                  mb: 2,
                  pt: 4,
                }}
              >
                {`Looks like you have not added anything\n to your cart.\n Go ahead & explore something`}
              </Typography>

              <Button
                sx={{
                  width: "184px",
                  height: "56px",
                  mt: 5,
                }}
                variant="contained"
                size="large"
                onClick={() => navigate(location?.state?.back || -1)}
              >
                Back
              </Button>
            </Stack>
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "100px !important",
              }}
            >
              <CircularProgress />
            </Box>
          )}
        </>
      )}

      <DialogComponent
        notDeliver={notDeliver}
        setNotDeliver={setNotDeliver}
        location={location}
        hasItems={true}
        cartItems={cartItems?.length ? cartItems : []}
        updateText={updateText}
      />

      <Dialog
        open={restaurantOpen}
        onClose={() => setRestaurantOpen(false)}
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
          Restaurant you’re about to order is closed. Do you want to schedule
          for later?
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
              setOpenSchedulePopup(true);
              setOpenPopup(false);
              setRestaurantOpen(false);
            }}
          >
            Schedule for later
          </Button>
        </div>
      </Dialog>
    </Stack>
  );
}

export default CartPage;
