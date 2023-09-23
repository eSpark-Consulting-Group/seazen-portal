import React, { useEffect, useState } from "react";
import "./style.css";
import ContactUs from "../../components/contactButton/contact";
import UpdateSection from "../../components/orderPlace/timeUpdateSection";
import AddressSection from "../../components/orderPlace/addressSection";
import OrderIdSection from "../../components/orderPlace/orderIdSection";
import FooterSection from "../../components/footer/footerTextBox/footerSection";
import { useNavigate } from "react-router-dom";
import { paths } from "../../routes/paths";

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
  const navigate = useNavigate();

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
    <div className="order-screen">
      <div id="close-button">
        <div id="close-btn-tag">
          <p  onClick={() => navigate(paths.home)} style={{ color: "#1F2933", cursor: "pointer" }}>
            <strong>᙭</strong>
          </p>
        </div>
      </div>{" "}
      <div className="orderheader-section">
        <img src="/assets/img/tick.png" alt="" />
        <p id="thanksnote">
          Thank you for placing<br></br>your order.
        </p>
      </div>{" "}
      <UpdateSection />
      <div className="order-progress-bar">
        {progress.map((stage, index) => {
          return (
            <div
              key={index}
              style={{ backgroundColor: stage.done ? "#BEC2C7" : "#DCDFE3" }}
              className="orderprogress-bar"
            ></div>
          );
        })}
      </div>
      <div className="order-status">
        <div
          id="order-status-tag"
          style={{ backgroundColor: updateStatus[count].tagColor }}
        >
          <p>{updateStatus[count].tag}</p>
        </div>
        <div className="orderconfirm-text-container">
          <p id="orderconfirm-text"> {updateStatus[count].text}</p>
        </div>
      </div>
      <AddressSection />
      <OrderIdSection />
      <ContactUs />
     <div className="orderconfirm-footer">
      <FooterSection />
     </div>
    </div>
  );
};

export default OrderScreen;
