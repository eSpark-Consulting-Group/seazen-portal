import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

export default function IconPositionTabs({tabPosition,
  setTabPosition,
  locationDeliver,
  setLocationDeliver,
  deliveryAvailable,
  setDeliveryAvailable,}) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  switch(deliveryAvailable){
    case true:
      return (<Tabs
        value={value}
        onChange={handleChange}
        aria-label="icon position tabs example"
        TabIndicatorProps={{ sx: { backgroundColor: "#323F4B" } }}
        sx={{
          backgroundColor: "#F0F6F5",
          width: "375px",
          padding: "0 25px",
          color: "#323F4B",
          minHeight: "40px",
          "& button": { width: "auto", padding: "0", fontSize: "11px",fontFamily: "Titillium Web",fontWeight: "700" },
          "& button.Mui-selected": { color: "#323F4B" },
        }}
      >
        <Tab
          onClick={()=>{setTabPosition("dinein")}}
          icon={<img src="./assets/img/Dine_In_Icon.svg" alt="dine_in_image" />}
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
          onClick={()=>{setTabPosition("catering")}}
          icon={<img src="./assets/img/catering_icon.svg" alt="cateringicon" />}
          iconPosition="start"
          label="Catering"
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
          onClick={()=>{setTabPosition("delivery")}}
          icon={<img src="./assets/img/delivery_icon.svg" alt="deliveryicon" />}
          iconPosition="start"
          label="Delivery"
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
          onClick={()=>{setTabPosition("pickup")}}
          icon={<img src="./assets/img/pickup_icon.svg" alt="pickupicon" />}
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
      </Tabs>);
    case false:
      return (<Tabs
        value={value}
        onChange={handleChange}
        aria-label="icon position tabs example"
        TabIndicatorProps={{ sx: { backgroundColor: "#323F4B" } }}
        centered
        sx={{
          backgroundColor: "#F0F6F5",
          width: "375px",
          padding: "0 25px",
          color: "#323F4B",
          minHeight: "40px",
          display: "flex",
          justifyContent: "center",
          "& button": { width: "auto", padding: "0", fontSize: "11px",fontFamily: "Titillium Web",fontWeight: "700" },
          "& button.Mui-selected": { color: "#323F4B" },
        }}
      >
        <Tab
          onClick={()=>{setTabPosition("dinein")}}
          icon={<img src="./assets/img/Dine_In_Icon.svg" alt="dine_in_image" />}
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
          onClick={()=>{setTabPosition("pickup")}}
          icon={<img src="./assets/img/pickup_icon.svg" alt="pickupicon" />}
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
      </Tabs>);
    default:
      return(<Tabs
        value={value}
        onChange={handleChange}
        aria-label="icon position tabs example"
        TabIndicatorProps={{ sx: { backgroundColor: "#323F4B" } }}
        sx={{
          backgroundColor: "#F0F6F5",
          width: "375px",
          padding: "0 25px",
          color: "#323F4B",
          minHeight: "40px",
          "& button": { width: "auto", padding: "0", fontSize: "11px",fontFamily: "Titillium Web",fontWeight: "700" },
          "& button.Mui-selected": { color: "#323F4B" },
        }}
      >
        <Tab
          onClick={()=>{setTabPosition("dinein")}}
          icon={<img src="./assets/img/Dine_In_Icon.svg" alt="dine_in_image" />}
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
          onClick={()=>{setTabPosition("catering")}}
          icon={<img src="./assets/img/catering_icon.svg" alt="cateringicon" />}
          iconPosition="start"
          label="Catering"
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
          onClick={()=>{setTabPosition("delivery")}}
          icon={<img src="./assets/img/delivery_icon.svg" alt="deliveryicon" />}
          iconPosition="start"
          label="Delivery"
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
          onClick={()=>{setTabPosition("pickup")}}
          icon={<img src="./assets/img/pickup_icon.svg" alt="pickupicon" />}
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
      </Tabs>);
  }

}
