import React from 'react';
import "./style.css"
import { useNavigate } from 'react-router';

const BranchHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="branch-header mx-3">
      <div className="branch-left-icons" onClick={()=>navigate(-1)}>
        <img src='/assets/img/Icon - Arrow.svg'></img>
      </div>
      <div className="branch-logo">
        <h3>Branches & Hours</h3>
      </div>
      <div className="right-icons-branch pe-4">
      <img src='/assets/img/Group 259.svg'></img>
      </div>
    </header>
  );
};

export default BranchHeader;