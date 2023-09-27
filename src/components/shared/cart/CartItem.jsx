import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import IncDec from "../../Input/InputWithIncDec";
import deleteCart from "../../../api/cart/deleteCartItem";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { paths } from "../../../routes/paths";
import updateCart from "../../../api/cart/updateCart";

function CartItem(props) {
  const { 
    quantity, 
    id, 
    menu_item_name_en, 
    unit_price, 
    // image, 
    // variant, 
    cartRefetch 
  } = props;

  const imgSrc = "https://seazen-portal-gdsictor1-espark-web-application-developme.vercel.app/assets/img/menu_card_image.png"
  const variant = "450g"
  
  const [updatedQuantity, setUpdatedQuantity] = React.useState(quantity);
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  const updateCartHandler = useQuery({
    queryFn: () => updateCart({
      "cart_id" : id,
      "quantity" : updatedQuantity,
    }, token),
    onSuccess: (data) => {
      console.log(data, "data")
    },
    enabled: false
  });

  function onIncrease() {
    setUpdatedQuantity((prev) => prev + 1);
    setTimeout(() => {
      updateCartHandler.refetch()
      cartRefetch()
    }, 100)
  }


  const { data, refetch } = useQuery({
    queryFn: () => deleteCart({cart_id: id}, token),
    onSuccess: (data) => {
      console.log(data, "data")
    },
    enabled: false
  });

  const onDelete = () => {
    refetch()
    setTimeout(() => {
      cartRefetch()
    }, 100)
  }

  function onDecrease() {
    setUpdatedQuantity((prev) => prev - 1);
    setTimeout(() => {
      updateCartHandler.refetch()
      cartRefetch()
    }, 100)

  }

  function getItemName() {
    return `${menu_item_name_en} (${variant})`;
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
          <img src={imgSrc} alt={menu_item_name_en} />
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
            onClick={()=>{navigate(`${paths.details}?isUpdate`)}}
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
        >{`KWD ${unit_price * updatedQuantity}`}</Typography>
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
