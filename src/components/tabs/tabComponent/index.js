import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import DineInIcon from "../../svgIcons/dineInIcon";
import CateringIcon from "../../svgIcons/cateringIcon";
import DeliveryIcon from "../../svgIcons/deliveryIcon";
import PickupIcon from "../../svgIcons/pickupIcon";

export default function IconPositionTabs({
  tabPosition,
  setTabPosition,
  locationDeliver,
  setLocationDeliver,
  deliveryAvailable,
  setDeliveryAvailable,
}) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  switch (deliveryAvailable) {
    case true:
      return (
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="icon position tabs example"
          TabIndicatorProps={{ sx: { backgroundColor: "#323F4B" } }}
          sx={{
            backgroundColor: "#F0F6F5",
           
            padding: "0 20px",
            color: "#323F4B",
            minHeight: "40px",
            "& button": {
              width: "auto",
              padding: "0",
              fontSize: "11px",
              fontFamily: "Titillium Web",
              fontWeight: "700",
            },
            "& button.Mui-selected": { color: "#323F4B" },
          }}
        >
          <Tab
            onClick={() => {
              setTabPosition("dinein");
            }}
            iconPosition="start"
            label={
              <div style={{ display: "flex", alignItems: "center" }}>
                <DineInIcon />
                <span style={{ marginLeft: "8px" }}>Dine In</span>
              </div>
            }
            sx={{
              width: "30px",
              padding: "0",
              textTransform: "none",
              minWidth: "80px",
              color: "#323F4B",
              minHeight: "38px",
              marginRight: "8px",
            }}
          />
          <Tab
            onClick={() => {
              setTabPosition("catering");
            }}
            iconPosition="start"
            label=<div style={{ display: "flex", alignItems: "center" }}>
              <CateringIcon />
              <span style={{ marginLeft: "8px" }}>Catering</span>
            </div>
            sx={{
              width: "30px",
              padding: "0",
              textTransform: "none",
              minWidth: "80px",
              color: "#323F4B",
              minHeight: "38px",
              marginRight: "8px",
            }}
          />
          <Tab
            onClick={() => {
              setTabPosition("delivery");
            }}
            iconPosition="start"
            label={
              <div style={{ display: "flex", alignItems: "center" }}>
                <DeliveryIcon />
                <span style={{ marginLeft: "8px" }}>Delivery</span>
              </div>
            }
            sx={{
              width: "30px",
              padding: "0",
              textTransform: "none",
              minWidth: "80px",
              color: "#323F4B",
              minHeight: "38px",
              marginRight: "8px",
            }}
          />
          <Tab
            onClick={() => {
              setTabPosition("pickup");
            }}
            iconPosition="start"
            label={
              <div style={{ display: "flex", alignItems: "center" }}>
                <PickupIcon />
                <span style={{ marginLeft: "8px" }}>Pickup</span>
              </div>
            }
            sx={{
              width: "20px",
              padding: "0",
              textTransform: "none",
              minWidth: "80px",
              color: "#323F4B",
              minHeight: "38px",
            }}
          />
        </Tabs>
      );
    case false:
      return (
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="icon position tabs example"
          TabIndicatorProps={{ sx: { backgroundColor: "#323F4B" } }}
          centered
          sx={{
            backgroundColor: "#F0F6F5",
            width: "370px",
            padding: "0 25px",
            color: "#323F4B",
            minHeight: "40px",
            display: "flex",
            justifyContent: "center",
            "& button": {
              width: "auto",
              padding: "0",
              fontSize: "11px",
              fontFamily: "Titillium Web",
              fontWeight: "700",
            },
            "& button.Mui-selected": { color: "#323F4B" },
          }}
        >
          <Tab
            onClick={() => {
              setTabPosition("dinein");
            }}
            icon={<DineInIcon />}
            iconPosition="start"
            label="Dine In"
            sx={{
              width: "20px",
              padding: "0",
              textTransform: "none",
              minWidth: "75px",
              color: "#323F4B",
              minHeight: "38px",
              marginRight: "8px",
            }}
          />
          <Tab
            onClick={() => {
              setTabPosition("pickup");
            }}
            icon={<PickupIcon />}
            iconPosition="start"
            label="Pickup"
            sx={{
              width: "20px",
              padding: "0",
              textTransform: "none",
              minWidth: "75px",
              color: "#323F4B",
              minHeight: "38px",
            }}
          />
        </Tabs>
      );
    default:
      return (
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="icon position tabs example"
          TabIndicatorProps={{ sx: { backgroundColor: "#323F4B" } }}
          sx={{
            backgroundColor: "#F0F6F5",
            width: "375px",
            padding: "0 20px",
            color: "#323F4B",
            minHeight: "40px",
            "& button": {
              width: "auto",
              padding: "0",
              fontSize: "11px",
              fontFamily: "Titillium Web",
              fontWeight: "700",
            },
            "& button.Mui-selected": { color: "#323F4B" },
          }}
        >
          <Tab
            onClick={() => {
              setTabPosition("dinein");
            }}
            iconPosition="start"
            label={
              <div style={{ display: "flex", alignItems: "center" }}>
                <DineInIcon />
                <span style={{ marginLeft: "8px" }}>Dine In</span>
              </div>
            }
            sx={{
              width: "20px",
              padding: "0",
              textTransform: "none",
              minWidth: "80px",
              color: "#323F4B",
              minHeight: "38px",
              marginRight: "8px",
            }}
          />
          <Tab
            onClick={() => {
              setTabPosition("catering");
            }}
            iconPosition="start"
            label={
              <div style={{ display: "flex", alignItems: "center" }}>
                <CateringIcon />
                <span style={{ marginLeft: "8px" }}>Catering</span>
              </div>
            }
            sx={{
              width: "20px",
              padding: "0",
              textTransform: "none",
              minWidth: "80px",
              color: "#323F4B",
              minHeight: "38px",
              marginRight: "8px",
            }}
          />
          <Tab
            onClick={() => {
              setTabPosition("delivery");
            }}
            iconPosition="start"
            label={
              <div style={{ display: "flex", alignItems: "center" }}>
                <DeliveryIcon />
                <span style={{ marginLeft: "8px" }}>Delivery</span>
              </div>
            }
            sx={{
              width: "20px",
              padding: "0",
              textTransform: "none",
              minWidth: "80px",
              color: "#323F4B",
              minHeight: "38px",
              marginRight: "8px",
            }}
          />
          <Tab
            onClick={() => {
              setTabPosition("pickup");
            }}
            iconPosition="start"
            label={
              <div style={{ display: "flex", alignItems: "center" }}>
                <PickupIcon />
                <span style={{ marginLeft: "8px" }}>Pickup</span>
              </div>
            }
            sx={{
              width: "20px",
              padding: "0",
              textTransform: "none",
              minWidth: "80px",
              color: "#323F4B",
              minHeight: "38px",
            }}
          />
        </Tabs>
      );
  }
}
