import React from "react";

// import {
//   OutlinedInput,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   TextField,
// } from "@mui/material";

import "./style.css";

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;

export const HomeAdress = (props) => {
  const {
    handleChange,
    address,
    //  areaErr,
    blockErr,
    streetErr,
    houseNoErr,
  } = props;
  // const [open, setOpen] = React.useState(false);

  // const handleClose = () => {
  //   setOpen(false);
  // };

  // const handleOpen = () => {
  //   setOpen(true);
  // };

  // const areas = ["Area"];

  return (
    <form className="container-style px-3">
      {/* <Select
        displayEmpty
        value={address.area}
        onChange={(e) => handleChange("area", e.target.value)}
        input={<OutlinedInput />}
        renderValue={(selected) => {
          if (selected.length === 0) {
            return (
              <span
                className={
                  areaErr
                    ? ["dropdown-placeholder", "error-placeholder"].join(" ")
                    : "dropdown-placeholder"
                }
              >
                Area
              </span>
            );
          }

          return selected;
        }}
        inputProps={{ "aria-label": "Without label" }}
        className={areaErr ? ["form-style", "error"].join(" ") : "form-style"}
        open={open}
        onClose={handleClose}
        onOpen={handleOpen}
        IconComponent={() => {
          return (
            <div className="area-dropdown">
              <img src="/assets/img/dropdown.png" alt="Dropdown" />
            </div>
          );
        }}
      >
        <MenuItem disabled value="">
          Area
        </MenuItem>
        {areas.map((name) => (
          <MenuItem key={name} value={name} className="select-menuitem">
            {name}
          </MenuItem>
        ))}
      </Select> */}

      <input
        className={blockErr ? ["form-style", "error"].join(" ") : "form-style"}
        type="text"
        name="Block"
        placeholder="Block&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(Required)"
        onChange={(e) => handleChange("block", e.target.value)}
        value={address.block}
      />

      <input
        className={streetErr ? ["form-style", "error"].join(" ") : "form-style"}
        type="text"
        name="Street"
        placeholder="Street&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(Required)"
        onChange={(e) => handleChange("street", e.target.value)}
        value={address.street}
      />

      <input
        className="form-style"
        type="text"
        name="Avenue"
        placeholder="Avenue (Optional)"
        onChange={(e) => handleChange("avenue", e.target.value)}
        value={address.avenue}
      />

      <input
        className={
          houseNoErr ? ["form-style", "error"].join(" ") : "form-style"
        }
        type="text"
        name="House Number"
        placeholder="House Number&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(Required)"
        onChange={(e) => handleChange("house_no", e.target.value)}
        value={address.house_no}
      />

      <input
        className="form-style"
        type="text"
        name="Address Label"
        placeholder="Address Label (Optional)"
        onChange={(e) => handleChange("address_label", e.target.value)}
        value={address.address_label}
      />

      <textarea
        className="form-style form-style-text-area"
        name="AdditionalDirection"
        id="AdditionalDirection"
        placeholder="Additional Direction"
        rows="4"
        onChange={(e) => handleChange("additional_direction", e.target.value)}
        value={address.additional_direction}
      ></textarea>
    </form>
  );
};
