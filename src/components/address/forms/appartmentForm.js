import React from "react";
import { useSelector } from "react-redux";

import { OutlinedInput, Select, MenuItem, ListSubheader } from "@mui/material";

import "./style.css";

export const AppartmentAdress = (props) => {
  const {
    handleChange,
    address,
    areaErr,
    blockErr,
    streetErr,
    buildingErr,
    floorErr,
    apartmentNoerr,
    setAddress,
    area,
    setArea,
  } = props;

  const allAreas = useSelector((state) => state.address.allAreas);

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <form className="container-style px-3">
      <Select
        displayEmpty
        value={area}
        onChange={(e) => setArea(e.target.value)}
        input={<OutlinedInput />}
        renderValue={(selected) => {
          if (selected?.length === 0) {
            return (
              <span
                className={`dropdown-placeholder ${
                  areaErr ? "error-placeholder" : ""
                }`}
              >
                Area
              </span>
            );
          }

          return selected;
        }}
        inputProps={{ "aria-label": "With`out label" }}
        className={`form-style ${areaErr ? "error" : ""}`}
        open={open}
        onClose={handleClose}
        onOpen={handleOpen}
        IconComponent={() => {
          return (
            <div className="area-dropdown" onClick={handleOpen}>
              {areaErr ? (
                <img src="/assets/img/error-arrow.png" />
              ) : (
                <img src="/assets/img/dropdown.png" alt="Dropdown" />
              )}
            </div>
          );
        }}
      >
        <MenuItem disabled value="">
          Area
        </MenuItem>
        {/* {allAreas?.map((zone) => renderSelectGroup(zone))} */}
        {allAreas?.map((zone) =>
          zone?.areas
            ?.filter((area) => area.area_name !== "")
            ?.map((area) => (
              <MenuItem
                key={area.area_id}
                value={area.name_en}
                className="select-menuitem"
                onClick={() =>
                  setAddress((address) => ({
                    ...address,
                    delivery_charge_area_id: area.area_id,
                    delivery_zone_id: zone.zone_id,
                  }))
                }
              >
                {area?.name_en}
              </MenuItem>
            ))
        )}
      </Select>

      <div
        className={`inputwrapper ${blockErr ? "errorinputwrapper" : ""}`}
        data-required="(Required)"
      >
        <input
          className={`form-style ${blockErr ? "error" : ""}`}
          type="text"
          name="Block"
          placeholder="Block"
          onChange={(e) => handleChange("block", e.target.value)}
          value={address.block}
        />
      </div>

      <div
        className={`inputwrapper ${streetErr ? "errorinputwrapper" : ""}`}
        data-required="(Required)"
      >
        <input
          className={`form-style ${streetErr ? "error" : ""}`}
          type="text"
          name="Street"
          placeholder="Street"
          onChange={(e) => handleChange("street", e.target.value)}
          value={address.street}
        />
      </div>

      <input
        className="form-style"
        type="text"
        name="Avenue"
        placeholder="Avenue (Optional)"
        onChange={(e) => handleChange("avenue", e.target.value)}
        value={address.avenue}
      />

      <div
        className={`inputwrapper ${buildingErr ? "errorinputwrapper" : ""}`}
        data-required="(Required)"
      >
        <input
          className={`form-style ${buildingErr ? "error" : ""}`}
          type="text"
          name="Building"
          placeholder="Building"
          onChange={(e) => handleChange("building", e.target.value)}
          value={address.building}
        />
      </div>

      <div
        className={`inputwrapper ${floorErr ? "errorinputwrapper" : ""}`}
        data-required="(Required)"
      >
        <input
          className={`form-style ${floorErr ? "error" : ""}`}
          type="text"
          name="Floor"
          placeholder="Floor"
          onChange={(e) => handleChange("floor", e.target.value)}
          value={address.floor}
        />
      </div>

      <div
        className={`inputwrapper ${apartmentNoerr ? "errorinputwrapper" : ""}`}
        data-required="(Required)"
      >
        <input
          className={`form-style ${apartmentNoerr ? "error" : ""}`}
          type="text"
          name="Appartment No"
          placeholder="Appartment No"
          onChange={(e) => handleChange("apartment_no", e.target.value)}
          value={address.apartment_no}
        />
      </div>

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
        onChange={(e) => handleChange("additional_direction", e.target.value)}
        value={address.additional_direction}
        rows="4"
      ></textarea>
    </form>
  );
};
