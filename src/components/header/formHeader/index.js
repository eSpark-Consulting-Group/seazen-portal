import React, { useState, useRef, useEffect } from "react";
import "../profileHeader/style.css";

const FormHeader = () => {

  return (
    <nav>
      <div className="account">
        <div className="account-icon">
          <img src="/assets/img/Group 330.svg" alt="Account Icon" />
        </div>
      </div>
      <div className="logo">
        <img src="/assets/img/Group 143.svg" alt="Logo" />
      </div>

      <div className="option">
        <div className="option-icon">
          <img src="/assets/img/Group 256.svg" alt="Option Icon" />
        </div>
      </div>
    </nav>
  );
};

export default FormHeader;
