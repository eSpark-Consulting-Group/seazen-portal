import React, { useEffect } from "react";
import "./style.css";
import Dropdown from "react-bootstrap/Dropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { styled } from "@mui/material/styles"; // Import styled from MUI
import { lighten } from "@mui/material/styles";
import { useSelector } from "react-redux";
import {
  getDistanceFromLatLonInKm,
  getFullAddress,
} from "../../../../utils/getAddress";

const StyledOuterContainer = styled("div")(({ theme }) => ({
  backgroundColor: lighten(theme.palette.themeColor.light, 0.9), // Apply the background color
  // Add any other styles you need for the outer container here
}));

const StyledOuterContainerIcon = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.themeColor.main, // Apply the background color
  // Add any other styles you need for the outer container here
}));

const DeliveryDetails = (props) => {
  const { setLocationDeliver, restaurantBranchHours } = props;
  const addressData = useSelector((state) => state.address.addressData);
  const selected = JSON.parse(localStorage.getItem("selected"));

  const truncateString = (str, len) => {
    if (str) {
      if (str.length <= len) {
        return str;
      } else if (len === 18) {
        return str.slice(0, len) + "...)";
      } else {
        return str.slice(0, len) + "...";
      }
    }
  };

  const [latlng, setLatlng] = useState(null);
  const [location, setLocation] = useState(
    selected === null ? "No Address" : truncateString(selected?.address, 15)
  );
  const restaurantTheme = useSelector((state) => state.theme.themeColor);
  const [openDropdown, setOpendropdown] = useState(false);
  const [fullAddress, setFullAddress] = useState(null);

  useEffect(() => {
    if (restaurantBranchHours) {
      restaurantBranchHours?.data?.forEach((res) => {
        const resLat = +res.latitude;
        const resLng = +res.longitude;

        if (selected !== null && latlng === null) {
          const distance = getDistanceFromLatLonInKm(
            resLat,
            resLng,
            selected.lat,
            selected.lng
          );

          if (distance > 50) {
            setLocationDeliver(true);
          } else {
            setLocationDeliver(false);
          }
        }
      });
    }
  }, [restaurantBranchHours, selected, latlng]);

  const getUserAddress = (lat, lng) => {
    getFullAddress(lat, lng, setFullAddress);
  };

  useEffect(() => {
    if (fullAddress !== null) {
      localStorage.setItem("selected", JSON.stringify(fullAddress));

      setLocation(truncateString(fullAddress?.address));
      setLatlng({
        lat: fullAddress.lat,
        lng: fullAddress.lng,
      });

      setOpendropdown(false);
      setFullAddress(null);
    }
  }, [fullAddress]);

  const toggleDropdown = () => {
    if (fullAddress === null) {
      setOpendropdown(!openDropdown);
    }
  };

  return (
    <StyledOuterContainer
      className="delivery_outer_container"
      style={{ background: restaurantTheme.main + 24 }}
    >
      <div className="delivery_inner_container">
        <div className="left_dropdown_container">
          <div className="left_dropdown_container_heading_container">
            Deliver to
          </div>
          <Dropdown
            style={{ width: "163px" }}
            show={openDropdown}
            onToggle={toggleDropdown}
          >
            <Dropdown.Toggle
              variant="success"
              id="dropdown-basic"
              style={{
                backgroundColor: "transparent",
                color: "#323F4B",
                fontFamily: "Titillium Web",
                fontSize: "10px",
                fontWeight: "bold",
                border: "none",
                padding: "0",
              }}
            >
              {location}
              <StyledOuterContainerIcon className="dropdown_icon_container">
                <img src="/assets/img/dropdown.svg" alt="chevron_down_icon" />
              </StyledOuterContainerIcon>
            </Dropdown.Toggle>

            <Dropdown.Menu
              style={{
                backgroundColor: "#F0F6F5",
                color: "#323F4B",
                fontFamily: "Titillium Web",
                fontSize: "11pt",
                fontWeight: "bold",
                border: "none",
                transform: "translate(0px, -22px)",
              }}
            >
              {addressData?.length ? (
                addressData.map((address) => {
                  return (
                    <Dropdown.Item
                      onClick={() => {
                        getUserAddress(address.latitude, address.longitude);
                      }}
                      style={{
                        textTransform: "capitalize",
                      }}
                      key={address.id}
                    >
                      {address.address_label !== ""
                        ? address.address_label
                        : address.address_type}{" "}
                      {address?.address_type === "house"
                        ? truncateString(
                            `(Build: ${address?.building}, Bl: ${address?.block}, Str: ${address?.street})`,
                            18
                          )
                        : address?.address_type === "office"
                        ? truncateString(
                            `(Comp: ${address?.company_name}, Bl: ${address?.block}, Floor: ${address?.floor})`,
                            18
                          )
                        : truncateString(
                            `(Apar: ${address?.apartment_no}, Bl: ${address?.block}, Str: ${address?.street})`,
                            18
                          )}
                    </Dropdown.Item>
                  );
                })
              ) : (
                <Dropdown.Item
                  style={{
                    textTransform: "capitalize",
                  }}
                  disabled={true}
                >
                  No Address
                </Dropdown.Item>
              )}

              {/* <Dropdown.Item
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
              </Dropdown.Item> */}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <span
          style={{
            borderLeft: "1.5px solid #C3D8D4",
            height: "30px",
            marginTop: "8px",
          }}
        ></span>
        <div className="right_dropdown_container">
          <div className="right_dropdown_container_heading_container">
            Delivery Time
          </div>
          <Dropdown style={{ width: "163px" }}>
            <Dropdown.Toggle
              variant="success"
              id="dropdown-basic"
              style={{
                backgroundColor: "transparent",
                color: "#323F4B",
                fontFamily: "Titillium Web",
                fontSize: "10px",
                fontWeight: "700",
                border: "none",
                padding: "0",
              }}
            >
              {"ASAP "}
              <StyledOuterContainerIcon className="dropdown_icon_container">
                <img src="/assets/img/dropdown.svg" alt="chevron_down_icon" />
              </StyledOuterContainerIcon>
            </Dropdown.Toggle>

            {/* <Dropdown.Menu
              style={{
                backgroundColor: "#F0F6F5",
                color: "#323F4B",
                fontFamily: "Titillium Web",
                fontSize: "11pt",
                fontWeight: "bold",
                border: "none",
                transform: "translate(0px, -22px)",
                top: "12px",
              }}
            >
              <Dropdown.Item href="#/action-1">Option 1</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Option 2</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Option 3</Dropdown.Item>
            </Dropdown.Menu> */}
          </Dropdown>
        </div>
      </div>
    </StyledOuterContainer>
  );
};

export default DeliveryDetails;
