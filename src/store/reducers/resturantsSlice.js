// themeSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  resturantsData: [],
  resturantsBanner: [],
  listItemByCategory: [],
  listCategory: [],
  details: [],
  nearbyRestaurants: [],
  branchHours: [],
  branchId: null,
  visibleCategoryElementID: 0,
  selectedService: null,
  restaurantDetail: {},
  categoryLoading: false,
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
    toggleCategoryListLoading: (state) => {
      state.categoryLoading = true;
    },
    getCategoryItemList: (state, action) => {
      state.categoryLoading = false;
      state.listItemByCategory = action.payload;
    },
    getCategoryList: (state, action) => {
      state.listCategory = action.payload;
    },
    getResturantsDetails: (state, action) => {
      state.restaurantDetail = action.payload;
    },
    removeResturantsDetails: (state) => {
      state.restaurantDetail = {};
    },
    removeCategoryItemList: (state) => {
      state.listItemByCategory = [];
    },
    removeCategoryList: (state) => {
      state.listCategory = [];
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
    setExtraCustom: (state, action) => {
      state.details.push({
        extraCustom: action.payload,
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
    setExtraCustomCount: (state, action) => {
      state.details.extraCustom = state.details.extraCustom.map((item, index) =>
        index !== action.payload.index
          ? item
          : {
              ...item,
              quantity: action.payload.updateQuantityBy,
            }
      );
      state.details.customTotalCount = state.details.extraCustom.reduce(
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
    removeBranchID: (state, action) => {
      state.branchId = null;
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
  setExtraCustom,
  getRestaurantsBanner,
  setExtraToppingsCount,
  setExtraCustomCount,
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
  getCategoryList,
  toggleCategoryListLoading,
  removeBranchID,
  removeResturantsDetails,
  removeCategoryItemList,
  removeCategoryList,
} = resturantsSlice.actions;

export default resturantsSlice.reducer;
