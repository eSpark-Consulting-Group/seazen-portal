import React from "react";
import { Typography, IconButton } from "@mui/material";
import styles from "../../screens/myorder/style.module.css";
import { useNavigate } from "react-router";
import { paths } from "../../routes/paths";

const OrderNavbar = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.myOrderscreenNav}>
      {" "}
      <IconButton
        onClick={() => {
          navigate(paths.profile);
        }}
      >
        <img src="/assets/img/Arrow.png" alt="" />
      </IconButton>
      <Typography
        variant="h5"
        component="h2"
        fontWeight={700}
        style={{ color: "#1F2933" }}
      >
        My Orders
      </Typography>
      <IconButton className={styles.brandLogo}>
        {" "}
        <img src="/assets/img/Group 259.png" alt="" />
      </IconButton>
    </div>
  );
};

export default OrderNavbar;
