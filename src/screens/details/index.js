import React, { Fragment, useEffect } from "react";
import { useLocation, useParams } from "react-router";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";
import { useSelector, useDispatch } from "react-redux";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  Stack,
  Checkbox,
  TextField,
  FormControlLabel,
  Skeleton,
  Typography,
} from "@mui/material";

import { DetailsHeader } from "../../components/header/detailsHeader";
import "./style.css";
import getMenuItemDetails, {
  GET_MENU_ITEM_DETAILS_QUERY_KEY,
} from "../../api/menu/getMenuItemDetails";
import { Divider, alpha } from "@mui/material";
import IncDec from "../../components/Input/InputWithIncDec";
import { AddShoppingCartRounded } from "@mui/icons-material";
import {
  updateCartItem,
  addToCart,
  resetCart,
} from "../../store/reducers/cartSlice";
import addToCartApiCall from "../../api/cart/addToCart";
import { paths } from "../../routes/paths";
import updateCartApiCall from "../../api/cart/updateCart";
import clearCart from "../../api/cart/clearCart";

export const Details = () => {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const cart = useSelector((state) => state.cart.cart);
  const token = localStorage.getItem("token");

  const [cartItem, setCartItem] = React.useState();
  const [quantity, setQuantity] = React.useState(1);
  const [sizeVariant, setSizeVariant] = React.useState();
  const [toppingVariant, setToppingVariant] = React.useState([]);
  const [sideVariant, setSideVariant] = React.useState([]);
  const [totalPrice, setTotalPrice] = React.useState();
  const [notDeliver, setNotDeliver] = React.useState(false);
  const [currentRest, setCurrentRest] = React.useState({});
  const [specialInstructions, setSpecialInstructions] = React.useState("");
  const { search } = useLocation();
  const restaurant_id = localStorage.getItem("restaurantID");
  const {
    data: menuItemDetails,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: [GET_MENU_ITEM_DETAILS_QUERY_KEY],
    queryFn: () => getMenuItemDetails(id, restaurant_id, restaurant_id),
    onSuccess: (data) => {
      console.log("data", data);
    },
  });
  const restaurantTheme = useSelector((state) => state.theme.themeColor);
  useEffect(() => {
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
        calculateSidesVariantTotal(sideVariant) +
        +sizeVariant?.unit_price +
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
  }, [toppingVariant, sizeVariant, quantity, sideVariant, menuItemDetails]);

  React.useEffect(() => {
    const cartItem = cart.find(
      (item) => item.item_code === searchParams.get("item_code")
    );

    setCartItem(cartItem);
    setQuantity(cartItem?.quantity || 1);
    setSizeVariant(cartItem?.variants?.sizeVariant || null);
    setToppingVariant(cartItem?.variants?.toppingVariant || []);
    setSideVariant(cartItem?.variants?.sideVariant || []);
    setTotalPrice(cartItem?.totalPrice);
  }, [searchParams, cart]);

  const checkIfItemIsInCart = () => {
    return cart.find(
      (item) => item.item_code === searchParams.get("item_code")
    );
  };

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
      setSizeVariant(sizeWithVariantId);
    }
  };

  const getExtraToppingQuantity = (option) => {
    console.log(
      "option",
      toppingVariant.find((item) => item.name_en === option?.name_en)
        ?.quantity || 0
    );
    return (
      toppingVariant.find((item) => item.name_en === option?.name_en)
        ?.quantity || 0
    );
  };

  const handleAddToppingQuantity = (option) => {
    setToppingVariant((prevToppingVariant) => {
      // Find the index of the topping with the same name_en
      const index = prevToppingVariant.findIndex(
        (item) => item.name_en === option.name_en
      );

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
          { ...option, option_id: option.id, quantity: 1 },
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

  const variantsForApi = (variantID, optionId, quantity) => {
    const { data } = menuItemDetails;
    const dataVariants = data.variants?.find((val) => val.id === variantID);
    if (!dataVariants) return [];
    const dataOptions = dataVariants.options?.map((val, index) => {
      return {
        option_id: val.id,
        option_quantity:
          val.id == (optionId[index] || optionId) ? quantity || 1 : 0,
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

    const cartItemDataForApi = {
      item_code: cartItem.item_code,
      item_id: cartItem.id,
      quantity: cartItem.quantity,
      // cart_id: cartItem.cart_id || "5",
      topping_variant_id: toppingVariant || 0,
      side_variant_id: sideVariant || 0,
      size_variant_id: sizeVariant || 0,
      size_variant: variantsForApi(
        sizeVariant,
        cartItem.variants?.sizeVariant?.id
      ),
      topping_variant: variantsForApi(
        toppingVariant,
        getSelectedItemsIds(cartItem.variants?.toppingVariant),
        cartItem.variants?.toppingVariant[0]?.quantity
      ),
      side_variant: variantsForApi(
        sideVariant,
        getSelectedItemsIds(cartItem.variants?.sideVariant)
      ),
    };

    if (checkIfItemIsInCart()) {
      updateCartApiCall(cartItemDataForApi, token)
        .then((res) => {})
        .catch((err) => {
          console.log(err);
        });
    } else {
      addToCartApiCall(cartItemDataForApi, token)
        .then((res) => {})
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

    if (cart.length > 0 && data.restaurant_id !== cart[0]?.restaurant_id) {
      clearCartItems();
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
      },
      totalPrice: Number(totalPrice).toFixed(3),
      specialInstructions: specialInstructions,
      itemImage: data?.image,
      restaurant_id: data.restaurant_id,
    };
    // console.log(ItemDataObject, "shahItemDataObject");

    if (checkIfItemIsInCart()) {
      const item_code = cartItem?.item_code;

      ItemDataObject = {
        ...ItemDataObject,
        item_code,
      };

      dispatch(updateCartItem(ItemDataObject));
      addToCartApiHandler(ItemDataObject);
      navigate(paths.cart);
    } else {
      const item_code = uuidv4();

      ItemDataObject = {
        ...ItemDataObject,
        item_code,
      };

      dispatch(addToCart(ItemDataObject));
      addToCartApiHandler(ItemDataObject);
      navigate(-1);
    }
    // dispatch(addSizeVariant({ id: id, size: sizeVariant }));
    // dispatch(addExtraToppings({ id: id, extraToppings: toppingVariant }));
    // dispatch(addExtraSides({ id: id, extraSides: sideVariant }));
  };

  const openNotDelivered = () => {
    setNotDeliver(true);
  };

  const handleClose = () => {
    setNotDeliver(false);
  };

  return (
    <div>
      <DetailsHeader image={menuItemDetails?.data?.image} />
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
              paddingTop: "6px",
            }}
          >
            <Typography variant="body1" component="div">
              <Typography
                variant="subtitle2"
                component="sup"
                sx={{
                  mr: 0.5,
                  fontWeight: "400",
                }}
              >
                KWD
              </Typography>
              {menuItemPriceWithoutCurrency()}
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
                    }}
                  >
                    {menuItemDetails?.data?.name_en}
                  </Typography>

                  <Typography
                    variant="caption"
                    component="div"
                    sx={{
                      color: (theme) => theme.palette.themeColor.main,
                      marginRight: "15px !important",
                    }}
                  >
                    483 Kcal
                  </Typography>
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
                      }}
                    >
                      <Typography variant="h6" component="div" fontWeight="600">
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
                          {variant.name_en === "Choose the Size"
                            ? "(Choose 1)"
                            : variant.name_en === "Extra Topping"
                            ? "(Choose up to 7)"
                            : variant.name_en === "Extra Sides"
                            ? "(Choose up to 2)"
                            : ""}
                        </Typography>
                      </Typography>

                      <Typography
                        variant="body1"
                        component="div"
                        fontWeight={600}
                        sx={{
                          color: (theme) => theme.palette.themeColor.main,
                        }}
                      >
                        {variant.name_en === "Choose the Size"
                          ? "(Required)"
                          : variant.name_en === "Extra Topping"
                          ? "(Optional)"
                          : variant.name_en === "Extra Sides"
                          ? "(Optional)"
                          : ""}
                      </Typography>
                    </Stack>

                    {variant?.options?.map((option, index) => {
                      const isLastItem = variant?.options?.length - 1 === index;
                      return (
                        <Fragment key={option?.id}>
                          <Stack
                            direction="row"
                            spacing={0.5}
                            justifyContent="space-between"
                            alignItems="center"
                            sx={{
                              marginLeft: "-7px !important",
                              color:
                                variant.name_en === "Extra Topping" &&
                                isLastItem
                                  ? "#e0e0e0"
                                  : "", // Apply grey background to last item in Extra Topping section
                            }}
                          >
                            {variant.name_en == "Extra Topping" && (
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    color="themeColor"
                                    style={{ display: "none" }}
                                  />
                                }
                                label={option?.name_en}
                                disabled={
                                  variant.name_en === "Extra Topping" &&
                                  !checkIfToppingIsAdded(option?.name_en)
                                }
                                style={{marginLeft:"33px", marginTop:"11px", marginBottom:"7px"}}
                              />
                            )}
                            {variant.name_en == "Choose the Size" && (
                              <FormControlLabel
                                checked={
                                  variant.name_en === "Choose the Size"
                                    ? checkIfSizeIsAdded(option?.name_en)
                                    : variant.name_en === "Extra Topping"
                                    ? checkIfToppingIsAdded(option?.name_en)
                                    : variant.name_en === "Extra Sides"
                                    ? checkIfSideIsAdded(option?.name_en)
                                    : false
                                }
                                onChange={() => {
                                  variant.name_en === "Choose the Size"
                                    ? handleSizeVariant(option, variant.id)
                                    : variant.name_en === "Extra Topping"
                                    ? handleToppingVariant(option, variant.id)
                                    : variant.name_en === "Extra Sides"
                                    ? handleSideVariant(option, variant.id)
                                    : () => {};
                                }}
                                control={<Checkbox color="themeColor" />}
                                label={option?.name_en}
                              />
                            )}
                            {variant.name_en == "Extra Sides" && (
                              <FormControlLabel
                                checked={
                                  variant.name_en === "Choose the Size"
                                    ? checkIfSizeIsAdded(option?.name_en)
                                    : variant.name_en === "Extra Topping"
                                    ? checkIfToppingIsAdded(option?.name_en)
                                    : variant.name_en === "Extra Sides"
                                    ? checkIfSideIsAdded(option?.name_en)
                                    : false
                                }
                                onChange={() => {
                                  variant.name_en === "Choose the Size"
                                    ? handleSizeVariant(option, variant.id)
                                    : variant.name_en === "Extra Topping"
                                    ? handleToppingVariant(option, variant.id)
                                    : variant.name_en === "Extra Sides"
                                    ? handleSideVariant(option, variant.id)
                                    : () => {};
                                }}
                                control={<Checkbox color="themeColor" />}
                                label={option?.name_en}
                              />
                            )}

                            {variant.name_en === "Extra Topping" && (
                              <p
                                style={{
                                  fontSize: "10px",
                                  paddingTop: "5px",
                                  marginLeft: "1px",
                                  marginRight:
                                    variant.name_en === "Extra Topping" &&
                                    isLastItem
                                      ? "152px"
                                      : "90px",
                                }}
                              >{`(Each +KWD ${option?.unit_price})`}</p>
                            )}

                            {variant.name_en === "Extra Topping" &&
                            !isLastItem ? (
                              <IncDec
                                IncButtonProps={{
                                  disabled:
                                    getExtraToppingQuantity(option) >= 7,
                                }}
                                DecButtonProps={{
                                  disabled: !checkIfToppingIsAdded(
                                    option?.name_en ||
                                      getExtraToppingQuantity(option) === 0
                                  ),
                                }}
                                quantity={getExtraToppingQuantity(option)}
                                onIncrease={() => {
                                  handleAddToppingQuantity(option);
                                }}
                                onDecrease={() => {
                                  handleRemoveToppingQuantity(option);
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
              disabled={
                !location?.state?.locationDeliver &&
                menuItemDetails?.data.has_variants &&
                !sizeVariant
              }
              sx={{
                py: 2,
                display: "flex",
                justifyContent: location?.state?.locationDeliver
                  ? "center"
                  : "space-between",
                alignItems: "center",
                backgroundColor: `${restaurantTheme.main} !important`,
                "&:hover": {
                  backgroundColor: (theme) => theme.palette.themeColor.light,
                },
              }}
              onClick={
                location?.state?.locationDeliver
                  ? openNotDelivered
                  : handleAddToCart
              }
            >
              {location?.state?.locationDeliver ? (
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
                  Change Location to Start Orderring
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
                    {checkIfItemIsInCart() && search
                      ? "Update Cart"
                      : "Add to Cart"}
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
            overflow: "hidden",
            overflowY: "hidden",

            "@media (min-width: 600px)": {
              left: "0",
              position: "fixed",
              margin: "20px",
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
              {currentRest?.name_en} does not
              <br /> deliver to your location.
            </div>

            <div className="disp-flex">
              <Button
                onClick={() => navigate(paths.home)}
                className="btn change-button"
              >
                <span>Change Restaurant</span>
              </Button>

              <Button
                onClick={() =>
                  navigate(paths.location, { state: { path: "/b-restaurant" } })
                }
                className="btn change-button"
              >
                <span>Change Location</span>
              </Button>
            </div>

            <Button
              color="primary"
              autoFocus
              className="btn back-button"
              // onClick={() => navigate(paths.home)}
            >
              <span>Back to Menu</span>
            </Button>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
};
