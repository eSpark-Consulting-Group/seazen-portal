import React from "react";
import { DetailsHeader } from "../../components/header/detailsHeader";
import { Content } from "../../components/detailsInformation";
import "./style.css";
import CheckboxGroup from "../../components/detailSelection/sizeSelection";
import ToppingSelection from "../../components/detailSelection/toppingsSelector";
import SideSelection from "../../components/detailSelection/sideSelection";
import PricingBox from "../../components/detailSelection/total";

export const Details = () => {
  return (
      <div>
        <DetailsHeader />
      <div className="detail"></div>
        <div className="container-fluid section">
        <Content />
        {/* <CheckboxGroup /> */}
        {/* <ToppingSelection /> */}
        {/* <SideSelection /> */}
      </div>
      </div>

  );
};
