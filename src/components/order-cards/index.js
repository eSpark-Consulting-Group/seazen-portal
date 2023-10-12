import React, { useState } from "react";
import { Button, Card, Rating } from "@mui/material";
import styles from "../../screens/myorder/style.module.css";
import RateCard from "../rate-card";
import { useNavigate } from "react-router-dom";
import { paths } from "../../routes/paths";

const OrderCard = ({ item }) => {
  const [openRate, setOpenRate] = useState(false);
  const [average, setAverage] = useState(0);
  const navigate = useNavigate();

  const handleRate = (val) => {
    setOpenRate(val);
  };

  const handleClose = (value) => {
    handleRate(false);
    setAverage(value);
  };

  const handleReceipt = () => {
    navigate(paths.receipt + item.order_id);
  };

  const handleReorder = () => {
    navigate(paths.menu + paths.branches + item.restaurant_id);
  };

  const iconPath = `/assets/img/DeliveryOrder.svg`;

  const mapStatusToColor = (status) => {
    switch (status) {
      case "Submitted":
        return "#F7B500";
      case "Preparing":
        return "#0091FF";
      case "On the way":
        return "#6236FF";
      case "Delivered":
        return "#4E948A";
      case "Cancelled":
        return "#E02020";
      default:
        return "#F7B500";
    }
  };

  const restaurantImagePath =
    `/assets/img/` +
    (item.restaurant_id === 1 ? "masgoof.svg" : "Groove_Logo.svg");

  return (
    <Card style={{ border: "1px solid #C0CDD7", marginTop: "10px" }}>
      <div className={`${styles.card_nav}`}>
        <img src={restaurantImagePath} alt="" />
        <div className={`${styles.card_nav_tags}`}>
          <div
            className={`${styles.status_tag}`}
            style={{
              backgroundColor: `${mapStatusToColor(item.order_status)}`,
            }}
          >
            {item.order_status}
          </div>
          <Button
            sx={{ p: 1, border: " 1px solid #C0CDD7", color: "#40484E" }}
            variant="outlined"
            className={`${styles.receipt_tag}`}
            onClick={handleReceipt}
          >
            Receipt
          </Button>
        </div>
      </div>
      <div
        className={`${styles.card_content} mx-3`}
        style={{
          borderTop: "1px dashed #707070",
        }}
      >
        <div className={`${styles.card_content_left}`}>
          <div className={`${styles.card_content_left_lt}`}>
            <img src={iconPath} alt="" />
            <div>
              <div className={`${styles.card_content_left_text}`}>
                {item.service_type} order
              </div>
              <div className={`${styles.card_content_left_text}`}>
                Order Id: #{item.order_no}
              </div>
            </div>
          </div>
          <div
            className={`${styles.card_content_left_text_regular} align-left`}
          >
            Placed at: {item.order_date}
          </div>
        </div>
        <div className={`${styles.card_content_right}`}>
          <div id={`${styles.card_content_right_price}`}>
            {item.order_total_price}
          </div>
          <div id={`${styles.card_content_right_unit}`}>KWD</div>
        </div>
      </div>
      <div
        className={
          item.order_status === "Delivered" || item.order_status === "Cancelled"
            ? `${styles.card_footer}`
            : `${styles.card_single_footer}`
        }
      >
        {average !== 0 ? (
          <Rating name="read-only" value={average} />
        ) : (
          item.order_status === "Delivered" && (
            <Button
              sx={{ p: 1, border: " 1px solid #C0CDD7", color: "#40484E" }}
              variant="outlined"
              className={`${styles.card_footer_rate}`}
              onClick={() => handleRate(true)}
            >
              Rate
            </Button>
          )
        )}

        {item.order_status === "Cancelled" && (
          <Button
            sx={{ p: 1, border: " 1px solid #C0CDD7", color: "#40484E" }}
            variant="outlined"
            className={`${styles.card_footer_reorder}`}
            href=""
            onClick={handleReorder}
          >
            Reorder
          </Button>
        )}
      </div>
      <RateCard isVisible={openRate} handleClose={(val) => handleClose(val)} />
    </Card>
  );
};

export default OrderCard;
