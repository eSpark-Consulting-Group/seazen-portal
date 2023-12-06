import React from "react";

import "./style.css";

export const AppartmentAdress = (props) => {
  const {
    handleChange,
    address,
    blockErr,
    streetErr,
    buildingErr,
    floorErr,
    apartmentNoerr,
  } = props;

  return (
    <form className="container-style px-3">
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
