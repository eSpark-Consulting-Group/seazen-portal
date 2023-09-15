import React from 'react';
import "./style.css"

const BranchHeader = () => {
  return (
    <header className="branch-header">
      <div className="branch-left-icons">
        <img src='/assets/img/Icon - Arrow.svg'></img>
      </div>
      <div className="branch-logo">
        <h3>Branches & Hours</h3>
      </div>
      <div className="right-icons">
      <img src='/assets/img/Group 259.svg'></img>
      </div>
    </header>
  );
};

export default BranchHeader;