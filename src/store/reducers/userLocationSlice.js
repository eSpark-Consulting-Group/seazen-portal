import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedAddress: null,
};

const userLocationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    addSelectedAddress: (state, { payload }) => {
      state.selectedAddress = payload;
    },
  },
});

export const { addSelectedAddress } = userLocationSlice.actions;

export default userLocationSlice.reducer;
