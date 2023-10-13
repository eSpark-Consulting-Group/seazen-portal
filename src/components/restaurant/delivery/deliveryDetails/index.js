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
import { Stack, Typography } from "@mui/material";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileTimePicker } from "@mui/x-date-pickers";
import { useQuery } from "@tanstack/react-query";
import getBranchesAndHours, {
  GET_BRANCHES_AND_HOURS_QUERY_KEY,
} from "../../../../api/restaurant/branches/getBranchesAndHours";
import { useParams } from "react-router-dom";

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
  const asapTime = new Date().setMinutes(new Date().getMinutes() + 30);
  const [latlng, setLatlng] = useState(null);
  const [location, setLocation] = useState(
    selected === null ? "No Address" : truncateString(selected?.address, 15)
  );
  const restaurantTheme = useSelector((state) => state.theme.themeColor);
  const [openDropdown, setOpendropdown] = useState(false);
  const [isDeliveryDropDown, setIsDeliveryDropDown] = useState(false);
  const [fullAddress, setFullAddress] = useState(null);
  const [isAsap, setIsAsap] = useState(true);
  const [openSchedulePopup, setOpenSchedulePopup] = useState(false);
  const [pickDate, setPickDate] = useState(
    dayjs(new Date()).format("MMM DD, YYYY")
  );
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [pickTime, setPickTime] = useState(dayjs(asapTime).format("hh:mm a"));

  const { id: restaurant_id } = useParams();

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

        if (selected !== null && latlng !== null) {
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
  }, [restaurantBranchHours, selected, latlng, fullAddress]);

  const getUserAddress = (lat, lng) => {
    getFullAddress(lat, lng, setFullAddress);
  };
  const asapHandler = () => {
    setIsAsap(true);
    setIsDeliveryDropDown(false);
    const currentTime = new Date();
    currentTime.setMinutes(currentTime.getMinutes() + 30);
    setPickTime(dayjs(currentTime).format("hh:mm a"));
    setPickDate(dayjs(currentTime).format("MMM DD, YYYY-dddd"));
  };

  const { data: branchesAndHoursResponse, isSuccess } = useQuery({
    queryKey: [GET_BRANCHES_AND_HOURS_QUERY_KEY, restaurant_id],
    queryFn: () => {
      return getBranchesAndHours(restaurant_id);
    },
  });

  const timeByDate = branchesAndHoursResponse?.data[0]?.branch_hours?.find(
    (val) => {
      return val.week_day == pickDate.split("-")[1];
    }
  );

  const onDateSelected = () => {
    if (pickDate) {
      setOpenSchedulePopup(false);
      setShowTimePicker(true);
    }
  };

  useEffect(() => {
    if (fullAddress !== null) {
      localStorage.setItem("selected", JSON.stringify(fullAddress));

      setLocation(truncateString(fullAddress?.address, 15));
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

          <Dropdown
            onToggle={() => setIsDeliveryDropDown(!isDeliveryDropDown)}
            show={isDeliveryDropDown}
            style={{ width: "163px" }}
          >
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
              {pickDate.split("-")[0]} {isAsap ? "ASAP " : pickTime}
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
                // top: "12px",
              }}
            >
              <Dropdown.Item defaultChecked onClick={asapHandler}>
                ASAP
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setOpenSchedulePopup(true)}>
                Schedule for later
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MobileDatePicker
          onChange={(date) => setPickDate(date.format("MMM DD, YYYY-dddd"))}
          minDate={dayjs(new Date())}
          open={openSchedulePopup}
          defaultValue={dayjs(new Date().toString())}
          onClose={() => onDateSelected(false)}
          sx={{
            display: "none",
          }}
        />
        {timeByDate && (
          <MobileTimePicker
            minTime={dayjs(
              new Date().setHours(parseInt(timeByDate.from_time.split(":")[0]))
            )}
            maxTime={dayjs(
              new Date().setHours(
                parseInt(timeByDate.to_time.split(":")[0]) + 12
              )
            )}
            defaultValue={dayjs(new Date())}
            open={showTimePicker}
            onChange={(time) => {
              setPickTime(time.format("hh:mm a"));
              setIsAsap(false);
            }}
            onClose={() => setShowTimePicker(false)}
            sx={{
              display: "none",
            }}
          />
        )}
      </LocalizationProvider>
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{
          bgcolor: (theme) => theme.palette.themeColor.main,
          color: "common.white",
          p: 1,
          borderRadius: "8px",
          position: "relative",
          width: "33px",
          height: "32px",
          left: "-7px",
          top: "8px",
        }}
        spacing={0}
      >
        <Typography
          variant="h4"
          fontWeight={600}
          sx={{
            lineHeight: 1,
            fontSize: "19px",
          }}
        >
          30
        </Typography>
        <Typography
          variant="caption"
          fontWeight={300}
          sx={{
            lineHeight: 1,
            fontSize: "6px",
          }}
        >
          minutes
        </Typography>
      </Stack>
    </StyledOuterContainer>
  );
};

export default DeliveryDetails;
