import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./style.module.css";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import { lighten } from "@mui/material/styles";

const StyledOuterContainer = styled("div")(({ theme }) => ({
  backgroundColor: lighten(theme.palette.themeColor.light, 0.9),
}));

const PickupDetails = () => {
  const [branch, setBranch] = useState("Choose a Branch ");
  const [pickupTime, setPickupTime] = useState("14 August 2023, ASAP ");

  const handleBranchSelect = (selectedBranch) => {
    setBranch(selectedBranch);
  };

  return (
    <StyledOuterContainer className={styles.pickupOuterContainer}>
      <div className={styles.pickupInnerContainer}>
        <div className={styles.pickupLeftDropdownContainer}>
          <div className={styles.pickupLeftDropdownContainerHeadingContainer}>
            Pickup from
          </div>
          <Dropdown style={{ width: "163px" }}>
            <Dropdown.Toggle
              variant="success"
              className={styles.dropdownToggle}
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
              <span className={styles.dropdownIconContainer}>
                <img
                  src="/assets/img/Add To Cart.svg"
                  alt="chevron_down_icon"
                />
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu
              className={styles.dropdownMenu}
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
              <Dropdown.Item
                onClick={() => {
                  setBranch("Al-Assima ");
                }}
              >
                Al-Assima
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  setBranch("Avenues ");
                }}
              >
                Avenues
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  setBranch("Morouj ");
                }}
              >
                Morouj
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className={styles.pickupRightDropdownContainer}>
          <div className={styles.pickupRightDropdownContainerHeadingContainer}>
            Pickup Time
          </div>
          <Dropdown style={{ width: "163px" }}>
            <Dropdown.Toggle
              variant="success"
              className={styles.dropdownToggle}
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
              <span className={styles.dropdownIconContainer}>
                <img
                  src="/assets/img/Add To Cart.svg"
                  alt="chevron_down_icon"
                />
              </span>
            </Dropdown.Toggle>

            <Dropdown.Menu
              className={styles.dropdownMenu}
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
              <Dropdown.Item
                onClick={() => {
                  setPickupTime("12 August, 11:00 pm - 11:30 pm ");
                }}
              >
                12 August, 11:00 pm - 11:30 pm
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  setPickupTime("12 August, 11:30 pm - 12:00 am ");
                }}
              >
                12 August, 11:30 pm - 12:00 am
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  setPickupTime("12 August, 12:00 am - 12:30 pm ");
                }}
              >
                12 August, 12:00 am - 12:30 am
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  setPickupTime("12 August, 12:30 am - 01:00 am ");
                }}
              >
                12 August, 12:30 am - 01:00 am
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  setPickupTime("12 August, 01:00 am - 01:30 am ");
                }}
              >
                12 August, 01:00 am - 01:30 am
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  setPickupTime("12 August, 01:30 am - 02:00 am ");
                }}
              >
                12 August, 01:30 am - 02:00 am
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </StyledOuterContainer>
  );
};

export default PickupDetails;
