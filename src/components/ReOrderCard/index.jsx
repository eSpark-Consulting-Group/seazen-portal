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

import { addToCart, resetCart } from "../../store/reducers/cartSlice";

import { removeDuplicateItem } from "../../utils/removeDuplicateItems";

import { paths } from "../../routes/paths";
import cartList from "../../api/cart/cartList";

const ReOrderCard = (props) => {
  let { isVisible, handleClose, items } = props;

  const token = localStorage.getItem("token");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedItems, setSelectedItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

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
      setSelectedItems(
        selectedItems.filter((i) => i.order_item_id !== item.order_item_id)
      );
    }
  };

  const clearCartItems = async () => {
    dispatch(resetCart());
    await emptyCart();
  };

  // useEffect(() => {
  //   items?.map((item) => {
  //     return {
  //       ...item,
  //       size_variant: item?.size_variant?.map((size) => {
  //         return {
  //           ...size,
  //           name_en:
  //             size.option_id === 1
  //               ? "Small"
  //               : size.option_id === 2
  //               ? "Medium"
  //               : "Large",
  //         };
  //       }),
  //       has_variants:
  //         item?.size_variant?.length === 0 &&
  //         item.side_variant?.length === 0 &&
  //         item.topping_variant?.length === 0
  //           ? false
  //           : true,
  //     };
  //   });
  // }, [items]);

  const handleAddItemsToCart = async () => {
    setIsLoading(true);
    await clearCartItems();

    let promises = [];

    selectedItems.map((item) => {
      const cartItem = {
        item_code: uuidv4(),
        item_id: item.item_id,
        // itemName: item?.menu_item?.name_en,
        // price: item?.unit_price,
        quantity: item.quantity,
        // variants: {
        //   sizeVariant: item?.size_variant?.map((size) => {
        //     return {
        //       ...size,
        //       name_en:
        //         size.option_id === 1
        //           ? "Small"
        //           : size.option_id === 2
        //           ? "Medium"
        //           : "Large",
        //     };
        //   }),
        //   toppingVariant: item.topping_variant,
        //   sideVariant: item.side_variant,
        // },
        // itemImage: item?.menu_item?.image,
        side_variant: item.side_variant,
        side_variant_id: item.side_variant_id,
        size_variant: item?.size_variant,
        size_variant_id: item.size_variant_id,
        topping_variant: item.topping_variant,
        topping_variant_id: item.topping_variant_id,
        // has_variants:
        //   item?.size_variant?.length === 0 &&
        //   item.side_variant?.length === 0 &&
        //   item.topping_variant?.length === 0
        //     ? false
        //     : true,
        // restaurant_id: item.restaurant_id,
        // size_variant: item?.size_variant?.map((size) => {
        //   return {
        //     ...size,
        //     name_en:
        //       size.option_id === 1
        //         ? "Small"
        //         : size.option_id === 2
        //         ? "Medium"
        //         : "Large",
        //   };
        // }),
        // topping_variant: item.topping_variant,
        // side_variant: item.side_variant,
      };

      promises.push(addToCartApiCall(cartItem));
    });

    // wait for all items to be added to cart Promise to finish - then close modal
    Promise.all(promises)
      .then((res) => {
        cartList(token)
          .then((res) => {
            setIsLoading(false);
            const resData = res.data.map((val) => {
              const has_variants =
                val?.size_variant_id === "" &&
                val.side_variant_id === "" &&
                val.topping_variant_id === ""
                  ? null
                  : true;

              const variants =
                val?.size_variant_id === "" &&
                val.side_variant_id === "" &&
                val.topping_variant_id === ""
                  ? null
                  : {
                      sizeVariant: {
                        ...val.size_variant[0],
                        variantId: val.size_variant_id,
                      },
                      toppingVariant: val.topping_variant.map((value) => ({
                        ...value,
                        variantId: val.topping_variant_id,
                      })),
                      sideVariant: val.side_variant.map((value) => ({
                        ...value,
                        variantId: val.side_variant_id,
                      })),
                    };

              return {
                id: val?.item_id,
                cart_id: val.cart_id,
                itemName: val?.menu_item_name_en,
                discountedPrice: val?.discounted_price,
                price: val?.unit_price,
                quantity: val.quantity,
                variants,
                item_code: val.item_code,
                specialInstructions: "",
                itemImage: val?.menu_item_image,
                restaurant_id: 1,
                totalPrice: Number(val.quantity * val.unit_price).toFixed(3),
                has_variants,
              };
            });

            dispatch(addToCart(resData));
            handleClose();
          })
          .catch((err) => {
            console.error(err);
          });

        // navigate(paths.cart, {
        //   state: {
        //     back: paths.myorder,
        //     hitCart: true,
        //   },
        // });
      })
      .catch(() => {
        setIsLoading(false);
        handleClose();
      });
  };

  // const addItemToCart = (item) => {
  //   const cartItem = {
  //     item_code: uuidv4(),
  //     item_id: item.item_id,
  //     quantity: item.quantity,
  //     topping_variant_id: item.topping_variant_id,
  //     side_variant_id: item.side_variant_id,
  //     size_variant_id: item.size_variant_id,
  //     size_variant: item.size_variant,
  //     topping_variant: item.topping_variant,
  //     side_variant: item.side_variant,
  //     restaurant_id: item.restaurant_id,
  //   };

  //   dispatch(addToCart(cartItem));
  //   promises.push(addToCartApiCall(cartItem));

  //   console.log(promises);
  // };

  // const { mutate: apiCall } = useMutation(addToCartApiCall);

  const { mutate: emptyCart } = useMutation(clearCart);

  useEffect(() => {
    setSelectedItems(items);
  }, [items]);

  const goToMenu = () => {
    handleClose();
    // navigate(`${paths.menu}/restaurant/${restaurant_id}/delivery`);
  };

  return (
    <div>
      <Modal open={isVisible} onClose={handleClose}>
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
              {removeDuplicateItem(
                items?.map((item) => {
                  return {
                    ...item,
                    size_variant: item?.size_variant?.map((size) => {
                      return {
                        ...size,
                        name_en:
                          size.option_id === 1
                            ? "Small"
                            : size.option_id === 2
                            ? "Medium"
                            : "Large",
                      };
                    }),
                  };
                })
              ).map((item, index) => {
                return (
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
                    key={`item-${items[index]?.order_item_id}`}
                    control={
                      <Checkbox
                        checked={selectedItems.some(
                          (i) => i.order_item_id === item.order_item_id
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
                );
              })}
            </Stack>

            <Button variant="outlined" onClick={handleClose}>
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
