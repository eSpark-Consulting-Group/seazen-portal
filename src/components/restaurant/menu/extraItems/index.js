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
import { getVariantAPIFormat } from "../../../../utils/getVariantFormat";

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

  const getDataForUpdateApi = (action) => {
    const sideVariantId = cartItem.variants?.sideVariant[0]?.variantId;
    const sizeVariantId = cartItem.variants?.sizeVariant?.variantId;
    const toppingVariantId = cartItem.variants?.toppingVariant[0]?.variantId;
    const customVariantId = cartItem.variants?.customVariant[0]?.variantId;

    let cartItemDataForApi = {
      item_code: cartItem.item_code,
      cart_id: cartItem.cart_id,
      item_id: cartItem.id,
      branch_id: cartItem.branch_id,
      topping_variant_id: toppingVariantId || null,
      side_variant_id: sideVariantId || null,
      size_variant_id: sizeVariantId || null,
      custom_variant_id: customVariantId || null,
      size_variant: getVariantAPIFormat(
        sizeVariantId,
        cartItem.variants?.sizeVariant?.id
      ),
      topping_variant: getVariantAPIFormat(
        toppingVariantId,
        cartItem.variants?.toppingVariant,
        menuItemDetails
      ),
      custom_variant: getVariantAPIFormat(
        customVariantId,
        cartItem.variants?.customVariant,
        menuItemDetails
      ),
      side_variant: getVariantAPIFormat(
        sideVariantId,
        cartItem.variants?.sideVariant
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
