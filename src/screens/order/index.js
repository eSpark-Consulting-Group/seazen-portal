import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import ContactUs from "../../components/contactButton/contact";
import UpdateSection from "../../components/orderPlace/timeUpdateSection";
import AddressSection from "../../components/orderPlace/addressSection";
import OrderIdSection from "../../components/orderPlace/orderIdSection";
import FooterSection from "../../components/footer/footerTextBox/footerSection";

const OrderScreen = () => {
  const [progress, setProgress] = useState([
    { done: true },
    { done: false },
    { done: false },
    { done: false },
  ]);

  const [updateStatus, setUpdateStatus] = useState([
    { tag: "Submitted", text: "Confirming your order", tagColor: "#F7B500" },
    { tag: "Preparing", text: "Preparing your order", tagColor: "#0091FF" },
    { tag: "On the way", text: "Driver is on the way", tagColor: "#6236FF" },
    { tag: "Delivered", text: "Your order is delivered", tagColor: "#4E948A" },
  ]);

  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count < 4) StartProgress();
  }, [count]);

  const StartProgress = () => {
    setTimeout(() => {
      if (count < progress.length - 1) {
        const updateProgress = [...progress];
        updateProgress[count + 1].done = true;
        setCount(count + 1);
        setProgress(updateProgress);
      }
    }, 3000);
  };

  return (
    <div className={styles.orderScreen}>
      <div id="close-button" className={styles.closeButton}>
        <div id="close-btn-tag" className={styles.closeBtnTag}>
          <p style={{ color: "#1F2933" }}>
            <strong>᙭</strong>
          </p>
        </div>
      </div>{" "}
      <div className={styles.orderheaderSection}>
        <img src="/assets/img/tick.png" alt="" />
        <p id="thanksnote" className={styles.thanksnote}>
          Thank you for placing<br></br>your order.
        </p>
      </div>{" "}
      <UpdateSection />
      <div className={styles.orderProgressBar}>
        {progress.map((stage, index) => {
          return (
            <div
              key={index}
              style={{ backgroundColor: stage.done ? "#BEC2C7" : "#DCDFE3" }}
              className={styles.orderprogressBar}
            ></div>
          );
        })}
      </div>
      <div className={styles.orderStatus}>
        <div
          id="order-status-tag"
          className={styles.orderStatusTag}
          style={{ backgroundColor: updateStatus[count].tagColor }}
        >
          <p>{updateStatus[count].tag}</p>
        </div>
        <div className={styles.orderConfirmTextContainer}>
          <p id="orderconfirm-text" className={styles.orderConfirmText}>
            {" "}
            {updateStatus[count].text}
          </p>
        </div>
      </div>
      <AddressSection />
      <OrderIdSection />
      <ContactUs />
      <FooterSection />
    </div>
  );
};

export default OrderScreen;
