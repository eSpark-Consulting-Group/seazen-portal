import { createTheme } from "@mui/material/styles";
import shadows from "@mui/material/styles/shadows";

const overridedShadows = shadows;

overridedShadows[7] = "0px 7px 50px rgba(116, 134, 148, 0.15)";

const theme = createTheme({
  components: {
    MuiIconButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#fff",
        },
      },
    },

    MuiButton: {
      defaultProps: {
        disableRipple: true,
        disableElevation: true,
      },

      styleOverrides: {
        root: {
          textTransform: "none",
        },
        sizeLarge: {
          fontSize: "1.125rem",
        },
      },
    },
  },

  palette: {
    primary: {
      main: "#98694E",
      light: "#F5F5F5",
    },
    text: {
      secondary: "#6B757F",
    },
  },

  shadows: overridedShadows,

  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: "'Titillium Web', sans-serif",
    fontSize: 12,
    fontWeightBold: 900,
    fontWeightMedium: 700,
    fontWeightRegular: 600,
  },
});

export default theme;
