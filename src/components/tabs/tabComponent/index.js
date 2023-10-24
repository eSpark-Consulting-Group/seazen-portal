import * as React from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import DineInIcon from "../../svgIcons/dineInIcon";
import CateringIcon from "../../svgIcons/cateringIcon";
import DeliveryIcon from "../../svgIcons/deliveryIcon";
import PickupIcon from "../../svgIcons/pickupIcon";
import { useParams } from "react-router-dom/dist";
import { lighten } from "@mui/material/styles";
import { styled } from "@mui/material/styles"; // Import styled from MUI
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function IconPositionTabs({
  tabPosition,
  setTabPosition,
  locationDeliver,
  deliveryAvailable,
  resturantId,
  isPickup,
  isDelivery,
  isCatering,
  isDineIn,
}) {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  const { restaurant, option } = useParams();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const setTabPositionAndNavigate = (tabPosition) => {
    setTabPosition(tabPosition);
    navigate(
      `/menu/${restaurant}/${resturantId}/${tabPosition}`,
      createSearchParams({
        locationDeliver: locationDeliver,
        deliveryAvailable: deliveryAvailable,
      })
    );
  };

  useEffect(() => {
    if (tabPosition !== null) {
      setTabPositionAndNavigate(tabPosition);
    }
  }, []);

  useEffect(() => {
    if (isDineIn) {
      return setValue(0);
    }
    if (isCatering) {
      return setValue(1);
    }
    if (isDelivery) {
      return setValue(2);
    }
    if (isPickup) {
      return setValue(3);
    }
  }, [isPickup, isDelivery, isCatering, isDineIn]);

  React.useEffect(() => {
    if (option === "dinein" && isDineIn) {
      setValue(0);
      setTabPosition("dinein");
    } else if (option === "catering" && isCatering) {
      setValue(1);
      setTabPosition("catering");
    } else if (option === "delivery" && isDelivery) {
      setValue(2);
      setTabPosition("delivery");
    } else if (option === "pickup" && isPickup) {
      setValue(3);
      setTabPosition("pickup");
    }
  }, [option, isPickup, isDelivery, isCatering, isDineIn]);
  const restaurantTheme = useSelector((state) => state.theme.themeColor);
  return (
    <Tabs
      centered
      value={value}
      onChange={handleChange}
      aria-label="options tabs"
      TabIndicatorProps={{
        sx: { backgroundColor: "#323F4B", overflow: "visible" },
      }}
      sx={{
        backgroundColor: restaurantTheme.main + 12,
        width: "100%",
        padding: "0px 33px 0px 28px",
        color: "#323F4B",
        minHeight: "40px",
        "& .MuiTabs-flexContainer": {
          justifyContent: "space-between ",
        },
        "& button": {
          width: "auto",
          padding: "0",
          fontSize: "11px",
          fontFamily: "Titillium Web",
          fontWeight: "700",
        },
        "& button.Mui-selected": { color: "#323F4B" },
        "& .MuiTabs-scroller": { overflow: "visible !important" },
      }}
    >
      <Tab
        disabled={!isDineIn}
        onClick={() => {
          setTabPositionAndNavigate("dinein");
        }}
        iconPosition="start"
        label={
          <div style={{ display: "flex", alignItems: "center" }}>
            <DineInIcon />
            <span style={{ marginLeft: "8px", fontWeight: 600 }}>Dine In</span>
          </div>
        }
        sx={{
          width: "30px",
          padding: "0",
          textTransform: "none",
          minWidth: "80px",
          color: "#323F4B",
          minHeight: "38px",
          // marginRight: "8px",
        }}
      />
      <Tab
        disabled={!isCatering}
        onClick={() => {
          setTabPositionAndNavigate("catering");
        }}
        iconPosition="start"
        label={
          <div style={{ display: "flex", alignItems: "center" }}>
            <CateringIcon />
            <span style={{ marginLeft: "8px", fontWeight: 600 }}>Catering</span>
          </div>
        }
        sx={{
          width: "30px",
          padding: "0",
          textTransform: "none",
          minWidth: "80px",
          color: "#323F4B",
          minHeight: "38px",
          // marginRight: "8px",
        }}
      />
      <Tab
        disabled={!isDelivery}
        onClick={() => {
          setTabPositionAndNavigate("delivery");
        }}
        iconPosition="start"
        label={
          <div style={{ display: "flex", alignItems: "center" }}>
            <DeliveryIcon />
            <span style={{ marginLeft: "8px", fontWeight: 600 }}>Delivery</span>
          </div>
        }
        sx={{
          width: "30px",
          padding: "0",
          textTransform: "none",
          minWidth: "80px",
          color: "#323F4B",
          minHeight: "38px",
          // marginRight: "8px",
        }}
      />
      <Tab
        disabled={!isPickup}
        onClick={() => {
          setTabPositionAndNavigate("pickup");
        }}
        iconPosition="start"
        label={
          <div style={{ display: "flex", alignItems: "center" }}>
            <PickupIcon />
            <span style={{ marginLeft: "8px", fontWeight: 600 }}>Pickup</span>
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
