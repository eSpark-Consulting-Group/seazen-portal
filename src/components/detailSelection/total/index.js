// PricingBox.js
import React from "react";
import { getFormattedPrice } from "../sizeSelection/index";

export default function PricingBox({ total }) {
  return (
    <li>
      <div className="pricing-box">
        <img className="pricing-icon" src="/assets/img/Icon - Buy.svg" alt="Logo" />
        <div className="pricing-section">Add to cart</div>
        <div className="calculation-section">{getFormattedPrice(total)}</div>
      </div>
    </li>
  );
}
