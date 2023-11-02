import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useMutation } from "@tanstack/react-query";

import { v4 as uuidv4 } from "uuid";

import {
  Modal,
  Slide,
  Stack,
  Button,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

import _ from "lodash";

import addToCartApiCall from "../../api/cart/addToCart";
import clearCart from "../../api/cart/clearCart";

import { resetCart } from "../../store/reducers/cartSlice";
import { paths } from "../../routes/paths";

const ReOrderCard = (props) => {
  let { isVisible, handleClose, items, restaurant_id } = props;

  const [selectedItems, setSelectedItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getOrderItemPrice = (item) => {
    let itemUnitPrice = item?.unit_price;

    // check which size is selected
    // const itemSize = item?.size_variant.find(
    //   (size) => size.option_quantity > 0
    // );

    // if (itemSize) {
    //   itemUnitPrice = parseFloat(itemSize.unit_price);
    // }

    // // add side price
    // if (item.side_variant && item.side_variant.length > 0) {
    //   forEach(item.side_variant, (side) => {
    //     if (side.option_quantity > 0) {
    //       itemUnitPrice += parseFloat(side.unit_price) * side.option_quantity;
    //     }
    //   });
    // }

    // // add topping price
    // if (item.topping_variant && item.topping_variant.length > 0) {
    //   forEach(item.topping_variant, (topping) => {
    //     if (topping.option_quantity > 0) {
    //       itemUnitPrice +=
    //         parseFloat(topping.unit_price) * topping.option_quantity;
    //     }
    //   });
    // }

    let itemTotalPrice = itemUnitPrice * item.quantity;

    return `KWD ${itemTotalPrice.toFixed(2)}`;
  };

  const handleCheckboxChange = (event, item) => {
    if (event.target.checked) {
      setSelectedItems([...selectedItems, item]);
    } else {
      setSelectedItems(selectedItems.filter((i) => i.item_id !== item.item_id));
    }
  };

  const handleAddItemsToCart = () => {
    setIsLoading(true);
    clearCartItems();

    // wait for all items to be added to cart Promise to finish - then close modal
    Promise.all(
      selectedItems.map((item) => {
        addItemToCart(item);
      })
    )
      .then(() => {
        setIsLoading(false);
        handleClose();

        navigate(paths.cart, {
          state: {
            back: paths.myorder,
            hitCart: true,
          },
        });
      })
      .catch(() => {
        setIsLoading(false);
        handleClose();
      });
  };

  const addItemToCart = (item) => {
    const cartItem = {
      item_code: uuidv4(),
      item_id: item.item_id,
      quantity: item.quantity,
      topping_variant_id: item.topping_variant_id,
      side_variant_id: item.side_variant_id,
      size_variant_id: item.size_variant_id,
      size_variant: item.size_variant,
      topping_variant: item.topping_variant,
      side_variant: item.side_variant,
      restaurant_id: item.restaurant_id,
    };

    addToCart(cartItem);
  };

  const clearCartItems = () => {
    dispatch(resetCart());
    emptyCart();
  };

  const { mutate: addToCart } = useMutation(addToCartApiCall);

  const { mutate: emptyCart } = useMutation(clearCart);

  useEffect(() => {
    setSelectedItems(items);
  }, [items]);

  // useEffect(() => {
  //   if (items.length) {
  //     const ss = _.chain(items)
  //       .groupBy((item) =>
  //         JSON.stringify(
  //           _.pick(item, [
  //             "side_variant",
  //             "size_variant",
  //             "topping_variant",
  //             "menu_item",
  //           ])
  //         )
  //       )
  //       .map((groupedItems) => {
  //         const combinedItem = _.cloneDeep(groupedItems[0]);
  //         combinedItem.quantity = _.sumBy(groupedItems, "quantity");
  //         return combinedItem;
  //       })
  //       .value();

  //     setSelectedItems(ss);
  //   }
  // }, [items]);

  const goToMenu = () => {
    handleClose();
    navigate(`${paths.menu}/restaurant/${restaurant_id}/delivery`);
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
                  control={
                    <Checkbox
                      checked={selectedItems.some(
                        (i) => i.item_id === item.item_id
                      )}
                      onChange={(e) => handleCheckboxChange(e, item)}
                    />
                  }
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

            <Button variant="outlined" onClick={() => goToMenu()}>
              Go to Menu
            </Button>
            <Button
              variant="contained"
              disabled={selectedItems.length === 0}
              onClick={() => handleAddItemsToCart()}
            >
              {isLoading ? "Loading..." : "Add to Cart"}
            </Button>
          </Stack>
        </Slide>
      </Modal>
    </div>
  );
};

export default ReOrderCard;
