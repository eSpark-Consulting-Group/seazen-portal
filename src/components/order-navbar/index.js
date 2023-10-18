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
        }}
        edge="start"
        onClick={() => {
          navigate(paths.profile);
        }}
        className="back-location"
      >
        <ArrowBackRoundedIcon fontSize="large" />
      </IconButton>
      <Typography variant="h5" component="h2" fontWeight={700} color="#1F2933">
        My Orders
      </Typography>
      <IconButton className={`${styles.brand_logo}`}>
        <img src="/assets/img/options icon.svg" alt="" />
      </IconButton>
    </div>
  );
};

export default OrderNavbar;
