import React, { useEffect } from "react";
import "./style.css";
import Dropdown from "react-bootstrap/Dropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { styled } from "@mui/material/styles"; // Import styled from MUI
import { lighten } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { getDistanceFromLatLonInKm } from "../../../../utils/getAddress";

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

  const [latlng, setLatlng] = useState(null);
  const [location, setLocation] = useState("Select location");
  const restaurantTheme = useSelector((state) => state.theme.themeColor);

  useEffect(() => {
    if (restaurantBranchHours) {
      restaurantBranchHours?.data?.forEach((res) => {
        const resLat = +res.latitude;
        const resLng = +res.longitude;

        if (latlng !== null) {
          const distance = getDistanceFromLatLonInKm(
            resLat,
            resLng,
            +latlng.lat,
            +latlng.lng
          );

          if (distance > 50) {
            setLocationDeliver(true);
          } else {
            setLocationDeliver(false);
          }
        }
      });
    }
  }, [restaurantBranchHours, latlng]);

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
          <Dropdown style={{ width: "163px" }}>
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
              {addressData?.length &&
                addressData.map((address) => {
                  console.log(address);
                  return (
                    <Dropdown.Item
                      onClick={() => {
                        setLocation("Home (Salmiya) ");
                        setLatlng({
                          lat: address.latitude,
                          lng: address.longitude,
                        });
                      }}
                      style={{
                        textTransform: "capitalize",
                      }}
                      key={address.id}
                    >
                      {address.address_label !== ""
                        ? address.address_label
                        : address.address_type}{" "}
                      (Block: {address.block})
                    </Dropdown.Item>
                  );
                })}

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
