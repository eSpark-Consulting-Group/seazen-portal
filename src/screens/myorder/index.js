import React from "react";
import { Button } from "@mui/material";
import { useState } from "react";
import OrderCard from "../../components/order-cards";
import RateCard from "../../components/rate-card";
import OrderNavbar from "../../components/order-navbar";
import { paths } from "../../routes/paths";
import { useNavigate } from "react-router";
// import "../order/style.css";
import styles from "./style.module.css";

const MyOrderScreen = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState([
    { type: "All", isActive: false },
    { type: "Delivery", isActive: false },
    // { type: "Pick Up", isActive: false },
    // { type: "Dine In", isActive: false },
  ]);
  const randomPrice = (Math.random() * 10).toFixed(3);
  const randomOrderId = Math.floor(Math.random() * 1000000);

  function formatDateToCustomFormat(date) {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    const formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  }

  const currentDate = new Date();
  const formattedDate = formatDateToCustomFormat(currentDate);
  const [state, setState] = useState("Delivery");

  const itemsList = [
    {
      status: { text: "Submitted", color: "#F7B500" },
      type: "Delivery",
      orderId: `Q${randomOrderId}`,
      placeAt: formattedDate,
      rateTag: { isActive: false, text: "Rate" },
      reOrderTag: { isActive: false, text: "Re-Order" },
      priceTag: randomPrice,
      currency: "KWD",
      icon: "DeliveryOrder.svg",
    },
    {
      status: { text: "On the way", color: "#6236FF" },
      type: "Delivery",
      orderId: `Q${randomOrderId}`,
      placeAt: formattedDate,
      rateTag: { isActive: false, text: "Rate" },
      reOrderTag: { isActive: false, text: "Re-Order" },
      priceTag: randomPrice,
      currency: "KWD",
      icon: "DeliveryOrder.svg",
    },

    {
      status: { text: "Cancelled", color: "#E02020" },
      type: "Delivery",
      orderId: `Q${randomOrderId}`,
      placeAt: formattedDate,
      rateTag: { isActive: false, text: "Rate" },
      reOrderTag: { isActive: true, text: "Re-Order" },
      priceTag: randomPrice,
      currency: "KWD",
      icon: "DeliveryOrder.svg",
    },
    {
      status: { text: "Preparing", color: "#0091FF" },
      type: "Delivery",
      orderId: `Q${randomOrderId}`,
      placeAt: formattedDate,
      rateTag: { isActive: false, text: "Rate" },
      reOrderTag: { isActive: false, text: "Re-Order" },
      priceTag: randomPrice,
      currency: "KWD",
      icon: "DeliveryOrder.svg",
    },
    {
      status: { text: "Delivered", color: "#4E948A" },
      type: "Delivery",
      orderId: `Q${randomOrderId}`,
      placeAt: formattedDate,
      rateTag: { isActive: true, text: "Rate" },
      reOrderTag: { isActive: true, text: "Re-Order" },
      priceTag: randomPrice,
      currency: "KWD",
      icon: "DeliveryOrder.svg",
    },
  ];

  const handleItems = (item, index) => {
    setState(item.type);
    const updateCategory = [...category];
    updateCategory.map((item) => (item.isActive = false));
    updateCategory[index].isActive = true;
    setCategory(updateCategory);
  };

  const handleReceipt = () => {
    navigate(paths.receipt);
  };
  const handleRate = () => {};
  const handleReorder = () => {
    alert("Reorder");
  };

  return (
    <div className={styles.myOrderscreen}>
      <OrderNavbar />
      <div className={styles.categoryItems}>
        {category.map((item, index) => {
          return (
            <Button
              variant="outlined"
              style={{
                backgroundColor: item.isActive ? "#98694E" : "white",
                color: item.isActive ? "white" : "black",
                border: " 1px solid #C0CDD7",
              }}
              onClick={() => handleItems(item, index)}
              key={index}
              className={styles.catItem}
              sx={{ p: 1, border: " 1px solid #C0CDD7", color: "#40484E" }}
            >
              {item.type}
            </Button>
          );
        })}
      </div>
      <div className={styles.myOrderCards}>
        {itemsList.map((item, index) =>
          item.type === state ? (
            <OrderCard
              item={item}
              key={index}
              handleReceipt={handleReceipt}
              handleReorder={handleReorder}
              handleRate={handleRate}
            />
          ) : state === "All" ? (
            <OrderCard
              item={item}
              key={index}
              handleReceipt={handleReceipt}
              handleReorder={handleReorder}
              handleRate={handleRate}
            />
          ) : null
        )}
      </div>
      <div className={styles.commentSection}>
        <img src="/assets/img/Comment_Icon.png" alt="" />
      </div>
      <RateCard />
    </div>
  );
};

export default MyOrderScreen;
