import "./style.css";
import Dropdown from "react-bootstrap/Dropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

const DeliveryDetails = () => {

  const[location,setLocation] = useState("Ardiya, Al Qasim St ")

  return (
    <div className="delivery_outer_container">
      <div className="delivery_inner_container">
        <div className="left_dropdown_container">
          <div className="left_dropdown_container_heading_container">Deliver to</div>
          <Dropdown style={{width: "163px"}}>
            <Dropdown.Toggle
              variant="success"
              id="dropdown-basic"
              style={{
                backgroundColor: "transparent",
                color: "#323F4B",
                fontFamily: "Titillium Web",
                fontSize: "9pt",
                fontWeight: "bold",
                border: "none",
                padding: "0",
              }}
            >
              {location}
              <span className="dropdown_icon_container">
                <img
                  src=".\assets\img\Add To Cart.svg"
                  alt="chevron_down_icon"
                />
              </span>
            </Dropdown.Toggle>

            <Dropdown.Menu
              style={{
                backgroundColor: "#F0F6F5",
                color: "#323F4B",
                fontFamily: "Titillium Web",
                fontSize: "11pt",
                fontWeight: "bold",
                border: "none",
                transform: "translate(0px, -22px)"
              }}
            >
              <Dropdown.Item onClick={()=>{setLocation("Home (Salmiya) ")}}>Home (Salmiya)</Dropdown.Item>
              <Dropdown.Item onClick={()=>{setLocation("Office (Ardiya) ")}}>Office (Ardiya)</Dropdown.Item>
              <Dropdown.Item onClick={()=>{setLocation("Home Summer (Khiran) ")}}>Home Summer (Khiran)</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="right_dropdown_container">
          <div className="right_dropdown_container_heading_container">Delivery Time</div>
          <Dropdown style={{width: "163px"}}>
            <Dropdown.Toggle
              variant="success"
              id="dropdown-basic"
              style={{
                backgroundColor: "transparent",
                color: "#323F4B",
                fontFamily: "Titillium Web",
                fontSize: "9pt",
                fontWeight: "700",
                border: "none",
                padding: "0",
              }}
            >
              {"ASAP "}
              <span className="dropdown_icon_container">
                <img
                  src=".\assets\img\Add To Cart.svg"
                  alt="chevron_down_icon"
                />
              </span>
            </Dropdown.Toggle>

            <Dropdown.Menu
              style={{
                backgroundColor: "#F0F6F5",
                color: "#323F4B",
                fontFamily: "Titillium Web",
                fontSize: "11pt",
                fontWeight: "bold",
                border: "none",
                transform: "translate(0px, -22px)"
              }}
            >
              <Dropdown.Item href="#/action-1">Option 1</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Option 2</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Option 3</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default DeliveryDetails;
