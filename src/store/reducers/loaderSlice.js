import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toLoad: false,
};

const loaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    setToLoad: (state, action) => {
      state.toLoad = action.payload;
    },
  },
});

export const { setToLoad } = loaderSlice.actions;

export default loaderSlice.reducer;
