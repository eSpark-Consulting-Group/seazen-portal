import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useQuery } from "@tanstack/react-query";

import { Box, Stack, Button, Typography } from "@mui/material";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";

import IncDec from "../../Input/InputWithIncDec";

import deleteCart from "../../../api/cart/deleteCartItem";
import clearCart from "../../../api/cart/clearCart";
import updateCartApiCall from "../../../api/cart/updateCart";

import * as reduxCart from "../../../store/reducers/cartSlice";

import { paths } from "../../../routes/paths";
import getMenuItemDetails from "../../../api/menu/getMenuItemDetails";

function CartItem(props) {
  const {
    quantity,
    id,
    cart_id,
    menu_item_name_en,
    unit_price,
    itemName,
    totalPrice,
    itemImage,
    variants,
    cartRefetch,
    item_code,
    restaurant_id,
    item_id,
    branch_id,
  } = props;

  // const variant = "450g";

  const token = localStorage.getItem("token");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart.cart);

  const [updatedQuantity, setUpdatedQuantity] = React.useState(quantity);
  const [imageNotFound, setImageNotFound] = useState(false);
  const [menuItemDetails, setMenuItemDetails] = useState();

  const getItemDetails = () => {
    getMenuItemDetails(id, restaurant_id, branch_id)
      .then((res) => {
        setMenuItemDetails(res);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getItemDetails();
  }, []);

  const cartItem = cart.find((val) => val.cart_id == cart_id);

  const variantsForApi = (variantID, optionId, quantity) => {
    const data = menuItemDetails?.data;
    const dataVariants = data.variants?.find((val) => val.id === variantID);
    if (!dataVariants) return [];
    const dataOptions = dataVariants.options?.map((val, index) => {
      return {
        option_id: val.id,
        option_quantity:
          val.id == (optionId[index] || optionId)
            ? quantity[index]?.quantity || 1
            : 0,
      };
    });
    return dataOptions;
  };

  const getSelectedItemsIds = (selectedItems) => {
    const idsArr = selectedItems?.map((val) => val.id);

    return idsArr;
  };

  // const updateCartHandler = useQuery({
  //   queryFn: () =>
  //     updateCartApiCall(
  //       {
  //         cart_id: cart_id,
  //         quantity: updatedQuantity,
  //       },
  //       token
  //     ),
  //   onSuccess: (data) => {
  //     console.log(data, "data");
  //   },
  //   enabled: false,
  // });

  const getDataForUpdateApi = (action) => {
    const sideVariant = cartItem.variants?.sideVariant[0]?.variantId;
    const sizeVariant = cartItem.variants?.sizeVariant?.variantId;
    const toppingVariant = cartItem.variants?.toppingVariant[0]?.variantId;
    const customVariant = cartItem.variants?.customVariant[0]?.variantId;

    let cartItemDataForApi = {
      item_code: cartItem.item_code,
      cart_id,
      item_id: cartItem.id,
      branch_id: cartItem.branch_id,
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

    if (action == "dec") {
      cartItemDataForApi.quantity = cartItem.quantity - 1;
    }
    if (action == "inc") {
      cartItemDataForApi.quantity = cartItem.quantity + 1;
    }
    return cartItemDataForApi;
  };

  function onIncrease() {
    const updateAPIData = getDataForUpdateApi("inc");
    updateCartApiCall(updateAPIData, token)
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });

    dispatch(
      reduxCart.updateCartItemQuantity({
        itemCode: item_code,
        quantity: updatedQuantity + 1,
      })
    );
    setUpdatedQuantity((prev) => prev + 1);
    setTimeout(() => {
      // updateCartHandler.refetch();
      cartRefetch();
    }, 100);
  }

  const { data, refetch } = useQuery({
    queryFn: () =>
      deleteCart(
        {
          cart_id,
          item_id: id,
          item_code,
        },
        token
      ),
    onSuccess: (data) => {
      console.log(data, "data");
    },
    enabled: false,
  });

  const clearCartHandler = () => {
    clearCart(token)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onDelete = () => {
    if (cart.length < 2 && cart[0].quantity == 1) {
      clearCartHandler();
    }
    dispatch(reduxCart.removeFromCart(id));
    refetch();
    setTimeout(() => {
      cartRefetch();
    }, 100);
  };

  function onDecrease() {
    const updateAPIData = getDataForUpdateApi("dec");
    updateCartApiCall(updateAPIData, token)
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
    dispatch(
      reduxCart.updateCartItemQuantity({
        itemCode: item_code,
        quantity: updatedQuantity - 1,
      })
    );
    setUpdatedQuantity((prev) => prev - 1);
    setTimeout(() => {
      // updateCartHandler.refetch();
      cartRefetch();
    }, 100);
  }

  function getItemName() {
    // return `${menu_item_name_en || itemName} (${variant})`;
    return `${menu_item_name_en || itemName}`;
  }

  const capitalizedTextFunc = (text) => {
    const capitalizedText = text
      .toLowerCase()
      .replace(/(^|\s)\S/g, function (match) {
        return match.toUpperCase();
      });

    return capitalizedText;
  };

  const getExtraItemNames = () => {
    let extraItemNames = [];
    const returnName = cartItem?.variants?.customVariant.map((variant) => {
      return { name: variant.name_en, quantity: variant.quantity };
    });

    if (returnName && returnName.length > 0) {
      extraItemNames.push(
        ...returnName.map((variant) => {
          return `${capitalizedTextFunc(variant.name)} ${
            variant.quantity === 0 ? "" : ` x (${variant.quantity})`
          }`;
        })
      );
    }

    return extraItemNames.join(", ");
  };

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      spacing={2}
    >
      <Stack direction="row" alignItems="flex-start" spacing={1}>
        <Box
          sx={{
            height: "72px",
            width: "72px",
            minWidth: "72px",
            minHeight: "72px",
            borderRadius: (theme) => theme.shape.borderRadius,
            "& img": {
              height: "100%",
              width: "100%",
              objectFit: "cover",
            },
          }}
        >
          {imageNotFound ? (
            <Box
              sx={{
                height: 68,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "common.white",
                borderRadius: "8px",
              }}
            >
              <ImageNotSupportedIcon fontSize="large"></ImageNotSupportedIcon>

              <Typography variant="caption">No Image Found</Typography>
            </Box>
          ) : (
            <img
              onError={() => setImageNotFound(true)}
              style={{ borderRadius: "8px" }}
              src={itemImage}
              alt={menu_item_name_en || itemName}
            />
          )}
        </Box>

        <Stack
          justifyContent="space-between"
          alignItems="flex-start"
          sx={{
            height: "auto",
          }}
        >
          <Box>
            <Typography fontWeight={600}>{getItemName()}</Typography>

            {cartItem?.variants?.customVariant?.length ? (
              <Typography fontWeight={400} fontSize={13} lineHeight={1.25}>
                {getExtraItemNames()}
              </Typography>
            ) : null}

            {/* {cartItem.variants?.customVariant?.map((extras) => (
              <Typography
                fontWeight={400}
                fontSize={13}
                lineHeight={1.25}
                key={extras.id}
              >
                {extras.name_en}
              </Typography>
            ))} */}
          </Box>

          <Button
            variant="text"
            color="inherit"
            size="small"
            disableRipple
            disableElevation
            endIcon={<EditTwoToneIcon />}
            onClick={() => {
              localStorage.setItem("restaurantID", cart[0]?.restaurant_id);

              navigate(`${paths.details}/${id}?item_code=${item_code}`, {
                state: { branch_id, item_code },
              });
            }}
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
          >
            Edit
          </Button>
        </Stack>
      </Stack>

      <Stack
        justifyContent="space-between"
        alignItems="center"
        sx={{
          height: "72px",
        }}
      >
        <Typography align="center" fontWeight={600}>
          {`KWD ${Number(totalPrice).toFixed(3)}`}
        </Typography>
        <IncDec
          quantity={updatedQuantity}
          onIncrease={onIncrease}
          onDecrease={onDecrease}
          onDelete={onDelete}
          IncButtonProps={
            {
              // disabled: updatedQuantity === 10,
            }
          }
          isSingleItem={updatedQuantity < 2}
        />
      </Stack>
    </Stack>
  );
}

export default CartItem;
