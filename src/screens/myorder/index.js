import React from "react";
import { Button } from "@mui/material";
import { useState } from "react";
import OrderCard from "../../components/order-cards";
import RateCard from "../../components/rate-card";
import OrderNavbar from "../../components/order-navbar";
import { paths } from "../../routes/paths";
import { useNavigate } from "react-router";
import styles from "./style.module.css";
import FooterSection from "../../components/footer/footerTextBox/footerSection";

const MyOrderScreen = () => {
  const navigate = useNavigate();

  const [category, setCategory] = useState([
    { type: "All", isActive: false },
    { type: "Delivery", isActive: false },
    // { type: "Pick Up", isActive: false },
    // { type: "Dine In", isActive: false },
  ]);
  const [state, setState] = useState("Delivery");

  const randomPrice = (Math.random() * 10).toFixed(3);
  const randomOrderId = Math.floor(Math.random() * 1000000);
  const currentDate = new Date();
  const formattedDate = formatDateToCustomFormat(currentDate);

  //cart has orders.
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

  //// cart empty
  //const itemsList = null;

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

  const emptyCartText = "You don't have any orders yet.";

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
    <div className={`${styles.my_orderscreen}`}>
      <OrderNavbar />
      <div className={`${styles.category_items}`}>
        {category.map((item, index) => {
          return (
            <Button
              variant="outlined"
              style={{
                backgroundColor: item.isActive ? "#98694E" : "white",
                color: item.isActive ? "white" : "#3F484E",
                border: " 1px solid #C0CDD7",
              }}
              onClick={() => handleItems(item, index)}
              key={index}
              className={`${styles.cat_item}`}
              sx={{ p: 1, border: " 1px solid #C0CDD7", color: "#40484E" }}
            >
              {item.type}
            </Button>
          );
        })}
      </div>
      <div className={`${styles.my_order_cards}`}>
        {itemsList === "" || itemsList === null ? (
          <div className={`${styles.empty_orders}`}>
            <img src="/assets/img/cart_image.svg" alt="" />
            <div className={`${styles.empty_orders_desc}`}>{emptyCartText}</div>
            <Button
              sx={{
                width: "326px",
                height: "56px",
                fontSize: "22px",
                fontWeight: "500",
                backgroundColor: "#98694E",
                color: "#fff",
              }}
              onClick={() => {
                navigate(paths.home);
              }}
            >
              Start Ordering
            </Button>
          </div>
        ) : (
          <div>
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
            {/* <div className={`${styles.comment_section}`}>
            <FooterSection />
            </div> */}
            
          </div>
        )}
      </div>

      <RateCard />
    </div>
  );
};

export default MyOrderScreen;
