import React from "react";

import "./style.css";

export const HomeAdress = (props) => {
  const { handleChange, address, blockErr, streetErr, houseNoErr } = props;

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
        className={`inputwrapper ${houseNoErr ? "errorinputwrapper" : ""}`}
        data-required="(Required)"
      >
        <input
          className={`form-style ${houseNoErr ? "error" : ""}`}
          type="text"
          name="House Number"
          placeholder="House Number"
          onChange={(e) => handleChange("house_no", e.target.value)}
          value={address.house_no}
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
        rows="4"
        onChange={(e) => handleChange("additional_direction", e.target.value)}
        value={address.additional_direction}
      ></textarea>
    </form>
  );
};
