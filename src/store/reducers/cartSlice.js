import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    total: 0,
    totalItems: 0,
    totalQuantity: 0,
    comment: "",
  },

  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      if (item.length) {
        state.cart = item;
      } else {
        state.cart.push(item);
      }

      state.totalItems = state.totalItems + 1;
      state.totalQuantity = state.cart.reduce(
        (total, item) => total + item.quantity,
        0
      );

      var total = state.total + Number(item.totalPrice);

      state.total = total;
    },

    resetCart: (state) => {
      state.cart = [];
      state.total = 0;
      state.totalItems = 0;
      state.totalQuantity = 0;
    },
    addComment: (state, action) => {
      state.comment = action.payload;
    },

    updateCartItemQuantity: (state, action) => {
      const { itemCode, quantity, branch_id } = action.payload;
      const itemIndex = state.cart.findIndex(
        (cartItem) => cartItem.item_code === itemCode
      );

      if (itemIndex !== -1) {
        const itemTotalPrice = state.cart[itemIndex].totalPrice;
        const pricePerItem = itemTotalPrice / state.cart[itemIndex].quantity;
        state.cart[itemIndex].totalPrice = pricePerItem * quantity;
        state.cart[itemIndex].quantity = quantity;
        if (branch_id !== undefined) {
          state.cart[itemIndex].branch_id = branch_id;
        }
      }

      if (quantity < 1) {
        state.cart = state.cart.filter((val) => {
          return val.item_code !== itemCode;
        });
      }

      state.totalQuantity = state.cart.reduce(
        (total, item) => total + item.quantity,
        0
      );
      state.total = state.cart.reduce(
        (total, item) => total + Number(item.totalPrice),
        0
      );
    },

    updateCartMenuItemQuantity: (state, action) => {
      const { id, quantity, totalPrice } = action.payload;
      const itemIndex = state.cart.findIndex((cartItem) => cartItem.id === id);

      if (itemIndex !== -1) {
        state.cart[itemIndex].totalPrice = totalPrice;
        state.cart[itemIndex].quantity = quantity;
      }

      state.totalQuantity = state.cart.reduce(
        (total, item) => total + item.quantity,
        0
      );
      state.totalItems = state.cart.reduce(
        (total, item) => total + item.quantity,
        0
      );
      state.total = state.cart.reduce(
        (total, item) => total + Number(item.totalPrice),
        0
      );
    },

    updateCartItem: (state, action) => {
      const item = action.payload;
      const itemIndex = state.cart.findIndex(
        (cartItem) => cartItem.item_code === item.item_code
      );

      if (itemIndex !== -1) {
        state.cart[itemIndex].totalPrice = item.totalPrice;
        state.cart[itemIndex].specialInstructions = item.specialInstructions;
        state.cart[itemIndex].quantity = item.quantity;
        state.cart[itemIndex].variants = item.variants;
      }

      state.totalQuantity = state.cart.reduce(
        (total, item) => Number(total) + Number(item.quantity),
        0
      );
      state.total = state.cart.reduce(
        (total, item) => total + Number(item.totalPrice),
        0
      );
    },

    addSizeVariant: (state, action) => {
      const { id, size } = action.payload;
      const itemIndex = state.cart.findIndex((cartItem) => cartItem.id === id);

      if (itemIndex !== -1) {
        state.cart[itemIndex].size = size;
      }
    },

    addExtraToppings: (state, action) => {
      const { id, extraToppings } = action.payload;
      const itemIndex = state.cart.findIndex((cartItem) => cartItem.id === id);

      if (itemIndex !== -1) {
        state.cart[itemIndex].extraToppings = extraToppings;
      }
    },
    addExtraCustom: (state, action) => {
      const { id, extraCustom } = action.payload;
      const itemIndex = state.cart.findIndex((cartItem) => cartItem.id === id);

      if (itemIndex !== -1) {
        state.cart[itemIndex].extraCustom = extraCustom;
      }
    },

    addExtraSides: (state, action) => {
      const { id, extraSides } = action.payload;
      const itemIndex = state.cart.findIndex((cartItem) => cartItem.id === id);

      if (itemIndex !== -1) {
        state.cart[itemIndex].extraSides = extraSides;
      }
    },

    removeFromCart: (state, action) => {
      const id = action.payload;
      const itemIndex = state.cart.findIndex((cartItem) => cartItem.id === id);

      if (itemIndex !== -1) {
        const item = state.cart[itemIndex];
        state.totalItems -= item.quantity;
        state.totalQuantity -= item.quantity;
        state.total -= item.totalPrice;

        state.cart.splice(itemIndex, 1);
      }
    },
  },
});

export const {
  addToCart,
  updateCartItem,
  updateCartItemQuantity,
  updateCartMenuItemQuantity,
  removeFromCart,
  addSizeVariant,
  addExtraToppings,
  addExtraCustom,
  addExtraSides,
  updateCartInfo,
  resetCart,
  addComment,
} = cartSlice.actions;

export const selectCart = (state) => state.cart;

export default cartSlice.reducer;
