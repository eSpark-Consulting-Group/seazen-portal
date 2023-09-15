import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import IncDec from "../../Input/InputWithIncDec";

function CartItem(props) {
  const { item, quantity } = props;

  const { name, price, image, variant } = item;

  const [updatedQuantity, setUpdatedQuantity] = React.useState(quantity);

  function onIncrease() {
    console.log("onIncrease");

    setUpdatedQuantity((prev) => prev + 1);
  }

  function onDecrease() {
    console.log("onDecrease");

    setUpdatedQuantity((prev) => prev - 1);
  }

  function getItemName() {
    return `${name} (${variant})`;
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
          <img src={image} alt={name} />
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
        >{`KWD ${price}`}</Typography>
        <IncDec
          quantity={updatedQuantity}
          onIncrease={onIncrease}
          onDecrease={onDecrease}
          IncButtonProps={{
            disabled: updatedQuantity === 10,
          }}
          DecButtonProps={{
            disabled: updatedQuantity === 1,
          }}
        />
      </Stack>
    </Stack>
  );
}

export default CartItem;
