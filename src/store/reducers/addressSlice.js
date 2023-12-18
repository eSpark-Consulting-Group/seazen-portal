import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  addressData: [],
  allAreas: [],
  addressDetail: {},
  error: "",
  isLoading: false,
  areaData: {},
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    isLoaded: (state) => {
      state.isLoading = true;
    },
    getAddress: (state, { payload }) => {
      state.addressData = payload;
      state.isLoading = false;
    },
    addAddressDetail: (state, { payload }) => {
      if (payload.address === undefined) {
        state.addressDetail = payload.currentAdd;
      }
    },
    getAreas: (state, { payload }) => {
      state.allAreas = payload;
    },
    storeAreaDetail: (state, { payload }) => {
      state.areaData = payload;
    },
  },
});

export const {
  isLoaded,
  getAddress,
  addAddressDetail,
  getAreas,
  storeAreaDetail,
} = addressSlice.actions;

export default addressSlice.reducer;
