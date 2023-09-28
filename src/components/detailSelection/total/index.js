import React from "react";
import { getFormattedPrice } from "../sideSelection/index";
import { styled } from "@mui/material/styles"; // Import styled from MUI
import "./style.css"
import { useQuery } from "@tanstack/react-query";
import addToCart from "../../../api/cart/addToCart";
import updateCart from "../../../api/cart/updateCart";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";


const StyledOuterContainer = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.themeColor.main, // Apply the background color
  // Add any other styles you need for the outer container here
  cursor: "pointer"
}));

const cartData =  {
  "item_id" : 3,
  "quantity" : 1,
  "option_id" : 1,
  "variant_quantity" : 1,
  "option_group_id" : 1,
  "option_group_quantity" : 1
}
const updateCartData =  {
  "cart_id" : 28,
  "quantity" : 44,
}

export default function PricingBox({ total }) {

  const { search } = useLocation()
  const token = useSelector((state) => state.auth.token);

  const addToCartHandler = useQuery({
    queryFn: () => addToCart(cartData, token),
    onSuccess: (data) => {
      console.log(data, "data")
    },
    enabled: false
  });

  const updateCartHandler = useQuery({
    queryFn: () => updateCart(updateCartData, token),
    onSuccess: (data) => {
      console.log(data, "data")
    },
    enabled: false
  });

  return (
    <li>
      <StyledOuterContainer onClick={() => search ? updateCartHandler.refetch() : addToCartHandler.refetch()} className="pricing-box">
        <img className="pricing-icon" src="/assets/img/Icon - Buy.svg" alt="Logo" />
        <div className="pricing-section">{search ? "Update Cart" : "Add to cart"}</div>
        <div className="calculation-section">{getFormattedPrice(total)}</div>
      </StyledOuterContainer>
    </li>
  );
}
