import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import Dropdown from "react-bootstrap/Dropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Stack,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles"; // Import styled from MUI
import { lighten } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import dayjs from "dayjs";
import getNearByRestaurants from "../../../../api/restaurant/getNearByRestaurant";
import {
  getDistanceFromLatLonInKm,
  getFullAddress,
} from "../../../../utils/getAddress";
import { getNearByRest } from "../../../../store/reducers/resturantsSlice";
import { paths } from "../../../../routes/paths";
import "./style.css";
import SchedulePicker from "../../../shared/schedulePicker";

const StyledOuterContainer = styled("div")(({ theme }) => ({
  backgroundColor: lighten(theme.palette.themeColor.light, 0.9), // Apply the background color
  // Add any other styles you need for the outer container here
}));

const StyledOuterContainerIcon = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.themeColor.main, // Apply the background color
  // Add any other styles you need for the outer container here
}));

const DeliveryDetails = (props) => {
  const { setLocationDeliver, restaurantBranchHours, onDelivery } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const addressData = useSelector((state) => state.address.addressData);
  const nearbyRestaurants = useSelector(
    (state) => state.resturants.nearbyRestaurants
  );
  const restaurantDetail = useSelector(
    (state) => state.resturants.restaurantDetail
  );
  const branchHours = useSelector((state) => state.resturants.branchHours);

  const selected = JSON.parse(localStorage.getItem("selected"));
  const currentLocation = JSON.parse(localStorage.getItem("location"));
  const token = localStorage.getItem("token");
  const pickDate = localStorage.getItem("pickDate");
  const isAsap = localStorage.getItem("isAsap");
  const pickTime = localStorage.getItem("pickTime");

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

  const returnLocation = () => {
    let location = "";
    if (currentLocation === null && selected === null) {
      location = "No Address";
    } else if (selected === null && currentLocation !== null) {
      location = truncateString(currentLocation?.address, 15);
    } else if (selected !== null && currentLocation !== null) {
      location = truncateString(selected?.address, 15);
    }

    return location;
  };

  const [latlng, setLatlng] = useState(null);
  const [userLocation, setUserLocation] = useState(returnLocation());
  const restaurantTheme = useSelector((state) => state.theme.themeColor);
  const [openDropdown, setOpendropdown] = useState(false);
  const [isDeliveryDropDown, setIsDeliveryDropDown] = useState(false);
  const [fullAddress, setFullAddress] = useState(null);
  const [openSchedulePopup, setOpenSchedulePopup] = useState(false);
  // const [showTimePicker, setShowTimePicker] = useState(false);
  const [restaurantOpen, setRestaurantOpen] = useState(false);
  const [addressID, setAddressID] = useState();
  const [delivery_charges, setDeliveryCharge] = useState();
  const [delivery_time, setDeliveryTime] = useState();
  const [minOrderAmount, setMinOrderAmount] = useState();
  const [minTime, setMinTime] = useState(dayjs());
  const [maxTime, setMaxTime] = useState(dayjs());

  const { id: restaurant_id } = useParams();

  useEffect(() => {
    if (onDelivery) {
      if (sessionStorage.getItem("popupOpened") === null) {
        if (isAsap === "true") {
          const filterRestaurant = branchHours?.filter(
            (branch) => branch.restaurant_id === restaurantDetail.id
          );

          for (let i = 0; i < filterRestaurant?.length; i++) {
            const date = new Date();
            const options = { weekday: "long" };
            const dayName = date.toLocaleDateString("en-US", options);

            const findStatus = filterRestaurant[i]?.branch_hours?.filter(
              (branch) => branch.week_day === dayName
            );

            if (findStatus[0]?.openingStatus === "Open") {
              setRestaurantOpen(false);
              break;

              //
            } else if (findStatus[0].openingStatus === "Close") {
              setRestaurantOpen(true);
              //
            }
          }
        } else {
          sessionStorage.setItem("popupOpened", true);
          setRestaurantOpen(false);
        }
      } else {
        sessionStorage.setItem("popupOpened", true);
        setRestaurantOpen(false);
      }
    }
  }, [branchHours, restaurantDetail]);

  const locationLabelName = () => {
    let text = "";
    const truncLoc = truncateString(currentLocation?.address, 15);

    if (
      localStorage.getItem("locatPermission") === "denied" ||
      localStorage.getItem("locatPermission") === "granted" ||
      localStorage.getItem("locatPermission") === "prompt"
    ) {
      if (token !== null) {
        if (currentLocation !== null) {
          text = truncLoc;
        }
        if (selected !== null) {
          text = truncateString(selected?.address, 15);
        }
        if (selected === null && currentLocation === null) {
          if (addressData.length) {
            text = "Select Address";
          } else {
            text = "Add Address";
          }
        }
      } else {
        if (currentLocation !== null) {
          text = truncLoc;
        } else {
          text = "Add Address";
        }
      }
    }

    return text;
  };

  useEffect(() => {
    if (restaurantBranchHours?.data?.length) {
      for (let i = 0; i < restaurantBranchHours?.data?.length; i++) {
        const resLat = +restaurantBranchHours?.data[i]?.latitude;
        const resLng = +restaurantBranchHours?.data[i]?.longitude;

        let fromLocation;
        if (selected === null && currentLocation !== null) {
          fromLocation = currentLocation;
        } else if (selected !== null && currentLocation !== null) {
          fromLocation = selected;
        }

        if (fromLocation !== null && latlng === null) {
          const distance = getDistanceFromLatLonInKm(
            resLat,
            resLng,
            fromLocation?.lat || 29.3140728,
            fromLocation?.lng || 47.68022
          );

          if (distance > 50) {
            setLocationDeliver(true);
          } else {
            setLocationDeliver(false);
            if (fromLocation && fromLocation.address) {
              setUserLocation(truncateString(fromLocation?.address, 15));
            } else {
              setUserLocation(locationLabelName());
            }

            break;
          }
        }

        if (fromLocation !== null && latlng !== null) {
          const distance = getDistanceFromLatLonInKm(
            resLat,
            resLng,
            fromLocation?.lat || 29.3140728,
            fromLocation?.lng || 47.68022
          );

          if (distance > 50) {
            setLocationDeliver(true);
          } else {
            setLocationDeliver(false);
            if (fromLocation && fromLocation.address) {
              setUserLocation(truncateString(fromLocation?.address, 15));
            } else {
              setUserLocation(locationLabelName());
            }
            break;
          }
        }
      }
    }
  }, [restaurantBranchHours, currentLocation, selected, latlng]);

  const getUserAddress = (lat, lng) => {
    getFullAddress(lat, lng, setFullAddress);
  };

  const fetchNearbyRestaurant = (lat, lng) => {
    const address = {
      latitude: lat,
      longitude: lng,
      service_type: "dinein",
    };

    getNearByRestaurants(address).then((res) => {
      if (res.status === "ok") {
        dispatch(getNearByRest(res?.data));
      }
    });
  };

  const asapHandler = () => {
    if (branchHours?.length !== 0) {
      const filterRestaurant = branchHours?.filter(
        (branch) => branch.restaurant_id === restaurantDetail.id
      );

      for (let i = 0; i < filterRestaurant?.length; i++) {
        const date = new Date();
        const options = { weekday: "long" };
        const dayName = date.toLocaleDateString("en-US", options);

        const findStatus = filterRestaurant[i]?.branch_hours?.filter(
          (branch) => branch.week_day === dayName
        );

        if (findStatus[0]?.openingStatus === "Open") {
          asapCall();
          break;

          //
        } else if (findStatus[0]?.openingStatus === "Close") {
          setRestaurantOpen(true);
          //
        }
      }
    } else {
      asapCall();
    }
  };

  const asapCall = () => {
    setIsDeliveryDropDown(false);
    const currentTime = new Date();
    currentTime.setMinutes(currentTime.getMinutes() + 30);

    localStorage.setItem("pickTime", dayjs(currentTime).format("hh:mm a"));
    localStorage.setItem(
      "pickDate",
      dayjs(currentTime).format("MMM DD, YYYY-dddd")
    );
    localStorage.setItem("isAsap", true);
  };

  useEffect(() => {
    if (fullAddress !== null) {
      localStorage.setItem(
        "selected",
        JSON.stringify({
          ...fullAddress,
          addressId: addressID,
          delivery_charges,
          delivery_time,
          minOrderAmount,
        })
      );

      setUserLocation(truncateString(fullAddress?.address, 15));
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

  const addLocation = () => {
    if (token === null) {
      const restaurant_id = restaurantDetail?.id;

      navigate(paths.location, {
        state: {
          path: "menu/restaurant",
          guestUser: true,
          restaurant_id: restaurant_id,
          restaurantName: restaurantDetail?.page_title_en,
        },
      });
    } else {
      navigate(paths.location, {
        state: {
          path: "menu/restaurant",
          restaurant_id: restaurant_id,
          restaurantName: restaurantDetail?.page_title_en,
          addFromDropdown: true,
        },
      });
    }
  };

  return (
    <>
      <StyledOuterContainer
        className="delivery_outer_container"
        style={{ background: restaurantTheme.main + 24, position: "relative" }}
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
                {userLocation}{" "}
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
                  maxHeight: "200px",
                  overflowY: "scroll",
                  scrollbarWidth: "none",
                }}
              >
                <Dropdown.Item defaultChecked onClick={addLocation}>
                  Add location
                </Dropdown.Item>

                <Dropdown.Item defaultChecked onClick={addLocation}>
                  Select current location
                </Dropdown.Item>

                {addressData?.length ? (
                  addressData
                    ?.filter((address) => {
                      const isDeliveryChargeInfoArray = !Array.isArray(
                        address.delivery_charge_area_info
                      );
                      return isDeliveryChargeInfoArray;
                    })
                    ?.map((address) => {
                      return (
                        <Dropdown.Item
                          onClick={() => {
                            getUserAddress(address.latitude, address.longitude);
                            setAddressID(address.id);
                            setDeliveryCharge(
                              address?.delivery_charge_area_info?.delivery_charges?.split(
                                " "
                              )[1]
                            );
                            setDeliveryTime(
                              address?.delivery_charge_area_info?.delivery_time
                            );
                            setMinOrderAmount(
                              address?.delivery_zone_info?.minimum_order_amount
                            );
                            fetchNearbyRestaurant(
                              address.latitude,
                              address.longitude
                            );
                            localStorage.setItem("selectCurrent", false);
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
                          <span
                            style={{
                              fontSize: 13,
                            }}
                          >
                            {selected !== null &&
                              currentLocation !== null &&
                              parseFloat(selected?.lat) ===
                                parseFloat(currentLocation?.lat) &&
                              parseFloat(selected?.lng) ===
                                parseFloat(currentLocation?.lng) &&
                              "(current location)"}
                          </span>
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
              style={{ width: "163px", scrollbarWidth: "none" }}
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
                {pickDate?.split("-")[0]}{" "}
                {isAsap === "true" ? "ASAP" : pickTime}
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
                <Dropdown.Item
                  onClick={() => {
                    setOpenSchedulePopup(true);
                    document.body.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
                  }}
                >
                  Schedule for later
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          {selected !== null && selected?.delivery_time && (
            <Stack
              justifyContent="center"
              alignItems="center"
              sx={{
                bgcolor: (theme) => theme.palette.themeColor.main,
                color: "common.white",
                p: 1,
                borderRadius: "8px",
                position: "absolute",
                width: "33px",
                height: "32px",
                // left: "-7px",
                top: "8px",
                right: "12px",
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
                {selected?.delivery_time?.trim()?.split(" ")[0]}
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
          )}
        </div>
        <SchedulePicker
          isPopUpOpen={openSchedulePopup}
          popUpHandler={(isOpen) => setOpenSchedulePopup(isOpen)}
        />
        {/* <Stack
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
      </Stack> */}

        <Dialog
          open={restaurantOpen}
          onClose={() => {
            sessionStorage.setItem("popupOpened", true);
            setRestaurantOpen(false);
          }}
          sx={{
            margin: "0",
            textAlign: "center",
          }}
          className="cart-dialog"
          PaperProps={{
            sx: {
              overflow: "visible",
              margin: "0px 0px 0px 27px",
              width: "327px",

              "@media (max-width: 500px)": {
                width: "375px",
                margin: "0px 0px 0px 0px",
              },

              "@media (max-width: 400px)": {
                width: "90%",
              },
            },
          }}
        >
          <DialogTitle
            id="alert-dialog-title"
            className="dialog-title title-cart"
          >
            <img src="/assets/img/exclaim.svg"></img>

            <div
              style={{
                position: "absolute",
                top: "8px",
                right: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={() => {
                setRestaurantOpen(false);
                sessionStorage.setItem("popupOpened", true);
              }}
            >
              <CloseIcon
                sx={{
                  width: "24px",
                  fontSize: "24px",
                  cursor: "pointer",
                  color: "#707070 !important",
                }}
              />
            </div>
          </DialogTitle>
          <DialogContent className="dialog-content-cart">
            Restaurant is closed. Do you want to schedule for later?
          </DialogContent>

          <div className="btn-navigate">
            <Button
              className="common-st add-btn"
              onClick={() => {
                sessionStorage.setItem("popupOpened", true);
                navigate(paths.home);
              }}
            >
              Home Page
            </Button>

            <Button
              className="common-st go-to-btn"
              onClick={() => {
                setRestaurantOpen(false);
                setOpenSchedulePopup(true);
                sessionStorage.setItem("popupOpened", true);
              }}
            >
              Schedule for later
            </Button>
          </div>
        </Dialog>
      </StyledOuterContainer>
    </>
  );
};

export default DeliveryDetails;
