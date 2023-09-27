// themeSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  resturantsData: [],
  listItemByCategory: null,
  details: [],
};

const resturantsSlice = createSlice({
  name: "resturants",
  initialState,
  reducers: {
    getResturants: (state, action) => {
      state.resturantsData = action.payload;
    },
    getCategoryItemList: (state, action) => {
      state.listItemByCategory = action.payload;
    },
    setVariantSize: (state, action) => {
      if (!state.details.includes(action.payload.id)) {
        state.details.push({
          variantSize: action.payload.isCheckedArray,
        });
      }
    },
    setExtraToppings: (state, action) => {
      state.details.push({
        extraToppings: action.payload,
      });
    },
    setExtraToppingsCount: (state, action) => {
      state.details.extraToppings = state.details.extraToppings.map(
        (item, index) =>
          index !== action.payload.index
            ? item
            : {
                ...item,
                quantity: action.payload.updateQuantityBy,
              }
      );
      state.details.toppingsTotalCount = state.details.extraToppings.reduce(
        (acc, curr) => acc + curr.quantity,
        0
      );
    },
    setSlides: (state, action) => {
      state.details.slides = action.payload;
    },
    setSlidesCount: (state, action) => {
      state.details.slides = state.details.slides.map((item, index) =>
        index !== action.payload.index
          ? item
          : {
              ...item,
              quantity: action.payload.updateQuantityBy,
            }
      );
      state.details.setSlidesCount = state.details.slides.reduce(
        (acc, curr) => acc + curr.quantity,
        0
      );
    },
    changeItemQuantity: (state, action) => {
      state.details.itemQuantity = action.payload;
    },
  },
});

export const {
  getResturants,
  getCategoryItemList,
  setVariantSize,
  setExtraToppings,
  setExtraToppingsCount,
  setSlides,
  setSlidesCount,
  changeItemQuantity,
} = resturantsSlice.actions;

export default resturantsSlice.reducer;
