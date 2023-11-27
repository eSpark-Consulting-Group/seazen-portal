// themeSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  resturantsData: [],
  resturantsBanner: [],
  listItemByCategory: null,
  details: [],
  nearbyRestaurants: [],
  branchHours: [],
  branchId: null,
  visibleCategoryElementID: 0,
  selectedService: null,
  restaurantDetail: {},
};

const resturantsSlice = createSlice({
  name: "resturants",
  initialState,
  reducers: {
    getResturants: (state, action) => {
      state.resturantsData = action.payload;
    },
    getBranchHours: (state, action) => {
      state.branchHours = action.payload;
    },
    getRestaurantsBanner: (state, action) => {
      state.resturantsBanner = action.payload;
    },
    getCategoryItemList: (state, action) => {
      state.listItemByCategory = action.payload;
    },
    getResturantsDetails: (state, action) => {
      state.restaurantDetail = action.payload;
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
    setCategoryElementID: (state, action) => {
      state.visibleCategoryElementID = action.payload;
    },
    setBranchID: (state, action) => {
      state.branchId = action.payload;
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
    getNearByRest: (state, action) => {
      state.nearbyRestaurants = action.payload;
    },
    setSelectedService: (state, action) => {
      state.selectedService = action.payload;
    },
    removeSelectedService: (state) => {
      state.selectedService = null;
    },
  },
});

export const {
  getResturants,
  getCategoryItemList,
  setVariantSize,
  setExtraToppings,
  getRestaurantsBanner,
  setExtraToppingsCount,
  setSlides,
  setSlidesCount,
  changeItemQuantity,
  setCategoryElementID,
  setBranchID,
  getNearByRest,
  getBranchHours,
  setSelectedService,
  removeSelectedService,
  getResturantsDetails,
} = resturantsSlice.actions;

export default resturantsSlice.reducer;
