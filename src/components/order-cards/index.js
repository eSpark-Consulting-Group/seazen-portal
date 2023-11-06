import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Button, Card, Rating, Box } from "@mui/material";

import RateCard from "../rate-card";
// import ReOrderCard from "../ReOrderCard";

import addOrderRating from "../../api/order/addOrderRating";
import { GET_ORDERS_QUERY_KEY } from "../../api/order/getOrders";

import { openReorderModal } from "../../store/reducers/orderSlice";

import { paths } from "../../routes/paths";

import styles from "../../screens/myorder/style.module.css";

const OrderCard = ({ item }) => {
  const dispatch = useDispatch();

  const queryClient = useQueryClient();

  const [openRate, setOpenRate] = useState(false);
  const [openReorder, setOpenReorder] = useState(false);
  const [average, setAverage] = useState(item.rating || 0);
  const navigate = useNavigate();

  const handleRate = (val) => {
    setOpenRate(val);
  };

  const handleClose = (value) => {
    handleRate(false);
    setAverage(value);
    handleRateOrder(value);
  };

  const handleReceipt = () => {
    navigate(paths.receipt + item.order_id);
  };

  const handleReorder = (orderItem) => {
    dispatch(openReorderModal());
    localStorage.setItem(
      "restaurantID",
      orderItem.order_item[0]?.restaurant_id
    );

    navigate(
      `${paths.menu}/restaurant/${orderItem.order_item[0]?.restaurant_id}/delivery`,
      {
        state: { order_item: orderItem.order_item },
      }
    );
    // setOpenReorder(true);
  };

  const handleReorderClose = () => {
    setOpenReorder(false);
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
      case "Canceled":
        return "#E02020";
      default:
        return "#F7B500";
    }
  };

  const restaurantImagePath = `/assets/img/order seazen logo.svg`;

  const { mutate: rateOrder } = useMutation({
    mutationFn: addOrderRating,
    onSuccess: (response) => {
      if (response?.data?.rating) {
        queryClient.invalidateQueries(GET_ORDERS_QUERY_KEY);
        setAverage(response.data.rating);
      }
    },
  });

  const handleRateOrder = (rating) => {
    rateOrder({
      order_id: item.order_id,
      rating,
    });
  };

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
      {(item.order_status === "Delivered" ||
        item.order_status === "Cancelled") && (
        <Box
          sx={{
            px: 1.5,
            pb: 1,
            display: "flex",
            justifyContent: "space-between",
            ...(item.order_status === "Cancelled" && {
              justifyContent: "flex-end",
            }),
            alignItems: "center",
          }}
        >
          {average !== 0 ? (
            <Rating name="read-only" value={average} />
          ) : (
            item.order_status === "Delivered" && (
              <Button
                sx={{
                  border: "1px solid #C0CDD7",
                  color: "#40484E",
                }}
                size="small"
                variant="outlined"
                onClick={() => handleRate(true)}
              >
                Rate
              </Button>
            )
          )}

          <Button
            sx={{
              border: "1px solid #C0CDD7",
              color: "#40484E",
            }}
            size="small"
            variant="outlined"
            onClick={() => handleReorder(item)}
          >
            Reorder
          </Button>
        </Box>
      )}
      <RateCard isVisible={openRate} handleClose={(val) => handleClose(val)} />
      {/* <ReOrderCard
        isVisible={openReorder}
        handleClose={handleReorderClose}
        items={item.order_item}
        restaurant_id={item.restaurant_id}
      /> */}
    </Card>
  );
};

export default OrderCard;
