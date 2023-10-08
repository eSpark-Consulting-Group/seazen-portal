import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  addressData: [],
  addressDetail: {},
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    getAddress: (state, action) => {
      state.addressData = action.payload;
    },
    addAddressDetail: (state, action) => {
      state.addressDetail = action.payload;
    },
  },
});

export const { getAddress, addAddressDetail } = addressSlice.actions;

export default addressSlice.reducer;
