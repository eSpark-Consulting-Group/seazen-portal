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
      const itemIndex = state.cart.findIndex(
        (cartItem) => cartItem.id === item.id
      );

      if (itemIndex === -1) {
        state.cart.push({
          ...item,
          quantity: 1,
        });
      } else {
        state.cart[itemIndex].quantity++;
      }

      state.totalItems++;
      state.totalQuantity += item.price;
      state.total += item.price;
    },

    updateCart: (state, action) => {
      const { id, quantity } = action.payload;
      const itemIndex = state.cart.findIndex((cartItem) => cartItem.id === id);

      if (itemIndex !== -1) {
        state.cart[itemIndex].quantity = quantity;
      }

      state.totalItems = state.cart.reduce(
        (total, item) => total + item.quantity,
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
        state.totalQuantity -= item.price * item.quantity;
        state.total -= item.price * item.quantity;

        state.cart.splice(itemIndex, 1);
      }
    },
  },
});

export const {
  addToCart,
  updateCart,
  removeFromCart,
  addSizeVariant,
  addExtraToppings,
  addExtraSides,
} = cartSlice.actions;

export const selectCart = (state) => state.cart;

export default cartSlice.reducer;
