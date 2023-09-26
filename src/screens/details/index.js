import React from "react";
import SideSelection from "../../components/detailSelection/sideSelection";
import CheckboxGroup from "../../components/detailSelection/sizeSelection";
import ToppingSelection from "../../components/detailSelection/toppingsSelector";
import { Content } from "../../components/detailsInformation";
import { DetailsHeader } from "../../components/header/detailsHeader";
import "./style.css";

export const Details = () => {
  return (
    <div>
      <DetailsHeader />
      {/* <div className="detail"></div> */}
      <div className="container-fluid section">
        <Content />
        <CheckboxGroup />
        <ToppingSelection />
        <SideSelection />
      </div>
    </div>
  );
};
