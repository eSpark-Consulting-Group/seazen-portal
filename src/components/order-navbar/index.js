import React from "react";
import { Typography, IconButton } from "@mui/material";
import styles from "../../screens/myorder/style.module.css";
import { useNavigate } from "react-router";
import { paths } from "../../routes/paths";
import FooterSection from "../footer/footerTextBox/footerSection";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

const OrderNavbar = () => {
  const navigate = useNavigate();

  return (
    <div className={`${styles.my_orderscreen_nav}`}>
      <IconButton
        size="large"
        sx={{
          boxShadow: (theme) => theme.shadows[16],
          marginLeft: "0",
          width: "42px",
          height: "42px",
          position: "relative",
          top: "-6.5px",
        }}
        edge="start"
        onClick={() => {
          navigate(paths.profile);
        }}
      >
        <ArrowBackRoundedIcon
          sx={{
            width: "24px",
            height: "24px",
            color: "#1F2933",
          }}
        />
      </IconButton>
      <Typography
        variant="h5"
        component="h2"
        fontWeight={700}
        color="#1F2933"
        sx={{ letterSpacing: "0.36px", marginTop: "-13px" }}
      >
        My Orders
      </Typography>
      <IconButton className={`${styles.brand_logo}`}>
        <img
          style={{ width: "11px", height: "20px" }}
          src="/assets/img/Group 259.svg"
          alt=""
        />
      </IconButton>
    </div>
  );
};

export default OrderNavbar;
