import React, { useState } from "react";
import "./style.css";

export const OfficeAdress = () => {
  return (
    <form className="container-style px-3">
      <input
        className="form-style"
        type="text"
        name="Block"
        placeholder="Block"
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
        name="Building"
        placeholder="Building"
      />
      <input
        className="form-style"
        type="text"
        name="Floor"
        id="required"
        placeholder="Floor&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(Required)"
      />
      <input
        className="form-style"
        type="text"
        name="Company Name"
        id="required"
        placeholder="Company Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(Required)"
      />
      <input
        className="form-style"
        type="text"
        name="Address Label"
        placeholder="Address Label (Optional)"
      />
      <textarea
        className="form-style"
        name="AdditionalDirection"
        id="AdditionalDirection"
        placeholder="Additional Direction"
      ></textarea>
    </form>
  );
};
