// themeSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  themeColor: {
    main: "#026754",
    light: "#308979",
    contrastText: "#fff",
  },
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setThemeColor: (state, action) => {
      state.themeColor = {
        ...state.themeColor,
        ...action.payload,
      };
    },
  },
});

export const { setThemeColor } = themeSlice.actions;
export const selectThemeColor = (state) => state.theme.themeColor;

export default themeSlice.reducer;
