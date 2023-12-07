import React, { useEffect, useState } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { updateCartItemQuantity } from "../../../../store/reducers/cartSlice";
import { useNavigate } from "react-router";
import { paths } from "../../../../routes/paths";
import getMenuItemDetails from "../../../../api/menu/getMenuItemDetails";
import updateCartApiCall from "../../../../api/cart/updateCart";
import { useQuery } from "@tanstack/react-query";
import deleteCart from "../../../../api/cart/deleteCartItem";

const ExtraItems = ({ extraItemName, extraItemCount, item, item_code, id }) => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.cart);
  const [menuItemDetails, setMenuItemDetails] = useState();

  const cartItem = cart.find((val) => val.item_code == item_code);
  const token = localStorage.getItem("token");

  const getItemDetails = () => {
    getMenuItemDetails(id, cartItem.restaurant_id, cartItem.branch_id)
      .then((res) => {
        setMenuItemDetails(res);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getItemDetails();
  }, []);

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

  const getDataForUpdateApi = (action) => {
    const sideVariant = cartItem.variants?.sideVariant[0]?.variantId;
    const sizeVariant = cartItem.variants?.sizeVariant?.variantId;
    const toppingVariant = cartItem.variants?.toppingVariant[0]?.variantId;
    const customVariant = cartItem.variants?.customVariant[0]?.variantId;

    let cartItemDataForApi = {
      item_code: cartItem.item_code,
      cart_id: cartItem.cart_id,
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

  const dispatch = useDispatch();
  function handleClickAddCount() {
    const updateAPIData = getDataForUpdateApi("inc");
    updateCartApiCall(updateAPIData, token)
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
    dispatch(
      updateCartItemQuantity({
        itemCode: item.item_code,
        quantity: extraItemCount + 1,
      })
    );
  }
  const { data, refetch } = useQuery({
    queryFn: () =>
      deleteCart(
        {
          cart_id: cartItem.cart_id,
          item_id: cartItem.id,
          item_code: cartItem.item_code,
        },
        token
      ),
    onSuccess: (data) => {
      console.log(data, "data");
    },
    enabled: false,
  });

  function handleClickSubtractCount() {
    if (extraItemCount > 0) {
      dispatch(
        updateCartItemQuantity({
          itemCode: item.item_code,
          quantity: extraItemCount - 1,
        })
      );
    }
    if (extraItemCount == 1) {
      refetch();
    } else {
      const updateAPIData = getDataForUpdateApi("dec");
      updateCartApiCall(updateAPIData, token)
        .then((res) => {})
        .catch((err) => {
          console.log(err);
        });
    }
  }
  return (
    <div className="extra_item_outer_container">
      <div
        className="extra_item_text_container"
        style={{ cursor: "pointer", width: "100%" }}
        onClick={() => {
          navigate(paths.details + "/" + id, {
            state: {
              item_code,
            },
          });
        }}
      >
        {extraItemName?.replace(/^,/, "")}
      </div>
      <div className="extra_item_input_stepper my-1">
        <button style={{ color: "black" }} onClick={handleClickSubtractCount}>
          -
        </button>
        <div className="extra_item_input_stepper_count mx-1">
          {extraItemCount}
        </div>
        <button style={{ color: "black" }} onClick={handleClickAddCount}>
          +
        </button>
      </div>
    </div>
  );
};

export default ExtraItems;
