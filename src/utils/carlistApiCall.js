export const cartListApiHit = (
  cartList,
  branchHours,
  dispatch,
  addToCart,
  token
) => {
  cartList(token)
    .then((res) => {
      sessionStorage.setItem("cartEmpty", true);

      res.data.map((val) => {
        if (branchHours?.length) {
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
                  customVariant: val.custom_variant.map((value) => ({
                    ...value,
                    variantId: val.custom_variant_id,
                  })),
                  sideVariant: val.side_variant.map((value) => ({
                    ...value,
                    variantId: val.side_variant_id,
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
            restaurant_id: findRestaurant?.restaurant_id,
            totalPrice: Number(val.quantity * val.unit_price).toFixed(3),
            has_variants,
            branch_id: val?.branch_id,
          };

          obj.has_variants === false && delete obj.has_variants;
          obj.variants === null && delete obj.variants;

          dispatch(addToCart(obj));
        }
      });
    })
    .catch((err) => {
      console.error(err);
    });
};
