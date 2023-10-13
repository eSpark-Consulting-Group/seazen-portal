import React from "react";

import "./style.css";

export const HomeAdress = (props) => {
  const { handleChange, address, blockErr, streetErr, houseNoErr } = props;
  return (
    <form className="container-style px-3">
      <input
        className={blockErr ? ["form-style", "error"].join(" ") : "form-style"}
        // id="required"
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
        placeholder="Additional Direction&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(Required)"
        rows="4"
        onChange={(e) => handleChange("additional_direction", e.target.value)}
        value={address.additional_direction}
      ></textarea>
    </form>
  );
};
