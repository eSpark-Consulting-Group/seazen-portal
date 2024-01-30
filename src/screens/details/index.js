import React, { Fragment, useEffect, useLayoutEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { useQuery } from "@tanstack/react-query";

import { v4 as uuidv4 } from "uuid";

import {
  Button,
  Box,
  Stack,
  Checkbox,
  TextField,
  FormControlLabel,
  Skeleton,
  Typography,
  Divider,
  DialogContent,
  alpha,
  CircularProgress,
  Dialog,
  DialogTitle,
} from "@mui/material";
import { AddShoppingCartRounded } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";

import { DetailsHeader } from "../../components/header/detailsHeader";
import IncDec from "../../components/Input/InputWithIncDec";
import { DialogComponent } from "../../components/dialog";
import SelectLocation from "../../components/dialog/selectLocation";
import SchedulePicker from "../../components/shared/schedulePicker";
import ScheduleDialog from "../../components/dialog/scheduleDialog";

import getMenuItemDetails from "../../api/menu/getMenuItemDetails";
import addToCartApiCall from "../../api/cart/addToCart";
import updateCartApiCall from "../../api/cart/updateCart";
import clearCart from "../../api/cart/clearCart";
import getRestaurantBranchHours from "../../api/restaurant/getRestaurantBranchHours";
import {
  getBranchHours,
  getResturants,
  setBranchID,
} from "../../store/reducers/resturantsSlice";
import getAllRestaurants from "../../api/home/getAllRestaurants";
import { GET_ALL_RESTAURANTS_QUERY_KEY } from "../../api/home/getAllRestaurantsBanner";
import getBranchByArea from "../../api/restaurant/branches/getBranchByArea";

import {
  updateCartItem,
  addToCart,
  resetCart,
} from "../../store/reducers/cartSlice";
import { addSelectedAddress } from "../../store/reducers/userLocationSlice";

import {
  getDistanceFromLatLonInKm,
  getFullAddress,
  selectChooseAddress,
} from "../../utils/getAddress";

import { paths } from "../../routes/paths";

import "./style.css";

export const Details = () => {
  const { id } = useParams();

  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const cart = useSelector((state) => state.cart.cart);
  const resturantsData = useSelector(
    (state) => state.resturants.resturantsData
  );
  // const nearbyRestaurants = useSelector(
  //   (state) => state.resturants.nearbyRestaurants
  // );

  const branchHours = useSelector((state) => state.resturants.branchHours);
  const country = useSelector((state) => state.auth.country);

  const token = localStorage.getItem("token");
  const restaurant_id = localStorage.getItem("restaurantID");
  const selected = JSON.parse(localStorage?.getItem("selected"));
  const currentLocation = JSON.parse(localStorage.getItem("location"));

  useEffect(() => {
    const country_id = JSON.parse(localStorage.getItem("country")).id;
    const area_id = localStorage.getItem("area_id");

    if (area_id !== null && country_id !== null && restaurant_id) {
      const object = {
        country_id,
        delivery_charge_area_id: area_id,
      };

      getBranchByArea(restaurant_id, object, dispatch)
        .then((res) => {
          if (res?.data?.length === 0) {
            getBranchIdNearToLocation();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      getBranchIdNearToLocation();
    }
  }, [restaurant_id, localStorage]);

  const [cartItem, setCartItem] = React.useState();
  const [quantity, setQuantity] = React.useState(1);
  const [sizeVariant, setSizeVariant] = React.useState();
  const [toppingVariant, setToppingVariant] = React.useState([]);
  const [customVariant, setCustomVariant] = React.useState([]);
  const [sideVariant, setSideVariant] = React.useState([]);
  const [totalPrice, setTotalPrice] = React.useState();
  const [notDeliver, setNotDeliver] = React.useState(false);
  const [farRestaurant, setFarRestaurant] = React.useState(false);
  const [restaurantName, setRestaurantName] = useState("");
  const [currentRest, setCurrentRest] = React.useState({});
  const [fromPopBranch, setFromPopBranch] = useState([]);
  const [errorShow, setErrorShow] = useState(false);
  const [restaurantDetail, setRestaurantDetail] = useState({});
  const [specialInstructions, setSpecialInstructions] = React.useState("");
  const [extraToppingCount, setExtraToppingCount] = React.useState(0);
  const [customCount, setCustomCount] = React.useState(0);
  const [openAddressPopup, setOpenAddressPopup] = useState(false);
  const [fullAddress, setFullAddress] = useState(null);
  const [distanceIsFar, setDistanceIsFar] = useState(false);
  const [restaurantIsOpen, setRestaurantIsOpen] = useState(false);
  const [openSchedulePopup, setOpenSchedulePopup] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [addressId, setAddressID] = useState();
  const [delivery_charges, setDeliveryCharge] = useState();
  const [delivery_time, setDeliveryTime] = useState();
  const [minOrderAmount, setMinOrderAmount] = useState();
  const [name_en, setNameEn] = useState();
  const [sharedItemForCart, setSharedItemForCart] = useState({});
  const [clearCartModal, setClearCartModal] = useState(false);
  const [menuItemDetails, setMenuItemDetails] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [editingFromCart, setEditingFromCart] = useState(false);
  const [distancesLessThan50, setDistancesLessThan50] = useState([]);

  const restaurantsData = useSelector(
    (state) => state.resturants.resturantsData
  );

  const { search } = useLocation();

  const {
    data: getAllResturantsResponse,
    isLoading: resturantsDataLoading,
    error: resturantsDataError,
    isError: resturantsDataIsError,
    refetch,
  } = useQuery({
    queryKey: [GET_ALL_RESTAURANTS_QUERY_KEY],
    queryFn: () => getAllRestaurants(country.id),
    enabled: false,
  });

  useEffect(() => {
    if (resturantsData?.length === 0) {
      refetch();
    }
  }, [resturantsData]);

  useEffect(() => {
    if (getAllResturantsResponse?.data?.length !== 0) {
      dispatch(getResturants(getAllResturantsResponse?.data));
    }
  }, [getAllResturantsResponse]);

  useLayoutEffect(() => {
    if (
      location?.state?.branchRestaurants?.data?.length &&
      location?.state?.resturantId
    ) {
      const restBranch = location?.state?.branchRestaurants?.data?.find(
        (res) => res?.restaurant_id === +location?.state?.resturantId
      );

      setCurrentRest(restBranch);
    }
  }, [location?.state]);

  useEffect(() => {
    if (resturantsData?.length) {
      const restDetail = resturantsData?.find(
        (res) => res.id === +location?.state?.restaurant_id
      );

      setRestaurantDetail(restDetail);
      setRestaurantName(restDetail?.page_title_en);
    }
  }, [resturantsData]);

  useLayoutEffect(() => {
    // if (token !== null) {
    fetchBranchHours();
    // }
  }, []);

  const fetchBranchHours = () => {
    const restaurantId =
      location?.state?.restaurant_id === undefined
        ? restaurant_id
        : location?.state?.restaurant_id;

    if (branchHours?.length === 0) {
      getRestaurantBranchHours(restaurantId).then((res) => {
        if (res.status === "ok") {
          dispatch(getBranchHours(res?.data));
          calculateDistance(res?.data);
          setFromPopBranch(res.data);
        }
      });
    } else {
      const forCurrent = branchHours?.filter(
        (rest) => rest.restaurant_id === restaurantId
      );

      calculateDistance(forCurrent);
      setFromPopBranch(forCurrent);
    }
  };

  const calculateDistance = (array) => {
    let pushedWithDistance = [];

    if (array?.length) {
      for (let i = 0; i < array?.length; i++) {
        const resLat = +array[i]?.latitude;
        const resLng = +array[i]?.longitude;

        let fromLocation;
        if (selected === null && currentLocation !== null) {
          fromLocation = currentLocation;
        } else if (selected !== null && currentLocation !== null) {
          fromLocation = selected;
        }

        const distance = getDistanceFromLatLonInKm(
          resLat,
          resLng,
          fromLocation?.lat || 29.3140728,
          fromLocation?.lng || 47.68022
        );

        if (distance > 50) {
          setFarRestaurant(true);
        } else {
          pushedWithDistance.push({
            ...array[i],
            distance,
          });

          checkWithBranchIdDeliverZones(pushedWithDistance);
        }
      }
    }
  };

  const checkWithBranchIdDeliverZones = (allDistancesLessThan50) => {
    // Find the smallest distance and associated location
    const smallestDistance = Math.min(
      ...allDistancesLessThan50.map((item) => item.distance)
    );
    const smallestDistanceLocation = allDistancesLessThan50.find(
      (item) => item.distance === smallestDistance
    );

    if (smallestDistanceLocation) {
      setFarRestaurant(false);
    }
  };

  const restaurantTheme = useSelector((state) => state.theme.themeColor);

  useEffect(() => {
    if (localStorage?.getItem("branchId") !== undefined) {
      getItemDetails();
    }
  }, [localStorage]);

  const getItemDetails = () => {
    setIsLoading(true);
    getMenuItemDetails(id, restaurant_id, localStorage?.getItem("branchId"))
      .then((res) => {
        setIsLoading(false);
        setMenuItemDetails(res);
      })
      .catch((err) => console.error(err));
  };

  const calculateToppingVariantTotal = (toppingVariantData) => {
    const eachToppingTotal = toppingVariantData
      .map((topping, index) => {
        return topping.quantity && topping.unit_price * topping.quantity;
      })
      .filter((item) => !!item);
    const sum = eachToppingTotal.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );

    return sum;
  };
  const calculateCustomVariantTotal = (customVariantData) => {
    const eachCustomTotal = customVariantData
      .map((custom, index) => {
        return custom.quantity && custom.unit_price * custom.quantity;
      })
      .filter((item) => !!item);
    const sum = eachCustomTotal.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );

    return sum;
  };

  const calculateSidesVariantTotal = (sidesVariantData) => {
    const totalUnitPrice = sidesVariantData.reduce(
      (total, item) => total + parseFloat(item.unit_price),
      0
    );

    return totalUnitPrice;
  };

  useEffect(() => {
    const calculateTotal = () => {
      let itemTotal =
        calculateToppingVariantTotal(toppingVariant) +
        calculateCustomVariantTotal(customVariant) +
        calculateSidesVariantTotal(sideVariant) +
        (sizeVariant?.unit_price || 0) +
        Number(menuItemPriceWithoutCurrency());

      // Check if itemTotal is NaN and set it to 0.00 if NaN
      if (isNaN(itemTotal)) {
        itemTotal = Number(menuItemPriceWithoutCurrency());
      }

      if (quantity > 1) {
        itemTotal *= quantity; // Multiply by quantity if greater than 1
      }

      // Format itemTotal with exactly two decimal places
      itemTotal = itemTotal.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

      return itemTotal;
    };

    const total = calculateTotal();
    setTotalPrice(total);
  }, [
    toppingVariant,
    sizeVariant,
    quantity,
    sideVariant,
    customVariant,
    menuItemDetails,
  ]);

  useEffect(() => {
    if (location?.state?.item_code !== undefined) {
      setEditingFromCart(true);
    } else {
      setEditingFromCart(false);
    }
  }, [location?.state]);

  const checkIfItemIsInCart = () => {
    return cart.find((item) => {
      if (item.has_variants) {
        return item?.item_code === location.state?.item_code;
      } else {
        return item.id === +id;
      }
    });
  };
  React.useEffect(() => {
    const cartItem = checkIfItemIsInCart();
    if (cartItem) {
      setCartItem(cartItem);
      setQuantity(cartItem?.quantity || 1);
      setSpecialInstructions(cartItem?.specialInstructions || "");
      setSizeVariant(cartItem?.variants?.sizeVariant || null);
      setToppingVariant(cartItem?.variants?.toppingVariant || []);
      setCustomVariant(cartItem?.variants?.customVariant || []);
      setSideVariant(cartItem?.variants?.sideVariant || []);
      setTotalPrice(cartItem?.totalPrice);
      setCustomCount(
        cartItem?.variants?.customVariant?.reduce(
          (total, obj) => total + obj.quantity,
          0
        )
      );
    }
  }, [searchParams, cart, location]);

  const getCartItemQuantity = () => {
    return cartItem?.quantity;
  };

  const getCartItemPrice = () => {
    return `+KWD ${Number(cartItem?.price).toFixed(3)}`;
  };

  // i-e KWD 1.750 => 1.750 as a number
  const menuItemPriceWithoutCurrency = () => {
    return Number(menuItemDetails?.data?.price?.split(" ")[1]).toFixed(3);
  };

  const getFormattedPrice = (price) => {
    return `+KWD ${Number(price).toFixed(3)}`;
  };

  const checkIfToppingIsAdded = (name_en) => {
    return toppingVariant.find((item) => item.name_en === name_en);
  };
  const checkIfCustomIsAdded = (name_en) => {
    return customVariant.find((item) => item.name_en === name_en);
  };

  const checkIfSideIsAdded = (name_en) => {
    return sideVariant.find((item) => item.name_en === name_en);
  };

  const checkIfSizeIsAdded = (name_en) => {
    return sizeVariant?.name_en === name_en;
  };

  const handleToppingVariant = (option, variantId) => {
    const isToppingAdded = checkIfToppingIsAdded(option?.name_en);

    if (isToppingAdded) {
      // Remove the option if it's already added
      setToppingVariant((prevToppingVariant) =>
        prevToppingVariant.filter((item) => item.name_en !== option?.name_en)
      );
    } else {
      // Add the option with the variantId and quantity
      setToppingVariant((prevToppingVariant) => [
        ...prevToppingVariant,
        { ...option, variantId, option_id: option.id, quantity: 1 },
      ]);
    }
  };
  const handleCustomVariant = (option, variantId) => {
    const isCustomAdded = checkIfCustomIsAdded(option?.name_en);

    if (isCustomAdded) {
      // Remove the option if it's already added
      setCustomVariant((prevCustomVariant) =>
        prevCustomVariant.filter((item) => item.name_en !== option?.name_en)
      );
    } else {
      // Add the option with the variantId and quantity
      setCustomVariant((prevCustomVariant) => [
        ...prevCustomVariant,
        { ...option, variantId, option_id: option.id, quantity: 1 },
      ]);
    }
  };

  const handleSpecialInstructionsChange = (event) => {
    setSpecialInstructions(event.target.value);
  };

  const handleSideVariant = (option, variantId) => {
    const isSideAdded = checkIfSideIsAdded(option?.name_en);

    if (isSideAdded) {
      // Remove the option if it's already added
      setSideVariant((prevSideVariant) =>
        prevSideVariant.filter((item) => item.name_en !== option?.name_en)
      );
    } else {
      // Add the option with the variantId
      setSideVariant((prevSideVariant) => [
        ...prevSideVariant,
        { ...option, option_id: option.id, variantId },
      ]);
    }
  };

  const handleSizeVariant = (option, variantId) => {
    const isSizeAdded = checkIfSizeIsAdded(option?.name_en);

    if (isSizeAdded) {
      // If the size is already added, set it to null to remove it
      setSizeVariant(null);
    } else {
      // Add the variantId to the selected size option
      const sizeWithVariantId = { ...option, option_id: option.id, variantId };
      if (sizeWithVariantId.name_en.toLowerCase() == "small") {
        sizeWithVariantId.unit_price = 0;
      }
      setSizeVariant(sizeWithVariantId);
      setErrorShow(false);
    }
  };

  const getExtraToppingQuantity = (option) => {
    return (
      toppingVariant.find((item) => item.name_en === option?.name_en)
        ?.quantity || 0
    );
  };
  const getCustomQuantity = (option) => {
    return (
      customVariant.find((item) => item.name_en === option?.name_en)
        ?.quantity || 0
    );
  };

  const handleAddToppingQuantity = (variantId, option) => {
    setToppingVariant((prevToppingVariant) => {
      // Find the index of the topping with the same name_en
      const index = prevToppingVariant.findIndex(
        (item) => item.name_en === option.name_en
      );
      setExtraToppingCount((prev) => prev + 1);

      // If the topping with the same name_en exists, update its quantity
      if (index !== -1) {
        const updatedToppingVariant = [...prevToppingVariant];
        updatedToppingVariant[index] = {
          ...updatedToppingVariant[index],
          quantity: (updatedToppingVariant[index].quantity || 0) + 1,
        };
        return updatedToppingVariant;
      } else {
        // If the topping doesn't exist, add it with quantity 1
        return [
          ...prevToppingVariant,
          { ...option, option_id: option.id, quantity: 1, variantId },
        ];
      }
    });
  };

  const handleAddCustomQuantity = (variantId, option) => {
    setCustomVariant((prevCustomVariant) => {
      // Find the index of the Custom with the same name_en
      const index = prevCustomVariant.findIndex(
        (item) => item.name_en === option.name_en
      );
      setCustomCount((prev) => prev + 1);

      // If the Custom with the same name_en exists, update its quantity
      if (index !== -1) {
        const updatedCustomVariant = [...prevCustomVariant];
        updatedCustomVariant[index] = {
          ...updatedCustomVariant[index],
          quantity: (updatedCustomVariant[index].quantity || 0) + 1,
          total:
            ((updatedCustomVariant[index].quantity || 0) + 1) *
            updatedCustomVariant[index].unit_price,
        };
        return updatedCustomVariant;
      } else {
        // If the Custom doesn't exist, add it with quantity 1
        return [
          ...prevCustomVariant,
          {
            ...option,
            option_id: option.id,
            quantity: 1,
            variantId,
            total: option.unit_price,
          },
        ];
      }
    });
  };

  const handleRemoveToppingQuantity = (option) => {
    setToppingVariant((prevToppingVariant) => {
      // Find the index of the topping with the same name_en
      const index = prevToppingVariant.findIndex(
        (item) => item.name_en === option.name_en
      );
      setExtraToppingCount((prev) => prev - 1);
      if (index !== -1) {
        const updatedToppingVariant = [...prevToppingVariant];
        const updatedQuantity =
          (updatedToppingVariant[index].quantity || 0) - 1;

        if (updatedQuantity > 0) {
          // If the updated quantity is greater than 0, update it
          updatedToppingVariant[index] = {
            ...updatedToppingVariant[index],
            quantity: updatedQuantity,
          };
        } else {
          // If the updated quantity is 0 or less, remove the topping
          updatedToppingVariant.splice(index, 1);
        }

        return updatedToppingVariant;
      }

      return prevToppingVariant; // No change if topping doesn't exist
    });
  };
  const handleRemoveCustomQuantity = (option) => {
    setCustomVariant((prevCustomVariant) => {
      // Find the index of the Custom with the same name_en
      const index = prevCustomVariant.findIndex(
        (item) => item.name_en === option.name_en
      );
      setCustomCount((prev) => prev - 1);
      if (index !== -1) {
        const updatedCustomVariant = [...prevCustomVariant];
        const updatedQuantity = (updatedCustomVariant[index].quantity || 0) - 1;

        if (updatedQuantity > 0) {
          // If the updated quantity is greater than 0, update it
          updatedCustomVariant[index] = {
            ...updatedCustomVariant[index],
            quantity: updatedQuantity,
            total: updatedQuantity * updatedCustomVariant[index].unit_price,
          };
        } else {
          // If the updated quantity is 0 or less, remove the custom
          updatedCustomVariant.splice(index, 1);
        }

        return updatedCustomVariant;
      }

      return prevCustomVariant; // No change if custom doesn't exist
    });
  };

  const variantsForApi = (variantID, optionId, quantity) => {
    const { data } = menuItemDetails;
    const dataVariants = data.variants?.find((val) => val.id === variantID);
    if (!dataVariants) return [];
    const dataOptions = dataVariants.options?.map((val, index) => {
      return {
        option_id: val.id,
        option_quantity: optionId.find((val2) => val2 == val.id)
          ? quantity.find((val3) => val3.id == val.id).quantity
          : 0,
      };
    });
    return dataOptions;
  };

  const getSelectedItemsIds = (selectedItems) => {
    const idsArr = selectedItems.map((val) => val.id);

    return idsArr;
  };

  const addToCartApiHandler = (cartItem) => {
    const sideVariant = cartItem.variants?.sideVariant[0]?.variantId;
    const sizeVariant = cartItem.variants?.sizeVariant?.variantId;
    const toppingVariant = cartItem.variants?.toppingVariant[0]?.variantId;
    const customVariant = cartItem.variants?.customVariant[0]?.variantId;
    let cartItemDataForApi = {
      item_code: cartItem.item_code,
      item_id: cartItem.id,
      branch_id: cartItem.branch_id,
      special_instructions: cartItem.specialInstructions,
      quantity: cartItem.quantity,
      topping_variant_id: toppingVariant || null,
      side_variant_id: sideVariant || null,
      size_variant_id: sizeVariant || null,
      custom_variant_id: customVariant || null,
      size_variant: variantsForApi(
        sizeVariant,
        cartItem.variants?.sizeVariant?.id
      ),
      topping_variant: variantsForApi(
        toppingVariant,
        getSelectedItemsIds(cartItem.variants?.toppingVariant),
        cartItem.variants?.toppingVariant[0]?.quantity
      ),
      custom_variant: variantsForApi(
        customVariant,
        getSelectedItemsIds(cartItem.variants?.customVariant),
        cartItem.variants?.customVariant
      ),
      side_variant: variantsForApi(
        sideVariant,
        getSelectedItemsIds(cartItem.variants?.sideVariant)
      ),
    };

    if (checkIfItemIsInCart()) {
      cartItemDataForApi = {
        ...cartItemDataForApi,
        cart_id: cartItem.cart_id,
      };

      updateCartApiCall(cartItemDataForApi, token)
        .then((res) => {})
        .catch((err) => {
          console.log(err);
        });
    } else {
      addToCartApiCall(cartItemDataForApi)
        .then((res) => {
          dispatch(addToCart({ ...cartItem, cart_id: res?.data?.cart_id }));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const clearCartItems = () => {
    dispatch(resetCart());
    clearCart(token)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddToCart = () => {
    const { data } = menuItemDetails;

    const hasSizeVariant = data?.variants.find(
      (val) => val.variant_type == "size"
    );

    if (
      cart.length > 0 &&
      data.restaurant_id !== cart[0]?.restaurant_id &&
      !clearCartModal
    ) {
      setClearCartModal(true);
      return;
    }

    if (hasSizeVariant && !sizeVariant) {
      setErrorShow(true);
      return;
    }

    var ItemDataObject = {
      id: data?.id,
      itemName: data?.name_en,
      discountedPrice: data?.discounted_price,
      price: data?.price,
      quantity: quantity,
      variants: {
        sizeVariant: sizeVariant,
        toppingVariant: toppingVariant,
        sideVariant: sideVariant,
        customVariant: customVariant,
      },
      totalPrice: Number(totalPrice).toFixed(3),
      specialInstructions: specialInstructions,
      itemImage: data?.image,
      has_variants: data?.has_variants,
      restaurant_id: data.restaurant_id,
      branch_id: data?.branch_id,
    };

    // const itemExists =
    //   ItemDataObject.has_variants &&
    //   (ItemDataObject?.variants?.sizeVariant ||
    //     ItemDataObject?.variants?.toppingVariant ||
    //     ItemDataObject?.variants?.customVariant ||
    //     ItemDataObject.variants?.sideVariant)
    //     ? cart.find(
    //         (item) =>
    //           JSON.stringify(item.variants) ===
    //           JSON.stringify(ItemDataObject.variants)
    //       )
    //     : false;

    if (checkIfItemIsInCart()) {
      const item_code = cartItem?.item_code;
      const cart_id = cartItem?.cart_id;

      ItemDataObject = {
        ...ItemDataObject,
        item_code,
        cart_id,
      };

      dispatch(updateCartItem(ItemDataObject));
      addToCartApiHandler(ItemDataObject);

      if (editingFromCart) {
        navigate(paths.cart);
      } else {
        navigate(`${paths.menu}/restaurant/${+restaurant_id}/delivery`, {
          state: { addFromDetail: true },
        });
      }
    } else {
      const item_code = uuidv4();

      ItemDataObject = {
        ...ItemDataObject,
        item_code,
      };

      // if (!itemExists) {
      // dispatch(addToCart(ItemDataObject));
      addToCartApiHandler(ItemDataObject);
      // }
      navigate(`${paths.menu}/restaurant/${+restaurant_id}/delivery`, {
        state: { addFromDetail: true },
      });
    }
    // dispatch(addSizeVariant({ id: id, size: sizeVariant }));
    // dispatch(addExtraToppings({ id: id, extraToppings: toppingVariant }));
    // dispatch(addExtraSides({ id: id, extraSides: sideVariant }));
  };

  const openNotDelivered = () => {
    const { data } = menuItemDetails;

    const hasSizeVariant = data?.variants.find(
      (val) => val.variant_type == "size"
    );

    if (hasSizeVariant && !sizeVariant) {
      setErrorShow(true);
      return;
    }

    createAndAddState(data);
  };

  const createAndAddState = (data) => {
    var ItemDataObject = {
      id: data?.id,
      itemName: data?.name_en,
      discountedPrice: data?.discounted_price,
      price: data?.price,
      quantity: quantity,
      variants: {
        sizeVariant: sizeVariant,
        toppingVariant: toppingVariant,
        sideVariant: sideVariant,
        customVariant: customVariant,
      },
      totalPrice: Number(totalPrice).toFixed(3),
      specialInstructions: specialInstructions,
      itemImage: data?.image,
      has_variants: data?.has_variants,
      restaurant_id: data.restaurant_id,
      branch_id: data?.branch_id,
    };

    const item_code = uuidv4();

    ItemDataObject = {
      ...ItemDataObject,
      item_code,
    };

    const restaurantIdForRedirect = localStorage?.getItem("restaurantID");
    const findName = resturantsData?.find(
      (restaurant) => restaurant.id === +restaurantIdForRedirect
    );

    const sharedState = {
      restaurant_id: +restaurant_id,
      path: location.pathname,
      restaurantName: findName?.name_en,
      ItemDataObject,
      menuItemDetails,
      guest: true,
    };

    setRestaurantName(findName?.name_en);
    setSharedItemForCart(sharedState);

    setNotDeliver(true);
  };

  const moveToLocation = () => {
    const { data } = menuItemDetails;

    const hasSizeVariant = data?.variants.find(
      (val) => val.variant_type == "size"
    );

    if (hasSizeVariant && !sizeVariant) {
      setErrorShow(true);
      return;
    }

    createAndAddWithNavigation(data);
  };

  const createAndAddWithNavigation = (data) => {
    var ItemDataObject = {
      id: data?.id,
      itemName: data?.name_en,
      discountedPrice: data?.discounted_price,
      price: data?.price,
      quantity: quantity,
      variants: {
        sizeVariant: sizeVariant,
        toppingVariant: toppingVariant,
        sideVariant: sideVariant,
        customVariant: customVariant,
      },
      totalPrice: Number(totalPrice).toFixed(3),
      specialInstructions: specialInstructions,
      itemImage: data?.image,
      has_variants: data?.has_variants,
      restaurant_id: data.restaurant_id,
      branch_id: data?.branch_id,
    };

    const item_code = uuidv4();

    ItemDataObject = {
      ...ItemDataObject,
      item_code,
    };

    const restaurantIdForRedirect = localStorage?.getItem("restaurantID");
    const findName = resturantsData?.find(
      (restaurant) => restaurant.id === +restaurantIdForRedirect
    );

    const sharedState = {
      restaurant_id: +restaurant_id,
      path: location.pathname,
      restaurantName: findName?.name_en,
      ItemDataObject,
      menuItemDetails,
      guest: true,
    };

    if (!location?.state?.locationDeliver) {
      navigate(paths.phone_verification_index, {
        state: sharedState,
      });
    } else {
      navigate(paths.location, {
        state: sharedState,
      });
    }
  };

  const handleClose = () => {
    setNotDeliver(false);
  };

  const chooseAddress = (item) => {
    const object = {
      country_id: JSON.parse(localStorage.getItem("country"))?.id,
      delivery_charge_area_id: item?.delivery_charge_area_info.id,
    };

    getBranchByArea(restaurant_id, object, dispatch)
      .then((res) => {
        if (res?.data?.length === 0) {
          getBranchIdNearToLocation();
        }
      })
      .catch((err) => {
        console.log(err);
      });

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

  const getBranchIdNearToLocation = () => {
    if (branchHours?.length) {
      const pushedDistanceWithDetail = [];

      const filterBranch = branchHours?.filter(
        (rest) => rest.restaurant_id === +restaurant_id
      );

      let fromLocation;
      if (selected === null && currentLocation !== null) {
        fromLocation = currentLocation;
      } else if (selected !== null && currentLocation !== null) {
        fromLocation = selected;
      }

      if (branchHours.length && filterBranch?.length) {
        for (const filtBranch of filterBranch) {
          const resLat = +filtBranch?.latitude;
          const resLng = +filtBranch?.longitude;

          const distance = getDistanceFromLatLonInKm(
            resLat,
            resLng,
            fromLocation?.lat || 29.3140728,
            fromLocation?.lng || 47.68022
          );

          // Check if any distance is less than 50
          if (distance < 50) {
            pushedDistanceWithDetail.push({
              ...filtBranch,
              distance: distance,
            });

            setDistancesLessThan50(pushedDistanceWithDetail);
          }
        }
      }
    }
  };

  useEffect(() => {
    // Find the smallest distance and associated location
    const smallestDistance = Math.min(
      ...distancesLessThan50.map((item) => item.distance)
    );
    const smallestDistanceLocation = distancesLessThan50.find(
      (item) => item.distance === smallestDistance
    );

    if (smallestDistanceLocation) {
      localStorage.setItem("branchId", smallestDistanceLocation.id);
      dispatch(setBranchID(smallestDistanceLocation.id));
    }
  }, [localStorage, distancesLessThan50]);

  useEffect(() => {
    const filterBranch = branchHours?.filter(
      (rest) => rest.restaurant_id === +restaurant_id
    );

    if (fullAddress !== null) {
      let pushedWithDistance = [];

      if (cart?.length === 0) {
        const addToStore = {
          ...fullAddress,
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

            checkWithBranchIdDeliverZonesFullAddress(
              pushedWithDistance,
              filterBranch
            );
          }
        }
      }
    }
  }, [fullAddress, branchHours]);

  const checkWithBranchIdDeliverZonesFullAddress = (
    allDistancesLessThan50,
    filterBranch
  ) => {
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

      checkNearByRest(filterBranch);
    }
  };

  const checkNearByRest = (branch) => {
    const addToStore = {
      ...fullAddress,
      addressId,
      delivery_charges,
      delivery_time,
      minOrderAmount,
      name_en,
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
            setRestaurantIsOpen(false);
            navigate(paths?.cart, {
              state: { fromDetail: true, path: "/home" },
            });

            break;
          } else {
            setRestaurantIsOpen(true);
          }
        }
      } else {
        setRestaurantIsOpen(false);
        navigate(paths?.cart, {
          state: { fromDetail: true, path: "/home" },
        });
      }
    }
  };

  const navigateUser = () => {
    navigate(paths.location, {
      state: {
        path: "menu/restaurant",
        restaurant_id: restaurant_id,
        restaurantName: restaurantDetail?.name_en,
        addNew: true,
      },
    });
  };

  const previousRestaurant = restaurantsData?.find((val) => {
    return val.id == cart[0]?.restaurant_id;
  });
  const currentRestaurant = restaurantsData?.find((val) => {
    return val.id == restaurant_id;
  });

  const getVariantValidate = (variantName) => {
    if (variantName === "Choose the Size") {
      return "(Required)";
    } else if (
      variantName === "Extra Topping" ||
      variantName === "Extra Sides"
    ) {
      return "(Optional)";
    } else {
      return "";
    }
  };

  const labelDisableHandler = (variant, optionsName) => {
    if (
      variant.name_en == "Extra Topping" ||
      variant.variant_type == "custom"
    ) {
      if (
        !checkIfToppingIsAdded(optionsName) &&
        !checkIfCustomIsAdded(optionsName)
      ) {
        if (extraToppingCount == 7 || customCount == variant.upto_limit) {
          return true;
        }
      }
    }
    return false;
  };

  const buttonDisableHandle = () => {
    if (menuItemDetails?.data.has_variants) {
      // if (customCount < 1) {
      //   return true;
      // }

      if (sizeVariant) {
        return true;
      }
    }
    return false;
  };

  return (
    <>
      <Dialog
        open={clearCartModal}
        onClose={() => {}}
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
              setClearCartModal(false);
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
          {`Warning: You are about to change your original order from ${previousRestaurant?.name_en} to ${currentRestaurant?.name_en}. All items currently in your cart from ${previousRestaurant?.name_en} will be removed. Continue?.`}
        </DialogContent>
        <div className="btn-navigate">
          <Button
            className="common-st add-btn"
            onClick={() => setClearCartModal(false)}
          >
            No
          </Button>

          <Button
            className="common-st go-to-btn"
            onClick={() => {
              clearCartItems();
              handleAddToCart();
            }}
          >
            Yes
          </Button>
        </div>
      </Dialog>
      {!isLoading ? (
        <div>
          <DetailsHeader
            image={menuItemDetails?.data?.image}
            setOpenAddressPopup={setOpenAddressPopup}
            fromDetail={true}
            editItem={location?.state?.editItem}
            branch_id={location?.state?.branch_id}
          />
          <div className="container-fluid section">
            <Stack
              spacing={2}
              sx={{
                color: "common.black",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: -2.5 * 8,
                  right: 3 * 8,
                  backgroundColor: (theme) => theme.palette.themeColor.main,
                  color: "white",
                  borderRadius: "12px",
                  zIndex: 1,
                  width: "121px",
                  height: "35px",
                  display: "flex",
                  justifyContent: "center",
                  paddingTop: "8px",
                }}
              >
                <Typography variant="body1" component="div">
                  <Typography
                    variant="subtitle2"
                    component="sup"
                    sx={{
                      mr: 0.5,
                      fontWeight: "600",
                      fontSize: "13px",
                    }}
                  >
                    KWD
                  </Typography>
                  <div
                    style={{
                      fontWeight: "700",
                      marginTop: "-29px",
                      marginLeft: "29px",
                      fontSize: "18px",
                    }}
                  >
                    {menuItemPriceWithoutCurrency()}
                  </div>
                </Typography>
              </Box>
              <Stack spacing={1}>
                {isLoading ? (
                  <Skeleton variant="rectangular" width={210} height={118} />
                ) : (
                  <>
                    <Stack
                      direction="row"
                      spacing={2}
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography
                        variant="h5"
                        component="div"
                        sx={{
                          marginLeft: "12px !important",
                          fontSize: "22px",
                        }}
                      >
                        {menuItemDetails?.data?.name_en}
                      </Typography>

                      {/* <Typography
                        variant="caption"
                        component="div"
                        sx={{
                          color: (theme) => theme.palette.themeColor.main,
                          marginRight: "15px !important",
                        }}
                      >
                        483 Kcal
                      </Typography> */}
                    </Stack>
                    <Typography
                      variant="body2"
                      component="div"
                      sx={{
                        marginLeft: "12px !important",
                        fontWeight: "normal",
                      }}
                    >
                      {menuItemDetails?.data?.description_en}
                    </Typography>
                  </>
                )}

                {menuItemDetails &&
                  menuItemDetails?.data?.variants?.map((variant) => {
                    return (
                      <Stack key={variant?.id} spacing={0.5}>
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                          spacing={1}
                          sx={{
                            py: 0.5,
                            px: 1.5,
                            // borderRadius: 999,
                            backgroundColor: (theme) =>
                              alpha(theme.palette.themeColor.main, 0.12),
                            height: "40px",
                            borderRadius: "16px",
                            display: "flex",
                            alignItems: "center",
                            border:
                              errorShow && variant?.name_en == "Choose the Size"
                                ? "1px solid red"
                                : "",
                          }}
                        >
                          <Typography
                            variant="h6"
                            component="div"
                            fontWeight="600"
                          >
                            {variant?.name_en}

                            <Typography
                              variant="subtitle2"
                              component="sub"
                              color="GrayText"
                              fontWeight="600"
                              sx={{
                                ml: 0.5,
                                top: "-1px",
                              }}
                            >
                              {variant.variant_type == "size"
                                ? "(Choose 1)"
                                : `(Choose up to ${variant.upto_limit})`}
                            </Typography>
                          </Typography>

                          <Typography
                            variant="body1"
                            component="div"
                            fontWeight={600}
                            sx={{
                              color: (theme) => theme.palette.themeColor.main,
                              display: "flex",
                              marginBottom: "1px",
                            }}
                          >
                            {errorShow &&
                              variant.name_en === "Choose the Size" && (
                                <img
                                  style={{ marginRight: "5px" }}
                                  src="/assets/img/errorIcon.svg"
                                  alt="error_icon"
                                />
                              )}
                            <span style={{ marginBottom: 2 }}>
                              {getVariantValidate(variant.name_en)}
                            </span>
                          </Typography>
                        </Stack>

                        {variant?.options?.map((option, index) => {
                          const isLastItem =
                            variant?.options?.length - 1 === index;

                          return (
                            <Fragment key={option?.id}>
                              <Stack
                                direction="row"
                                spacing={0.5}
                                justifyContent="space-between"
                                alignItems="center"
                                sx={{
                                  marginLeft: "-7px !important",
                                  // color:
                                  //   variant.name_en === "Extra Topping" &&
                                  //   isLastItem
                                  //     ? "#e0e0e0"
                                  //     : "", // Apply grey background to last item in Extra Topping section
                                }}
                              >
                                <FormControlLabel
                                  checked={
                                    variant.name_en === "Choose the Size"
                                      ? checkIfSizeIsAdded(option?.name_en)
                                      : // : variant.name_en === "Extra Topping"
                                      // ? checkIfToppingIsAdded(option?.name_en)
                                      variant.name_en === "Extra Sides"
                                      ? checkIfSideIsAdded(option?.name_en)
                                      : false
                                  }
                                  onChange={() => {
                                    variant.name_en === "Choose the Size"
                                      ? handleSizeVariant(option, variant.id)
                                      : variant.name_en === "Extra Topping"
                                      ? handleToppingVariant(option, variant.id)
                                      : variant.variant_type === "custom"
                                      ? handleCustomVariant(option, variant.id)
                                      : variant.name_en === "Extra Sides"
                                      ? handleSideVariant(option, variant.id)
                                      : () => {};
                                  }}
                                  control={
                                    variant.name_en !== "Extra Topping" &&
                                    variant.variant_type !== "custom" ? (
                                      <Checkbox color="themeColor" />
                                    ) : (
                                      <span
                                        style={{
                                          marginLeft: "12px",
                                          marginTop: "40px",
                                        }}
                                        color="themeColor"
                                      />
                                    )
                                  }
                                  label={option?.name_en}
                                  disabled={labelDisableHandler(
                                    variant,
                                    option?.name_en
                                  )}
                                  sx={{ width: "100%" }}
                                />
                                {variant.name_en === "Extra Topping" ||
                                  (variant.variant_type === "custom" && (
                                    <div className="extra-topping-price-wrapper">
                                      <p className="extra-topping-price">{`(Each +KWD ${option?.unit_price})`}</p>
                                    </div>
                                  ))}

                                {variant.name_en === "Extra Topping" ? (
                                  <IncDec
                                    IncButtonProps={{
                                      disabled: extraToppingCount == 7,
                                    }}
                                    DecButtonProps={{
                                      disabled: !checkIfToppingIsAdded(
                                        option?.name_en ||
                                          getExtraToppingQuantity(option) === 0
                                      ),
                                    }}
                                    quantity={getExtraToppingQuantity(option)}
                                    onIncrease={() => {
                                      handleAddToppingQuantity(
                                        variant.id,
                                        option
                                      );
                                    }}
                                    onDecrease={() => {
                                      handleRemoveToppingQuantity(option);
                                    }}
                                  />
                                ) : null}
                                {variant.variant_type === "custom" ? (
                                  <IncDec
                                    IncButtonProps={{
                                      disabled:
                                        customCount == variant.upto_limit,
                                    }}
                                    DecButtonProps={{
                                      disabled: !checkIfCustomIsAdded(
                                        option?.name_en ||
                                          getCustomQuantity(option) === 0
                                      ),
                                    }}
                                    quantity={getCustomQuantity(option)}
                                    onIncrease={() => {
                                      handleAddCustomQuantity(
                                        variant.id,
                                        option
                                      );
                                    }}
                                    onDecrease={() => {
                                      handleRemoveCustomQuantity(option);
                                    }}
                                  />
                                ) : null}
                                {variant.name_en === "Choose the Size" ||
                                variant.name_en === "Extra Sides" ? (
                                  <Typography
                                    variant="body1"
                                    component="div"
                                    sx={{
                                      color: "common.black",
                                      marginRight: "10px !important",
                                    }}
                                  >
                                    {variant.name_en === "Choose the Size" &&
                                    index === 0
                                      ? ""
                                      : getFormattedPrice(option?.unit_price)}
                                  </Typography>
                                ) : null}
                              </Stack>

                              {variant?.options?.length - 1 !== index && (
                                <Divider />
                              )}
                            </Fragment>
                          );
                        })}
                      </Stack>
                    );
                  })}
              </Stack>

              <TextField
                multiline
                value={specialInstructions}
                rows={4}
                placeholder="Special instructions (Optional)"
                InputProps={{
                  classes: {
                    notchedOutline: "custom-notched-outline", // Add a custom class to override the styles
                  },
                }}
                sx={{
                  "& .custom-notched-outline": {
                    border: "none", // Remove the border
                  },
                  background: "#FAFAFA 0% 0% no-repeat padding-box",
                  borderRadius: "16px",
                }}
                onChange={handleSpecialInstructionsChange}
                fullWidth
              />
              <Stack
                spacing={0}
                alignItems="center"
                sx={{
                  pb: 2,
                }}
              >
                <Box
                  sx={{
                    width: "85%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    py: 1,
                    px: 2,
                    borderTopLeftRadius: "12px",
                    borderTopRightRadius: "12px",
                    color: "common.white",
                    backgroundColor: (theme) => theme.palette.themeColor.main,
                  }}
                >
                  <Typography variant="h6" component="div">
                    Quantity
                  </Typography>

                  <IncDec
                    quantity={quantity}
                    onIncrease={() => {
                      setQuantity(quantity + 1);
                    }}
                    onDecrease={() => {
                      if (quantity > 0) {
                        setQuantity(quantity - 1);
                      }
                    }}
                    IncButtonProps={{
                      // disabled: quantity === 10,
                      sx: {
                        color: "common.white",
                        backgroundColor: "#ffffff24",
                        "&:hover": {
                          backgroundColor: "#ffffff24",
                        },
                      },
                    }}
                    DecButtonProps={{
                      // disabled: quantity === 0,
                      sx: {
                        color: "common.white",
                        backgroundColor: "#ffffff24",
                        "&:hover": {
                          backgroundColor: "#ffffff24",
                        },
                      },
                    }}
                  />
                </Box>
                <Button
                  size="large"
                  variant="contained"
                  fullWidth
                  disabled={buttonDisableHandle()}
                  sx={{
                    py: 2,
                    display: "flex",
                    justifyContent:
                      location?.state?.locationDeliver ||
                      token === null ||
                      farRestaurant
                        ? "center"
                        : "space-between",
                    alignItems: "center",
                    backgroundColor: `${restaurantTheme.main} !important`,
                    "&:hover": {
                      backgroundColor: (theme) =>
                        theme.palette.themeColor.light,
                    },
                  }}
                  onClick={
                    location?.state?.locationDeliver || farRestaurant
                      ? openNotDelivered
                      : token === null
                      ? moveToLocation
                      : handleAddToCart
                  }
                >
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      position: "absolute",
                      background: buttonDisableHandle()
                        ? "#ffffff74"
                        : "#ffffff24",
                      left: "0px",
                    }}
                  ></div>
                  {location?.state?.locationDeliver || farRestaurant ? (
                    <Typography
                      variant="h6"
                      component="span"
                      fontWeight={600}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                      }}
                    >
                      Change Location to Start Ordering
                    </Typography>
                  ) : token === null ? (
                    <Typography
                      variant="h6"
                      component="span"
                      fontWeight={600}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                      }}
                    >
                      Start Ordering
                    </Typography>
                  ) : (
                    <>
                      <Typography
                        variant="h6"
                        component="span"
                        fontWeight={600}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          color: "white",
                        }}
                      >
                        <AddShoppingCartRounded
                          sx={{
                            mr: 1,
                          }}
                        />
                        {checkIfItemIsInCart() ? "Update Cart" : "Add to Cart"}
                      </Typography>
                      <Typography
                        variant="body1"
                        component="span"
                        sx={{
                          color: "white",
                        }}
                      >
                        +KWD {Number(totalPrice).toFixed(3)}
                      </Typography>
                    </>
                  )}
                </Button>
              </Stack>
            </Stack>
          </div>

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

          <SchedulePicker
            openSchedulePopup={openSchedulePopup}
            setOpenSchedulePopup={setOpenSchedulePopup}
            showTimePicker={showTimePicker}
            setShowTimePicker={setShowTimePicker}
            menuCard={true}
          />

          <ScheduleDialog
            restaurantOpen={restaurantIsOpen}
            setRestaurantOpen={setRestaurantIsOpen}
            setOpenSchedulePopup={setOpenSchedulePopup}
            menuCard={true}
          />

          <DialogComponent
            notDeliver={notDeliver}
            setNotDeliver={setNotDeliver}
            location={location}
            fromDetail={true}
            locationDeliver={location?.state?.locationDeliver}
            sharedItemForCart={sharedItemForCart}
            restaurantName={restaurantName}
          />
        </div>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "170px !important",
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </>
  );
};
