import React, { useState } from "react";
import styles from "./style.module.css"; // Import your CSS module
import Dropdown from "react-bootstrap/Dropdown";
import "bootstrap/dist/css/bootstrap.min.css";

const DeliveryDetails = () => {
  const [location, setLocation] = useState("Ardiya, Al Qasim St ");

  return (
    <div className={styles.deliveryOuterContainer}>
      <div className={styles.deliveryInnerContainer}>
        <div className={styles.leftDropdownContainer}>
          <div className={styles.leftDropdownContainerHeadingContainer}>
            Deliver to
          </div>
          <Dropdown className={styles.dropdown} style={{ width: "163px" }}>
            <Dropdown.Toggle
              variant="success"
              id="dropdown-basic"
              className={styles.dropdownToggle}
            >
              {location}
              <span className={styles.dropdownIconContainer}>
                <img
                  src="/assets/img/Add To Cart.svg"
                  alt="chevron_down_icon"
                />
              </span>
            </Dropdown.Toggle>

            <Dropdown.Menu className={styles.dropdownMenu}>
              <Dropdown.Item
                onClick={() => {
                  setLocation("Home (Salmiya) ");
                }}
              >
                Home (Salmiya)
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  setLocation("Office (Ardiya) ");
                }}
              >
                Office (Ardiya)
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  setLocation("Home Summer (Khiran) ");
                }}
              >
                Home Summer (Khiran)
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className={styles.rightDropdownContainer}>
          <div className={styles.rightDropdownContainerHeadingContainer}>
            Delivery Time
          </div>
          <Dropdown className={styles.dropdown} style={{ width: "163px" }}>
            <Dropdown.Toggle
              variant="success"
              id="dropdown-basic"
              className={styles.dropdownToggle}
            >
              {"ASAP "}
              <span className={styles.dropdownIconContainer}>
                <img
                  src="/assets/img/Add To Cart.svg"
                  alt="chevron_down_icon"
                />
              </span>
            </Dropdown.Toggle>

            <Dropdown.Menu className={styles.dropdownMenu}>
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
