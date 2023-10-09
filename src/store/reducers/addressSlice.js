import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  addressData: [],
  addressDetail: {},
  error: "",
  isLoading: false,
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
  },
});

export const { isLoaded, getAddress, addAddressDetail } = addressSlice.actions;

export default addressSlice.reducer;
