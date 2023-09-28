import React, { useState } from "react";
import "./style.css";

export const HomeAdress = () => {
  return (
    <form className="container-style px-3">
      <input
        className="form-style"
        id="required"
        type="text"
        name="Block"
        placeholder="Block&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(Required)"
      />
      <input
        className="form-style"
        type="text"
        name="Street"
        placeholder="Street"
      />
      <input
        className="form-style"
        type="text"
        name="Avenue"
        placeholder="Avenue (Optional)"
      />
      <input
        className="form-style"
        type="text"
        name="House Number"
        placeholder="House Number"
      />
      <input
        className="form-style"
        type="text"
        name="Address Label"
        placeholder="Address Label (Optional)"
      />
      <textarea
        className="form-style form-style-text-area"
        name="AdditionalDirection"
        id="AdditionalDirection"
        placeholder="Additional Direction"
        rows="4"
      ></textarea>
    </form>
  );
};
