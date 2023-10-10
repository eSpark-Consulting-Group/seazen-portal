import React from "react";
import "./style.css";

export const AppartmentAdress = ({ handleChange, address, errorState }) => {
  return (
    <form className="container-style px-3">
      <input
        className="form-style"
        type="text"
        name="Block"
        placeholder="Block"
        onChange={(e) => handleChange("block", e.target.value)}
        value={address.block}
      />

      <input
        className="form-style"
        type="text"
        name="Street"
        placeholder="Street"
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
          errorState ? ["form-style", "error"].join(" ") : "form-style"
        }
        type="text"
        name="Building"
        // id="required"
        placeholder="Building&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(Required)"
        onChange={(e) => handleChange("building", e.target.value)}
        value={address.building}
      />

      <input
        className="form-style"
        type="text"
        name="Floor"
        placeholder="Floor"
        onChange={(e) => handleChange("floor", e.target.value)}
        value={address.floor}
      />

      <input
        className="form-style"
        type="text"
        name="Appartment No"
        placeholder="Appartment No"
        onChange={(e) => handleChange("apartment_no", e.target.value)}
        value={address.apartment_no}
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
        placeholder="Additional Direction&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(Required)"
        onChange={(e) => handleChange("additional_direction", e.target.value)}
        value={address.additional_direction}
        rows="4"
      ></textarea>
    </form>
  );
};
