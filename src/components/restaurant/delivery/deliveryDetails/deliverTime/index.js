import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";

const DeliveryTime = () => {
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      sx={{
        bgcolor: (theme) => theme.palette.themeColor.main,
        color: "common.white",
        p: 1,
        borderRadius: "8px",
        width:"34px",
        height:"32px",
        marginTop: "8px",
        marginLeft: "-13px",
      }}
      spacing={0}
    >
      <Typography
        sx={{
          lineHeight: 1,
          font:"font: normal normal 600 17px/6px Montserrat",
        }}
      >
        30
      </Typography>
      <Typography
        variant="caption"
        fontWeight={300}
        sx={{
          lineHeight: 1,
          font: "normal normal 600 5px/6px Montserrat",

        }}
      >
        minutes
      </Typography>
    </Stack>
  );
};

export default DeliveryTime;
