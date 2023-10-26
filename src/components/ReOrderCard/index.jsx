import React from "react";
import Modal from "@mui/material/Modal";
import Slide from "@mui/material/Slide";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { forEach } from "lodash";

const ReOrderCard = ({ isVisible, handleClose, items }) => {
  const getOrderItemPrice = (item) => {
    let itemUnitPrice = item?.unit_price;

    // check which size is selected
    const itemSize = item?.size_variant.find(
      (size) => size.option_quantity > 0
    );

    if (itemSize) {
      itemUnitPrice = parseFloat(itemSize.unit_price);
    }

    // add side price
    if (item.side_variant && item.side_variant.length > 0) {
      forEach(item.side_variant, (side) => {
        if (side.option_quantity > 0) {
          itemUnitPrice += parseFloat(side.unit_price) * side.option_quantity;
        }
      });
    }

    // add topping price
    if (item.topping_variant && item.topping_variant.length > 0) {
      forEach(item.topping_variant, (topping) => {
        if (topping.option_quantity > 0) {
          itemUnitPrice += parseFloat(topping.unit_price) * topping.option_quantity;
        }
      });
    }

    let itemTotalPrice = itemUnitPrice * item.quantity;

    console.log(item, itemUnitPrice, itemTotalPrice);

    return `KWD ${itemTotalPrice.toFixed(2)}`;
  };
  return (
    <div>
      <Modal open={isVisible} onClose={() => handleClose()}>
        <Slide direction="up" in={isVisible}>
          <Stack
            spacing={2}
            sx={{
              width: "374px",
              position: "absolute",
              bottom: 0,
              background: "#fff",
              px: 2,
              py: 2,
              pt: 3,
              borderRadius: "20px 20px 0 0",
            }}
          >
            <Stack spacing={0}>
              {items.map((item) => (
                <FormControlLabel
                  sx={{
                    ".MuiFormControlLabel-label": {
                      fontWeight: 400,
                      width: "100%",
                    },
                    ".MuiCheckbox-root": {
                      py: 0.5,
                    },
                  }}
                  key={`item-${item.id}`}
                  control={<Checkbox />}
                  label={
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      sx={{
                        width: "100%",
                      }}
                    >
                      <span>
                        {item.quantity}x {item.menu_item?.name_en}
                      </span>
                      <span>{getOrderItemPrice(item)}</span>
                    </Stack>
                  }
                />
              ))}
            </Stack>

            <Button variant="outlined" onClick={() => handleClose()}>
              Go to Menu
            </Button>
            <Button variant="contained" onClick={() => handleClose()}>
              Add to Cart
            </Button>
          </Stack>
        </Slide>
      </Modal>
    </div>
  );
};

export default ReOrderCard;
