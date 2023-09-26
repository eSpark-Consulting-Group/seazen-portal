import React, { Fragment } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
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

export const Details = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart.cart);

  const [cartItem, setCartItem] = React.useState();
  const [quantity, setQuantity] = React.useState(0);
  const [sizeVariant, setSizeVariant] = React.useState();
  const [toppingVariant, setToppingVariant] = React.useState([]);
  const [sideVariant, setSideVariant] = React.useState([]);

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

  const checkIfItemIsInCart = () => {
    return cart.find((item) => item.id === id);
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
    setCartItem(cart.find((item) => item.id === id));
  }, [cart]);

  const checkIfToppingIsAdded = (name_en) => {
    return toppingVariant.find((item) => item.name_en === name_en);
  };

  const checkIfSideIsAdded = (name_en) => {
    return sideVariant.find((item) => item.name_en === name_en);
  };

  const checkIfSizeIsAdded = (name_en) => {
    return sizeVariant?.name_en === name_en;
  };

  const handleToppingVariant = (option) => {
    if (checkIfToppingIsAdded(option?.name_en)) {
      setToppingVariant(
        toppingVariant.filter((item) => item.name_en !== option?.name_en)
      );
    } else {
      let extraTopping = {
        ...option,
        quantity: 1,
      };
      setToppingVariant([...toppingVariant, option]);
    }
  };

  const handleSideVariant = (option) => {
    if (checkIfSideIsAdded(option?.name_en)) {
      setSideVariant(
        sideVariant.filter((item) => item.name_en !== option?.name_en)
      );
    } else {
      setSideVariant([...sideVariant, option]);
    }
  };

  const handleSizeVariant = (option) => {
    if (checkIfSizeIsAdded(option?.name_en)) {
      setSizeVariant(null);
    } else {
      setSizeVariant(option);
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
    var extraTopping = {
      ...option,
      quantity: option?.quantity + 1,
    };

    setToppingVariant((toppingVariant) =>
      toppingVariant.map((item) => {
        if (item.name_en === option?.name_en) {
          return extraTopping;
        }
        return item;
      })
    );
  };

  const handleRemoveToppingQuantity = (option) => {
    var extraTopping = {
      ...option,
      quantity: option?.quantity - 1,
    };

    setToppingVariant((toppingVariant) =>
      toppingVariant.map((item) => {
        if (item.name_en === option?.name_en) {
          return extraTopping;
        }
        return item;
      })
    );
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
                        (Required)
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
                                  ? handleSizeVariant(option)
                                  : variant.name_en === "Extra Topping"
                                  ? handleToppingVariant(option)
                                  : variant.name_en === "Extra Sides"
                                  ? handleSideVariant(option)
                                  : () => {};
                              }}
                              control={<Checkbox color="themeColor" />}
                              label={option?.name_en}
                            />
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
                Add to Cart
              </Typography>
              <Typography variant="body1" component="span">
                +KWD 15.88
              </Typography>
            </Button>
          </Stack>
        </Stack>
      </div>
    </div>
  );
};
