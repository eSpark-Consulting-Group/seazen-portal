import React from "react";
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
import updateCart from "../../../api/cart/updateCart";
import * as reduxCart from "../../../store/reducers/cartSlice";

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
    // variant, 
    cartRefetch 
  } = props;

  const variant = "450g"
  
  const [updatedQuantity, setUpdatedQuantity] = React.useState(quantity);
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const updateCartHandler = useQuery({
    queryFn: () => updateCart({
      "cart_id" : cart_id,
      "quantity" : updatedQuantity,
    }, token),
    onSuccess: (data) => {
      console.log(data, "data")
    },
    enabled: false
  });

  function onIncrease() {
    dispatch(
      reduxCart.updateCart({
        id: id,
        quantity: updatedQuantity + 1
      })
    );
    setUpdatedQuantity((prev) => prev + 1);
    setTimeout(() => {
      updateCartHandler.refetch()
      cartRefetch()
    }, 100)
  }


  const { data, refetch } = useQuery({
    queryFn: () => deleteCart(
      {
        cart_id: cart_id,
        item_id: "", 
        item_code: ""
      }, token),
    onSuccess: (data) => {
      console.log(data, "data")
    },
    enabled: false
  });

  const onDelete = () => {
    dispatch(reduxCart.removeFromCart(id));
    refetch()
    setTimeout(() => {
      cartRefetch()
    }, 100)
  }

  function onDecrease() {
    dispatch(
      reduxCart.updateCart({
        id: id,
        quantity: updatedQuantity - 1
      })
    );
    setUpdatedQuantity((prev) => prev - 1);
    setTimeout(() => {
      updateCartHandler.refetch()
      cartRefetch()
    }, 100)

  }

  function getItemName() {
    return `${menu_item_name_en || itemName} (${variant})`;
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
          <img src={itemImage} alt={menu_item_name_en || itemName} />
        </Box>

        <Stack
          justifyContent="space-between"
          alignItems="flex-start"
          sx={{
            height: "64px",
          }}
        >
          <Typography fontWeight={600}>{getItemName()}</Typography>

          <Button
            variant="text"
            color="inherit"
            size="small"
            disableRipple
            disableElevation
            endIcon={<EditTwoToneIcon />}
            onClick={()=>{navigate(`${paths.details}/${id}?isUpdate`)}}
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
        <Typography
          align="center"
          fontWeight={600}
        >{`KWD ${((unit_price || totalPrice) * updatedQuantity).toFixed(2)}`}</Typography>
        <IncDec
          quantity={updatedQuantity}
          onIncrease={onIncrease}
          onDecrease={onDecrease}
          onDelete={onDelete}
          IncButtonProps={{
            disabled: updatedQuantity === 10,
          }}
          isSingleItem={updatedQuantity === 1}
        />
      </Stack>
    </Stack>
  );
}

export default CartItem;
