import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import "./style.css";
import ContactUs from "../../components/contactButton/contact";
import { useNavigate } from "react-router";
import { paths } from "../../routes/paths";

export const OrderFailed = () => {
  const navigate = useNavigate();

  return (
    <Stack>
      <div className="closeButtonTag" onClick={() => navigate(paths.cart)}>
        <p style={{ color: "#1F2933", cursor: "pointer" }}>
          <strong>᙭</strong>
        </p>
      </div>
      <Stack spacing={2} alignItems="center">
        <img
          src="assets/img/order-failed.svg"
          alt="Your Image"
          style={{ width: "102px", height: "102px", marginBottom: "10px" }}
        />
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            color: " #1F2933",
            font: "normal normal bold 32px/32px Titillium Web",
            textAlign: "center",
            marginBottom: "30px !important",
          }}
        >
          Something <br /> Went Wrong!
        </Typography>
        <Typography
          variant="body1"
          paragraph
          sx={{
            color: " #959FA8",
            font: "normal normal bold 16px/18px Titillium Web",
            textAlign: "center",
            marginBottom: "10px !important",
          }}
        >
          YOUR ORDER HAS NOT BEEN PLACED.
        </Typography>
        <Typography
          variant="body1"
          paragraph
          sx={{
            color: " #959FA8",
            font: "normal normal bold 16px/18px Titillium Web",
            textAlign: "center",
            marginBottom: "10px !important",
          }}
        >
          Review payment method
          <br /> and place your order again.
        </Typography>
        <Button
          onClick={() => navigate(paths.cart)}
          sx={{
            background: "#98694E 0% 0% no-repeat padding-box",
            borderRadius: "8px",
            opacity: 1,
            "&:hover": {
              background: "#98694E 0% 0% no-repeat padding-box",
              borderRadius: "8px",
              opacity: 1,
            },
          }}
        >
          <span
            style={{
              color: "#FFF",
              font: "normal normal bold 15px/17px Titillium Web",
            }}
          >
            Review Payment Method
          </span>
        </Button>
        <ContactUs />
      </Stack>
    </Stack>
  );
};
