import React, { useEffect, useLayoutEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useQuery } from "@tanstack/react-query";

// import { toast } from "react-toastify";
// import { useTheme } from "@mui/material";
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
  // CloseIcon,
  CircularProgress,
} from "@mui/material";

import dayjs from "dayjs";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
  DateTimePicker,
  // , MobileTimePicker
} from "@mui/x-date-pickers";
// import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import LocationOnIcon from "@mui/icons-material/LocationOn";
// import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
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
// import getNearByRestaurants from "../../api/restaurant/getNearByRestaurant";
import deliveryPriceApi from "../../api/common/getDeliveryCharges";
import getAllRestaurants from "../../api/home/getAllRestaurants";

import {
  addComment,
  addToCart,
  updateCartItemQuantity,
} from "../../store/reducers/cartSlice";
// import { setThemeColor } from "../../store/reducers/themeSlice";
import {
  getBranchHours,
  getResturants,
  // getNearByRest,
} from "../../store/reducers/resturantsSlice";

import {
  getDistanceFromLatLonInKm,
  truncateString,
} from "../../utils/getAddress";

import { paths } from "../../routes/paths";

import "./style.css";
import updateCartApiCall from "../../api/cart/updateCart";

// const toastList = new Set();
// const MAX_TOAST = 1;

function CartPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const token = localStorage.getItem("token");
  const countryId = JSON.stringify(localStorage.getItem("country"));
  const restaurantId = localStorage.getItem("restaurantID");
  // const brId = localStorage.getItem("branchId");

  const cart = useSelector((state) => state.cart.cart);
  const allAreas = useSelector((state) => state.address.allAreas);

  const branchHours = useSelector((state) => state.resturants.branchHours);
  const resturantsData = useSelector(
    (state) => state.resturants.resturantsData
  );
  const totalPrice = useSelector((state) => state.cart.total);
  const comment = useSelector((state) => state.cart.comment);
  const country = useSelector((state) => state.auth.country);

  useEffect(() => {
    if (cart?.length > 0) {
      const findrestaurantName = resturantsData?.find(
        (item) => item.id === cart[0]?.restaurant_id
      );

      // localStorage.setItem("branchId", cart[0]?.branch_id);
      localStorage.setItem("restaurantID", cart[0]?.restaurant_id);
      localStorage.setItem("restaurantName", findrestaurantName?.name_en);
    }
  }, [cart, resturantsData]);

  useEffect(() => {
    if (resturantsData?.length === 0) {
      fetchRestaurants();
    }
  }, [resturantsData]);

  const fetchRestaurants = () => {
    getAllRestaurants(countryId?.id)
      .then((res) => {
        dispatch(getResturants(res?.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const pickDate = localStorage.getItem("pickDate");
  const isAsap = localStorage.getItem("isAsap");
  const pickTime = localStorage.getItem("pickTime");
  const selectedAdd = JSON.parse(localStorage.getItem("selected"));
  const currentLocation = JSON.parse(localStorage.getItem("location"));

  const [tipValue, setTipValue] = React.useState(0);
  const [tipID, setTipID] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [cartItems, setCartItems] = React.useState();
  const [specialIns, setSpecialIns] = React.useState("");
  const [restaurantLogo, setRestaurantLogo] = React.useState("");
  const [restaurantName, setRestaurantName] = React.useState("");
  const [deliveryPrice, setDeliveryPrice] = React.useState("0");
  const [promoCode, setPromoCode] = React.useState("orderseazen25");
  const [promoDiscount, setPromoDiscount] = React.useState({});
  const [paymentMethod, setPaymentMethod] = React.useState("KNET");
  // const [discount, setDiscount] = React.useState(0);
  // const DISCOUNT_AMOUNT = Number(0).toFixed(3);
  // const DELIVERY_CHARGE = Number(0).toFixed(3);
  const [isDialogOpen, setDialogOpen] = useState(false);

  // const [showTimePicker, setShowTimePicker] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [notDeliver, setNotDeliver] = useState(false);
  const [restaurantOpen, setRestaurantOpen] = useState(false);
  const [updateText, setUpdateText] = useState("");
  const [openSchedulePopup, setOpenSchedulePopup] = useState(false);
  const [userTrusted, setUserTrusted] = useState(false);
  // const [selectedSchedule, setSelectedSchedule] = useState(
  //   "14 August 2023, ASAP"
  // );

  const [pickDay, setPickDay] = useState("");
  const [minTime, setMinTime] = useState(dayjs());
  const [maxTime, setMaxTime] = useState(dayjs());
  const [isActive, setIsActive] = useState(false);
  const [addDefaultCode, setAddDefaultCode] = useState(false);
  const [isPaymentDone, setIsPaymentDone] = useState(false);

  // Function to handle closing the dialog
  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const delivCharges = () => {
    const deliveryCharges =
      localStorage.getItem("area_id") !== null &&
      allAreas.find(
        (area) =>
          area.name_en === selectedAdd?.name_en &&
          area.restaurant_id === +cart[0]?.restaurant_id
      )?.delivery_charges !== undefined
        ? allAreas
            .find(
              (area) =>
                area.name_en === selectedAdd?.name_en &&
                area.restaurant_id === +cart[0]?.restaurant_id
            )
            ?.delivery_charges?.split(" ")[1]
        : selectedAdd?.delivery_charges?.split(" ")[1];

    return deliveryCharges;
  };

  useEffect(() => {
    // Check if the user has already trusted the site
    const redirectPreference = localStorage.getItem("redirectPermission");
    if (redirectPreference === "allowed") {
      setUserTrusted(true);
    }

    // Add a beforeunload event listener to prevent the prompt
    window.addEventListener("beforeunload", handleBeforeUnload);
    fetchAllDeliveryPrice();
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

  useEffect(() => {
    if (location?.state?.back === "back-to-cart") {
      // Wait for 5 seconds then navigate, removing the 'back' property
      const timeoutId = setTimeout(() => {
        navigate(location.pathname, {
          state: { ...location.state, back: undefined },
        });
      }, 5000);

      // Clear timeout to prevent the navigation if the component unmounts or the dependency changes
      return () => clearTimeout(timeoutId);
    }
  }, [location?.state?.back]);

  useLayoutEffect(() => {
    if (cartItems !== undefined && cartItems?.length > 0) {
      if (branchHours?.length === 0) {
        getBranchHoursApiCall();
      } else {
        const forCurrent = branchHours?.filter(
          (rest) =>
            rest.restaurant_id === cart[0]?.restaurant_id &&
            +rest.id === +localStorage.getItem("branchId")
        );

        checkBranchHours(forCurrent);
      }
    }
  }, [cartItems?.length, branchHours]);

  const getBranchHoursApiCall = () => {
    getRestaurantBranchHours(cart[0]?.restaurant_id).then((res) => {
      const filtered = res.data(
        (elem) => elem.id === +localStorage.getItem("branchId")
      );

      checkBranchHours(filtered);
      dispatch(getBranchHours(res.data));
    });
  };

  const checkBranchHours = (array) => {
    let pushedWithDistance = [];

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
            pushedWithDistance.push({
              ...array[i],
              distance,
            });

            checkWithBranchIdDeliverZones(pushedWithDistance, selectedAddress);
            break;
          }
        }
      }
    }
  };

  const checkWithBranchIdDeliverZones = (
    allDistancesLessThan50,
    selectedAddress
  ) => {
    // Find the smallest distance and associated location
    const smallestDistance = Math.min(
      ...allDistancesLessThan50.map((item) => item.distance)
    );
    const smallestDistanceLocation = allDistancesLessThan50.find(
      (item) => item.distance === smallestDistance
    );

    if (smallestDistanceLocation) {
      if (selectedAddress?.name_en) {
        const checkInDelivers = allAreas.filter((area) => {
          return (
            area.name_en === selectedAddress.name_en &&
            area.restaurant_id === cart[0]?.restaurant_id
          );
        });

        if (
          checkInDelivers?.length === 0 &&
          location?.state?.back === "back-to-cart"
        ) {
          setNotDeliver(true);

          setIsLoading(false);
        } else {
          if (cart?.length > 0) {
            if (location?.state?.back === "back-to-cart") {
              if (+localStorage.getItem("branchId") !== cart[0]?.branch_id) {
                setIsLoading(true); // Start loader here

                handleUpdateObjects();
                setNotDeliver(false);
              }
            }
          } else {
            setNotDeliver(false);
          }
        }
      } else {
        setNotDeliver(true);
        setIsLoading(false);
      }
    }
  };

  const updateObject = async (updateDataForApi) => {
    try {
      // Call your API to update the updateDataForApi
      await updateCartApiCall(updateDataForApi, token);

      dispatch(
        updateCartItemQuantity({
          itemCode: updateDataForApi.item_code,
          quantity: updateDataForApi.quantity,
          branch_id: updateDataForApi?.branch_id,
        })
      );
    } catch (error) {
      console.error("Error updating", error);
    }
  };

  const handleUpdateObjects = async () => {
    try {
      // Iterate over each object in the cart and update them
      for (const object of cart) {
        const sideVariant = object.variants?.sideVariant[0]?.variantId;
        const sizeVariant = object.variants?.sizeVariant?.variantId;
        const toppingVariant = object.variants?.toppingVariant[0]?.variantId;
        const customVariant = object.variants?.customVariant[0]?.variantId;

        const updateDataForApi = {
          item_code: object.item_code,
          cart_id: object.cart_id,
          item_id: object.id,
          branch_id: +localStorage.getItem("branchId"),
          topping_variant_id: toppingVariant || null,
          side_variant_id: sideVariant || null,
          size_variant_id: sizeVariant || null,
          custom_variant_id: customVariant || null,
          quantity: object.quantity,
          size_variant: object.variants?.sizeVariant,
          topping_variant: object.variants?.toppingVariant,
          custom_variant: object.variants?.customVariant,
          side_variant: object.variants?.sideVariant,
        };

        await updateObject(updateDataForApi);
      }

      setIsLoading(false); // All objects have been updated, stop loader here
    } catch (error) {
      console.error("Error updating objects:", error);
      setIsLoading(false); // Stop loader in case of error
    }
  };

  useEffect(() => {
    if (!addDefaultCode && cart.length > 0) {
      handleDialogOpen();
    }
  }, [cart]);

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
        setAddDefaultCode(true);
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

  const branchId = cart[0]?.branch_id;

  const timeByDate = branchesAndHoursResponse?.data
    ?.find((val) => (val.id = branchId))
    ?.branch_hours?.find((val) => {
      return val.week_day == pickDay;
    });

  useEffect(() => {
    setCartItems(cart);
    setSpecialIns(comment);
  }, [cart]);

  const getSingleDigitHour = (fullTime) => {
    console.log(fullTime, "fullTime");
    let Hour;
    Hour =
      fullTime?.split(":")[0][0] == "0"
        ? fullTime?.split(":")[0][1]
        : fullTime?.split(":")[0];

    return parseInt(Hour);
  };

  const checkoutHandler = (event) => {
    event.preventDefault();
    setIsActive(true);
    setUserTrusted(true);
    setIsPaymentDone(true);
    localStorage.setItem("redirectPermission", "allowed");

    const selectedAddress = selectedAdd;

    if (selectedAddress !== null) {
      const selectedLat = selectedAddress?.lat;
      const selectedLng = selectedAddress?.lng;

      const forCurrent = branchHours?.filter(
        (rest) => rest.restaurant_id === +cart[0]?.restaurant_id
      );

      if (forCurrent?.length === 0) {
        setNotDeliver(true);
        setIsPaymentDone(false);

        return;
      }

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
          setIsPaymentDone(false);
        } else {
          if (paymentMethod === "KNET") {
            const filterRestaurant = branchHours.filter(
              (branch) =>
                branch.restaurant_id === cart[0]?.restaurant_id &&
                branch.id === +localStorage.getItem("branchId")
            );

            if (filterRestaurant?.length === 0) {
              setNotDeliver(true);
              setIsPaymentDone(false);
            } else {
              if (selectedAddress?.name_en) {
                const checkInDelivers = allAreas.filter((area) => {
                  return (
                    area.name_en === selectedAddress.name_en &&
                    area.restaurant_id === cart[0]?.restaurant_id
                  );
                });

                if (checkInDelivers.length === 0) {
                  setNotDeliver(true);
                  setIsPaymentDone(false);
                } else {
                  setNotDeliver(false);

                  if (isAsap === "true") {
                    for (let j = 0; j < filterRestaurant?.length; j++) {
                      const date = new Date();
                      const options = { weekday: "long" };
                      const dayName = date.toLocaleDateString("en-US", options);

                      const findStatus = filterRestaurant[
                        j
                      ]?.branch_hours?.filter(
                        (branch) => branch.week_day === dayName
                      );

                      if (findStatus[0].openingStatus === "Open") {
                        setRestaurantOpen(false);

                        const data = {
                          ...checkoutData,
                          branch_id: +localStorage.getItem("branchId"),
                          discount_price: getDiscountAmount(),
                        };

                        checkout(data, token)
                          .then((res) => {
                            if (res?.success === "error") {
                              setIsPaymentDone(false);
                              //   const parsedError = res?.message
                              //     ?.split(":")[1]
                              //     ?.trim();
                              //   if (toastList.size < MAX_TOAST) {
                              //     const id = toast.error(parsedError, {
                              //       onClose: () => toastList.delete(id),
                              //     });
                              //     toastList.add(id);
                              //   }
                            } else {
                              // setIsPaymentDone(false);

                              const checkoutRedirectUrl =
                                res.data?.payment_methods[0].redirect_url;
                              window.location.href = checkoutRedirectUrl; // '_blank' opens the URL in a new tab
                            }
                          })
                          .catch((err) => {
                            setIsPaymentDone(false);
                            console.log(err);
                          });

                        break;
                      } else if (findStatus[0].openingStatus === "Close") {
                        setRestaurantOpen(true);
                        setIsPaymentDone(false);
                      }
                    }
                  } else {
                    const data = {
                      ...checkoutData,
                      branch_id: +localStorage.getItem("branchId"),
                      discount_price: getDiscountAmount(),
                    };
                    checkout(data, token)
                      .then((res) => {
                        if (res?.success === "error") {
                          setIsPaymentDone(false);
                          //   const parsedError = res?.message?.split(":")[1]?.trim();
                          //   if (toastList.size < MAX_TOAST) {
                          //     const id = toast.error(parsedError, {
                          //       onClose: () => toastList.delete(id),
                          //     });
                          //     toastList.add(id);
                          //   }
                        } else {
                          // setIsPaymentDone(false);
                          const checkoutRedirectUrl =
                            res.data?.payment_methods[0].redirect_url;
                          window.location.href = checkoutRedirectUrl; // '_blank' opens the URL in a new tab
                        }
                      })
                      .catch((err) => {
                        setIsPaymentDone(false);
                        console.log(err);
                      });

                    break;
                  }
                }
              } else {
                setNotDeliver(true);
                setIsPaymentDone(false);
              }
            }
          }
          break;
        }
      }
    }
    setTimeout(() => {
      setIsActive(false);
    }, 100);
  };

  // const checkNearestRes = (selectedAddress, allDistancesLessThan50) => {
  //   // Find the smallest distance and associated location
  //   const smallestDistance = Math.min(
  //     ...allDistancesLessThan50.map((item) => item.distance)
  //   );
  //   const smallestDistanceLocation = allDistancesLessThan50.find(
  //     (item) => item.distance === smallestDistance
  //   );

  //   if (smallestDistanceLocation) {

  //   }
  // };

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
    const filterRestaurant = branchHours.filter(
      (branch) =>
        branch.restaurant_id === cart[0]?.restaurant_id &&
        branch.id === +localStorage.getItem("branchId")
    );

    for (let i = 0; i < filterRestaurant?.length; i++) {
      const date = new Date();
      const options = { weekday: "long" };
      const dayName = date.toLocaleDateString("en-US", options);

      const findStatus = filterRestaurant[i]?.branch_hours?.filter(
        (branch) => branch.week_day === dayName
      );

      if (findStatus[0].openingStatus === "Open") {
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
      } else if (findStatus[0].openingStatus === "Close") {
        setRestaurantOpen(true);
        setOpenPopup(false);
      }
    }
  };

  useEffect(() => {
    if (token !== null) {
      cartRefetch();
    }
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
              const findRestaurant = branchHours?.find(
                (branch) => branch.id === val?.branch_id
              );

              const obj = {
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
                  customVariant: val.custom_variant.map((value) => ({
                    ...value,
                    variantId: val.custom_variant_id,
                  })),
                  sideVariant: val.side_variant.map((value) => ({
                    ...value,
                    variantId: val.side_variant_id,
                  })),
                },
                item_code: val.item_code,
                specialInstructions: "",
                itemImage: val?.menu_item_image,
                restaurant_id: findRestaurant.restaurant_id,
                totalPrice: Number(val.quantity * val.unit_price).toFixed(3),
              };

              dispatch(addToCart(obj));

              return obj;
            });
            setCartItems(resData);
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
    return Number(
      selectedAdd !== null && selectedAdd.delivery_charges !== undefined
        ? Number(delivCharges() || 0)
        : 0
    ).toFixed(3);
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

  const fetchAllDeliveryPrice = () => {
    deliveryPriceApi()
      .then((res) => {
        setDeliveryPrice(res.data[0].price);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getTotalAmount = () => {
    let totalValue = 0;

    totalValue =
      totalPrice + tipValue - (!isEmpty(promoDiscount) && getDiscountAmount());
    totalValue +=
      selectedAdd !== null && selectedAdd.delivery_charges !== undefined
        ? Number(delivCharges())
        : 0;

    return totalValue;
  };

  const checkoutData = {
    payment_method_id: "1",
    order_total_price: getTotalAmount(),
    currency_id: "3",
    country_id: "3",
    restaurant_id: cart[0]?.restaurant_id,
    driver_id: "1",
    address_id: JSON.parse(localStorage.getItem("selected"))?.addressId,
    service_type: "delivery", // it will be dynamic later
    tip_id: tipID,
    tip_amount: tipValue,
    pick_from_store: "",
    pickup_from_car: "",
    delivery_charges:
      selectedAdd !== null && selectedAdd.delivery_charges !== undefined
        ? Number(delivCharges())
        : 0,
    promo_code: promoCode,
    comments: specialIns,
    delivery_schedule: {
      date: pickDate?.split("-")[0],
      time: pickTime,
    },
    schedule_later: isAsap === "true" ? "0" : "1",
  };

  const handlerFunc = (ampm, date) => {
    const selectedTime = dayjs(date);
    if (ampm == "pm") {
      setMinTime(
        selectedTime
          .set("hour", getSingleDigitHour(timeByDate?.from_time))
          .set("minute", 30)
      );
      setMaxTime(
        selectedTime
          .set("hour", getSingleDigitHour(timeByDate?.to_time))
          .set("minute", 0)
          .add(1, "day")
      );
    }
    if (ampm == "am") {
      setMinTime(
        selectedTime
          .subtract(1, "day")
          .set("hour", getSingleDigitHour(timeByDate?.from_time))
          .set("minute", 30)
      );
      setMaxTime(
        selectedTime
          .subtract(1, "day")
          .set("hour", getSingleDigitHour(timeByDate?.to_time))
          .set("minute", 0)
          .add(1, "day")
      );
    }
  };

  const onDateSelected = () => {
    if (pickDate !== null) {
      setOpenSchedulePopup(false);
    }
  };

  const trunct = (str) => {
    return truncateString(str, 100);
  };

  const tipHandler = (tip, tipID) => {
    if (tip == tipValue) {
      setTipValue(0);
      setTipID(null);
      return;
    }
    setTipValue(tip);
    setTipID(tipID);
  };

  const addCommentHandler = (comment) => {
    setSpecialIns(comment);
    dispatch(addComment(comment));
  };

  const delivTime = () => {
    const deliveryTime =
      localStorage.getItem("area_id") !== null &&
      allAreas.find(
        (area) =>
          area.name_en === selectedAdd?.name_en &&
          area.restaurant_id === +cart[0]?.restaurant_id
      )?.delivery_time !== undefined
        ? allAreas
            .find(
              (area) =>
                area.name_en === selectedAdd?.name_en &&
                area.restaurant_id === +cart[0]?.restaurant_id
            )
            ?.delivery_time?.trim()
            ?.split(" ")[0]
        : selectedAdd?.delivery_time?.trim()?.split(" ")[0];

    return deliveryTime;
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
          onClick={() => {
            if (
              location?.state?.back &&
              location?.state?.fromHome === undefined &&
              location?.state?.fromMenu === undefined &&
              location?.state?.fromDetail === undefined
            ) {
              navigate(location?.state?.back);
            } else if (
              (location?.state?.noAddress &&
                (cart?.length !== 0 || cart?.length === 0)) ||
              (location?.state?.fromMenu !== undefined &&
                (cart?.length !== 0 || cart?.length === 0)) ||
              location?.state?.editedFromCart !== undefined
            ) {
              const preserevedRestaurantID = localStorage.getItem(
                "preserevedRestaurantID"
              );

              const navigateId =
                cart?.length > 0 &&
                preserevedRestaurantID === null &&
                cart[0]?.restaurant_id === +restaurantId
                  ? cart[0]?.restaurant_id
                  : restaurantId !== null &&
                    (+restaurantId === +preserevedRestaurantID ||
                      preserevedRestaurantID === null)
                  ? restaurantId
                  : preserevedRestaurantID;

              navigate(`${paths.menu}/restaurant/${navigateId}/delivery`);
            } else if (
              location?.state?.fromHome !== undefined ||
              location?.state?.backToCart !== undefined
            ) {
              navigate(paths.home);
            } else if (
              location?.state?.fromDetail !== undefined &&
              (cart?.length !== 0 || cart?.length === 0) &&
              location?.state?.detailPath
            ) {
              navigate(location?.state?.detailPath, {
                state: {
                  ...location?.state,
                  branch_id: cart[0]?.branch_id,
                },
              });
            } else {
              navigate(-1);
            }
          }}
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

      {cartItems && cartItems.length > 0 && !isLoading ? (
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
                  restaurant_id: cart[0]?.restaurant_id,
                  branch_id: cart[0]?.branch_id,
                  restaurantName,
                  path: location.pathname,
                };

                if (location?.state?.fromHome) {
                  navigate(paths.addresses, {
                    state: {
                      ...initialState,
                      fromHome: location?.state?.fromHome,
                      backCart: true,
                    },
                  });
                } else if (location?.state?.fromMenu) {
                  navigate(paths.addresses, {
                    state: {
                      ...initialState,
                      fromMenu: location?.state?.fromMenu,
                      backCart: true,
                    },
                  });
                } else if (location?.state?.fromDetail) {
                  navigate(paths.addresses, {
                    state: {
                      ...initialState,
                      fromDetail: location?.state?.fromDetail,
                      backCart: true,
                      detailPath: location?.state?.detailPath,
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
                {selectedAdd?.delivery_time && (
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
                      className="delivery-time"
                    >
                      <Typography
                        variant="h4"
                        fontWeight={600}
                        sx={{
                          lineHeight: 1,
                        }}
                      >
                        {delivTime()}
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
                )}
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
            <DateTimePicker
              open={openSchedulePopup}
              sx={{
                display: "none",
              }}
              minTime={minTime}
              maxTime={maxTime}
              disablePast
              ampm={true}
              onChange={(date, e, ew) => {
                handlerFunc(date.format("a"), date.format("YYYY-MM-DD"));
                setPickDay(date.format("dddd"));
                date.preventDefault();
              }}
              onClose={() => {
                onDateSelected();
              }}
              onAccept={(date) => {
                setOpenSchedulePopup(false);
                if (date) {
                  localStorage.setItem(
                    "pickDate",
                    date.format("MMM DD, YYYY-dddd")
                  );
                  localStorage.setItem("isAsap", false);
                  localStorage.setItem("pickTime", date.format("hh:mm a"));
                }
              }}
            />
          </LocalizationProvider>
          <div className="scrollableContainerWrapper">
            <div className="scrollableContainer" id="scrollableContainer">
              <Stack spacing={2}>
                <Typography variant="h5">
                  Your Item
                  {cartItems.length > 0 ? `(s)` : ""}
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
            onChange={(text) => addCommentHandler(text.target.value)}
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
              {[0.25, 0.5, 1.0].map((tip, index) => (
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
                  onClick={() => tipHandler(tip, index + 1)}
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

            <Stack direction="row" justifyContent="space-around" spacing={1}>
              {[
                // {
                //   icon: (
                //     <SvgIcon
                //       fontSize="large"
                //       inheritViewBox
                //       component={DollarIcon}
                //       sx={{
                //         mb: 1,
                //       }}
                //     />
                //   ),
                //   name: "CASH",
                // },
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

          {isPaymentDone ? (
            <Button
              variant="contained"
              size="large"
              className={isActive ? "pay-now-button" : ""}
              disabled={isPaymentDone}
            >
              Processing Checkout
            </Button>
          ) : (
            <Button
              onClick={(e) => checkoutHandler(e)}
              variant="contained"
              size="large"
              className={isActive ? "pay-now-button" : ""}
              // onTouchStart={(e) => checkoutHandler(e)}
              disabled={isPaymentDone}
            >
              Pay Now
            </Button>
          )}
        </React.Fragment>
      ) : (
        <>
          {" "}
          {!isLoading && cart.length === 0 ? (
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
                onClick={() => {
                  if (
                    location?.state?.back &&
                    location?.state?.fromHome === undefined &&
                    location?.state?.fromMenu === undefined &&
                    location?.state?.fromDetail === undefined
                  ) {
                    navigate(location?.state?.back);
                  } else if (
                    (location?.state?.noAddress &&
                      (cart?.length !== 0 || cart?.length === 0)) ||
                    (location?.state?.fromMenu !== undefined &&
                      (cart?.length !== 0 || cart?.length === 0)) ||
                    location?.state?.editedFromCart !== undefined
                  ) {
                    const preserevedRestaurantID = localStorage.getItem(
                      "preserevedRestaurantID"
                    );

                    const navigateId =
                      cart?.length > 0 &&
                      preserevedRestaurantID === null &&
                      cart[0]?.restaurant_id === +restaurantId
                        ? cart[0]?.restaurant_id
                        : restaurantId !== null &&
                          (+restaurantId === +preserevedRestaurantID ||
                            preserevedRestaurantID === null)
                        ? restaurantId
                        : preserevedRestaurantID;

                    navigate(`${paths.menu}/restaurant/${navigateId}/delivery`);
                  } else if (
                    location?.state?.fromHome !== undefined ||
                    location?.state?.backToCart !== undefined
                  ) {
                    navigate(paths.home);
                  } else if (
                    location?.state?.fromDetail !== undefined &&
                    (cart?.length !== 0 || cart?.length === 0) &&
                    location?.state?.detailPath
                  ) {
                    navigate(location?.state?.detailPath, {
                      state: {
                        ...location?.state,
                        branch_id: cart[0]?.branch_id,
                      },
                    });
                  } else {
                    navigate(-1);
                  }
                }}
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
