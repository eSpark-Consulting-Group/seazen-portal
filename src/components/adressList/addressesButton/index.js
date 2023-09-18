import React from 'react'
import "./style.css"
import { useNavigate } from 'react-router'
import { paths } from '../../../routes/paths';

export const AddressesButton = () => {
  const navigate = useNavigate();
  return (
    <div>
        <button className="addresses-add-button" onClick={()=>{navigate(paths.location)}}><span className="addresses-add-button-text">Add New Address</span></button>
    </div>
  )
}
