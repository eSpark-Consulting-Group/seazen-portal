import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

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
import cartList from "../../api/cart/cartList";

import { addToCart, resetCart } from "../../store/reducers/cartSlice";

import { removeDuplicateItem } from "../../utils/removeDuplicateItems";
import { getDistanceFromLatLonInKm } from "../../utils/getAddress";

const ReOrderCard = (props) => {
  let {
    isVisible,
    handleClose,
    items,
    branchesAndHours,
    setDistanceIsFar,
    setRestaurantName,
    restaurantDetail,
  } = props;

  const token = localStorage.getItem("token");
  const selectedAddress = JSON.parse(localStorage.getItem("selected"));
  const currentAddress = JSON.parse(localStorage.getItem("location"));

  const dispatch = useDispatch();

  const branchHours = useSelector((state) => state.resturants.branchHours);

  const [selectedItems, setSelectedItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const getOrderItemPrice = (item) => {
    let itemUnitPrice = item?.unit_price;

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

  const handleAddItemsToCart = async () => {
    setIsLoading(true);

    for (let i = 0; i < branchesAndHours?.length; i++) {
      const resLat = +branchesAndHours[i]?.latitude;
      const resLng = +branchesAndHours[i]?.longitude;

      if (selectedAddress === null && currentAddress !== null) {
        const distance = getDistanceFromLatLonInKm(
          resLat,
          resLng,
          currentAddress.lat,
          currentAddress.lng
        );

        if (distance > 50) {
          sameFunctionCall();
        } else {
          setDistanceIsFar(false);

          reorderItems();

          break;
        }
      }

      if (selectedAddress !== null && currentAddress !== null) {
        const distance = getDistanceFromLatLonInKm(
          resLat,
          resLng,
          selectedAddress.lat,
          selectedAddress.lng
        );

        if (distance > 50) {
          sameFunctionCall();
        } else {
          setDistanceIsFar(false);

          reorderItems();

          break;
        }
      }
    }
  };

  const sameFunctionCall = () => {
    setRestaurantName(restaurantDetail?.name_en);
    setDistanceIsFar(true);
    setIsLoading(false);
    handleClose();
  };

  const reorderItems = () => {
    dispatch(resetCart());

    clearCart(token).then((res) => {
      if (res.status === "ok") {
        let promises = [];

        selectedItems.map((item) => {
          const cartItem = {
            item_code: uuidv4(),
            item_id: item.item_id,
            quantity: item.quantity,
            totalPrice: Number(item.quantity * item.unit_price).toFixed(3),
            side_variant: item.side_variant,
            side_variant_id: item.side_variant_id,
            size_variant: item?.size_variant,
            size_variant_id: item.size_variant_id,
            topping_variant: item.topping_variant,
            topping_variant_id: item.topping_variant_id,
            custom_variant: item.custom_variant,
            custom_variant_id: item.custom_variant_id,
            branch_id: item?.branch_id,
          };

          promises.push(addToCartApiCall(cartItem));
        });

        Promise.all(promises)
          .then(() => {
            cartList(token)
              .then((res) => {
                setIsLoading(false);

                res.data.map((val) => {
                  const findRestaurant = branchHours?.find(
                    (branch) => branch.id === val?.branch_id
                  );

                  const has_variants =
                    val?.size_variant_id === "" &&
                    val.side_variant_id === "" &&
                    val.custom_variant_id === "" &&
                    val.topping_variant_id === ""
                      ? false
                      : true;

                  const variants =
                    val?.size_variant_id === "" &&
                    val.side_variant_id === "" &&
                    val.custom_variant_id === "" &&
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
                          customVariant: val.custom_variant.map((value) => ({
                            ...value,
                            customId: val.side_custom_id,
                          })),
                        };

                  const obj = {
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
                    restaurant_id: findRestaurant.restaurant_id,
                    totalPrice: Number(val.quantity * val.unit_price).toFixed(
                      3
                    ),
                    branch_id: val?.branch_id,
                    has_variants,
                  };

                  obj.has_variants === false && delete obj.has_variants;
                  obj.variants === null && delete obj.variants;

                  dispatch(addToCart(obj));
                });

                handleClose();
              })
              .catch((err) => {
                console.error(err);
              });
          })
          .catch(() => {
            setIsLoading(false);
            handleClose();
          });
      }
    });
  };

  useEffect(() => {
    const incQuantity = removeDuplicateItem(items);

    setSelectedItems(incQuantity);
  }, [items]);

  const styles = {
    width: "374px",
    position: "absolute !important",
    bottom: 0,
    background: "#fff",
    px: 2,
    py: 2,
    pt: 3,
    borderRadius: "20px 20px 0 0",
  };

  return (
    <div>
      <Modal open={isVisible} onClose={handleClose}>
        <Slide
          direction="up"
          in={isVisible}
          sx={styles}
          className="reorder-slide"
        >
          <Stack spacing={2}>
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
