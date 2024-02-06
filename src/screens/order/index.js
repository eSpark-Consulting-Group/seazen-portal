import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ContactUs from "../../components/contactButton/contact";
import UpdateSection from "../../components/orderPlace/timeUpdateSection";
import AddressSection from "../../components/orderPlace/addressSection";
import OrderIdSection from "../../components/orderPlace/orderIdSection";
import FooterSection from "../../components/footer/footerTextBox/footerSection";
import { paths } from "../../routes/paths";
import "./style.css";
import { useMutation } from "@tanstack/react-query";
import getOrderStatus from "../../api/order/getOrderStatus";
import { set } from "lodash";
import { Box, CircularProgress } from "@mui/material";
import { useDispatch } from "react-redux";
import { resetCart } from "../../store/reducers/cartSlice";
import clearCart from "../../api/cart/clearCart";

const OrderScreen = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentStatus, setCurrentStatus] = useState("Submitted");
  const [progress, setProgress] = useState([
    { done: true },
    { done: false },
    { done: false },
    { done: false },
    { done: false },
  ]);

  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  useEffect(() => {
    dispatch(resetCart());
    clearCart(token)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const orderStatus = [
    {
      tag: "Submitted",
      text: "Confirming your order",
      tagColor: "#F7B500",
    },
    {
      tag: "Accepted",
      text: "Your order is accepted",
      tagColor: "#F7B500",
    },
    {
      tag: "Ready for Dispatch",
      text: "Your order is ready for dispatch",
      tagColor: "#F7B500",
    },
    {
      tag: "On The Way",
      text: "Driver is on the way",
      tagColor: "#6236FF",
    },
    {
      tag: "Delivered",
      text: "Your order is delivered",
      tagColor: "#4E948A",
    },
  ];

  const getOrderStatusObj = orderStatus.find((val) => val.tag == currentStatus);

  const navigate = useNavigate();

  // useEffect(() => {
  //   if (
  //     searchParams.get("order_no") === null ||
  //     searchParams.get("reference_number") === null
  //   ) {
  //     navigate("/order-failed");
  //   }
  // }, []);

  const {
    mutate: checkOrderStatus,
    isLoading,
    data,
  } = useMutation({
    mutationFn: getOrderStatus,
    onSuccess: (response) => {
      if (response.data && response.success === "ok") {
        setCurrentStatus(response.data.order_status);

        if (response.data.order_status === "Submitted") {
          setProgress([
            { done: true },
            { done: false },
            { done: false },
            { done: false },
            { done: false },
          ]);
        }
        if (response.data.order_status === "Accepted") {
          setProgress([
            { done: true },
            { done: true },
            { done: false },
            { done: false },
            { done: false },
          ]);
        }
        if (response.data.order_status === "Ready for Dispatch") {
          setProgress([
            { done: true },
            { done: true },
            { done: true },
            { done: false },
            { done: false },
          ]);
        }
        if (response.data.order_status === "On The Way") {
          setProgress([
            { done: true },
            { done: true },
            { done: true },
            { done: true },
            { done: false },
          ]);
        }
        if (response.data.order_status === "Delivered") {
          setProgress([
            { done: true },
            { done: true },
            { done: true },
            { done: true },
            { done: true },
          ]);
        }
      }
    },
    // onError: (error) => {
    //   console.log(error);
    //   navigate("/order-failed");
    // },
  });

  useEffect(() => {
    if (
      searchParams.get("order_no") !== null &&
      searchParams.get("reference_number") !== null
    ) {
      checkOrderStatus({
        order_no: searchParams.get("order_no"),
        reference_number: searchParams.get("reference_number"),
      });
    }
  }, []);

  // send api call every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (
        searchParams.get("order_no") !== null &&
        searchParams.get("reference_number") !== null
      ) {
        checkOrderStatus({
          order_no: searchParams.get("order_no"),
          reference_number: searchParams.get("reference_number"),
        });
      }
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  if (!isLoading) {
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress size={100} />;
    </Box>;
  }

  return (
    <>
      {isLoading || !data ? (
        <Box
          sx={{
            position: "relative",
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress size={100} />;
        </Box>
      ) : (
        <div className="order-screen">
          <div id="close-button">
            <div id="close-btn-tag">
              <p
                onClick={() => navigate(paths.home)}
                style={{ color: "#1F2933", cursor: "pointer" }}
              >
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
          <UpdateSection
            arrivalDate={data?.data?.data?.arrival_date_time.data}
            arrivalTime={data?.data?.data?.arrival_date_time.data}
          />
          <div className="order-progress-bar">
            {progress.map((stage, index) => {
              return (
                <div
                  key={index}
                  style={{
                    backgroundColor: stage.done ? "#BEC2C7" : "#DCDFE3",
                  }}
                  className="orderprogress-bar"
                ></div>
              );
            })}
          </div>
          <div className="order-status">
            <div
              id="order-status-tag"
              style={{
                backgroundColor:
                  currentStatus === "Delivered" ? "#4E948A" : "#F7B500",
              }}
            >
              <p>{currentStatus}</p>
            </div>
            <div className="orderconfirm-text-container">
              <p id="orderconfirm-text">{getOrderStatusObj?.text}</p>
            </div>
          </div>
          <AddressSection />
          <OrderIdSection
            orderID={
              searchParams.get("order_id") !== null
                ? searchParams.get("order_id")
                : ""
            }
            orderNo={
              searchParams.get("order_no") !== null
                ? searchParams.get("order_no")
                : ""
            }
          />
          <ContactUs />
        </div>
      )}
    </>
  );
};

export default OrderScreen;
