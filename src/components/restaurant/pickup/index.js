import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css"
import { useState } from "react";
import { styled } from "@mui/material/styles"; // Import styled from MUI
import { lighten } from "@mui/material/styles";


const StyledOuterContainer = styled("div")(({ theme }) => ({
  backgroundColor: lighten(theme.palette.themeColor.light, 0.9), // Apply the background color
  // Add any other styles you need for the outer container here
}));

const PickupDetails = () => {

    const[branch,setBranch]=useState("Choose a Branch ");
    const[pickupTime,setPickupTime]=useState("14 August 2023, ASAP ")

    return (
    <StyledOuterContainer className="pickup_outer_container">
    <div className="pickup_inner_container">
      <div className="pickup_left_dropdown_container">
        <div className="pickup_left_dropdown_container_heading_container">Pickup from</div>
        <Dropdown style={{width: "163px"}}>
          <Dropdown.Toggle
            variant="success"
            id="dropdown-basic"
            style={{
              backgroundColor: "transparent",
              color: "#323F4B",
              fontFamily: "Titillium Web",
              fontSize: "8.5pt",
              fontWeight: "bold",
              border: "none",
              padding: "0",
            }}
          >
            {branch}
            <span className="dropdown_icon_container">
              <img
                src="/assets/img/Add To Cart.svg"
                alt="chevron_down_icon"
              />
            </span>
          </Dropdown.Toggle>

          <Dropdown.Menu
            style={{
              backgroundColor: "#F0F6F5",
              color: "#323F4B",
              fontFamily: "Titillium Web",
              fontSize: "9.5pt",
              fontWeight: "bold",
              border: "none",
              transform: "translate(0px, -22px)"
            }}
          >
            <Dropdown.Item onClick={()=>{setBranch("Al-Assima ")}}>Al-Assima</Dropdown.Item>
            <Dropdown.Item onClick={()=>{setBranch("Avenues ")}}>Avenues</Dropdown.Item>
            <Dropdown.Item onClick={()=>{setBranch("Morouj ")}}>Morouj</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className="pickup_right_dropdown_container">
        <div className="pickup_right_dropdown_container_heading_container">Pickup Time</div>
        <Dropdown style={{width: "163px"}}>
          <Dropdown.Toggle
            variant="success"
            id="dropdown-basic"
            style={{
              backgroundColor: "transparent",
              color: "#323F4B",
              fontFamily: "Titillium Web",
              fontSize: "8.5pt",
              fontWeight: "700",
              border: "none",
              padding: "0",
              // whiteSpace: "pre-wrap",
            }}
          >
            {pickupTime}
            <span className="dropdown_icon_container">
              <img
                src="/assets/img/Add To Cart.svg"
                alt="chevron_down_icon"
              />
            </span>
          </Dropdown.Toggle>

          <Dropdown.Menu
            style={{
              backgroundColor: "#F0F6F5",
              color: "#323F4B",
              fontFamily: "Titillium Web",
              fontSize: "9.5pt",
              fontWeight: "bold",
              border: "none",
              transform: "translate(0px, -22px)",
            }}
          >
            <Dropdown.Item onClick={()=>{setPickupTime('12 August, 11:00 pm - 11:30 pm ')}}>
                12 August, 11:00 pm - 11:30 pm</Dropdown.Item>
            <Dropdown.Item onClick={()=>{setPickupTime("12 August, 11:30 pm - 12:00 am ")}}>
                12 August, 11:30 pm - 12:00 am</Dropdown.Item>
            <Dropdown.Item onClick={()=>{setPickupTime("12 August, 12:00 am - 12:30 pm ")}}>
                12 August, 12:00 am - 12:30 am</Dropdown.Item>
            <Dropdown.Item onClick={()=>{setPickupTime("12 August, 12:30 am - 01:00 am ")}}>
                12 August, 12:30 am - 01:00 am</Dropdown.Item>
            <Dropdown.Item onClick={()=>{setPickupTime("12 August, 01:00 am - 01:30 am ")}}>
                12 August, 01:00 am - 01:30 am</Dropdown.Item>
            <Dropdown.Item onClick={()=>{setPickupTime("12 August, 01:30 am - 02:00 am ")}}>
                12 August, 01:30 am - 02:00 am</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
    
    </StyledOuterContainer>
);
}
 
export default PickupDetails;