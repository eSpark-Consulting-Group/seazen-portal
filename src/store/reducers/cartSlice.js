import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    total: 0,
    totalItems: 0,
    totalQuantity: 0,
  },

  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      state.cart.push(item);

      state.totalItems = state.totalItems + 1;
      state.totalQuantity = state.cart.reduce(
        (total, item) => total + item.quantity,
        0
      );

      console.log(
        "type test",
        state.total,
        item.totalPrice,
        state.total + Number(item.totalPrice)
      );

      var total = state.total + Number(item.totalPrice);

      state.total = total;
    },

    updateCartItemQuantity: (state, action) => {
      const { id, quantity, totalPrice } = action.payload;
      const itemIndex = state.cart.findIndex((cartItem) => cartItem.id === id);

      if (itemIndex !== -1) {
        state.cart[itemIndex].quantity = quantity;
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

    updateCartItem: (state, action) => {
      const item = action.payload;
      const itemIndex = state.cart.findIndex(
        (cartItem) => cartItem.id === item.id
      );

      if (itemIndex !== -1) {
        state.cart[itemIndex] = item;
      }

      state.totalQuantity = state.cart.reduce(
        (total, item) => Number(total) + Number(item.totalPrice),
        0
      );
      state.total = state.cart.reduce(
        (total, item) =>
          Number(total).toFixed(2) + Number(item.totalPrice).toFixed(2),
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
        state.totalQuantity -= item.totalPrice * item.quantity;
        state.total -= item.totalPrice * item.quantity;

        state.cart.splice(itemIndex, 1);
      }
    },
  },
});

export const {
  addToCart,
  updateCartItem,
  updateCartItemQuantity,
  removeFromCart,
  addSizeVariant,
  addExtraToppings,
  addExtraSides,
  updateCartInfo,
} = cartSlice.actions;

export const selectCart = (state) => state.cart;

export default cartSlice.reducer;
