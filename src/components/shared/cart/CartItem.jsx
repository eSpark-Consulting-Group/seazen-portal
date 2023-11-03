import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import IncDec from "../../Input/InputWithIncDec";
import deleteCart from "../../../api/cart/deleteCartItem";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { paths } from "../../../routes/paths";
import updateCartApiCall from "../../../api/cart/updateCart";
import * as reduxCart from "../../../store/reducers/cartSlice";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";
import clearCart from "../../../api/cart/clearCart";

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
    item_id,
  } = props;

  // const variant = "450g";

  const [updatedQuantity, setUpdatedQuantity] = React.useState(quantity);
  const [imageNotFound, setImageNotFound] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);

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

  function onIncrease() {
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
            height: "64px",
          }}
        >
          <Typography fontWeight={600}>{getItemName()}</Typography>

          {!variants ? null : (
            <Button
              variant="text"
              color="inherit"
              size="small"
              disableRipple
              disableElevation
              endIcon={<EditTwoToneIcon />}
              onClick={() => {
                navigate(`${paths.details}/${id}?item_code=${item_code}`);
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
          )}
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
