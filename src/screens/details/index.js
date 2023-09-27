import React, { Fragment, useEffect } from "react";
import { useParams } from "react-router";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import { DetailsHeader } from "../../components/header/detailsHeader";
import "./style.css";
import getMenuItemDetails, {
  GET_MENU_ITEM_DETAILS_QUERY_KEY,
} from "../../api/menu/getMenuItemDetails";
import { Divider, alpha } from "@mui/material";
import IncDec from "../../components/Input/InputWithIncDec";
import { AddShoppingCartRounded } from "@mui/icons-material";
import {
  removeFromCart,
  updateCartItem,
  addToCart,
} from "../../store/reducers/cartSlice";

export const Details = () => {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart.cart);
  const cartInfo = useSelector((state) => state.cart);

  const [cartItem, setCartItem] = React.useState();
  const [quantity, setQuantity] = React.useState(1);
  const [sizeVariant, setSizeVariant] = React.useState();
  const [toppingVariant, setToppingVariant] = React.useState([]);
  const [sideVariant, setSideVariant] = React.useState([]);
  const [totalPrice, setTotalPrice] = React.useState();
  const [specialInstructions, setSpecialInstructions] = React.useState("");

  const {
    data: menuItemDetails,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: [GET_MENU_ITEM_DETAILS_QUERY_KEY],
    queryFn: () => getMenuItemDetails(id, 1, 1),
    onSuccess: (data) => {
      console.log("data", data);
    },
  });

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
        itemTotal = 0.0;
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
  }, [toppingVariant, sizeVariant, quantity, sideVariant]);

  useEffect(() => {
    if (quantity === 0) {
      dispatch(removeFromCart(id));
    }
  }, [quantity]);

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

  React.useEffect(() => {
    const cartItem = cart.find(
      (item) => item.item_code === searchParams.get("item_code")
    );

    setCartItem(cartItem);
    setQuantity(cartItem?.quantity || 1);
    setSizeVariant(cartItem?.variants?.sizeVariant || null);
    setToppingVariant(cartItem?.variants?.toppingVariant || []);
    setSideVariant(cartItem?.variants?.sideVariant || []);
    setTotalPrice(cartItem?.totalPrice || 0);
  }, [searchParams, cart]);

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
        { ...option, variantId, quantity: 1 },
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
        { ...option, variantId },
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
      const sizeWithVariantId = { ...option, variantId };
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
        return [...prevToppingVariant, { ...option, quantity: 1 }];
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

  const handleAddToCart = () => {
    const { data } = menuItemDetails;
    var ItemDataObject = {
      id: data?.id,
      itemName: data?.description_en,
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
    };
    // console.log(ItemDataObject, "shahItemDataObject");

    if (checkIfItemIsInCart()) {
      const item_code = cartItem?.item_code;

      ItemDataObject = {
        ...ItemDataObject,
        item_code,
      };

      dispatch(updateCartItem(ItemDataObject));
    } else {
      const item_code = uuidv4();

      ItemDataObject = {
        ...ItemDataObject,
        item_code,
      };

      dispatch(addToCart(ItemDataObject));
    }
    // dispatch(addSizeVariant({ id: id, size: sizeVariant }));
    // dispatch(addExtraToppings({ id: id, extraToppings: toppingVariant }));
    // dispatch(addExtraSides({ id: id, extraSides: sideVariant }));
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
              px: 2,
              py: 1,
              borderRadius: "12px",
              zIndex: 1,
            }}
          >
            <Typography variant="body1" component="div">
              <Typography
                variant="subtitle2"
                component="sup"
                sx={{
                  mr: 0.5,
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
                  <Typography variant="h5" component="div">
                    {menuItemDetails?.data?.name_en}
                  </Typography>

                  <Typography
                    variant="caption"
                    component="div"
                    sx={{
                      color: (theme) => theme.palette.themeColor.main,
                    }}
                  >
                    483 Kcal
                  </Typography>
                </Stack>
                <Typography variant="body2" component="div">
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
                        borderRadius: 999,
                        backgroundColor: (theme) =>
                          alpha(theme.palette.themeColor.main, 0.12),
                      }}
                    >
                      <Typography
                        variant="h6"
                        component="div"
                        fontWeight="normal"
                      >
                        {variant?.name_en}

                        <Typography
                          variant="subtitle2"
                          component="sub"
                          color="GrayText"
                          fontWeight="light"
                          sx={{
                            ml: 0.5,
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
                      return (
                        <Fragment key={option?.id}>
                          <Stack
                            direction="row"
                            spacing={0.5}
                            justifyContent="space-between"
                            alignItems="center"
                          >
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
                            <p
                              style={{
                                fontSize: "10px",
                                paddingTop: "5px",
                                marginRight: "10px",
                              }}
                            >{`(Each +KWD ${option?.unit_price})`}</p>
                            {variant.name_en === "Extra Topping" ? (
                              <IncDec
                                IncButtonProps={{
                                  disabled:
                                    getExtraToppingQuantity(option) === 7 ||
                                    !checkIfToppingIsAdded(option?.name_en),
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
                            ) : (
                              <Typography
                                variant="body1"
                                component="div"
                                sx={{
                                  color: "common.black",
                                }}
                              >
                                {getFormattedPrice(option?.unit_price)}
                              </Typography>
                            )}
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
            sx={{
              mt: 2,
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
                  disabled: quantity === 10,
                  sx: {
                    color: "common.white",
                    backgroundColor: (theme) => theme.palette.themeColor.light,
                    "&:hover": {
                      backgroundColor: (theme) =>
                        theme.palette.themeColor.light,
                    },
                  },
                }}
                DecButtonProps={{
                  disabled: quantity === 0,
                  sx: {
                    color: "common.white",
                    backgroundColor: (theme) => theme.palette.themeColor.light,
                    "&:hover": {
                      backgroundColor: (theme) =>
                        theme.palette.themeColor.light,
                    },
                  },
                }}
              />
            </Box>
            <Button
              size="large"
              variant="contained"
              fullWidth
              disabled={!sizeVariant}
              sx={{
                py: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: (theme) => theme.palette.themeColor.light,
                "&:hover": {
                  backgroundColor: (theme) => theme.palette.themeColor.light,
                },
              }}
              onClick={handleAddToCart}
            >
              <Typography
                variant="h6"
                component="span"
                fontWeight={600}
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <AddShoppingCartRounded
                  sx={{
                    mr: 1,
                  }}
                />
                {checkIfItemIsInCart() ? "Update Cart" : "Add to Cart"}
              </Typography>
              <Typography variant="body1" component="span">
                +KWD {Number(totalPrice).toFixed(3)}
              </Typography>
            </Button>
          </Stack>
        </Stack>
      </div>
    </div>
  );
};
