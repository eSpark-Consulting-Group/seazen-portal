import React from "react";
import { useSelector } from "react-redux";

import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";

import Card from "../../components/adressList";

const SelectLocation = (props) => {
  const { openAddressPopup, handleClose, chooseAddress, navigateUser } = props;

  const addressData = useSelector((state) => state.address.addressData);

  return (
    <Dialog
      open={openAddressPopup}
      onClose={() => handleClose()}
      sx={{
        margin: "0",
        textAlign: "center",
      }}
      PaperProps={{
        sx: {
          overflow: "visible",
          margin: "0",
          height: "310px",
          bottom: "0",
          position: "fixed",
          width: "375px",
          left: "0",
          borderBottomLeftRadius: "0px",
          borderBottomRightRadius: "0px",

          "@media (max-width: 500px)": {
            width: "100%",
          },
        },
      }}
    >
      <DialogTitle className="dialog-title">Choose your location</DialogTitle>
      <DialogContent
        sx={{
          fontFamily: "Titillium Web, sans-serif",
          fontWeight: 600,
        }}
      >
        {addressData.map((data) => (
          <div key={data.id} className="parent-div">
            <Card
              iconUrl={
                data.address_type === "house"
                  ? "/assets/img/salmiya home.svg"
                  : data.address_type === "appartment"
                  ? "/assets/img/salmiya appart.svg"
                  : "/assets/img/salmiya office.svg"
              }
              data={data}
              home={true}
              chooseAddress={() => chooseAddress(data)}
            />
          </div>
        ))}
      </DialogContent>
      <div className="button-div">
        <Button className="location-button" onClick={navigateUser}>
          {addressData?.length === 0
            ? "Add New Address"
            : "Choose New Location"}
        </Button>
      </div>
    </Dialog>
  );
};

export default SelectLocation;
