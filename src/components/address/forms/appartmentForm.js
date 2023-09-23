import React, { useState } from "react";
import "./style.css";

export const AppartmentAdress = () => {
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
        id="required"
        placeholder="Building&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(Required)"
      />
      <input
        className="form-style"
        type="text"
        name="Floor"
        placeholder="Floor"
      />
      <input
        className="form-style"
        type="text"
        name="Appartment No"
        placeholder="Appartment No"
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
