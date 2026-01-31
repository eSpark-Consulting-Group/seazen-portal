import { createTheme } from "@mui/material/styles";
import shadows from "@mui/material/styles/shadows";

const overridedShadows = shadows;

overridedShadows[7] = "0px 7px 50px rgba(116, 134, 148, 0.15)";
overridedShadows[16] = "0px 16px 50px rgba(49, 79, 124, 0.08)";

const theme = createTheme({
  components: {
    MuiIconButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#fff",
          "&:hover": {
            backgroundColor: "#fff",
          },
          boxShadow: (theme) => theme.shadows[16],
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
        sizeMedium: {
          fontSize: "1rem",
        },
        sizeSmall: {
          fontSize: "0.875rem",
        },
      },
    },
  },

  palette: {
    primary: {
      main: "#98694E",
      light: "#F5F5F5",
    },
    themeColor: {
      main: "#026754",
      light: "#308979",
      contrastText: "#fff",
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
    body1: {
      fontSize: "1rem",
    },
  },
});

export default theme;
