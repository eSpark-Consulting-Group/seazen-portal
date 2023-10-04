import React from 'react'
import {Box, Button, IconButton, Stack, Typography} from '@mui/material';
import ReceiptItem from '../../components/receipt-items';
import { useState } from 'react';
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { useNavigate } from 'react-router';
import './style.css';

const Receipt = () => {
  const navigate = useNavigate();
  const [item, setTtem] = useState([1,2,3])
  const CART_ITEMS = [
    {
      id: 1,
      item: {
        name: "Burrito Vegetarian in a Bowl",
        price: 15.58,
        image: "/assets/img/7.png",
        variant: "450g",
      },
      quantity: 1,
    },
    {
      id: 2,
      item: {
        name: "Burrito Vegetarian in a Bowl",
        price: 15.58,
        image: "/assets/img/7.png",
        variant: "450g",
      },
      quantity: 1,
    },
    {
      id: 3,
      item: {
        name: "Burrito Vegetarian in a Bowl",
        price: 15.58,
        image: "/assets/img/7.png",
        variant: "450g",
      },
      quantity: 1,
    },
  ];
  const [tipValue, setTipValue] = React.useState(0.25);
  const [paymentMethod, setPaymentMethod] = React.useState("CASH");
  const DISCOUNT_AMOUNT = Number(1).toFixed(3);
  const DELIVERY_CHARGE = Number(1).toFixed(3);

  const getItemTotal = () => {
    return CART_ITEMS.reduce((acc, cartItem) => {
      return acc + cartItem.item.price * cartItem.quantity;
    }, 0).toFixed(3);
  };

  const getTipAmount = () => {
    return tipValue.toFixed(3);
  };

  const getDiscountAmount = () => {
    return DISCOUNT_AMOUNT;
  };

  const getDeliveryCharge = () => {
    return DELIVERY_CHARGE;
  };
 const getGrandTotal = () => {
    return (
      Number(getItemTotal()) +
      Number(getTipAmount()) -
      Number(getDiscountAmount()) +
      Number(getDeliveryCharge())
    ).toFixed(3);
  };

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  const handleOrderHelp = () =>{
    alert ("Help") ;
  }
  
  return (
    <div>
        <div className='receipt-nav'>
            <IconButton onClick={()=>navigate(-1)}>
                <img src="/assets/img/Arrow.png" alt="" />
            </IconButton>
              <img src="/assets/img/Logo.png" alt="" />
            <IconButton className='brand-logo'>
                <img src="/assets/img/Group 259.png" alt="" />
            </IconButton>
        </div>
        <div className='receipt-head'>
          <p>Your Receipt</p>
          <Button variant='contained' sx={{widows:"93px",height:"26px"}} onClick={handleOrderHelp}>Order Help</Button>
        </div>
        <div className='receipt-info'>
          <div id='heading'>Delivered to</div>
          <div>
            <div id="location-img">
              <img  src="/assets/img/location.svg" alt="" />
            </div>
            <div id='heading-cont'>Ardia, Block 6</div>
          </div>
          <div>
            <div id="clock-img">
              <img  src="/assets/img/clock.svg" alt="" />
            </div>
            <div id='heading-cont'>{formattedDate}</div>
          </div>
        </div>
        <div>
          {item.map((el, index)=><ReceiptItem key={index}/>)}
        </div>
        
        <Stack spacing={2} sx={{color:"#1F2933", padding: "20px 30px"}}>
        <Typography variant="h5" fontWeight={500}>
          Order summary
        </Typography>

        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body1">
            Item
            {CART_ITEMS.length > 1 ? `(s)` : ""} Total
          </Typography>
          <Typography variant="body1">{`KWD ${getItemTotal()}`}</Typography>
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body1">Tip</Typography>
          <Typography variant="body1">{`KWD ${getTipAmount()}`}</Typography>
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body1">Discount</Typography>
          <Typography variant="body1">{`KWD -${getDiscountAmount()}`}</Typography>
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body1">Delivery Cost</Typography>
          <Typography variant="body1">{`KWD ${getDeliveryCharge()}`}</Typography>
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body1">Total Payment</Typography>
          <Typography variant="body1">{`KWD ${getGrandTotal()}`}</Typography>
        </Stack>
      </Stack>
      <div className='receipt-comment-section'>
          <img src="/assets/img/Comment_Icon.png" alt="" />
      </div>
    </div>
  )
}

export default Receipt;
