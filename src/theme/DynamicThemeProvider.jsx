import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import { selectThemeColor } from "../store/reducers/themeSlice";
import theme from "./index";

function DynamicThemeProvider({ children }) {
  const dynamicColor = useSelector(selectThemeColor);
  const [dynamicPalette, setDynamicPalette] = useState({ ...theme });

  useEffect(() => {
    setDynamicPalette({
      ...theme,
      palette: {
        ...theme.palette,
        themeColor: dynamicColor,
      },
    });

    console.log("dynamicColor", dynamicColor);
  }, [dynamicColor]);

  return <ThemeProvider theme={dynamicPalette}>{children}</ThemeProvider>;
}

export default DynamicThemeProvider;
