import React from "react";
import "./style.css";
import Dropdown from "react-bootstrap/Dropdown";
import "bootstrap/dist/css/bootstrap.min.css";

const MenuItems = () => {
  return (
    <div className="menu_item_outer_container">
      <div className="menu_item_inner_container">
        <div className="menu_dropdown_container">
          <Dropdown>
            <Dropdown.Toggle
              variant="success"
              id="dropdown-basic"
              style={{
                backgroundColor: "transparent",
                color: "#323F4B",
                fontFamily: "Titillium Web",
                fontSize: "10pt",
                fontWeight: "bold",
                border: "none",
                padding: "0",
              }}
            >
              <span className="dropdown_icon_container_menu">
                <img src=".\assets\img\menu_Icon.svg" alt="chevron_down_icon" />
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
              }}
            >
              <Dropdown.Item href="#/action-1">Burrito in a Bowl</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Quesadilla</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Burrito</Dropdown.Item>
              <Dropdown.Item href="#/action-4">Carne</Dropdown.Item>
              <Dropdown.Item href="#/action-5">Poultry</Dropdown.Item>
              <Dropdown.Item href="#/action-6">Pescheria</Dropdown.Item>
              <Dropdown.Item href="#/action-7">Pasta</Dropdown.Item>
              <Dropdown.Item href="#/action-8">Pizza</Dropdown.Item>
              <Dropdown.Item href="#/action-9">Dessert</Dropdown.Item>
              <Dropdown.Item href="#/action-10">Soft drinks</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="menu_itmes_text_container">
          <button onClick={()=>{}}>Burrito in a Bowl</button>
          <button onClick={()=>{}}>Quesadilla</button>
          <button onClick={()=>{}}>Buritto</button>
          <button onClick={()=>{}}>Sides</button>
        </div>
      </div>
    </div>
  );
};

export default MenuItems;
