import React from "react";
import "./style.css";

export const OfficeAdress = ({
  handleChange,
  address,
  floorReq,
  companyNameReq,
}) => {
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
        className="form-style"
        type="text"
        name="Building"
        placeholder="Building"
        onChange={(e) => handleChange("building", e.target.value)}
        value={address.building}
      />

      <input
        className={floorReq ? ["form-style", "error"].join(" ") : "form-style"}
        type="text"
        name="Floor"
        // id="required"
        placeholder="Floor&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(Required)"
        onChange={(e) => handleChange("floor", e.target.value)}
        value={address.floor}
      />

      <input
        className={
          companyNameReq ? ["form-style", "error"].join(" ") : "form-style"
        }
        type="text"
        name="Company Name"
        // id="required"
        placeholder="Company Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(Required)"
        onChange={(e) => handleChange("company_name", e.target.value)}
        value={address.company_name}
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
        rows="4"
        onChange={(e) => handleChange("additional_direction", e.target.value)}
        value={address.additional_direction}
      ></textarea>
    </form>
  );
};
