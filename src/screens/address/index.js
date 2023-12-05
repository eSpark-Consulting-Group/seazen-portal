import React, { useEffect, useLayoutEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useQuery } from "@tanstack/react-query";

import Select from "react-select";

import { RequestType, geocode, setKey } from "react-geocode";

import { toast } from "react-toastify";

import { HomeAdress } from "../../components/address/forms/homeForm";
import { AppartmentAdress } from "../../components/address/forms/appartmentForm";
import { OfficeAdress } from "../../components/address/forms/officeForm";
import AddressTypeSelector from "../../components/address/addressButton";
import MyAddresses from "../../components/header/myAdresses";

import { ReactComponent as Dropdown } from "../../assets/icons/dropdown.svg";
import { ReactComponent as ErrorDropdown } from "../../assets/icons/error-icon.svg";

import {
  checkIfIncludesPlus,
  checkNumberLength,
  isArabicCountryMCC,
} from "../../utils/numberCheck";

import { paths } from "../../routes/paths";

import addAddressApiCall from "../../api/address/addAddress";
import updateAddressApiCall from "../../api/address/updateAddress";
import getAllAddress from "../../api/address/getAddress";
import getAllArea from "../../api/address/areas";

import { getAreas, getAddress } from "../../store/reducers/addressSlice";

import "./style.css";

const toastList = new Set();
const MAX_TOAST = 1;

const AddressForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [addressName, setAddressName] = useState("");

  const { data: areas } = useQuery({
    queryFn: () => getAllArea(token),
    onSuccess: (data) => {
      dispatch(getAreas(data.data));
    },
  });

  useEffect(() => {
    if (
      location?.state?.fromCart !== undefined ||
      location?.state?.fromHome !== undefined ||
      location?.state?.fromMenu !== undefined ||
      location?.state?.fromDetail !== undefined
    ) {
      const getAdd = async (latitude, longitude) => {
        // eslint-disable-next-line no-undef
        setKey(process.env.REACT_APP_GOOGLE_API_KEY);
        geocode(RequestType.LATLNG, `${latitude},${longitude}`, {
          enable_address_descriptor: true,
        })
          .then(({ results }) => {
            const address = results[0].formatted_address;

            setAddressName(address);
          })
          .catch((err) => {
            console.log(err);
          });
      };

      getAdd(location?.state?.latlng.lat, location?.state?.latlng.lng);
    }
  }, [location?.state]);

  const token = localStorage.getItem("token");

  const allAreas = useSelector((state) => state.address.allAreas);

  const [addressType, setAddressType] = useState("house"); // Default to 'house'
  const [address, setAddress] = useState({
    delivery_charge_area_id: "",
    delivery_zone_id: "",
    block: "",
    street: "",
    avenue: "",
    house_no: "",
    address_label: "",
    additional_direction: "",
    building: "",
    floor: "",
    apartment_no: "",
    company_name: "",
    country_code: "",
    mobile_number: "",
    address_type: addressType,
    latitude: location?.state?.latlng.lat?.toString(),
    longitude: location?.state?.latlng.lng?.toString(),
  });
  const [errorState, setErrorState] = useState({
    areaErr: false,
    blockErr: false,
    buildingErr: false,
    floorErr: false,
    companyNameErr: false,
    additionalDirErr: false,
    countryCodeErr: false,
  });
  const [clickEv, setClickEv] = useState(false);
  const [area, setArea] = useState(null);

  useLayoutEffect(() => {
    if (location?.state?.edit) {
      const state = location?.state?.data;
      setAddress({
        delivery_charge_area_id: state.delivery_charge_area_info?.id
          ? state.delivery_charge_area_info?.id
          : "",
        delivery_zone_id: state.delivery_zone_info?.id
          ? state.delivery_zone_info?.id
          : "",
        block: state.block ? state.block : "",
        street: state.street ? state.street : "",
        avenue: state.avenue ? state.avenue : "",
        house_no: state.house_no ? state.house_no : "",
        address_label: state.address_label ? state.address_label : "",
        additional_direction: state.additional_direction
          ? state.additional_direction
          : "",
        building: state.building ? state.building : "",
        floor: state.floor ? state.floor : "",
        apartment_no: state.apartment_no ? state.apartment_no : "",
        company_name: state.company_name ? state.company_name : "",
        country_code: state.phone_country_code
          ? parseInt(state.phone_country_code)
          : "",
        mobile_number: state.phone_no ? parseInt(state.phone_no) : "",
        address_type: state?.address_type
          ? state.address_type.toLowerCase()
          : "",
        latitude: location?.state?.latlng.lat.toString(),
        longitude: location?.state?.latlng.lng.toString(),
      });
      setAddressType(state?.address_type?.toLowerCase());
      setArea(state?.delivery_charge_area_info?.name_en);
    }
  }, [location?.state?.edit]);

  const handleAddressTypeChange = (type) => {
    setClickEv(false);
    setAddressType(type);
    setErrorState({
      areaErr: false,
      blockErr: false,
      streetErr: false,
      houseNoErr: false,
      buildingErr: false,
      floorErr: false,
      apartmentNoerr: false,
      companyNameErr: false,
      additionalDirErr: false,
    });
    setAddress((prevState) => ({
      ...prevState,
      address_type: type,
    }));
  };

  const handleChange = (key, value) => {
    if (key === "mobile_number") {
      // Use regex to allow only digits and optional spaces or dashes
      const regex = /^[0-9]*[-\s]?[0-9]*$/;
      if (regex.test(value)) {
        setAddress((prevAddress) => ({
          ...prevAddress,
          mobile_number: value,
        }));
      }
      //
    } else {
      setAddress((prevAddress) => ({ ...prevAddress, [key]: value }));
    }
  };

  const apiCall = () => {
    let updateAddress = {};

    if (address.country_code !== "") {
      updateAddress = {
        ...address,
        mobile_number: address.mobile_number.toString(),
        country_code: checkIfIncludesPlus(address.country_code),
      };
    } else {
      updateAddress = address;
    }
    addAddressApiCall(updateAddress, token).then((res) => {
      if (res.success === "ok") {
        fetchFunction();

        if (
          location?.state?.path === "/cart" ||
          location?.state?.path === "/home" ||
          location?.state?.path?.includes("menu-item-details") ||
          location?.state?.path === "menu/restaurant"
        ) {
          const addToStorage = {
            lat: location?.state?.latlng?.lat,
            lng: location?.state?.latlng?.lng,
            address: location?.state?.name,
            addressId: res?.data?.id,
            delivery_time: res?.data?.delivery_charge_area_info?.delivery_time,
            delivery_charges:
              res?.data?.delivery_charge_area_info?.delivery_charges?.split(
                " "
              )[1],
            minOrderAmount: res?.data?.delivery_zone_info?.minimum_order_amount,
          };

          localStorage.setItem("selected", JSON.stringify(addToStorage));

          if (
            location?.state?.path?.includes("menu-item-details") ||
            location?.state?.path === "menu/restaurant"
          ) {
            if (location?.state?.noAddress) {
              navigate(paths.cart, {
                state: { noAddress: location?.state?.noAddress },
              });
            } else if (location?.state?.addNew) {
              navigate(paths.cart);
            } else if (location?.state?.fromMenu !== undefined) {
              navigate(paths.cart, {
                state: { fromMenu: location?.state?.fromMenu },
              });
            } else if (location?.state?.fromDetail !== undefined) {
              navigate(paths.cart, {
                state: { fromDetail: location?.state?.fromDetail },
              });
            } else {
              navigate(
                `${paths.menu}/restaurant/${location?.state?.restaurant_id}/delivery`
              );
            }
          } else if (location?.state?.fromHome !== undefined) {
            navigate(paths.cart, {
              state: { fromHome: location?.state?.fromHome },
            });
          } else if (location?.state?.notSelected !== undefined) {
            navigate(paths.cart, {
              state: {
                fromMenu: true,
                path: "menu/restaurant",
                restaurant_id: location?.state?.restaurant_id,
              },
            });
          } else {
            navigate(paths.cart);
          }
        } else if (location?.state?.path === "/profile") {
          navigate(paths.addresses, { state: { path: location?.state?.path } });
        } else {
          navigate(paths.addresses, { state: { path: location.pathname } });
        }
      }
    });
  };

  const updateApiCall = () => {
    let updateAddress = {};

    if (address.country_code !== "") {
      updateAddress = {
        ...address,
        mobile_number: address.mobile_number.toString(),
        country_code: checkIfIncludesPlus(address.country_code),
      };
    } else {
      updateAddress = address;
    }

    updateAddressApiCall(updateAddress, location?.state?.data.id, token).then(
      (res) => {
        if (res.success === "ok") {
          fetchFunction();

          const commonData = {
            lat: location?.state?.latlng?.lat,
            lng: location?.state?.latlng?.lng,
            delivery_time: res?.data?.delivery_charge_area_info?.delivery_time,
            delivery_charges:
              res?.data?.delivery_charge_area_info?.delivery_charges?.split(
                " "
              )[1],
            addressId: res?.data?.id,
            minOrderAmount: res?.data?.delivery_zone_info?.minimum_order_amount,
          };

          if (
            location?.state?.path === "/cart" ||
            location?.state?.path === "/home" ||
            location?.state?.path?.includes("menu-item-details") ||
            location?.state?.path === "menu/restaurant"
          ) {
            if (
              location?.state?.fromCart !== undefined ||
              location?.state?.fromHome !== undefined ||
              location?.state?.fromMenu !== undefined ||
              location?.state?.fromDetail !== undefined
            ) {
              const addToStorage = {
                address: addressName,
                ...commonData,
              };

              localStorage.setItem("selected", JSON.stringify(addToStorage));
            } else {
              const addToStorage = {
                address: location?.state?.name,
                ...commonData,
              };

              localStorage.setItem("selected", JSON.stringify(addToStorage));
            }

            if (
              location?.state?.path?.includes("menu-item-details") ||
              location?.state?.path === "menu/restaurant"
            ) {
              if (location?.state?.noAddress) {
                navigate(paths.cart, {
                  state: { noAddress: location?.state?.noAddress },
                });
              } else if (location?.state?.addNew) {
                navigate(paths.cart);
              } else if (location?.state?.fromMenu !== undefined) {
                navigate(paths.cart, {
                  state: { fromMenu: location?.state?.fromMenu },
                });
              } else if (location?.state?.fromDetail !== undefined) {
                navigate(paths.cart, {
                  state: { fromDetail: location?.state?.fromDetail },
                });
              } else {
                navigate(
                  `${paths.menu}/restaurant/${location?.state?.restaurant_id}/delivery`
                );
              }
            } else if (location?.state?.fromHome !== undefined) {
              navigate(paths.cart, {
                state: { fromHome: location?.state?.fromHome },
              });
            } else {
              navigate(paths.cart);
            }
          } else if (location?.state?.path === "/profile") {
            navigate(paths.addresses, {
              state: { path: location?.state?.path },
            });
          } else {
            navigate(paths.addresses, { state: { path: location.pathname } });
          }
        }
      }
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    // Handle form submission logic here, e.g., save the form data
    setClickEv(true);

    if (addressType === "house") {
      if (
        address.delivery_charge_area_id !== "" &&
        address.block !== "" &&
        address.street !== "" &&
        address.house_no !== ""
      ) {
        setClickEv(false);
        callApiAfterNumCheck();
      }
    }
    if (addressType === "apartment") {
      if (
        address.delivery_charge_area_id !== "" &&
        address.block !== "" &&
        address.street !== "" &&
        address.building !== "" &&
        address.floor !== "" &&
        address.apartment_no !== ""
      ) {
        setClickEv(false);
        callApiAfterNumCheck();
      }
    }
    if (addressType === "office") {
      if (
        address.delivery_charge_area_id !== "" &&
        address.block !== "" &&
        address.street !== "" &&
        address.building !== "" &&
        address.floor !== "" &&
        address.company_name !== ""
      ) {
        setClickEv(false);
        callApiAfterNumCheck();
      }
    }
  };

  const callApiAfterNumCheck = () => {
    if (address.mobile_number !== "") {
      if (!checkNumberLength(address.mobile_number)) {
        if (toastList.size < MAX_TOAST) {
          const id = toast.error("Mobile number must be exactly 8 digits", {
            onClose: () => toastList.delete(id),
          });
          toastList.add(id);
        }
      }

      if (address.country_code === "") {
        if (toastList.size < MAX_TOAST) {
          const id = toast.error("Add country code", {
            onClose: () => toastList.delete(id),
          });
          toastList.add(id);
        }
      }

      if (!isArabicCountryMCC(address.country_code)) {
        if (toastList.size < MAX_TOAST) {
          const id = toast.error("Please enter valid mobile country code", {
            onClose: () => toastList.delete(id),
          });
          toastList.add(id);
        }
      }

      if (
        address.country_code !== "" &&
        checkNumberLength(address.mobile_number) &&
        isArabicCountryMCC(address.country_code)
      ) {
        apiCallFunc();
      }
    } else {
      apiCallFunc();
    }
  };

  const apiCallFunc = () => {
    if (location?.state?.edit) {
      updateApiCall();
    } else {
      apiCall();
    }
  };

  const fetchFunction = async () => {
    // setIsloading(true);
    getAllAddress(token).then((res) => {
      if (res.success === "ok") {
        dispatch(getAddress(res.data));
      }
    });
  };

  useEffect(() => {
    if (clickEv) {
      if (addressType === "house") {
        setErrorState((prevState) => ({
          ...prevState,
          areaErr: address.delivery_charge_area_id === "" ? true : false,
          blockErr: address.block === "" ? true : false,
          streetErr: address.street === "" ? true : false,
          houseNoErr: address.house_no === "" ? true : false,
        }));
      } else if (addressType === "apartment") {
        setErrorState((prevState) => ({
          ...prevState,
          areaErr: address.delivery_charge_area_id === "" ? true : false,
          blockErr: address.block === "" ? true : false,
          streetErr: address.street === "" ? true : false,
          buildingErr: address.building === "" ? true : false,
          floorErr: address.floor === "" ? true : false,
          apartmentNoerr: address.apartment_no === "" ? true : false,
        }));
      } else if (addressType === "office") {
        setErrorState((prevState) => ({
          ...prevState,
          areaErr: address.delivery_charge_area_id === "" ? true : false,
          blockErr: address.block === "" ? true : false,
          streetErr: address.street === "" ? true : false,
          buildingErr: address.building === "" ? true : false,
          floorErr: address.floor === "" ? true : false,
          companyNameErr: address.company_name === "" ? true : false,
        }));
      }
    }
  }, [addressType, address, clickEv]);

  const truncateString = (str) => {
    if (str) {
      if (str.length <= 12) {
        return str;
      } else {
        return str.slice(0, 12) + "...";
      }
    }
  };

  const selectHandler = (selectedOption) => {
    setArea(selectedOption);
    setAddress((address) => ({
      ...address,
      delivery_charge_area_id: selectedOption.value,
      delivery_zone_id: selectedOption.zone_id,
    }));
  };

  const groupedOptions = allAreas.map((zone) => ({
    label: zone.name_en,
    options: zone.areas.map((area) => ({
      label: area.name_en,
      value: area.area_id,
      zone_id: zone.zone_id,
    })),
  }));

  console.log(address);

  return (
    <>
      <MyAddresses
        title={`${location?.state?.edit ? "Edit" : "Save New"} Address`}
        path={location?.state?.path}
        fromAllAddresses={false}
        edit={location?.state?.edit}
        noAddress={location?.state?.noAddress}
        addNew={location?.state?.addNew}
        restaurant_id={location?.state?.restaurant_id}
        fromCart={location?.state?.fromCart}
        fromHome={location?.state?.fromHome}
        fromMenu={location?.state?.fromMenu}
        fromDetail={location?.state?.fromDetail}
        backToCart={true}
        notSelected={location?.state?.notSelected}
        addFromDropdown={location?.state?.addFromDropdown}
      />

      <div className="button-style">
        <AddressTypeSelector
          addressType={addressType}
          handleAddressTypeChange={
            !location?.state?.edit && handleAddressTypeChange
          }
          edit={location?.state?.edit}
        />

        {location?.state?.edit ? null : (
          <div className="edit-container px-3">
            <p className="address-name">
              {truncateString(location?.state?.name)}
            </p>
            <button
              className="edit-button"
              onClick={() =>
                navigate(paths.location, {
                  state: {
                    name: location?.state?.name,
                    latlng: location?.state?.latlng,
                    editLocation: true,
                    path: location?.state?.path,
                    fromHome: location?.state?.fromHome,
                    fromMenu: location?.state?.fromMenu,
                    fromDetail: location?.state?.fromDetail,
                  },
                })
              }
            >
              <span className="edit-text">Edit Location</span>
            </button>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          {/* Add the form element and onSubmit handler */}

          <div className="container-style px-3">
            <Select
              value={area}
              onChange={selectHandler}
              options={groupedOptions}
              isSearchable
              placeholder="Areas"
              components={{
                DropdownIndicator: errorState?.areaErr
                  ? ErrorDropdown
                  : Dropdown,
              }}
              styles={{
                option: (provided, state) => ({
                  ...provided,
                  cursor: "pointer",
                  backgroundColor: state.isSelected
                    ? "rgba(189,197,209,.3)"
                    : "transparent",
                  color: "#000000",
                  ":hover": {
                    backgroundColor: "rgba(189,197,209,.3)",
                  },
                }),
                indicatorsContainer: (provided) => ({
                  ...provided,
                  border: "none",
                  position: "absolute",
                  right: "16px",
                  top: "11px",
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  boxShadow: "0px 10px 30px rgba(49, 79, 124, 0.16)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }),
                indicatorSeparator: () => ({
                  display: "none",
                }),
                control: (baseStyles) => ({
                  ...baseStyles,
                  backgroundColor: "#fafafa",
                  border: errorState?.areaErr
                    ? "1px solid #e02020 !important"
                    : "1px solid #c0cdd7 !important",
                  borderRadius: "12px !important",
                  opacity: "1",
                  padding: "10px",
                  width: "100%",
                  marginBottom: "10px",
                  height: "64px",
                  color: "#000000",
                  boxShadow: "none",
                }),
                valueContainer: (baseStyles) => ({
                  ...baseStyles,
                  paddingLeft: "0px",
                }),
                placeholder: (baseStyles) => ({
                  ...baseStyles,
                  margin: "0px",
                  color: errorState?.areaErr ? "#e02020" : "#959fa8",
                  font: "normal normal bold 16px/28px Titillium Web",
                }),
                menu: (provided) => ({
                  ...provided,
                  color: "#000000",
                  borderRadius: "8px",
                  marginTop: "0px",
                }),
                menuList: (base) => ({
                  ...base,
                  scrollbarWidth: "none",
                  "::-webkit-scrollbar": {
                    display: "none",
                  },
                }),
                group: (base) => ({
                  ...base,
                  padding: "0px",
                }),
                groupHeading: (base) => ({
                  ...base,
                  display: "none",
                  padding: "0px",
                }),
              }}
            />
          </div>

          {addressType === "house" && (
            <HomeAdress
              handleChange={handleChange}
              address={address}
              blockErr={errorState.blockErr}
              streetErr={errorState.streetErr}
              houseNoErr={errorState.houseNoErr}
            />
          )}
          {addressType === "apartment" && (
            <AppartmentAdress
              handleChange={handleChange}
              address={address}
              setAddress={setAddress}
              areaErr={errorState.areaErr}
              blockErr={errorState.blockErr}
              streetErr={errorState.streetErr}
              buildingErr={errorState.buildingErr}
              floorErr={errorState.floorErr}
              apartmentNoerr={errorState.apartmentNoerr}
              area={area}
              setArea={setArea}
            />
          )}
          {addressType === "office" && (
            <OfficeAdress
              handleChange={handleChange}
              address={address}
              setAddress={setAddress}
              areaErr={errorState.areaErr}
              blockErr={errorState.blockErr}
              streetErr={errorState.streetErr}
              buildingErr={errorState.buildingErr}
              floorErr={errorState.floorErr}
              companyNameErr={errorState.companyNameErr}
              area={area}
              setArea={setArea}
            />
          )}
          <div className="contact-style">
            <div className="contact-section">
              <h3>Contact Details</h3>
            </div>
            <div className="contact-field">
              <input
                className="country-code-input"
                type="number"
                name="CountryCode"
                placeholder="+965"
                value={address.country_code}
                onChange={(e) => handleChange("country_code", e.target.value)}
              />

              <input
                className="phone-number-input"
                type="number"
                name="PhoneNumber"
                placeholder="Alternative Phone Number"
                value={address.mobile_number}
                onChange={(e) => handleChange("mobile_number", e.target.value)}
              />
            </div>
          </div>
          <button type="submit" className="address-button">
            {/* Use type='submit' to make it a submit button */}
            <span className="address-text">
              {location?.state?.edit ? "Save Changes" : "Save"}
            </span>
          </button>
        </form>
      </div>
    </>
  );
};

export default AddressForm;
