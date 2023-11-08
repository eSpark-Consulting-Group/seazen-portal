import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import ReceiptItem from "../../components/receipt-items";
import getOrderDetails, {
  GET_ORDER_DETAILS_QUERY_KEY,
} from "../../api/order/getOrderDetails";
import "./style.css";
import _ from "lodash";
import { removeDuplicateItem } from "../../utils/removeDuplicateItems";

const Receipt = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleOrderHelp = () => {
    // phone number
    window.open("tel:+9651818555", "_blank");
  };

  const {
    data: orderDetailsResponse,
    isLoading,
    isError,
    isFetching,
  } = useQuery({
    queryFn: () => {
      return getOrderDetails(id);
    },
    queryKey: [GET_ORDER_DETAILS_QUERY_KEY, id],
  });

  const demo = removeDuplicateItem(orderDetailsResponse?.data?.order_item);
  const calculateTotalVariantPrice = (variantArray) => {
    let total_price = 0;
    for (const variant of variantArray) {
      if (variant.option_quantity === 1) {
        total_price += parseFloat(variant.unit_price);
      }
    }
    return total_price;
  };

  demo.forEach((item) => {
    const totalSidePrice = calculateTotalVariantPrice(item.side_variant);
    const totalToppingPrice = calculateTotalVariantPrice(item.topping_variant);
    const totalSizePrice = calculateTotalVariantPrice(item.size_variant);

    item.totalOfVariants = totalSidePrice + totalToppingPrice + totalSizePrice;
  });

  const sumWithVariantsPrice = demo.map((val) => {
    return {
      ...val,
      unit_price: val.unit_price + val.totalOfVariants,
    };
  });

  const getItemsTotal = () => {
    if (
      orderDetailsResponse &&
      orderDetailsResponse.data &&
      orderDetailsResponse.data.order_item
    ) {
      return sumWithVariantsPrice.reduce((acc, item) => {
        return acc + Number(item.unit_price) * Number(item.quantity);
      }, 0);
    }

    return Number(0);
  };

  return (
    <div>
      <div className="receipt-nav">
        <IconButton onClick={() => navigate(-1)}>
          <img src="/assets/img/Arrow.png" alt="" />
        </IconButton>
        <img
          style={{ width: "90px" }}
          src="/assets/img/order seazen logo.svg"
          alt="Logo"
        />
        <IconButton className="brand-logo">
          <img src="/assets/img/Group 259.png" alt="" />
        </IconButton>
      </div>
      {isLoading || isFetching ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress size={80} color="primary" />
        </Box>
      ) : (
        <>
          <div className="receipt-head">
            <p>Your Receipt</p>
            <Button
              variant="contained"
              sx={{ widows: "93px", height: "26px" }}
              onClick={handleOrderHelp}
            >
              Order Help
            </Button>
          </div>
          <div className="receipt-info">
            <div id="heading">Delivered to</div>
            <div>
              <div id="location-img">
                <img src="/assets/img/location.svg" alt="" />
              </div>
              <div id="heading-cont">
                {/* {orderDetailsResponse?.data?.address?.house_no
                  ? orderDetailsResponse?.data?.address?.house_no + ", "
                  : orderDetailsResponse?.data?.address?.apartment_no
                  ? orderDetailsResponse?.data?.address?.apartment_no + ", "
                  : ""}
                {orderDetailsResponse?.data?.address?.street} */}

                {orderDetailsResponse?.data?.address?.address_type === "house"
                  ? `House: ${orderDetailsResponse?.data?.address?.house_no}, Block: ${orderDetailsResponse?.data?.address?.block}, Street: ${orderDetailsResponse?.data?.address?.street}`
                  : orderDetailsResponse?.data?.address?.address_type ===
                    "office"
                  ? `Company: ${orderDetailsResponse?.data?.address?.company_name}, Block: ${orderDetailsResponse?.data?.address?.block}, Floor: ${orderDetailsResponse?.data?.address?.floor}`
                  : `Apartment: ${orderDetailsResponse?.data?.address?.apartment_no}, Block: ${orderDetailsResponse?.data?.address?.block}, Street: ${orderDetailsResponse?.data?.address?.street}`}
              </div>
            </div>
            <div>
              <div id="clock-img">
                <img src="/assets/img/clock.svg" alt="" />
              </div>
              <div id="heading-cont">
                {orderDetailsResponse?.data?.order_date}
              </div>
            </div>
          </div>
          <div>
            {!isLoading &&
              !isError &&
              orderDetailsResponse &&
              orderDetailsResponse.data &&
              orderDetailsResponse.data.order_item &&
              sumWithVariantsPrice.map((item, index) => (
                <ReceiptItem
                  key={index}
                  item={item}
                  currency_code={orderDetailsResponse.data.currency_code}
                />
              ))}
          </div>

          <Stack spacing={2} sx={{ color: "#1F2933", padding: "20px 30px" }}>
            <Typography variant="h5" fontWeight={500}>
              Order summary
            </Typography>

            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body1">
                Item
                {orderDetailsResponse?.data?.order_item?.length > 1
                  ? `(s)`
                  : ""}{" "}
                Total
              </Typography>
              <Typography variant="body1">{`KWD ${getItemsTotal().toFixed(
                3
              )}`}</Typography>
            </Stack>

            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body1">Discount</Typography>
              <Typography variant="body1">{`KWD -0.000`}</Typography>
            </Stack>

            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body1">Delivery Cost</Typography>
              <Typography variant="body1">
                {`KWD 
                  ${Number(
                    orderDetailsResponse?.data?.delivery_charges
                  ).toFixed(3)}`}
              </Typography>
            </Stack>

            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body1">Total Payment</Typography>
              <Typography variant="body1">{`KWD ${Number(
                orderDetailsResponse?.data?.order_total_price
              ).toFixed(3)}`}</Typography>
            </Stack>
          </Stack>
        </>
      )}
    </div>
  );
};

export default Receipt;
